"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CENTER = { x: 535, y: 315 };
const ASTROLABE_COLOR = "#6700A3";

const RINGS = [
  { rx: 52, ry: 35 },
  { rx: 86, ry: 58 },
  { rx: 126, ry: 84 },
  { rx: 168, ry: 112 },
  { rx: 214, ry: 142 },
  { rx: 258, ry: 172 },
  { rx: 304, ry: 202 },
];

const ORBITS = [
  { rx: 318, ry: 90, rotate: -24 },
  { rx: 308, ry: 116, rotate: 18 },
  { rx: 286, ry: 162, rotate: -46 },
  { rx: 282, ry: 156, rotate: 42 },
];

const POINTS = [
  { x: 196, y: 482, r: 8 },
  { x: 274, y: 396, r: 6 },
  { x: 345, y: 302, r: 7 },
  { x: 438, y: 248, r: 6 },
  { x: 535, y: 315, r: 9 },
  { x: 612, y: 248, r: 7 },
  { x: 724, y: 214, r: 7 },
  { x: 812, y: 270, r: 6 },
  { x: 774, y: 404, r: 8 },
  { x: 658, y: 466, r: 7 },
  { x: 525, y: 505, r: 8 },
  { x: 392, y: 452, r: 6 },
  { x: 265, y: 526, r: 7 },
  { x: 850, y: 512, r: 6 },
];

const NETWORK_ROUTES = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [1, 11, 4, 8],
  [2, 5, 7],
  [0, 10, 13],
  [3, 9, 12],
];

const CENTER_LINKS = [2, 3, 5, 8, 10, 11];

function routePoints(route: number[]) {
  return route.map((index) => `${POINTS[index].x},${POINTS[index].y}`).join(" ");
}

export default function AstrolabeOverlay() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeRouteRef = useRef<SVGPathElement | null>(null);
  const activePointRef = useRef<SVGCircleElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const drawables = gsap.utils.toArray<SVGGeometryElement>(".astro-draw");

      drawables.forEach((element) => {
        const length = element.getTotalLength();
        gsap.set(element, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      gsap.set(".astro-soft", { opacity: 0 });
      gsap.set(".astro-node", { opacity: 0, scale: 0.45, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(".astro-soft", { opacity: 1, duration: 1.8, stagger: 0.08 }, 0.25)
        .to(".astro-ring", { strokeDashoffset: 0, opacity: 1, duration: 2.4, stagger: 0.08 }, 0.55)
        .to(".astro-orbit", { strokeDashoffset: 0, opacity: 1, duration: 2.4, stagger: 0.1 }, 0.9)
        .to(".astro-route", { strokeDashoffset: 0, opacity: 1, duration: 2.6, stagger: 0.1 }, 1.35)
        .to(".astro-spoke", { strokeDashoffset: 0, opacity: 0.7, duration: 1.5, stagger: 0.04 }, 1.7)
        .to(".astro-node", { opacity: 1, scale: 1, duration: 0.62, stagger: 0.08 }, 2.25);
    }, root);

    return () => ctx.revert();
  }, []);

  function activatePoint() {
    setActive(true);

    const route = activeRouteRef.current;

    if (route) {
      const length = route.getTotalLength();
      gsap.fromTo(
        route,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" },
      );
    }

    if (activePointRef.current) {
      gsap.to(activePointRef.current, { opacity: 1, duration: 0.25 });
    }
  }

  return (
    <div ref={rootRef} className={active ? "astrolabe-layer is-active" : "astrolabe-layer"}>
      <svg className="astrolabe-svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet" aria-label="Навигационная астролябия">
        <defs>
          <radialGradient id="astroCore" cx="50%" cy="50%" r="55%">
            <stop offset="0" stopColor={ASTROLABE_COLOR} stopOpacity="0.2" />
            <stop offset="0.54" stopColor={ASTROLABE_COLOR} stopOpacity="0.11" />
            <stop offset="1" stopColor={ASTROLABE_COLOR} stopOpacity="0" />
          </radialGradient>

          <linearGradient id="astroRoute" x1="150" y1="520" x2="850" y2="200">
            <stop offset="0" stopColor="#FF5A57" />
            <stop offset="0.38" stopColor="#E02F75" />
            <stop offset="0.7" stopColor="#6700A3" />
            <stop offset="1" stopColor="#FCCBF0" />
          </linearGradient>

          <filter id="astroGlow" x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0.4 0 0 0 0.12  0 0.02 0 0 0  0 0 0.76 0 0.46  0 0 0 0.54 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse className="astro-soft" cx={CENTER.x} cy={CENTER.y} rx="365" ry="238" fill="url(#astroCore)" />

        <g className="astro-construction" filter="url(#astroGlow)">
          {RINGS.map((ring) => (
            <ellipse
              key={`${ring.rx}-${ring.ry}`}
              className="astro-draw astro-ring"
              cx={CENTER.x}
              cy={CENTER.y}
              rx={ring.rx}
              ry={ring.ry}
            />
          ))}

          {ORBITS.map((orbit) => (
            <ellipse
              key={`${orbit.rx}-${orbit.ry}-${orbit.rotate}`}
              className="astro-draw astro-orbit"
              cx={CENTER.x}
              cy={CENTER.y}
              rx={orbit.rx}
              ry={orbit.ry}
              transform={`rotate(${orbit.rotate} ${CENTER.x} ${CENTER.y})`}
            />
          ))}

          {NETWORK_ROUTES.map((route) => (
            <polyline key={route.join("-")} className="astro-draw astro-route astro-network" points={routePoints(route)} />
          ))}

          {CENTER_LINKS.map((index) => (
            <line
              key={`center-${index}`}
              className="astro-draw astro-route astro-spoke"
              x1={CENTER.x}
              y1={CENTER.y}
              x2={POINTS[index].x}
              y2={POINTS[index].y}
            />
          ))}

          <path
            ref={activeRouteRef}
            className="astro-draw astro-route astro-active-route"
            d="M724 214L812 270L774 404"
          />

          <circle className="astro-node astro-center-node" cx={CENTER.x} cy={CENTER.y} r="12" />

          {POINTS.map((point, index) => {
            const isInteractive = index === 6;

            return (
              <circle
                key={`${point.x}-${point.y}`}
                ref={isInteractive ? activePointRef : undefined}
                className={isInteractive ? "astro-node astro-point astro-point-main" : "astro-node astro-point"}
                cx={point.x}
                cy={point.y}
                r={point.r}
                role={isInteractive ? "button" : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                aria-label={isInteractive ? "Открыть первую скрытую линию маршрута" : undefined}
                onClick={isInteractive ? activatePoint : undefined}
                onKeyDown={
                  isInteractive
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") activatePoint();
                      }
                    : undefined
                }
                onMouseEnter={
                  isInteractive
                    ? () => {
                        if (activePointRef.current) {
                          gsap.to(activePointRef.current, { opacity: 1, duration: 0.2 });
                        }
                      }
                    : undefined
                }
                onMouseLeave={
                  isInteractive
                    ? () => {
                        if (activePointRef.current) {
                          gsap.to(activePointRef.current, { opacity: active ? 1 : 0.9, duration: 0.2 });
                        }
                      }
                    : undefined
                }
              />
            );
          })}
        </g>

        <text className="astro-discovery" x="742" y="186">
          Хорошее начало.
        </text>
      </svg>
    </div>
  );
}
