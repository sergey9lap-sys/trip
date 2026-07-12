"use client";

import { useEffect, useState } from "react";

const baseChapters = [
  { id: "threshold", label: "Порог" },
  { id: "first-rule", label: "Первое правило" },
  { id: "discovery", label: "Наблюдение" },
  { id: "rules", label: "Правила" },
  { id: "artifact", label: "Артефакт" },
  { id: "diary", label: "Дневник" },
  { id: "findings", label: "Находки" },
  { id: "explorer", label: "Лагерь" },
  { id: "compass", label: "Инструмент" },
  { id: "trial", label: "Испытание" },
  { id: "author", label: "Следы автора" },
  { id: "connected", label: "Система" },
  { id: "finale", label: "Граница" },
];

export default function JourneyTracker({ secondPassActive = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapters = secondPassActive
    ? [...baseChapters.slice(0, 6), { id: "listening-archive", label: "Скрытая запись" }, ...baseChapters.slice(6)]
    : baseChapters;

  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    document.documentElement.classList.add("journey-ready");
    if (window.localStorage.getItem("secondJourneyUnlocked") === "true") {
      document.documentElement.classList.add("second-journey", "second-pass-active");
      document.body.classList.add("second-pass-active");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-current-view", entry.isIntersecting);
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-in-view");
          const index = sections.indexOf(entry.target);
          if (index >= 0) setActiveIndex(index);
        });
      },
      { rootMargin: "-34% 0px -52%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove("is-current-view"));
      document.documentElement.classList.remove("journey-ready");
    };
  }, [secondPassActive]);

  const progress = chapters.length > 1 ? activeIndex / (chapters.length - 1) : 0;
  const goToChapter = (id) => {
    if (window.matchMedia("(max-width: 760px)").matches) return;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: mobile ? "auto" : "smooth" });
  };

  return (
    <nav
      className="journey-tracker"
      aria-label="Маршрут экспедиции"
      style={{ "--journey-progress": progress }}
    >
      <p className="journey-tracker__eyebrow">Экспедиция</p>
      <p className="journey-tracker__current" aria-live="polite">
        {chapters[activeIndex].label}
      </p>
      <div className="journey-tracker__route" aria-hidden="true">
        <span className="journey-tracker__progress" />
      </div>
      <ol className="journey-tracker__steps">
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <button
              className={index === activeIndex ? "is-current" : index < activeIndex ? "is-passed" : ""}
              type="button"
              aria-label={`${index + 1}. ${chapter.label}`}
              aria-current={index === activeIndex ? "step" : undefined}
              onClick={() => goToChapter(chapter.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="journey-tracker__count">
        {String(activeIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
      </p>
    </nav>
  );
}
