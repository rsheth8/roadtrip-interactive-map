import { useCallback, useEffect, useState } from "react";
import { useTripDay } from "./hooks/useTripDay";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import DayTimeline from "./components/DayTimeline";
import BudgetPanel from "./components/BudgetPanel";
import Checklist from "./components/Checklist";
import TodayView from "./components/TodayView";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import InstallPrompt from "./components/InstallPrompt";

type ViewMode = "hype" | "live" | "auto";

function App() {
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
      <Footer />
      <MobileNav mode="hype" />
      <InstallPrompt />
    </div>
  );
}

export default App;
