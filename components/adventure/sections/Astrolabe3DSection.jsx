"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AstrolabeExperience = dynamic(() => import("@/components/adventure/AstrolabeExperience"), {
  ssr: false,
  loading: () => null,
});

export default function Astrolabe3DSection() {
  const sectionRef = useRef(null);
  const artifactRef = useRef(null);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [activated, setActivated] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldLoad3D(entry.isIntersecting);
      },
      { rootMargin: "260px 0px" },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event) {
    const artifact = artifactRef.current;

    if (!artifact) {
      return;
    }

    const rect = artifact.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    artifact.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    artifact.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
  }

  function handlePointerLeave() {
    const artifact = artifactRef.current;

    if (!artifact) {
      return;
    }

    artifact.style.setProperty("--tilt-x", "0deg");
    artifact.style.setProperty("--tilt-y", "0deg");
  }

  function activateArtifact() {
    setActivated(true);
    setPulseKey((key) => key + 1);
  }

  return (
    <section id="artifact" ref={sectionRef} className="astrolabe3d" aria-label="Первый объёмный артефакт">
      <img className="astrolabe3d__scene" src="/images/journey-05-astrolabe-chamber.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="astrolabe3d__shade" aria-hidden="true" />

      <div className="astrolabe3d__paper-title">
        <h2>Кажется, вы не из тех, кто просто листает сайты.</h2>
        <p>Любопытство пока побеждает. Это хорошо.</p>
      </div>

      <button
        ref={artifactRef}
        className={activated ? "astrolabe3d__artifact is-active" : "astrolabe3d__artifact"}
        type="button"
        aria-label="Активировать 3D астролябию"
        onClick={activateArtifact}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <span className="astrolabe3d__shadow" aria-hidden="true" />
        <span className="astrolabe3d__spline-shell">
          {shouldLoad3D ? (
            <AstrolabeExperience active={activated} />
          ) : (
            <span className="astrolabe3d-fallback" aria-hidden="true">
              <svg className="astrolabe3d-fallback__svg" viewBox="0 0 520 520">
                <defs>
                  <radialGradient id="astrolabeCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#FCCBF0" stopOpacity="0.9" />
                    <stop offset="0.35" stopColor="#E02F75" stopOpacity="0.58" />
                    <stop offset="1" stopColor="#6700A3" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g className="fallback-ring fallback-ring--outer">
                  <ellipse cx="260" cy="260" rx="214" ry="72" />
                  <ellipse cx="260" cy="260" rx="214" ry="72" transform="rotate(58 260 260)" />
                </g>
                <g className="fallback-ring fallback-ring--middle">
                  <ellipse cx="260" cy="260" rx="172" ry="172" />
                  <ellipse cx="260" cy="260" rx="172" ry="54" transform="rotate(-34 260 260)" />
                </g>
                <g className="fallback-ring fallback-ring--inner">
                  <ellipse cx="260" cy="260" rx="112" ry="112" />
                  <ellipse cx="260" cy="260" rx="108" ry="34" transform="rotate(32 260 260)" />
                </g>
                <path className="fallback-line" d="M128 300L208 220L260 260L334 174L402 244" />
                <circle className="fallback-core" cx="260" cy="260" r="54" fill="url(#astrolabeCoreGlow)" />
                <circle className="fallback-core-dot" cx="260" cy="260" r="13" />
                <circle className="fallback-point" cx="128" cy="300" r="6" />
                <circle className="fallback-point" cx="208" cy="220" r="5" />
                <circle className="fallback-point" cx="334" cy="174" r="5" />
                <circle className="fallback-point" cx="402" cy="244" r="6" />
                <circle className="fallback-symbol" cx="260" cy="96" r="4" />
                <circle className="fallback-symbol" cx="260" cy="424" r="4" />
              </svg>
            </span>
          )}
        </span>
      </button>

      <p key={pulseKey} className={activated ? "astrolabe3d__response is-visible" : "astrolabe3d__response"}>
        Интересно.<br />Значит, вы всё-таки нажимаете.
      </p>
    </section>
  );
}
