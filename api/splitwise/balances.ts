import type { VercelRequest, VercelResponse } from "@vercel/node";

type SplitwiseMember = {
  first_name: string;
  last_name: string;
  balance: Array<{ currency_code: string; amount: string }>;
};

type SplitwiseGroupResponse = {
  group: {
    name: string;
    members: SplitwiseMember[];
  };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.SPLITWISE_ACCESS_TOKEN;
  const groupId = process.env.SPLITWISE_GROUP_ID;

  if (!token || !groupId) {
    return res.status(503).json({ error: "Splitwise not configured" });
  }

  try {
    const response = await fetch(
      `https://secure.splitwise.com/api/v3.0/get_group/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Splitwise request failed" });
    }

    const data = (await response.json()) as SplitwiseGroupResponse;
    const balances = (data.group?.members ?? []).map((member) => {
      const usd =
        member.balance.find((b) => b.currency_code === "USD") ??
        member.balance[0];
      return {
        member: `${member.first_name} ${member.last_name}`.trim(),
        balance: usd ? parseFloat(usd.amount) : 0,
      };
    });

    return res.status(200).json({
      groupName: data.group?.name,
      balances,
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch Splitwise data" });
  }
}
