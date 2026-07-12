"use client";

import { useEffect, useRef, useState } from "react";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function SecondPassArchiveSection() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [milaOpen, setMilaOpen] = useState(false);

  useEffect(() => () => window.clearTimeout(Number(audioRef.current?.dataset?.timer)), []);

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
      <audio ref={audioRef} src="/audio/Diamonds.mp3" preload="none" />
      <a className="y6one-hit" href="https://t.me/officialchannelY6ONE" target="_blank" rel="noreferrer" aria-label="Открыть Telegram-канал Y6ONE" />

      <button className="mila-hit" type="button" aria-label="Познакомиться с Милой" onClick={() => setMilaOpen(true)} />

      <aside className={milaOpen ? "mila-note is-visible" : "mila-note"} aria-hidden={!milaOpen}>
        <img src="/optimized/vintage-photo-back.avif" alt="" aria-hidden="true" />
        <div>
          <button className="artifact-close" type="button" aria-label="Закрыть записку Милы" onClick={() => setMilaOpen(false)}>×</button>
          <h3>Привет, меня зовут Мила.</h3>
          <p>Я здесь слежу, чтобы Сергей не забывал о главном.</p>
          <p>А у вас есть влажный корм? 😋<br />Ой, простите. О чём это я…</p>
          <p>Ах да. Напишите Сергею кодовое слово <strong>«Мила»</strong> — получите мой личный стикерпак в Telegram и одну персональную интерактивную деталь для вашего сайта в подарок.</p>
          <a href="https://t.me/lp_sergey" target="_blank" rel="noreferrer">Написать «Мила»</a>
        </div>
      </aside>
      <HiddenFinding className="finding--listening-envelope" label="Проверить запечатанный конверт" title="Будущий релиз">Этот конверт зарезервирован для следующего совместного релиза. Когда материал будет готов, находка получит звук и дату.</HiddenFinding>
    </section>
  );
}
