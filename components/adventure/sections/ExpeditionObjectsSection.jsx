"use client";

import { useEffect, useRef, useState } from "react";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

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
      <ResponsiveScene className="expedition-objects__scene" src="/images/journey-07-departure-station.png" />
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
      <HiddenFinding className="finding--objects-instrument" label="Осмотреть измерительный инструмент" title="Перед запуском">Проверить мобильную композицию, скорость первого экрана, доступность кнопок, обработку ошибок, метрики и понятный следующий шаг.</HiddenFinding>
    </section>
  );
}
