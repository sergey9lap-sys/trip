export default function ResponsiveScene({ src, className, alt = "", priority = false, ...props }) {
  const file = src.split("/").pop() ?? "";
  const name = file.replace(/\.(png|jpe?g|webp|avif)$/i, "");
  const desktopSrc = `/optimized/${name}.avif`;
  const portraitScenes = {
    "journey-01-study-with-note": "/optimized/journey-01-study-with-note.mobile.avif",
    "journey-02-threshold": "/optimized/journey-02-threshold.mobile.avif",
    "journey-03-archive-token-v3": "/optimized/journey-03-archive-token-v3.mobile.avif",
    "journey-04-stairhall": "/optimized/journey-04-stairhall.mobile.avif",
    "journey-05-astrolabe-chamber": "/optimized/journey-05-astrolabe-chamber.mobile.avif",
    "journey-06-funicular-diary-v2": "/optimized/journey-06-funicular-diary-v2.mobile.avif",
  };
  const mobileSrc = portraitScenes[name] ?? `/optimized/${name}.mobile.avif`;

  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={mobileSrc} type="image/avif" />
      <source srcSet={desktopSrc} type="image/avif" />
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
