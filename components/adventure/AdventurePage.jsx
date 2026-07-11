"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/adventure/sections/HeroSection";
import TrainingLevelSection from "@/components/adventure/sections/TrainingLevelSection";
import DiscoveryLevelSection from "@/components/adventure/sections/DiscoveryLevelSection";
import RulesLevelSection from "@/components/adventure/sections/RulesLevelSection";
import Astrolabe3DSection from "@/components/adventure/sections/Astrolabe3DSection";
import DiaryInterludeSection from "@/components/adventure/sections/DiaryInterludeSection";
import ExpeditionObjectsSection from "@/components/adventure/sections/ExpeditionObjectsSection";
import JourneyTracker from "@/components/adventure/JourneyTracker";
import FinalChapters from "@/components/adventure/sections/FinalChapters";
import SecondPassArchiveSection from "@/components/adventure/sections/SecondPassArchiveSection";

export default function AdventurePage() {
  const [secondPassActive, setSecondPassActive] = useState(false);

  useEffect(() => {
    const active = window.localStorage.getItem("secondJourneyUnlocked") === "true";
    setSecondPassActive(active);
    document.documentElement.classList.toggle("second-journey", active);
    document.documentElement.classList.toggle("second-pass-active", active);
    document.body.classList.toggle("second-pass-active", active);
  }, []);

  const unlockSecondPass = () => {
    window.localStorage.setItem("secondJourneyUnlocked", "true");
    document.documentElement.classList.add("second-journey", "second-pass-active");
    document.body.classList.add("second-pass-active");
    setSecondPassActive(true);
  };

  return (
    <main>
      <JourneyTracker secondPassActive={secondPassActive} />
      <HeroSection secondPassActive={secondPassActive} />
      <TrainingLevelSection />
      <DiscoveryLevelSection secondPassActive={secondPassActive} />
      <RulesLevelSection />
      <Astrolabe3DSection />
      <DiaryInterludeSection secondPassActive={secondPassActive} />
      {secondPassActive ? <SecondPassArchiveSection /> : null}
      <ExpeditionObjectsSection />
      <FinalChapters secondPassActive={secondPassActive} onUnlockSecondPass={unlockSecondPass} />
    </main>
  );
}
