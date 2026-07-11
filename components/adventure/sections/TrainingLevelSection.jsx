"use client";

import { useState } from "react";

export default function TrainingLevelSection() {
  const [folderOpen, setFolderOpen] = useState(false);
  const [folderSeen, setFolderSeen] = useState(false);
  const [photoFlipped, setPhotoFlipped] = useState(false);

  return (
    <section id="first-rule" className="training-level" aria-label="Первое правило экспедиции">
      <img
        className="training-level__scene"
        src="/images/journey-02-threshold.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="training-level__shade" aria-hidden="true" />

      <div className="training-level__intro">
        <h2>Начнём с простого.</h2>
        <p>Попробуйте сделать то, что я попрошу.</p>
      </div>

      <button
        className={folderOpen ? "training-item training-item--folder is-open" : "training-item training-item--folder"}
        type="button"
        aria-label="Открыть папку"
        onClick={() => {
          setFolderSeen(true);
          setFolderOpen(true);
        }}
      >
        <span className="training-item__glow" aria-hidden="true" />
      </button>

      <div className="tutorial-callout tutorial-callout--folder" aria-hidden="true">
        <span className="tutorial-callout__text">Нажмите сюда</span>
      </div>

      <button
        className={photoFlipped ? "training-photo is-flipped" : "training-photo"}
        type="button"
        aria-label="Перевернуть фотографию"
        onClick={() => setPhotoFlipped(true)}
      >
        <span className="training-photo__inner" aria-hidden="true">
          <span className="training-photo__front" />
          <span className="training-photo__back">
            <img src="/images/vintage-photo-back.png" alt="" />
            <span>Видите?<br />Второй раз уже проще.</span>
          </span>
        </span>
      </button>
      {folderSeen && !photoFlipped ? (
        <div className="tutorial-callout tutorial-callout--photo" aria-hidden="true">
          <span className="tutorial-callout__text">Попробуйте ещё раз</span>
        </div>
      ) : null}

      {folderOpen ? (
        <div className="training-note" role="dialog" aria-modal="true" aria-label="Открытая записка">
          <button className="training-note__close artifact-close" type="button" aria-label="Закрыть записку" onClick={() => setFolderOpen(false)}>
            ×
          </button>
          <p>
            Отлично.
            <br />
            Теперь вы знаете первое правило:
            <br />
            здесь не всё нужно просто смотреть.
          </p>
        </div>
      ) : null}
    </section>
  );
}
