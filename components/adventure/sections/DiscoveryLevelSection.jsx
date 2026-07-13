"use client";

import { useState } from "react";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function DiscoveryLevelSection({ secondPassActive = false }) {
  const [flipped, setFlipped] = useState(false);
  const [markFound, setMarkFound] = useState(false);
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  const [milkaFound, setMilkaFound] = useState(false);

  return (
    <section id="discovery" className="discovery-level" aria-label="Самостоятельное наблюдение">
      <ResponsiveScene
        className="discovery-level__scene"
        src={secondPassActive ? "/images/archive-milka-second-pass.png" : "/images/journey-03-archive-token-v3.png"}
        alt=""
        aria-hidden="true"
      />
      <div className="discovery-level__shade" aria-hidden="true" />

      <div className="discovery-level__intro">
        <h2>Попробуйте найти следующий элемент самостоятельно.</h2>
      </div>

      <button
        className={flipped ? "discovery-photo is-flipped" : "discovery-photo"}
        type="button"
        aria-label="Перевернуть найденную фотографию"
        onClick={() => setFlipped(true)}
      >
        <span className="discovery-photo__surface" aria-hidden="true" />
      </button>
      <button
        className={markFound ? "archive-mark is-found" : "archive-mark"}
        data-placeholder="note-placeholder"
        type="button"
        aria-label="Проверить маленькую архивную метку"
        onClick={() => setMarkFound(true)}
      >
        <span aria-hidden="true" />
      </button>
      {flipped ? <p className="discovery-reward">В этот раз подсказка не понадобилась.</p> : null}
      {secondPassActive ? (
        <>
          {/* Replace the drawer bundle with real wireframes, source files or project notes. */}
          <button className="archive-prototype-hit" type="button" aria-label="Проверить открывшийся ящик" onClick={() => setPrototypeOpen((value) => !value)} />
          <button className="archive-milka-hit" type="button" aria-label="Найти экспедиционный запас" onClick={() => setMilkaFound((value) => !value)} />
          <p className={prototypeOpen ? "second-pass-caption archive-prototype-caption is-visible" : "second-pass-caption archive-prototype-caption"}>Ранние материалы проекта. Здесь могут лежать структура, вайрфрейм и технические заметки.</p>
          <p className={milkaFound ? "second-pass-caption archive-milka-caption is-visible" : "second-pass-caption archive-milka-caption"}>Стратегический запас на случай долгой разработки.</p>
        </>
      ) : null}
      <HiddenFinding className="finding--discovery-lamp" label="Осмотреть лампу у архива" title="Решение из ранней версии" secondPassActive={secondPassActive} secondTitle="Исправление, которое осталось незаметным">Раньше фотографию показывала стрелка. Потом стрелку убрали: если человек уже понял правило, лучше позволить ему применить его самостоятельно.</HiddenFinding>
      <HiddenFinding className="finding--trial-vessel" label="Проверить папку в открытом ящике" title="Маршрут">За этой дверью начинается следующий участок маршрута.</HiddenFinding>
    </section>
  );
}
