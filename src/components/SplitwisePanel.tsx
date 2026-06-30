import { useSplitwiseBalances } from "../hooks/useSplitwiseBalances";

export default function SplitwisePanel() {
  const { balances, groupName, loading, error, groupUrl } = useSplitwiseBalances();

  const hasApiData = balances.length > 0;
  const hasLink =
    !!groupUrl &&
    groupUrl !== "your_splitwise_group_url" &&
    groupUrl.startsWith("http");

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white/90">Splitwise</p>
        {hasLink && (
          <a
            href={groupUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-sage hover:underline"
          >
            Open group →
          </a>
        )}
      </div>

      {loading && !hasApiData && (
        <p className="text-xs text-white/40">Loading balances…</p>
      )}

      {error && (
        <p className="text-xs text-white/40">{error}</p>
      )}

      {hasApiData && (
        <div className="rounded-xl border border-white/8 bg-dusk/60 px-4 py-4">
          {groupName && (
            <p className="mb-3 text-xs uppercase tracking-wider text-white/40">
              {groupName}
            </p>
          )}
          <ul className="space-y-2">
            {balances.map((b) => (
              <li
                key={b.member}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-white/80">{b.member}</span>
                <span
                  className={`font-display font-semibold ${
                    b.balance > 0
                      ? "text-sage"
                      : b.balance < 0
                        ? "text-sandstone"
                        : "text-white/40"
                  }`}
                >
                  {b.balance > 0 ? "+" : ""}
                  ${b.balance.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-white/30">
            Positive = owed money · Negative = owes money
          </p>
        </div>
      )}

      {hasLink && !hasApiData && !loading && (
        <a
          href={groupUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-sage/30 bg-sage/10 px-4 py-4 text-sm font-medium text-sage transition-colors hover:bg-sage/15"
        >
          Track expenses in Splitwise
        </a>
      )}

      {!hasLink && !hasApiData && !loading && (
        <p className="rounded-xl border border-white/8 bg-dusk/60 px-4 py-3 text-xs text-white/40">
          Add <code className="text-sage">VITE_SPLITWISE_GROUP_URL</code> to your{" "}
          <code className="text-sage">.env</code> to link your trip group.
        </p>
      )}
    </div>
  );
}
