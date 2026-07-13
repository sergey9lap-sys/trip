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
import PerformanceManager from "@/components/adventure/PerformanceManager";
import FoundArchive from "@/components/adventure/FoundArchive";

export default function AdventurePage() {
  const [secondPassActive, setSecondPassActive] = useState(false);

  useEffect(() => {
    const active = window.localStorage.getItem("secondJourneyUnlocked") === "true";
    setSecondPassActive(active);
    document.documentElement.classList.toggle("second-journey", active);
    document.documentElement.classList.toggle("second-pass-active", active);
    document.body.classList.toggle("second-pass-active", active);
  }, []);

  useEffect(() => {
    const guardTelegram = (event) => {
      const link = event.target.closest?.('a[href*="t.me/"]');
      if (!link) return;
      const section = link.closest("section");
      const rect = link.getBoundingClientRect();
      const directlyInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      const sectionVisible = section && section.getBoundingClientRect().top < window.innerHeight * 0.8 && section.getBoundingClientRect().bottom > window.innerHeight * 0.2;
      if (!directlyInside || !sectionVisible) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("click", guardTelegram, true);
    return () => document.removeEventListener("click", guardTelegram, true);
  }, []);

  const unlockSecondPass = () => {
    window.localStorage.setItem("secondJourneyUnlocked", "true");
    document.documentElement.classList.add("second-journey", "second-pass-active");
    document.body.classList.add("second-pass-active");
    setSecondPassActive(true);
  };

  const returnToFirstPass = () => {
    window.localStorage.removeItem("secondJourneyUnlocked");
    document.documentElement.classList.remove("second-journey", "second-pass-active");
    document.body.classList.remove("second-pass-active");
    setSecondPassActive(false);
    window.setTimeout(() => {
      document.getElementById("threshold")?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 0);
  };

  return (
    <main>
      <PerformanceManager />
      <FoundArchive />
      <JourneyTracker secondPassActive={secondPassActive} />
      <HeroSection secondPassActive={secondPassActive} />
      <TrainingLevelSection />
      <DiscoveryLevelSection secondPassActive={secondPassActive} />
      <RulesLevelSection />
      <Astrolabe3DSection />
      <DiaryInterludeSection secondPassActive={secondPassActive} />
      {secondPassActive ? <SecondPassArchiveSection /> : null}
      <ExpeditionObjectsSection />
      <FinalChapters secondPassActive={secondPassActive} onUnlockSecondPass={unlockSecondPass} onReturnToFirstPass={returnToFirstPass} />
    </main>
  );
}
