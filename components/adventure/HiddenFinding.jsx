"use client";

import { useEffect, useRef, useState } from "react";
import { findingMaterials } from "@/components/adventure/findingContent";

const fallbackCategories = {
  "finding--hero-globe": "СТРУКТУРА", "finding--training-lantern": "ПРОЦЕСС", "finding--discovery-lamp": "ДО И ПОСЛЕ",
  "finding--rules-scroll": "UX", "finding--astrolabe-case": "ТЕХНОЛОГИИ", "finding--diary-lantern": "ЛИЧНОЕ",
  "finding--objects-instrument": "ПОЛЕЗНЫЙ ФАЙЛ", "finding--explorer-binoculars": "ИССЛЕДОВАНИЕ", "finding--compass-dome": "АНОНС",
  "finding--trial-vessel": "ЧЕРНОВИК", "finding--author-right-cabinet": "АРХИТЕКТУРА", "finding--connected-card": "ДОКУМЕНТАЦИЯ",
  "finding--final-compass": "НАЧАЛО РАБОТЫ", "finding--listening-envelope": "БУДУЩИЙ РЕЛИЗ",
};

export function FindingContent({ content, fallback }) {
  if (!content) return <p>{fallback}</p>;
  return <>
    {content.amount ? <strong className="finding-note__amount">{content.amount}</strong> : null}
    {content.paragraphs?.map((text, index) => <p key={`p-${index}`}>{text}</p>)}
    {content.route ? <p className="finding-note__route">{content.route}</p> : null}
    {content.afterRoute?.map((text, index) => <p key={`ar-${index}`}>{text}</p>)}
    {content.callout ? <p className="finding-note__callout">{content.callout}</p> : null}
    {content.afterCallout?.map((text, index) => <p key={`ac-${index}`}>{text}</p>)}
    {content.questions ? <div className="finding-note__questions">{content.questions.map(([question, explanation]) => <section key={question}><strong>{question}</strong><p>{explanation}</p></section>)}</div> : null}
    {content.afterQuestions?.map((text, index) => <p key={`aq-${index}`}>{text}</p>)}
    {content.steps ? <ol className="finding-note__steps">{content.steps.map((item) => <li key={item}>{item}</li>)}</ol> : null}
    {content.afterSteps?.map((text, index) => <p key={`as-${index}`}>{text}</p>)}
    {content.list ? <ul className="finding-note__list">{content.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
    {content.checklist ? <ul className="finding-note__checklist">{content.checklist.map((item) => <li key={item}>{item}</li>)}</ul> : null}
    {content.afterList?.map((text, index) => <p key={`al-${index}`}>{text}</p>)}
    {content.sections?.map((section) => <section className="finding-note__section" key={section.title}><h4>{section.title}</h4>{section.paragraphs?.map((text) => <p key={text}>{text}</p>)}{section.amount ? <strong className="finding-note__section-amount">{section.amount}</strong> : null}{section.list ? <ul className="finding-note__list">{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}</section>)}
    {content.conclusionBeforeCode && content.conclusion ? <p className="finding-note__conclusion">{content.conclusion}</p> : null}
    {content.code ? <div className="finding-note__code"><small>{content.codeLabel ?? "Кодовое слово:"}</small><strong>{content.code}</strong></div> : null}
    {content.conclusionLines ? <div className="finding-note__conclusion">{content.conclusionLines.map((text) => <p key={text}>{text}</p>)}</div> : null}
    {!content.conclusionBeforeCode && content.conclusion ? <p className="finding-note__conclusion">{content.conclusion}</p> : null}
    {content.status ? <p className="finding-note__status">{content.status}</p> : null}
    {content.footnote ? <small className="finding-note__footnote">{content.footnote}</small> : null}
  </>;
}

export default function HiddenFinding({ className, label, title, children, secondPassActive = false, secondTitle }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const content = findingMaterials[className];
  const resolvedTitle = content?.title ?? (secondPassActive && secondTitle ? secondTitle : title);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event) => { if (event.key === "Escape") close(); };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); window.setTimeout(() => triggerRef.current?.focus(), 0); };
  }, [open]);

  const reveal = (event) => {
    const sectionId = event.currentTarget.closest("section")?.id ?? "threshold";
    const detail = { id: className, title: resolvedTitle, category: content?.category ?? fallbackCategories[className] ?? "МАТЕРИАЛ", sectionId };
    let stored = {};
    try {
      stored = JSON.parse(window.localStorage.getItem("tripFoundMaterials") ?? "{}") || {};
      window.localStorage.setItem("tripFoundMaterials", JSON.stringify({ ...stored, [className]: detail }));
    } catch {
      // Private browsing and an old malformed archive must not block the note itself.
    }
    window.dispatchEvent(new CustomEvent("trip:finding", { detail }));
    setOpen(true);
  };

  return <>
    <button ref={triggerRef} className={`hidden-finding-hit ${className}`} type="button" aria-label={label} onPointerUp={reveal} />
    {open ? <div className="finding-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <aside className="hidden-finding-note" role="dialog" aria-modal="true" aria-label={resolvedTitle}>
        <img src="/optimized/vintage-photo-back.avif" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="hidden-finding-note__scroll">
          <button ref={closeRef} className="artifact-close" type="button" aria-label="Закрыть находку" onClick={close}>×</button>
          <small className="finding-note__label">{content?.category ?? fallbackCategories[className] ?? "НАЙДЕННЫЙ МАТЕРИАЛ"}</small>
          <h3>{resolvedTitle}</h3>
          <FindingContent content={content} fallback={children} />
        </div>
      </aside>
    </div> : null}
  </>;
}
