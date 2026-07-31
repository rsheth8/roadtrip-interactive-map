import { useIdentity } from "../context/IdentityContext";

export default function GuestBanner() {
  const { isGuest } = useIdentity();
  if (!isGuest) return null;

  return (
    <div className="border-t border-sandstone/20 bg-sandstone/10 px-4 py-1.5 text-center text-[11px] text-sandstone">
      👋 Viewing as a guest — everything's here to look at, nothing to edit.
    </div>
  );
}
