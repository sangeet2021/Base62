import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Menu, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 bg-bg transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar />
      </aside>

      <main className="flex-1">
        <div className="flex justify-end p-4 md:hidden">
          <button
            className="p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
