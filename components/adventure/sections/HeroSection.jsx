"use client";

import { useEffect, useState } from "react";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function HeroSection({ secondPassActive = false }) {
  const [foundCount, setFoundCount] = useState(0);
  const [zeroOpen, setZeroOpen] = useState(false);
  useEffect(() => {
    const read = () => {
      try { setFoundCount(Object.keys(JSON.parse(window.localStorage.getItem("tripFoundMaterials") ?? "{}")).length); }
      catch { setFoundCount(0); }
    };
    read();
    window.addEventListener("trip:finding", read);
    return () => window.removeEventListener("trip:finding", read);
  }, []);
  return (
    <section id="threshold" className="hero" aria-label="Порог экспедиции">
      <ResponsiveScene
        className="hero-scene"
        src={secondPassActive ? "/images/hero-kazami-second-pass.png" : "/images/journey-01-study-with-note.png"}
        alt=""
        aria-hidden="true"
        priority
      />
      <div className="hero-shadow" aria-hidden="true" />
      <div className="hero-light" aria-hidden="true" />

      <div className="hero-copy">
        <h1>
          Вы уверены,
          <br />
          что смотрите
          <br />
          достаточно
          <br />
          внимательно?
        </h1>
      </div>

      <div className="hero-note" aria-label="Записка на столе">
        А что если
        <br />
        самое интересное
        <br />
        находится
        <br />
        в другом месте?
        <span className="hero-note-arrow" aria-hidden="true">
          ↓
        </span>
      </div>
      {secondPassActive ? (
        <>
          {foundCount >= 14 ? <button className="hero-kazami-hit is-zero-ready" type="button" aria-label="Осмотреть знак KaZaMI" onClick={() => setZeroOpen(true)} /> : null}
        </>
      ) : null}
      {zeroOpen ? <aside className="zero-coordinate" role="dialog" aria-modal="true" aria-label="Нулевая координата">
        <button className="artifact-close" type="button" aria-label="Закрыть Нулевую координату" onClick={() => setZeroOpen(false)}>×</button>
        <small>Секретная награда · один экземпляр</small>
        <h2>Нулевая координата</h2>
        <p>Вы нашли то, чего нет в архиве. Первый человек, который активирует эту координату и напишет мне, получит разработку одного лендинга бесплатно.</p>
        <strong>1 бесплатный сайт</strong>
        <ul><li>до 10 смысловых блоков;</li><li>адаптация для компьютера и телефона;</li><li>базовые анимации;</li><li>форма заявки или переход в мессенджер;</li><li>две итерации корректировок.</li></ul>
        <a className="zero-coordinate-link" href="https://t.me/lp_sergey?text=%D0%AF%20%D0%BD%D0%B0%D1%88%D1%91%D0%BB%20%D0%9D%D1%83%D0%BB%D0%B5%D0%B2%D1%83%D1%8E%20%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B0%D1%82%D1%83%20KaZaMI.%20%D0%9A%D0%BE%D0%B4%3A%20KAZAMI-00" target="_blank" rel="noreferrer">Активировать координату</a>
        <small className="zero-coordinate__terms">Награда достаётся первому участнику, который пришлёт код и скриншот полного архива. Не включает интернет-магазин, личный кабинет, платные сервисы, домен, хостинг и производство материалов.</small>
      </aside> : null}
      <HiddenFinding className="finding--hero-globe" label="Осмотреть символ на верхней карте" title="Черновик маршрута">Сначала появился не визуал, а последовательность: научить нажимать, перестать подсказывать, дать выбор и только потом показать автора.</HiddenFinding>
    </section>
  );
}
