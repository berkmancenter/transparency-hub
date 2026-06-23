'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({
  toggleSidebarAction
}: {
  toggleSidebarAction: () => void
}) {
  const pathname = usePathname();

  return (
    <header className={pathname === "/illuminating-policies" ? "scrolly-fade-nav w-full flex items-center justify-between z-10 from-ASML-blue to-ASML-red sm:min-h-[114px] min-h-[60px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" : "w-full flex items-center justify-between bg-gradient-to-r p-0 z-10 from-ASML-blue to-ASML-red sm:min-h-[114px] min-h-[60px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"}>
      <Link className="flex flex-row gap-2 h-full" href="/">
        <img className="h-full" title="Transparency Hub Logo" src="/THUB_title.svg" alt="Logo of Transparency Hub, An Applied Social Media Lab Project" />
      </Link>
      <section className="hidden xl:flex flex-row gap-[25px] pr-6 !font-bold text-[20px] leading-[30px] ASML_Heading text-center items-center">
        <Link className={`p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/policy_index" ? "underline" : ""}`} href="/policy_index">
          Policy Index
        </Link>
        <Link className={`p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/comparison_tool" ? "underline" : ""}`} href="/comparison_tool">
          Comparison Tool
        </Link>
        <Link className={`p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/projects" ? "underline" : ""}`} href="/projects">
          Projects
        </Link>
        <Link className={`p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/about/researchers" ? "underline" : ""}`} href="/about/researchers">
          For Researchers
        </Link>
        <Link className={`p-[10px] hover:bg-[#FFFFFF33] ${pathname === "/about" ? "underline" : ""}`} href="/about">
          About
        </Link>
      </section>
      <button className="block xl:hidden cursor-pointer pr-4 sm:p-6"
        onClick={toggleSidebarAction}
      >
        <img className="min-w-[24px]" title="Menu icon" src="/menu.svg" alt="Menu icon to open sidebar navigation" />
      </button>
    </header>
  )
}
