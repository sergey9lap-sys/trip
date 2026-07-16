"use client";

import { useEffect } from "react";

const hotspotSelector = [
  ".hidden-finding-hit",
  ".training-item",
  ".training-photo",
  ".discovery-photo",
  ".archive-mark",
  ".archive-prototype-hit",
  ".archive-milka-hit",
  ".rules-photo",
  ".rules-note-object",
  ".rules-globe",
  ".astrolabe3d__artifact",
  ".diary-project-hit",
  ".expedition-flute",
  ".record-player-hit",
  ".y6one-hit",
  ".mila-hit",
  ".camp-case",
  ".camp-stone",
  ".camp-map-symbol",
  ".sound-relic",
  ".boxing-memory-hit",
  ".family-photo-hit",
  ".trial-target",
  ".trial-barcelona-hit",
  ".author-project",
  ".author-3d-hit",
  ".system-core",
  ".system-readme",
  ".final-marker",
  ".hero-project-hit",
  ".hero-kazami-hit",
].join(",");

const baselineByElement = new WeakMap();
const referenceViewport = { width: 390, height: 844 };

function parseObjectPosition(value) {
  const parts = value.trim().split(/\s+/);
  const parse = (part, fallback) => {
    if (!part) return fallback;
    if (part === "left" || part === "top") return 0;
    if (part === "right" || part === "bottom") return 1;
    if (part === "center") return 0.5;
    if (part.endsWith("%")) return Number.parseFloat(part) / 100;
    return fallback;
  };
  return { x: parse(parts[0], 0.5), y: parse(parts[1], 0.5) };
}

function mediaBox(containerWidth, containerHeight, imageWidth, imageHeight, fit, position) {
  if (!imageWidth || !imageHeight || fit === "fill") {
    return { left: 0, top: 0, width: containerWidth, height: containerHeight };
  }

  const scale = fit === "contain"
    ? Math.min(containerWidth / imageWidth, containerHeight / imageHeight)
    : Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return {
    left: (containerWidth - width) * position.x,
    top: (containerHeight - height) * position.y,
    width,
    height,
  };
}

function readBaseline(element, section) {
  const width = section.clientWidth || 1;
  const height = section.clientHeight || 1;
  return {
    x: element.offsetLeft / width,
    y: element.offsetTop / height,
    width: element.offsetWidth / width,
    height: element.offsetHeight / height,
  };
}

function calibrateSection(section) {
  const image = section.querySelector(":scope > picture > img");
  if (!image?.naturalWidth || !section.clientWidth || !section.clientHeight) return;

  const imageStyle = window.getComputedStyle(image);
  const fit = imageStyle.objectFit === "contain" ? "contain" : imageStyle.objectFit === "fill" ? "fill" : "cover";
  const position = parseObjectPosition(imageStyle.objectPosition || "50% 50%");
  const baselineBox = mediaBox(
    referenceViewport.width,
    referenceViewport.height,
    image.naturalWidth,
    image.naturalHeight,
    fit,
    position,
  );
  const currentBox = mediaBox(
    section.clientWidth,
    section.clientHeight,
    image.naturalWidth,
    image.naturalHeight,
    fit,
    position,
  );

  section.querySelectorAll(hotspotSelector).forEach((element) => {
    let baseline = baselineByElement.get(element);
    if (!baseline) {
      baseline = readBaseline(element, section);
      baselineByElement.set(element, baseline);
    }

    const sourceX = (baseline.x * referenceViewport.width - baselineBox.left) / baselineBox.width;
    const sourceY = (baseline.y * referenceViewport.height - baselineBox.top) / baselineBox.height;
    const sourceWidth = baseline.width * referenceViewport.width / baselineBox.width;
    const sourceHeight = baseline.height * referenceViewport.height / baselineBox.height;
    const rawWidth = sourceWidth * currentBox.width;
    const rawHeight = sourceHeight * currentBox.height;
    const width = Math.max(48, rawWidth);
    const height = Math.max(48, rawHeight);
    const left = currentBox.left + sourceX * currentBox.width - (width - rawWidth) / 2;
    const top = currentBox.top + sourceY * currentBox.height - (height - rawHeight) / 2;

    element.style.setProperty("--calibrated-left", `${left}px`);
    element.style.setProperty("--calibrated-top", `${top}px`);
    element.style.setProperty("--calibrated-width", `${width}px`);
    element.style.setProperty("--calibrated-height", `${height}px`);
    element.dataset.mobileHotspotCalibrated = "true";
  });
}

export default function MobileHotspotCalibrator({ versionKey }) {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return undefined;

    let frame = 0;
    const calibrate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!window.matchMedia("(max-width: 760px)").matches) return;
        main.querySelectorAll(":scope > section, .second-pass-archive").forEach(calibrateSection);
      });
    };

    const resizeObserver = new ResizeObserver(calibrate);
    main.querySelectorAll(":scope > section, .second-pass-archive").forEach((section) => resizeObserver.observe(section));
    const mutationObserver = new MutationObserver(calibrate);
    mutationObserver.observe(main, { childList: true, subtree: true });
    const images = main.querySelectorAll(":scope > section > picture > img, .second-pass-archive > picture > img");
    images.forEach((image) => {
      image.addEventListener("load", calibrate);
    });
    window.visualViewport?.addEventListener("resize", calibrate);
    window.addEventListener("orientationchange", calibrate);
    calibrate();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      images.forEach((image) => image.removeEventListener("load", calibrate));
      window.visualViewport?.removeEventListener("resize", calibrate);
      window.removeEventListener("orientationchange", calibrate);
    };
  }, [versionKey]);

  return null;
}
