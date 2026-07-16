"use client";

import { useState } from "react";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function DiaryInterludeSection({ secondPassActive = false }) {
  const [noticed, setNoticed] = useState(false);
  const [projectFound, setProjectFound] = useState(false);

  return (
    <section id="diary" className="diary-interlude" aria-label="Страница дневника">
      <ResponsiveScene className="diary-interlude__scene" src={secondPassActive ? "/images/diary-barcelona-project.png" : "/images/journey-06-funicular-diary-v2.png"} />
      <div className="diary-interlude__shade" aria-hidden="true" />

      <div className="diary-interlude__page diary-interlude__page--left" aria-hidden="true" />
      <div className="diary-interlude__page diary-interlude__page--right" aria-hidden="true" />
      <div className="diary-interlude__pencil-breath" aria-hidden="true" />

      <article className="diary-entry">
        <h2>Из заметок</h2>
        <p>
          День 131.
          <br />
          Теперь я точно знаю: интереснее всего создавать сайты, которые не выдают всё сразу. Они оставляют место для собственного открытия.
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
            <img src="/optimized/барса проект.avif" alt="Интерфейс проекта Барса сегодня" />
            <button className="artifact-close" type="button" aria-label="Закрыть фотографию проекта" onClick={() => setProjectFound(false)}>×</button>
          </aside>
        </>
      ) : null}
      <HiddenFinding className="finding--diary-lantern" label="Осмотреть основание фонаря" title="Личная заметка" secondPassActive={secondPassActive} secondTitle="Заметка после возвращения">Интерактив имеет смысл только тогда, когда после действия что-то меняется: состояние, понимание, маршрут или отношение к автору.</HiddenFinding>
    </section>
  );
}
