import { useInstallPrompt } from "../hooks/useInstallPrompt";

export default function InstallPrompt() {
  const { canInstall, install, dismiss } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl border border-sage/30 bg-dusk/95 p-4 shadow-xl backdrop-blur-md md:bottom-6 md:left-auto md:right-6">
      <p className="font-display text-sm font-semibold text-white">
        Install trip app
      </p>
      <p className="mt-1 text-xs text-white/50">
        Add to your home screen for offline itinerary access on the road.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => void install()}
          className="flex-1 rounded-lg bg-sage py-2 text-sm font-semibold text-midnight"
        >
          Install
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/50"
        >
          Later
        </button>
      </div>
    </div>
  );
}
