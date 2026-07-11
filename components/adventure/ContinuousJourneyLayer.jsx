"use client";

import { useEffect, useRef } from "react";

export default function ContinuousJourneyLayer() {
  const root = useRef(null);
  const path = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.current?.style.setProperty("--route-progress", String(progress));
      if (path.current) path.current.style.strokeDashoffset = String(1 - progress);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="continuous-journey" aria-hidden="true">
      <div className="continuous-journey__atmosphere" />
      <svg viewBox="0 0 1000 13000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="continuousRoute" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FF5A57" />
            <stop offset="0.42" stopColor="#E02F75" />
            <stop offset="0.74" stopColor="#6700A3" />
            <stop offset="1" stopColor="#FCCBF0" />
          </linearGradient>
          <filter id="continuousGlow"><feGaussianBlur stdDeviation="2.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path className="continuous-journey__ghost" d="M835 0C760 410 886 760 742 1120S590 1810 710 2200S850 2920 690 3300S510 4040 650 4430S850 5180 700 5600S500 6330 640 6760S820 7490 650 7900S480 8620 610 9050S790 9780 620 10200S450 10900 590 11330S760 12110 540 13000" />
        <path ref={path} className="continuous-journey__route" pathLength="1" d="M835 0C760 410 886 760 742 1120S590 1810 710 2200S850 2920 690 3300S510 4040 650 4430S850 5180 700 5600S500 6330 640 6760S820 7490 650 7900S480 8620 610 9050S790 9780 620 10200S450 10900 590 11330S760 12110 540 13000" />
      </svg>
    </div>
  );
}
