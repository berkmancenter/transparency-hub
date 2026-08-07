'use client';
import { useEffect, useRef, useState } from "react";

const BOUNDARY_SELECTOR = '[data-help-tooltip-boundary]';
const VIEWPORT_MARGIN = 8;
const TRIGGER_GAP = 10;
const BOUNDARY_INSET = 8;

type Position = {
  top: number;
  left: number;
  width: number;
  arrowLeft: number;
  placement: 'top' | 'bottom';
};

export default function HelpTooltip({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  const handleToggle = () => {
    const button = buttonRef.current;
    if (!open && button) {
      const boundary = (button.closest(BOUNDARY_SELECTOR) as HTMLElement) || document.body;
      const boundaryRect = boundary.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const width = Math.min(boundaryRect.width - BOUNDARY_INSET * 2, window.innerWidth - VIEWPORT_MARGIN * 2);
      let left = boundaryRect.left + boundaryRect.width / 2 - width / 2;
      left = Math.min(Math.max(left, VIEWPORT_MARGIN), window.innerWidth - width - VIEWPORT_MARGIN);

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const arrowMargin = 16;
      const arrowLeft = Math.min(Math.max(buttonCenterX - left, arrowMargin), width - arrowMargin);

      // Approximate dialog height (+ a small margin) to decide whether it fully fits above the icon.
      const estimatedDialogHeight = 164;
      const fitsAbove = buttonRect.top - estimatedDialogHeight - TRIGGER_GAP >= 0;

      setPosition({
        top: fitsAbove ? buttonRect.top - TRIGGER_GAP : buttonRect.bottom + TRIGGER_GAP,
        left,
        width,
        arrowLeft,
        placement: fitsAbove ? 'top' : 'bottom',
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <span className="inline-flex" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={`More info: ${title}`}
        aria-expanded={open}
        onClick={handleToggle}
        className="flex items-center justify-center w-[19px] h-[19px] opacity-70 hover:opacity-100 focus:outline-none focus:opacity-100 cursor-pointer"
      >
        <img src="/policy_index/more-info.svg" alt="" className="w-[19px] h-[19px]" />
      </button>
      {open && position && (
        <div
          role="dialog"
          aria-label={title}
          style={{ top: position.top, left: position.left, width: position.width }}
          className={`fixed z-20 rounded-[8px] bg-[#4A4A4A] border border-[#FFFFFF33] shadow-[0px_4px_12px_rgba(0,0,0,0.4)] p-3 flex flex-col gap-2 text-left ${
            position.placement === 'top' ? '-translate-y-full' : ''
          }`}
        >
          <div
            aria-hidden="true"
            style={{ left: position.arrowLeft - 5 }}
            // Only border the two edges that poke out past the tooltip's own edge —
            // the other two sit underneath the box and must stay borderless to blend in.
            className={`absolute w-[10px] h-[10px] rotate-45 z-[-1] bg-[#4A4A4A] ${
              position.placement === 'top'
                ? '-bottom-[5px] border-r border-b border-[#FFFFFF33]'
                : '-top-[5px] border-l border-t border-[#FFFFFF33]'
            }`}
          />
          <div className="flex flex-row items-center justify-center gap-3">
            <h4 className="ASML_Heading !text-[20px]/[30px]">{title}</h4>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-[14px] h-[14px] mt-0.5 opacity-70 hover:opacity-100 focus:outline-none focus:opacity-100 cursor-pointer"
            >
              <img src="/close.svg" alt="" className="w-[24px] h-[24px]" />
            </button>
          </div>
          <p className="ASML_Text !text-[14px]/[20px]">
            {message}
          </p>
        </div>
      )}
    </span>
  );
}
