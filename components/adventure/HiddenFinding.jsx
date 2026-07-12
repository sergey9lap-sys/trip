"use client";

import { useState } from "react";

const categories = {
  "finding--hero-globe": "Структура",
  "finding--training-lantern": "Процесс",
  "finding--discovery-lamp": "До и после",
  "finding--rules-scroll": "UX",
  "finding--astrolabe-case": "Технологии",
  "finding--diary-lantern": "Личное",
  "finding--objects-instrument": "Полезный файл",
  "finding--explorer-binoculars": "Исследование",
  "finding--compass-dome": "Анонс",
  "finding--trial-vessel": "Черновик",
  "finding--author-right-cabinet": "Архитектура",
  "finding--connected-card": "Документация",
  "finding--final-compass": "Начало работы",
  "finding--listening-envelope": "Будущий релиз",
};

export default function HiddenFinding({ className, label, title, children, secondPassActive = false, secondTitle }) {
  const [open, setOpen] = useState(false);
  const reveal = (event) => {
    const resolvedTitle = secondPassActive && secondTitle ? secondTitle : title;
    const sectionId = event.currentTarget.closest("section")?.id ?? "threshold";
    const detail = { id: className, title: resolvedTitle, category: categories[className] ?? "Материал", sectionId };
    const stored = JSON.parse(window.localStorage.getItem("tripFoundMaterials") ?? "{}");
    window.localStorage.setItem("tripFoundMaterials", JSON.stringify({ ...stored, [className]: detail }));
    window.dispatchEvent(new CustomEvent("trip:finding", { detail }));
    setOpen(true);
  };
  return <>
    <button className={`hidden-finding-hit ${className}`} type="button" aria-label={label} onClick={reveal} />
    {open ? <aside className="hidden-finding-note" role="dialog" aria-modal="true">
      <img src="/optimized/vintage-photo-back.avif" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div><button className="artifact-close" type="button" aria-label="Закрыть находку" onClick={() => setOpen(false)}>×</button><small>{categories[className] ?? "Найденный материал"}</small><h3>{secondPassActive && secondTitle ? secondTitle : title}</h3><p>{children}</p></div>
    </aside> : null}
  </>;
}
