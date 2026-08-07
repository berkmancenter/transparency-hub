'use client';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SITE_URL = "https://hub.transparency.berkmancenter.org";

const SIZE_OPTIONS = [
  { label: "Small", width: 500 },
  { label: "Medium", width: 650 },
  { label: "Large", width: 800 },
] as const;

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to legacy method
    }
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

export default function ShareMenu({ platformName }: { platformName: string }) {
  const [embedOpen, setEmbedOpen] = useState(false);
  const [embedWidth, setEmbedWidth] = useState<number>(800);
  const [showCode, setShowCode] = useState(false);
  const [status, setStatus] = useState<{ scope: "link" | "embed"; message: string } | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const embedButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const statusTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const canonicalUrl = `${SITE_URL}/policy_index/${encodeURIComponent(platformName)}`;
  // The copyable snippet always targets the real production domain, since that's
  // where the embed will actually be loaded from once pasted into another site.
  const embedSrc = `${SITE_URL}/widget/${encodeURIComponent(platformName)}`;
  const embedCode = `<iframe src="${embedSrc}" width="${embedWidth}" height="190" style={{ border: "none", display: "block" }} title="${platformName} Transparency Hub widget" loading="lazy"></iframe>`;
  // The live preview, on the other hand, should reflect whatever host is actually serving
  // this page — the /widget route isn't deployed to the production domain yet.
  const previewSrc = embedOpen
    ? `${typeof window !== "undefined" ? window.location.origin : SITE_URL}/widget/${encodeURIComponent(platformName)}`
    : "";

  const announce = (scope: "link" | "embed", message: string) => {
    setStatus({ scope, message });
    clearTimeout(statusTimeout.current);
    statusTimeout.current = setTimeout(() => setStatus(null), 2500);
  };

  useEffect(() => () => clearTimeout(statusTimeout.current), []);

  const closeEmbedModal = () => {
    setEmbedOpen(false);
    embedButtonRef.current?.focus();
  };

  // Trap focus, lock scroll, and support Escape while the embed dialog is open.
  useEffect(() => {
    if (!embedOpen) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeEmbedModal();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [embedOpen]);

  const handleCopyLink = async () => {
    const success = await copyText(canonicalUrl);
    announce("link", success ? "Link copied to clipboard" : "Couldn't copy the link — please copy it manually");
  };

  const handleCopyEmbedCode = async () => {
    const success = await copyText(embedCode);
    announce("embed", success ? "Embed code copied to clipboard" : "Couldn't copy the embed code — please copy it manually");
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-[8px] border-1 border-[#FFFFFF] px-3 py-2 ASML_Text !text-[14px]/[20px] hover:bg-orchid-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <img className="w-[16px] h-[16px]" src="/link.svg" alt="" aria-hidden="true" />
          {status?.scope === "link" ? "Copied!" : "Copy Link"}
        </button>

        <button
          ref={embedButtonRef}
          type="button"
          onClick={() => setEmbedOpen(true)}
          aria-haspopup="dialog"
          className="flex items-center gap-2 rounded-[8px] border-1 border-[#FFFFFF] px-3 py-2 ASML_Text !text-[14px]/[20px] hover:bg-orchid-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="font-bold" aria-hidden="true">{"</>"}</span>
          Embed Page
        </button>
      </div>

      <p aria-live="polite" className="sr-only">{status?.message}</p>

      {embedOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 top-[60px] sm:top-[114px] z-50 flex items-start justify-center overflow-y-auto bg-black/45 p-4 pt-8 sm:pt-14"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeEmbedModal();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="embed-modal-title"
            style={{ maxWidth: `${embedWidth + 48}px` }}
            className="w-[calc(100vw-2rem)] max-h-[80vh] overflow-y-auto rounded-2xl bg-[#141414] border-1 border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(0,0,0,0.85)] p-6 flex flex-col gap-5"
          >
            <div className="flex shrink-0 items-center justify-between gap-4">
              <h2 id="embed-modal-title" className="ASML_Heading !text-[24px]/[32px] !font-bold">
                Embed page
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeEmbedModal}
                aria-label="Close embed dialog"
                className="shrink-0 p-2 rounded-[8px] hover:bg-[#FFFFFF1A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <img className="w-[14px] h-[14px]" src="/close.svg" alt="" aria-hidden="true" />
              </button>
            </div>

            <p className="shrink-0 ASML_Text !text-[14px]/[20px] !text-[#CCCCCC]">
              Paste this snippet into your site to embed a live summary of {platformName}&apos;s policy archive.
            </p>

            <div className="flex shrink-0 flex-col gap-2">
              <span id="embed-size-label" className="ASML_Text !text-[14px]/[20px] uppercase !text-[#888888]">
                Size
              </span>
              <div role="radiogroup" aria-labelledby="embed-size-label" className="flex gap-2">
                {SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.width}
                    type="button"
                    role="radio"
                    aria-checked={embedWidth === option.width}
                    onClick={() => setEmbedWidth(option.width)}
                    className={`flex-1 rounded-[8px] border-1 px-3 py-2 ASML_Text !text-[13px]/[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      embedWidth === option.width
                        ? "border-white bg-orchid-600"
                        : "border-[#AAAAAA] hover:bg-[#FFFFFF1A]"
                    }`}
                  >
                    {option.label}
                    <span className="block !text-[11px] !text-[#AAAAAA]">{option.width}px</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="shrink-0 md:overflow-x-hidden overflow-x-auto overflow-y-hidden">
              <iframe
                src={previewSrc}
                width={embedWidth}
                height={190}
                style={{ border: "none", display: "block" }}
                title={`${platformName} Transparency Hub widget preview`}
                loading="lazy"
              />
            </div>
            <p className="shrink-0 ASML_Text !text-[13px]/[18px] !text-[#CCCCCC]">
              By embedding a Transparency Hub widget, you are agreeing to our{" "}
              <Link href="/legal/terms" className="underline">
                Terms of Use
              </Link>
              .
            </p>

            <div className="flex shrink-0 items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showCode}
                  onChange={(e) => setShowCode(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border-1 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white ${
                    showCode ? "border-orchid-600 bg-orchid-600" : "border-[#AAAAAA] bg-transparent"
                  }`}
                >
                  {showCode && (
                    <svg viewBox="0 0 16 16" className="h-[11px] w-[11px]" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 8.5L6.5 12L13 4.5" />
                    </svg>
                  )}
                </span>
                <span className="ASML_Text !text-[14px]/[20px]">View code</span>
              </label>

              <button
                type="button"
                onClick={handleCopyEmbedCode}
                className="shrink-0 rounded-[8px] border-1 border-[#FFFFFF] bg-[#FFFFFF1A] px-3 py-2 ASML_Text !text-[14px]/[20px] hover:bg-orchid-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {status?.scope === "embed" ? "Copied!" : "Copy"}
              </button>
            </div>

            {showCode && (
              <div className="flex flex-col gap-2">
                <label htmlFor="embed-code" className="ASML_Text !text-[14px]/[20px] uppercase !text-[#888888]">
                  Embed code
                </label>
                <textarea
                  id="embed-code"
                  readOnly
                  value={embedCode}
                  rows={3}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full resize-none rounded-[8px] bg-[#FFFFFF1A] px-3 py-2 ASML_Text !text-[13px]/[18px] font-mono text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
