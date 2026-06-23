'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Sidebar({
  isOpen,
  onCloseAction
}:{
  isOpen: boolean;
  onCloseAction: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [])

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="block xl:hidden fixed inset-0 z-[9999]">
      <div className="fixed inset-0 bg-black/50" onClick={onCloseAction} />
      <div className="absolute top-0 right-0 w-[360px] h-screen bg-gradient-to-r from-ASML-blue via-ASML-purple to-ASML-red">
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-row w-full justify-end">
            <button className="ASML_Text Navigation flex flex-row gap-2 cursor-pointer" onClick={onCloseAction}>
              Close
              <img className="mb-0.5" width={16} src="/close.svg" alt="Close"/>
            </button>
          </div>
          <Link className="flex flex-row gap-2" href="/" onClick={onCloseAction}>
            <img className="h-full" src="/THUB_title.svg" alt="Transparency Hub"/>
          </Link>
          <div className="h-[4px] w-full bg-white"/>
          <div className="flex flex-col shrink gap-[50px] ASML_Text Navigation whitespace-nowrap">
            <Link className={`mr-auto p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/policy_index" ? "underline" : ""}`} href="/policy_index" onClick={onCloseAction}>
              Policy Index
            </Link>
            <Link className={`mr-auto p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/comparison_tool" ? "underline" : ""}`} href="/comparison_tool" onClick={onCloseAction}>
              Comparison Tool
            </Link>
            <Link className={`mr-auto p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/projects" ? "underline" : ""}`} href="/projects" onClick={onCloseAction}>
              Projects
            </Link>
            <Link className={`mr-auto p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/about/researchers" ? "underline" : ""}`} href="/about/researchers" onClick={onCloseAction}>
              For Researchers
            </Link>
            <Link className={`mr-auto p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/about" ? "underline" : ""}`} href="/about" onClick={onCloseAction}>
              About
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}