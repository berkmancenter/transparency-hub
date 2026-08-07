'use client';
import { useLayoutEffect, useRef, useState } from "react";

const MAX_FONT_SIZE = 40;
const MIN_FONT_SIZE = 20;
const FONT_STEP = 2;
const LINE_HEIGHT = 1.1;
// A wrapped (2+ line) title is at least this many times taller than a single line.
const WRAP_HEIGHT_RATIO = 1.5;

export default function PlatformTitle({ platformName }: { platformName: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(MAX_FONT_SIZE);

  // The title is allowed to wrap — this just shrinks it while wrapped, so a
  // long platform name still takes up as little vertical space as possible.
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const fit = () => {
      let size = MAX_FONT_SIZE;
      el.style.fontSize = `${size}px`;
      while (size > MIN_FONT_SIZE && el.scrollHeight > size * LINE_HEIGHT * WRAP_HEIGHT_RATIO) {
        size -= FONT_STEP;
        el.style.fontSize = `${size}px`;
      }
      setFontSize(size);
    };

    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [platformName]);

  return (
    <h1
      ref={titleRef}
      style={{ fontSize: `${fontSize}px`, lineHeight: LINE_HEIGHT }}
      className="w-full font-black tracking-tight text-white"
    >
      {platformName}
    </h1>
  );
}
