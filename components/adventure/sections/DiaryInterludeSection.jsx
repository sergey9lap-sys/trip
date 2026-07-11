"use client";

import { useState } from "react";

export default function DiaryInterludeSection({ secondPassActive = false }) {
  const [noticed, setNoticed] = useState(false);
  const [projectFound, setProjectFound] = useState(false);

  return (
    <section id="diary" className="diary-interlude" aria-label="Страница дневника">
      <img className="diary-interlude__scene" src={secondPassActive ? "/images/diary-barcelona-project.png" : "/images/journey-06-funicular-diary-v2.png"} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="diary-interlude__shade" aria-hidden="true" />

      <div className="diary-interlude__page diary-interlude__page--left" aria-hidden="true" />
      <div className="diary-interlude__page diary-interlude__page--right" aria-hidden="true" />
      <div className="diary-interlude__pencil-breath" aria-hidden="true" />

      <article className="diary-entry">
        <h2>Из заметок</h2>
        <p>
          День 131.
          <br />
          Кажется, я наконец понял: интереснее всего создавать сайты, которые не выдают всё сразу. Они оставляют место для собственного открытия.
        </p>
      </article>

      <button
        className={noticed ? "diary-margin-note is-found" : "diary-margin-note"}
        type="button"
        aria-label="Заметить пометку на полях"
        onClick={() => setNoticed(true)}
      >
        Не забыть проверить,
        <br />
        замечают ли люди мелочи.
      </button>

      <p className={noticed ? "diary-found-note is-visible" : "diary-found-note"}>Значит, вы всё-таки заметили.</p>
      {secondPassActive ? (
        <>
          <button className="diary-project-hit" type="button" aria-label="Открыть проект Barcelona" onClick={() => setProjectFound(true)} />
          <aside className={projectFound ? "diary-project-reveal is-visible" : "diary-project-reveal"} aria-hidden={!projectFound}>
            <img src="/images/барса проект.jpg" alt="Интерфейс проекта Барса сегодня" />
            <button className="artifact-close" type="button" aria-label="Закрыть фотографию проекта" onClick={() => setProjectFound(false)}>×</button>
          </aside>
        </>
      ) : null}
    </section>
  );
}
