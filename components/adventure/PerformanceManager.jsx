"use client";

import { useEffect } from "react";

export default function PerformanceManager() {
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)");
    const lockMobileViewport = () => {
      if (!mobile.matches) {
        document.documentElement.style.removeProperty("--mobile-scene-height");
        return;
      }
      document.documentElement.style.setProperty("--mobile-scene-height", `${window.innerHeight}px`);
    };
    const sync = () => {
      const hidden = document.hidden;
      document.documentElement.classList.toggle("page-hidden", hidden);
      if (hidden) document.querySelectorAll("audio, video").forEach((media) => media.pause());
    };
    sync();
    lockMobileViewport();
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("orientationchange", lockMobileViewport);
    mobile.addEventListener("change", lockMobileViewport);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("orientationchange", lockMobileViewport);
      mobile.removeEventListener("change", lockMobileViewport);
    };
  }, []);
  return null;
}
