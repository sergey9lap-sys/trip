"use client";

import { useState } from "react";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function RulesLevelSection() {
  const [photoFlipped, setPhotoFlipped] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [routePoint, setRoutePoint] = useState(false);

  return (
    <section id="rules" className="rules-level" aria-label="Правила экспедиции">
      <ResponsiveScene className="rules-level__scene" src="/images/journey-04-stairhall.png" />
      {routePoint ? <ResponsiveScene className="rules-level__scene rules-level__scene--alternate is-visible" src="/images/stairhall-reconfigured.png" /> : null}
      <div className="rules-level__shade" aria-hidden="true" />

      <div className="rules-level__title-paper">
        <h2>Кажется, вы начинаете понимать правила.</h2>
      </div>

      <div className="rules-pencil" aria-hidden="true" />
      <div className="rules-map-piece" aria-hidden="true" />

      <button
        className={photoFlipped ? "rules-photo is-flipped" : "rules-photo"}
        type="button"
        aria-label="Перевернуть фотографию"
        onClick={() => setPhotoFlipped(true)}
      >
        <span aria-hidden="true" />
      </button>

      <button
        className={noteOpen ? "rules-note-object is-open" : "rules-note-object"}
        type="button"
        aria-label="Развернуть записку"
        onClick={() => setNoteOpen(true)}
      >
        <span aria-hidden="true" />
      </button>
      {photoFlipped ? <p className="rules-reward rules-reward--photo">Любопытство уже работает быстрее инструкции.</p> : null}
      {noteOpen ? <p className="rules-reward rules-reward--note">Дальше — внимательнее.</p> : null}
      <button
        className={routePoint ? "rules-globe is-active" : "rules-globe"}
        type="button"
        aria-label="Проверить круглый механизм у лестницы"
        onClick={() => setRoutePoint((value) => !value)}
      />
      <span className={routePoint ? "rules-route-point is-visible" : "rules-route-point"} aria-hidden="true" />
      <p className={routePoint ? "hall-shift-note is-visible" : "hall-shift-note"}>Дверь осталась на месте. Зал — нет.</p>
      <HiddenFinding className="finding--rules-scroll" label="Развернуть план на перилах" title="Схема переходов">Каждая следующая глава уменьшает количество прямых инструкций. Интерфейс постепенно передаёт управление посетителю.</HiddenFinding>
    </section>
  );
}
