"use client";

import { useEffect, useRef, useState } from "react";

export default function ExpeditionObjectsSection() {
  const audioRef = useRef(null);
  const resetTimer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => window.clearTimeout(resetTimer.current);
  }, []);

  const playFlute = () => {
    setIsPlaying(false);
    window.clearTimeout(resetTimer.current);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    requestAnimationFrame(() => setIsPlaying(true));
    resetTimer.current = window.setTimeout(() => setIsPlaying(false), 1800);
  };

  return (
    <section id="findings" className="expedition-objects" aria-label="Находки экспедиции">
      <img className="expedition-objects__scene" src="/images/journey-07-departure-station.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="expedition-objects__shade" aria-hidden="true" />
      <div className="expedition-objects__light" aria-hidden="true" />

      <div className="expedition-objects__copy">
        <h2>Кажется, мои подсказки вам уже не нужны.</h2>
        <p>
          Сначала вы нажимали туда, куда я показывал.
          <br /><br />
          Теперь проверяете всё подряд сами.
          <br /><br />
          Именно это мне и было интересно увидеть.
        </p>
      </div>

      <button
        className={isPlaying ? "expedition-flute is-playing" : "expedition-flute"}
        type="button"
        onClick={playFlute}
        aria-label="Сыграть на деревянной флейте"
      >
        <span className="expedition-flute__glow" aria-hidden="true" />
      </button>
      <audio ref={audioRef} src="/audio/flute.mp3" preload="none" />
    </section>
  );
}
