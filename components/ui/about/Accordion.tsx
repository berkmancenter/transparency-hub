'use client';

import { useState } from 'react';

type AccordionItem = {
  question: string;
  answer: React.ReactNode;
};

export default function Accordion({
  items,
}: {
  items: AccordionItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="rounded-[8px] border border-[#D2BBD280] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="cursor-pointer w-full flex items-center justify-between gap-4 p-4 text-left"
            >
              <span className="ASML_Text !text-[20px]/[30px] !font-bold">
                {item.question}
              </span>
              <img
                src="/Arrow_right_logomark.png"
                alt=""
                aria-hidden="true"
                className={`shrink-0 w-3 transition-transform duration-300 ${
                  isOpen ? 'rotate-90' : 'rotate-[-90deg]'
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="ASML_Text !text-[16px]/[24px] px-4 pb-4 pt-1">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}