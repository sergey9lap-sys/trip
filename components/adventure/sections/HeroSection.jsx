"use client";

import { useState } from "react";

export default function HeroSection({ secondPassActive = false }) {
  const [artifactOpen, setArtifactOpen] = useState(false);
  const [kazamiFound, setKazamiFound] = useState(false);
  return (
    <section id="threshold" className="hero" aria-label="Порог экспедиции">
      <img
        className="hero-scene"
        src={secondPassActive ? "/images/hero-kazami-second-pass.png" : "/images/journey-01-study-with-note.png"}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-shadow" aria-hidden="true" />
      <div className="hero-light" aria-hidden="true" />

      <div className="hero-copy">
        <h1>
          Вы уверены,
          <br />
          что смотрите
          <br />
          достаточно
          <br />
          внимательно?
        </h1>
      </div>

      <div className="hero-note" aria-label="Записка на столе">
        А что если
        <br />
        самое интересное
        <br />
        находится
        <br />
        в другом месте?
        <span className="hero-note-arrow" aria-hidden="true">
          ↓
        </span>
      </div>
      {secondPassActive ? (
        <>
          {/* Replace this hit area with a real project file when it is ready. */}
          <button className="hero-project-hit" type="button" aria-label="Открыть найденный контактный лист" onClick={() => setArtifactOpen((value) => !value)} />
          <button className="hero-kazami-hit" type="button" aria-label="Осмотреть знак KaZaMI" onClick={() => setKazamiFound((value) => !value)} />
          <p className={artifactOpen ? "second-pass-caption hero-project-caption is-visible" : "second-pass-caption hero-project-caption"}>Контактный лист проекта. Сюда можно поставить реальные первые варианты.</p>
          <p className={kazamiFound ? "second-pass-caption hero-kazami-caption is-visible" : "second-pass-caption hero-kazami-caption"}>Имя для работ, которые ещё впереди.</p>
        </>
      ) : null}
    </section>
  );
}
