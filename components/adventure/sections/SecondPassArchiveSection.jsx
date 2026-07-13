"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HiddenFinding, { FindingContent } from "@/components/adventure/HiddenFinding";
import { milaBonus } from "@/components/adventure/findingContent";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function SecondPassArchiveSection() {
  const audioRef = useRef(null);
  const milaTriggerRef = useRef(null);
  const milaCloseRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [milaOpen, setMilaOpen] = useState(false);

  useEffect(() => () => window.clearTimeout(Number(audioRef.current?.dataset?.timer)), []);
  useEffect(() => {
    if (!milaOpen) return;
    milaCloseRef.current?.focus();
    const onKeyDown = (event) => { if (event.key === "Escape") setMilaOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); window.setTimeout(() => milaTriggerRef.current?.focus(), 0); };
  }, [milaOpen]);

  const playRecord = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlaying(true);
    window.clearTimeout(Number(audio.dataset.timer));
    const timer = window.setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }, 10000);
    audio.dataset.timer = String(timer);
  };

  return (
    <section id="listening-archive" className={playing ? "second-pass-archive is-playing" : "second-pass-archive"} aria-label="Скрытая комната второго маршрута">
      <ResponsiveScene className="second-pass-archive__scene" src="/images/listening-y6one-second-pass.png" />
      <div className="second-pass-archive__shade" aria-hidden="true" />
      <div className="second-pass-archive__copy">
        <span>Найдено после возвращения</span>
        <h2>Некоторые вещи появляются не сразу.</h2>
        <p>Эта кассета здесь не случайно.</p>
      </div>

      <button className="record-player-hit" type="button" aria-label="Запустить кассету на десять секунд" onClick={playRecord} />
      <audio ref={audioRef} src="/audio/Clone%20Me%20Y61%20Pattern.mp3" preload="none" />
      <a className="y6one-hit" href="https://t.me/officialchannelY6ONE" target="_blank" rel="noreferrer" aria-label="Открыть Telegram-канал Y6ONE" />

      <button ref={milaTriggerRef} className="mila-hit" type="button" aria-label="Познакомиться с Милой" onClick={() => setMilaOpen(true)} />

      {milaOpen && typeof document !== "undefined" ? createPortal(<div className="finding-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setMilaOpen(false); }}>
        <aside className="mila-note is-visible" role="dialog" aria-modal="true" aria-label="Привет, меня зовут Мила.">
          <img src="/optimized/vintage-photo-back.avif" alt="" aria-hidden="true" />
          <div className="mila-note__scroll">
            <button ref={milaCloseRef} className="artifact-close" type="button" aria-label="Закрыть записку Милы" onClick={() => setMilaOpen(false)}>×</button>
            <small className="finding-note__label">{milaBonus.label}</small>
            <h3>{milaBonus.title}</h3>
            <FindingContent content={milaBonus} />
            <a href="https://t.me/lp_sergey" target="_blank" rel="noreferrer">Написать «Мила»</a>
          </div>
        </aside>
      </div>, document.body) : null}
      <HiddenFinding className="finding--listening-envelope" label="Проверить запечатанный конверт" title="Будущий релиз">Этот конверт зарезервирован для следующего совместного релиза. Когда материал будет готов, находка получит звук и дату.</HiddenFinding>
    </section>
  );
}
