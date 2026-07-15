export default function ResponsiveScene({ src, className, alt = "", priority = false, ...props }) {
  const file = src.split("/").pop() ?? "";
  const name = file.replace(/\.(png|jpe?g|webp|avif)$/i, "");
  const desktopScenes = {
    "journey-01-study-with-note": "/optimized/journey-01-study-with-note-text.png",
    "journey-06-funicular-diary-v2": "/optimized/journey-06-funicular-diary-v2-text.png",
    "hero-kazami-second-pass": "/optimized/hero-kazami-second-pass-text.png",
    "diary-barcelona-project": "/optimized/diary-barcelona-project-text.png",
    "compass-observatory": "/optimized/compass-observatory-with-compass.png",
    "compass-family-second-pass": "/optimized/compass-family-with-compass.png",
    "connected-chamber-readme-v2": "/optimized/connected-football-figures-v2.png",
    "trial-barcelona-second-pass-v2": "/optimized/trial-barcelona-second-pass-v2.avif",
  };
  const desktopSrc = desktopScenes[name] ?? `/optimized/${name}.avif`;
  const portraitScenes = {
    "journey-01-study-with-note": "/optimized/journey-01-study-with-note-text.mobile.png",
    "journey-02-threshold": "/optimized/journey-02-threshold.mobile.avif",
    "journey-03-archive-token-v3": "/optimized/journey-03-archive-token-v3.mobile.avif",
    "journey-04-stairhall": "/optimized/journey-04-stairhall.mobile.avif",
    "journey-05-astrolabe-chamber": "/optimized/journey-05-astrolabe-chamber.mobile.avif",
    "journey-06-funicular-diary-v2": "/optimized/journey-06-funicular-diary-v2.mobile.avif",
    "hero-kazami-second-pass": "/optimized/hero-kazami-second-pass-text.mobile.png",
    "diary-barcelona-project": "/optimized/diary-barcelona-project-text.mobile.png",
    "compass-observatory": "/optimized/compass-observatory-with-compass.mobile.png",
    "compass-family-second-pass": "/optimized/compass-family-with-compass.mobile.png",
    "connected-chamber-readme-v2": "/optimized/connected-football-figures-v2.mobile.png",
    "trial-barcelona-second-pass-v2": "/optimized/trial-barcelona-second-pass-v2.mobile.avif",
  };
  portraitScenes["journey-06-funicular-diary-v2"] = "/optimized/journey-06-funicular-diary-v2-text.mobile.png";
  const mobileSrc = portraitScenes[name] ?? `/optimized/${name}.mobile.avif`;

  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={mobileSrc} />
      <source srcSet={desktopSrc} />
      <img
        className={className}
        src={desktopSrc}
        alt={alt}
        aria-hidden={alt ? undefined : "true"}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        {...props}
      />
    </picture>
  );
}
