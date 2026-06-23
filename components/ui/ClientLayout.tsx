'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setShowSidebar(!showSidebar);
  }

  return (
    <div id="__next" className="flex flex-col min-h-screen justify-between bg-background">
      <div id="content">
        <Header toggleSidebarAction={toggleSidebar} />
        <main className="flex flex-col flex-1">
          {children}
        </main>
      </div>
      <Footer />
      <Sidebar isOpen={showSidebar} onCloseAction={() => setShowSidebar(false)} />
    </div>
  )
}