import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { HardHat } from './ConstructionIcons';

export default function Header({ activeNav, setActiveNav, setAllocationModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'projects', label: '01_PROJECTS', href: '#projects' },
    { id: 'ecosystem', label: '02_ECOSYSTEM', href: '#ecosystem' },
    { id: 'estimator', label: '03_SMART_HUD', href: '#estimator' },
    { id: 'reviews', label: '04_REVIEWS', href: '#reviews' },
    { id: 'contact', label: '05_SITE_OFFICE', href: '#contact' },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-3.5 md:py-5 border-b border-black/5 bg-[#faf9f6]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo with HardHat icon */}
        <a href="#hero" className="flex items-center gap-3 group z-50">
          <div className="relative w-8 h-8 rounded bg-black p-[1px] flex items-center justify-center overflow-hidden">
            <HardHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-wider text-black group-hover:text-neutral-500 transition-colors">
            NOOR<span className="font-serif italic font-normal text-lg text-neutral-500">.infra</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-widest text-neutral-600">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-black transition-colors ${activeNav === link.id ? 'text-black font-semibold' : ''}`}
            >
              [ {link.label} ]
            </a>
          ))}
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-4 z-50">
          {/* Action Button (Hidden on extra small screens if needed, otherwise visible) */}
          <button 
            onClick={() => {
              setAllocationModal(true);
              setIsMenuOpen(false);
            }}
            className="glow-btn hidden sm:flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] font-bold tracking-wider text-white bg-black rounded-none hover:bg-neutral-850 transition-all steel-beam-border"
          >
            ACCESS PORTAL
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden p-2 text-black hover:text-[#ff4e00] transition-colors relative"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <div 
        className={`fixed inset-0 top-[61px] md:top-[73px] bg-[#0a1628] blueprint-grid z-45 md:hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col justify-between ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Top diagonal safety stripe banner */}
        <div className="safety-stripe-thin w-full h-[6px]"></div>

        {/* Links Menu */}
        <div className="flex-1 px-8 py-12 flex flex-col justify-center gap-8 font-mono">
          <div className="text-[10px] text-[#5a8ab5] tracking-[0.2em] font-semibold border-b border-[#1a3a5c] pb-2 mb-2 w-fit">
            // SITE_COMMAND_PORTAL
          </div>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavClick(link.id)}
              className={`text-lg tracking-widest text-white/70 hover:text-[#ff4e00] transition-all flex items-center justify-between border-b border-[#1a3a5c]/30 pb-2 w-full ${
                activeNav === link.id ? 'text-[#ff4e00] pl-2 font-bold' : ''
              }`}
            >
              <span>[ {link.label} ]</span>
              <ArrowUpRight className="w-4 h-4 opacity-50" />
            </a>
          ))}

          {/* Mobile CTA (shown only inside menu for small screens) */}
          <button
            onClick={() => {
              setAllocationModal(true);
              setIsMenuOpen(false);
            }}
            className="w-full mt-6 py-4 font-mono text-xs font-bold tracking-widest text-[#ff4e00] bg-white hover:bg-neutral-100 transition-all border-2 border-white sm:hidden flex items-center justify-center gap-2"
          >
            ACCESS PORTAL
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer info inside menu */}
        <div className="p-8 border-t border-[#1a3a5c]/50 bg-[#0d1f38] text-white/50 text-[9px] tracking-widest font-mono flex flex-col gap-2">
          <div>LATENCY: 12MS // MASTER_CONTROL_V5</div>
          <div className="flex justify-between">
            <span>ZONE: ECR-HQ</span>
            <span>REV. 05</span>
          </div>
        </div>
      </div>
    </header>
  );
}
