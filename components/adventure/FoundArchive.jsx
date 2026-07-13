"use client";

import { useEffect, useState } from "react";
import { findingMaterials } from "@/components/adventure/findingContent";

const total = 14;

export default function FoundArchive() {
  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const stored = Object.values(JSON.parse(window.localStorage.getItem("tripFoundMaterials") ?? "{}"));
        setMaterials(stored.map((material) => ({ ...material, ...(findingMaterials[material.id] ?? {}) })));
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

  const returnToSecondBeginning = () => {
    setOpen(false);
    window.setTimeout(() => document.getElementById("threshold")?.scrollIntoView({ behavior: window.matchMedia("(max-width: 760px)").matches ? "auto" : "smooth" }), 80);
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
      {materials.length >= 10 ? <section className="archive-reward archive-reward--ten">
        <small>Открыто за 10 материалов</small>
        <h3>Пакет запуска · 20 000 ₽</h3>
        <p>Предварительная структура, сценарий сайта, идея первого экрана и направление визуальной концепции. При полноценном заказе номинал выбранного бонуса вычитается из стоимости проекта.</p>
      </section> : null}
      {materials.length >= 14 ? <section className="archive-reward archive-reward--complete">
        <small>Полный архив · 14 из 14</small>
        <h3>Сертификат · 30 000 ₽</h3>
        <p>Архив собран полностью. Сертификат можно использовать при заказе сайта вместо другого найденного денежного бонуса.</p>
        <div className="archive-zero-clue">
          <strong>Запись без номера</strong>
          <p>Все материалы найдены. Но архив хранит только то, что можно положить на полку. Одна деталь всё это время оставалась не материалом, а подписью. Иногда, чтобы увидеть конец маршрута, нужно вернуться туда, где он начался во второй раз.</p>
          <button type="button" onClick={returnToSecondBeginning}>Вернуться к началу</button>
        </div>
      </section> : null}
      {materials.length ? <p className="archive-terms">Для одного проекта можно применить один найденный денежный бонус. При полноценном заказе его номинал вычитается из стоимости проекта.</p> : null}
    </aside> : null}
  </>;
}
