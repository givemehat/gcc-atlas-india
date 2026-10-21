import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Compass, Database, Scale, SlidersHorizontal, BookOpen, Presentation, PlusCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenCorrectionModal: () => void;
  gccCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenCorrectionModal,
  gccCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as ActiveTab, label: 'Overview', icon: Compass },
    { id: 'registry' as ActiveTab, label: 'GCC Registry', icon: Database, badge: `${gccCount}` },
    { id: 'compare' as ActiveTab, label: 'City Compare', icon: Scale },
    { id: 'recommender' as ActiveTab, label: 'Find My City', icon: SlidersHorizontal },
    { id: 'about' as ActiveTab, label: 'Methodology & Neutrality', icon: BookOpen },
    { id: 'deck' as ActiveTab, label: 'Strategic Pitch Deck', icon: Presentation, highlight: true }
  ];

  const handleTabClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Neutrality Banner */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-3 sm:px-8 flex items-center justify-between font-mono overflow-hidden">
        <div className="flex items-center gap-2 truncate text-xs sm:text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="truncate">Core Promise: <strong>"Every GCC in India, every number sourced."</strong></span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-stone-400">
          <span>Nasscom-Zinnov FY26: 2,117 GCCs • 3,728 Units • 2.36M Employees</span>
          <span className="text-stone-600">|</span>
          <span className="text-amber-400 font-medium">Neutral Reference • No Sponsored Ranks</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Masthead */}
          <div
            onClick={() => handleTabClick('home')}
            className="flex items-baseline gap-2.5 cursor-pointer group"
          >
            <span className="text-2xl font-editorial font-bold text-stone-950 tracking-tight group-hover:text-stone-700 transition-colors">
              GCC Atlas India
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-widest text-stone-600 border-l border-stone-300 pl-2">
              Flexiple Single Source of Truth
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : item.highlight
                      ? 'bg-amber-50 text-amber-900 border border-amber-300/80 hover:bg-amber-100'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : item.highlight ? 'text-amber-800' : 'text-stone-600'} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 text-[10px] font-mono rounded-full ${
                        isActive
                          ? 'bg-stone-700 text-stone-200'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCorrectionModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-stone-300 text-stone-800 hover:bg-stone-100 transition-colors"
              title="Report an error or submit verified filing"
            >
              <PlusCircle size={13} className="text-stone-500" />
              Report Correction
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-200 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCorrectionModal();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-stone-300 rounded text-stone-800 bg-stone-50"
            >
              <PlusCircle size={14} /> Report a Correction or New GCC
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
