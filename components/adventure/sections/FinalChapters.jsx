"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CompassExperience = dynamic(() => import("@/components/adventure/CompassExperience"), {
  ssr: false,
  loading: () => <span className="compass-loader">Инструмент настраивается…</span>,
});

function Scene({ src }) {
  return <img className="late-scene" src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" />;
}

function SoundRelic({ src, label, className }) {
  const [playing, setPlaying] = useState(false);
  const play = (event) => {
    const audio = event.currentTarget.nextElementSibling;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 1900);
  };
  return (
    <>
      <button className={`sound-relic ${className} ${playing ? "is-playing" : ""}`} type="button" aria-label={label} onClick={play}>
      </button>
      <audio src={src} preload="none" />
    </>
  );
}

export function ExplorerSection({ choice, onChoose, secondPassActive }) {
  const locked = Boolean(choice);
  const [memoryLit, setMemoryLit] = useState(false);
  return (
    <section id="explorer" className={`late-section explorer-section ${choice ? `has-choice choice-${choice}` : ""}`} aria-label="Выбор направления">
      <Scene src={secondPassActive ? "/images/explorer-boxing-second-pass.png" : "/images/explorer-camp-with-guitar.png"} />
      <div className="late-shade" aria-hidden="true" />
      <div className="late-copy late-copy--right">
        <span className="late-kicker">Глава VIII</span>
        <h2>До этого момента всё было подготовлено.</h2>
        <p>А вот то, что произойдёт дальше,<br />уже зависит от вашего решения.</p>
      </div>
      <button className="camp-case" type="button" aria-label="Выбрать артефакт" disabled={locked && choice !== "artifact"} onClick={() => onChoose("artifact")} />
      <button className="camp-stone" type="button" aria-label="Выбрать камень" disabled={locked && choice !== "stone"} onClick={() => onChoose("stone")} />
      <button className="camp-map-symbol" type="button" aria-label="Выбрать символ на карте" disabled={locked && choice !== "map"} onClick={() => onChoose("map")} />
      <SoundRelic className="sound-relic--guitar" src="/audio/guitar.mp3" label="Коснуться струн походной гитары" />
      {secondPassActive ? <button className="boxing-memory-hit" type="button" aria-label="Коснуться старых боксёрских перчаток" onClick={() => setMemoryLit(true)} /> : null}
      {memoryLit ? <span className="boxing-memory-light" aria-hidden="true" /> : null}
    </section>
  );
}

export function CompassSection({ signalFound, secondPassActive }) {
  const [loaded, setLoaded] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);
  const sectionRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: "240px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} id="compass" className="late-section compass-section" aria-label="Инструмент исследователя">
      <Scene src={secondPassActive ? "/images/compass-family-second-pass.png" : "/images/compass-observatory.png"} />
      <div className="late-shade" aria-hidden="true" />
      <div className="late-copy late-copy--left compact-copy">
        <span className="late-kicker">Глава IX</span>
        <h2>Похоже, вам действительно интересно, что будет дальше.</h2>
        <p>До этого места обычно доходят немногие.</p>
      </div>
      {!loaded ? (
        <button className="compass-awaken" type="button" onClick={() => setLoaded(true)}>
          Разбудить компас
        </button>
      ) : nearViewport ? (
        <div className="compass-canvas" aria-label="Интерактивный трёхмерный компас">
          <CompassExperience awakened={signalFound} />
        </div>
      ) : null}
      {secondPassActive ? <button className="family-photo-hit" type="button" aria-label="Рассмотреть семейную фотографию" onClick={() => setFamilyOpen(true)} /> : null}
      {familyOpen ? <aside className="family-photo-reveal"><img src="/images/family-reference.jpg" alt="Семейная фотография" /><button className="artifact-close" type="button" aria-label="Закрыть фотографию" onClick={() => setFamilyOpen(false)}>×</button></aside> : null}
    </section>
  );
}

export function TrialSection({ onComplete, completed, secondPassActive }) {
  const [marks, setMarks] = useState(() => new Set());
  const [lastMark, setLastMark] = useState(null);
  const [barcelonaOpen, setBarcelonaOpen] = useState(false);
  const [crossing, setCrossing] = useState(0);
  const find = (mark) => {
    const next = new Set(marks).add(mark);
    setMarks(next);
    setLastMark(mark);
    if (next.size === 3) {
      onComplete();
      if (!secondPassActive && crossing === 0) {
        setCrossing(1);
        window.setTimeout(() => setCrossing(2), 1100);
        window.setTimeout(() => setCrossing(3), 2350);
        window.setTimeout(() => document.getElementById("author")?.scrollIntoView({ behavior: "smooth" }), 4300);
      }
    }
  };
  return (
    <section id="trial" className={`late-section trial-section ${completed ? "is-solved" : ""} ${lastMark ? `found-${lastMark}` : ""}`} aria-label="Тихое испытание">
      <Scene src={secondPassActive ? "/images/trial-barcelona-second-pass.png" : "/images/silent-trial-with-sax.png"} />
      {!secondPassActive ? <div className={`bridge-cinematic step-${crossing}`} aria-hidden="true"><img src="/images/bridge-awakened.png" alt="" /><img src="/images/bridge-crossing.png" alt="" /><img src="/images/bridge-arrival.png" alt="" /></div> : null}
      <div className="late-shade" aria-hidden="true" />
      <div className="trial-copy">
        <span className="late-kicker">Глава X</span>
        <h2>{completed ? "Проход открылся." : "Дальше — без подсказок."}</h2>
      </div>
      <button className="trial-target trial-target--stone" type="button" aria-label="Осмотреть камень" onClick={() => find("stone")} />
      <button className="trial-target trial-target--lever" type="button" aria-label="Проверить механизм" onClick={() => find("lever")} />
      <button className="trial-target trial-target--route" type="button" aria-label="Проследить линию" onClick={() => find("route")} />
      <SoundRelic className="sound-relic--sax" src="/audio/sax.mp3" label="Услышать далёкий саксофон" />
      <div className="trial-reward" aria-live="polite">Тишина тоже умеет отвечать.</div>
      <p className={lastMark ? "trial-action-note is-visible" : "trial-action-note"} aria-live="polite">
        {lastMark === "stone" ? "Камень зажёг одну точку маршрута." : null}
        {lastMark === "lever" ? "Рычаг изменил свет у выхода." : null}
        {lastMark === "route" ? "Столбик сохранил найденную отметку." : null}
      </p>
      {secondPassActive ? <button className="trial-barcelona-hit" type="button" aria-label="Открыть записку с эмблемой" onClick={() => setBarcelonaOpen(true)} /> : null}
      <aside className={barcelonaOpen ? "barcelona-note is-visible" : "barcelona-note"} aria-hidden={!barcelonaOpen}>
        <img src="/images/vintage-photo-back.png" alt="" aria-hidden="true" />
        <div><img src="/images/barcelona-vintage.png" alt="Эмблема Барселоны" /><strong>soon…</strong><button className="artifact-close" type="button" aria-label="Закрыть записку" onClick={() => setBarcelonaOpen(false)}>×</button></div>
      </aside>
    </section>
  );
}

export function AuthorSection({ secondPassActive }) {
  const [open, setOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [teaserOpen, setTeaserOpen] = useState(false);
  return (
    <section id="author" className={open ? "late-section author-section is-open" : "late-section author-section"} aria-label="Следы автора">
      <Scene src={secondPassActive ? "/images/author-3d-teaser-second-pass.png" : "/images/author-archive-lpsflow-v3.png"} />
      <div className="late-shade" aria-hidden="true" />
      <div className="late-copy late-copy--right">
        <span className="late-kicker">Глава XI</span>
        <h2>Если честно…</h2>
        <p>Всё это начиналось как обычное портфолио.<br /><br />Но в какой-то момент мне стало интересно сделать сайт, который хочется исследовать.<br /><br />Поэтому среди этих материалов постепенно начинают появляться настоящие проекты.</p>
      </div>
      <button className="archive-film" type="button" aria-label="Проявить скрытый черновик" onClick={() => setOpen(true)} />
      <SoundRelic className="sound-relic--violin" src="/audio/violin.mp3" label="Коснуться старой записи скрипки" />
      <aside className="author-draft" data-placeholder="code-snippet-placeholder" aria-hidden={!open}>
        <img src="/images/vintage-photo-back.png" alt="" aria-hidden="true" />
        <div>
        <button className="artifact-close" type="button" aria-label="Закрыть заметку" onClick={() => setOpen(false)}>×</button>
        <span>Заметка автора · версия 04</span>
        <strong>Сначала здесь была просто красивая анимация.</strong>
        <p>Потом стало понятно: красота без последствия ничего не меняет.</p>
        <pre aria-label="Фрагмент кода">{`const detail = noticed\n  ? revealNextLayer()\n  : keepWatching();`}</pre>
        </div>
      </aside>
      <button
        className={projectOpen ? "author-project is-open" : "author-project"}
        data-placeholder="commercial-project-placeholder"
        type="button"
        aria-label="Открыть найденный проект"
        onClick={() => setProjectOpen((value) => !value)}
      >
        <span className="sr-only">Один из проектов</span>
      </button>
      <aside className={projectOpen ? "author-project-reveal is-visible" : "author-project-reveal"} aria-hidden={!projectOpen}>
        <img src="/images/lpsflow-project.png" alt="Главный экран сайта lpsflow.ru" />
        <button className="artifact-close" type="button" aria-label="Закрыть проект" onClick={() => setProjectOpen(false)}>×</button>
        <div><small>Реальный проект.</small><strong>Сайт-портфолио LPS Flow</strong><a href="https://lpsflow.ru" target="_blank" rel="noreferrer">Перейти на сайт →</a></div>
      </aside>
      {secondPassActive ? <button className="author-3d-hit" type="button" aria-label="Открыть анонс будущих 3D-видео" onClick={() => setTeaserOpen(true)} /> : null}
      <aside className={teaserOpen ? "author-3d-reveal is-visible" : "author-3d-reveal"} aria-hidden={!teaserOpen}>
        <img src="/images/3д.jpg" alt="Сергей внутри интерактивного мира сайта" />
        <div><button className="artifact-close" type="button" aria-label="Закрыть анонс" onClick={() => setTeaserOpen(false)}>×</button><strong>Скоро.</strong><p>Видео о том, как я погружаюсь внутрь созданных сайтов.</p></div>
      </aside>
    </section>
  );
}

export function ConnectedSection({ secondPassActive, onUnlockSecondPass }) {
  return (
    <section id="connected" className={secondPassActive ? "late-section connected-section is-connected" : "late-section connected-section"} aria-label="Второй слой">
      <Scene src="/images/connected-chamber-readme-v2.png" />
      <div className="late-shade" aria-hidden="true" />
      <div className="late-copy late-copy--left compact-copy">
        <span className="late-kicker">Глава XII</span>
        <h2>Кажется…</h2>
        <p>До этого места доходят редко.<br /><br />Но самое интересное не здесь.<br /><br />Оно уже осталось позади.</p>
      </div>
      <button className="system-core" type="button" aria-label="Открыть второй слой сайта" onClick={onUnlockSecondPass} />
      <SoundRelic className="sound-relic--piano" src="/audio/piano.mp3" label="Активировать фрагмент мелодии" />
      <div className="system-pulse" aria-hidden="true" />
    </section>
  );
}

export function FinaleSection() {
  const [letterOpen, setLetterOpen] = useState(false);
  return (
    <section id="finale" className={letterOpen ? "late-section finale-section is-letter-open" : "late-section finale-section"} aria-label="Финал путешествия">
      <Scene src="/images/quiet-finale-letter-v2.png" />
      <div className="late-shade" aria-hidden="true" />
      <div className="finale-copy">
        <span className="late-kicker">Глава XIII</span>
        <h2>Вы уверены, что изучили всё внимательно?</h2>
        <p>Если честно…<br /><br />Я не знаю, сколько секретов вы нашли.<br /><br />Но пока вы их искали, вы успели познакомиться со мной намного лучше,<br />чем если бы просто посмотрели обычное портфолио.</p>
        <a className="finale-cta" href="https://t.me/lp_sergey" target="_blank" rel="noreferrer">Написать в Telegram</a>
        <small className="finale-note">Если дошли до этого места —<br />думаю, нам будет интересно поработать вместе.</small>
      </div>
      <button className="final-marker" type="button" aria-label="Открыть последнее письмо" onClick={() => setLetterOpen(true)} />
      <aside className="final-letter" aria-hidden={!letterOpen}>
        <img src="/images/final-letter-open.png" alt="" aria-hidden="true" />
        <div>
        <button className="artifact-close" type="button" aria-label="Закрыть письмо" onClick={() => setLetterOpen(false)}>×</button>
        <p>Спасибо, что дошли до конца.</p>
        <p>Бонус за внимательность напишите мне кодовое слово <strong>«Сайт»</strong>, получите скидку на первый проект.</p>
        <a href="https://t.me/lp_sergey" target="_blank" rel="noreferrer">Написать в Telegram</a>
        </div>
      </aside>
    </section>
  );
}

export default function FinalChapters({ secondPassActive, onUnlockSecondPass }) {
  const [choice, setChoice] = useState(null);
  const [trialComplete, setTrialComplete] = useState(false);
  return (
    <>
      <ExplorerSection secondPassActive={secondPassActive} choice={choice} onChoose={(nextChoice) => setChoice((current) => current ?? nextChoice)} />
      <CompassSection secondPassActive={secondPassActive} signalFound={Boolean(choice)} />
      <TrialSection secondPassActive={secondPassActive} completed={trialComplete} onComplete={() => setTrialComplete(true)} />
      <AuthorSection secondPassActive={secondPassActive} />
      <ConnectedSection secondPassActive={secondPassActive} onUnlockSecondPass={onUnlockSecondPass} />
      <FinaleSection />
    </>
  );
}
