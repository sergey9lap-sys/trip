"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function TrainingLevelSection() {
  const [folderOpen, setFolderOpen] = useState(false);
  const [folderSeen, setFolderSeen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  return (
    <section id="first-rule" className="training-level" aria-label="Первое правило экспедиции">
      <ResponsiveScene
        className="training-level__scene"
        src="/images/journey-02-threshold.png"
        alt=""
        aria-hidden="true"
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
        className="training-photo"
        type="button"
        aria-label="Перевернуть фотографию"
        onClick={() => setPhotoOpen(true)}
      >
        <span className="training-photo__inner" aria-hidden="true"><span className="training-photo__front" /></span>
      </button>
      {folderSeen && !photoOpen ? (
        <div className="tutorial-callout tutorial-callout--photo" aria-hidden="true">
          <span className="tutorial-callout__text">Попробуйте ещё раз</span>
        </div>
      ) : null}
      {photoOpen && typeof document !== "undefined" ? createPortal(
        <div className="artifact-modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setPhotoOpen(false); }}>
        <div className="artifact-modal-shell">
        <aside className="training-photo-reveal" role="dialog" aria-modal="true" aria-label="Открытая фотография">
          <img src="/optimized/vintage-photo-back.avif" alt="Оборот найденной фотографии" />
          <div><strong>Видите?</strong><p>Второй раз уже проще.</p></div>
        </aside>
        <button className="artifact-modal-dismiss" type="button" aria-label="Закрыть фотографию" onPointerDown={(event) => { event.preventDefault(); event.stopPropagation(); setPhotoOpen(false); }} onTouchStart={(event) => { event.preventDefault(); event.stopPropagation(); setPhotoOpen(false); }}>×</button>
        </div>
        </div>, document.body
      ) : null}
      <HiddenFinding className="finding--training-lantern" label="Проверить старый фонарь" title="Заметка о первом действии">Первое действие специально сделано очевидным. Оно не проверяет внимательность — оно объясняет язык, на котором дальше разговаривает сайт.</HiddenFinding>

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
