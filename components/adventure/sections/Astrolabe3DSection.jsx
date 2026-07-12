"use client";

import { useState } from "react";
import HiddenFinding from "@/components/adventure/HiddenFinding";
import ResponsiveScene from "@/components/adventure/ResponsiveScene";

export default function Astrolabe3DSection() {
  const [activated, setActivated] = useState(false);

  return (
    <section id="artifact" className={activated ? "astrolabe3d is-active" : "astrolabe3d"} aria-label="Механическая астролябия">
      <ResponsiveScene className="astrolabe3d__scene" src="/images/journey-05-astrolabe-chamber.png" />
      <div className="astrolabe3d__shade" aria-hidden="true" />

      <div className="astrolabe3d__paper-title">
        <h2>Кажется, вы не из тех, кто просто листает сайты.</h2>
        <p>Любопытство пока побеждает. Это хорошо.</p>
      </div>

      <button
        className="astrolabe3d__artifact astrolabe3d__artifact--bitmap"
        type="button"
        aria-label="Активировать механическую астролябию"
        onClick={() => setActivated(true)}
      />

      <p className={activated ? "astrolabe3d__response is-visible" : "astrolabe3d__response"}>
        Интересно.<br />Значит, вы всё-таки нажимаете.
      </p>
      <HiddenFinding className="finding--astrolabe-case" label="Проверить ящик под астролябией" title="Материалы и свет">Объём строится не количеством деталей, а разницей поверхностей: тусклая латунь, тёмное дерево, стекло и направленный цветной свет.</HiddenFinding>
    </section>
  );
}
