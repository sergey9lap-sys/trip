"use client";

import { useEffect, useState } from "react";

const total = 14;

export default function FoundArchive() {
  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setMaterials(Object.values(JSON.parse(window.localStorage.getItem("tripFoundMaterials") ?? "{}")));
      } catch {
        setMaterials([]);
      }
    };
    read();
    window.addEventListener("trip:finding", read);
    return () => window.removeEventListener("trip:finding", read);
  }, []);

  const goTo = (sectionId) => {
    setOpen(false);
    window.setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section || window.matchMedia("(max-width: 760px)").matches) return;
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      section.scrollIntoView({ behavior: mobile ? "auto" : "smooth", block: "start" });
    }, 80);
  };

  return <>
    <button className="found-archive-trigger" type="button" onClick={() => setOpen(true)} aria-label={`Открыть архив находок: ${materials.length} из ${total}`}>
      <span>Архив</span><strong>{materials.length}/{total}</strong>
    </button>
    {open ? <aside className="found-archive" role="dialog" aria-modal="true" aria-label="Архив найденных материалов">
      <button className="artifact-close" type="button" aria-label="Закрыть архив" onClick={() => setOpen(false)}>×</button>
      <small>Личный архив посетителя</small>
      <h2>Найдено {materials.length} из {total}</h2>
      <p>{materials.length ? "Все найденные материалы сохраняются в этом браузере." : "Пока здесь пусто. Проверяйте предметы, которые выглядят слишком обычными."}</p>
      <ol>
        {materials.map((material) => <li key={material.id}><button type="button" onClick={() => goTo(material.sectionId)}><span>{material.category}</span><strong>{material.title}</strong><small>Вернуться к главе →</small></button></li>)}
      </ol>
    </aside> : null}
  </>;
}
