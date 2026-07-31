import { useCallback, useEffect, useState } from "react";
import { useTripDay } from "./hooks/useTripDay";
import { IdentityProvider, useIdentity } from "./context/IdentityContext";
import IdentityGate from "./components/IdentityGate";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import DayTimeline from "./components/DayTimeline";
import BudgetPanel from "./components/BudgetPanel";
import Checklist from "./components/Checklist";
import VaultPanel from "./components/VaultPanel";
import SafetyPanel from "./components/SafetyPanel";
import VibesPanel from "./components/VibesPanel";
import EatsNotesPanel from "./components/EatsNotesPanel";
import PhotoSpotsPanel from "./components/PhotoSpotsPanel";
import TodayView from "./components/TodayView";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import InstallPrompt from "./components/InstallPrompt";

type ViewMode = "hype" | "live" | "auto";

function AppContent() {
  const { currentDay, isTripActive } = useTripDay();
  const [viewMode, setViewMode] = useState<ViewMode>("auto");
  const [activeDay, setActiveDay] = useState(1);

  const resolvedMode: "hype" | "live" =
    viewMode === "auto"
      ? isTripActive && currentDay
        ? "live"
        : "hype"
      : viewMode;

  useEffect(() => {
    if (isTripActive && currentDay) {
      setActiveDay(currentDay);
    }
  }, [isTripActive, currentDay]);

  // Switching between Full trip <-> Today swaps to an entirely different,
  // much shorter page — reset scroll so the new view opens at its top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedMode]);

  const handleDayChange = useCallback((day: number) => {
    setActiveDay(day);
  }, []);

  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  const showLiveToggle = true;
  const liveDay = currentDay ?? 1;

  if (resolvedMode === "live") {
    return (
      <div className="grain min-h-dvh bg-midnight pb-mobile-nav md:pb-0">
        <Nav
          mode="live"
          onModeChange={(m) => setViewMode(m)}
          showLiveToggle={showLiveToggle}
        />
        <TodayView currentDay={liveDay} preview={!currentDay} />
        <MobileNav mode="live" />
        <InstallPrompt />
      </div>
    );
  }

  return (
    <div className="grain min-h-dvh bg-midnight pb-mobile-nav md:pb-0">
      <Nav
        mode="hype"
        onModeChange={(m) => setViewMode(m)}
        showLiveToggle={showLiveToggle}
      />

      <Hero onExplore={scrollToTimeline} />

      <DayTimeline activeDay={activeDay} onDayChange={handleDayChange} />

      <BudgetPanel />
      <Checklist />
      <VaultPanel />
      <SafetyPanel />
      <EatsNotesPanel />
      <PhotoSpotsPanel />
      <VibesPanel />
      <Footer />
      <MobileNav mode="hype" />
      <InstallPrompt />
    </div>
  );
}

function AppGate() {
  const { resolved } = useIdentity();
  return resolved ? <AppContent /> : <IdentityGate />;
}

function App() {
  return (
    <IdentityProvider>
      <AppGate />
    </IdentityProvider>
  );
}

export default App;
