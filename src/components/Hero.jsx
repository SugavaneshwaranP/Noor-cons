import React from 'react';
import { ChevronRight, HardHat } from 'lucide-react';
import TypewriterText from './TypewriterText';
import Carousel from './Carousel';

export default function Hero({ timeText, setAllocationModal }) {
  return (
    <section id="hero" className="relative py-8 lg:py-12 px-6 h-full max-w-7xl mx-auto z-10">
      
      {/* Light-beam Blind Shadow Overlay across the Hero section (casts real-time shadow slats) */}
      <div className="window-shadow-overlay absolute inset-0"></div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center h-full w-full relative z-10">
        {/* Hero Left Content — Concrete textured background */}
        <div className="lg:col-span-7 flex flex-col justify-start lg:justify-center reveal-on-scroll relative z-10 concrete-texture pt-2 lg:pt-0">

        {/* Social Proof Badge Bar */}
        <div className="inline-flex flex-wrap gap-x-4 gap-y-2 px-3.5 py-2 rounded border border-black/10 bg-black/5 text-neutral-800 font-mono text-[10px] sm:text-[11px] tracking-wider mb-8 w-fit relative z-10 items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="font-bold">6+</span>
            <span className="text-neutral-500">HAPPY CUSTOMERS</span>
          </div>
          <div className="w-[1px] h-3 bg-black/10"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]"></span>
            <span className="font-bold">12+</span>
            <span className="text-neutral-500">ENGINEERS</span>
          </div>
        </div>
        {/* Mixed Uppercase & Lowercase Italic Serif Header */}
        <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.02] tracking-tight mb-8 text-black relative z-10">
          BUILDING <br />
          EXCELLENCE. <br />
          <span className="font-serif italic font-normal text-neutral-500">
            <TypewriterText 
              words={['Creating the Future.', 'Engineering the Grid.', 'Designing the Nexus.']} 
              speed={100}
              delay={2200}
              eraseSpeed={60}
              loop={true}
            />
          </span>
        </h1>

        <p className="font-sans text-base md:text-lg text-neutral-700 max-w-xl mb-12 leading-relaxed relative z-10">
          Premium Construction Solutions engineered with uncompromising quality, visionary innovation, and absolute structural reliability.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 items-center mb-16 font-mono text-[11px] relative z-10">
          <a 
            onClick={() => setAllocationModal(true)}
            style={{ cursor: 'pointer' }}
            className="glow-btn px-6 py-3.5 rounded bg-black text-white font-bold tracking-widest flex items-center gap-2 hover:bg-neutral-850 transition-all text-[12px]"
          >
            Projects
            <ChevronRight className="w-4 h-4 text-white" />
          </a>
          <a 
            href="#estimator" 
            className="px-6 py-3.5 rounded border border-black/15 text-neutral-700 hover:text-black hover:border-black/30 tracking-widest flex items-center gap-2 transition-all bg-white/50 text-[12px]"
          >
            CALCULATE ESTIMATE [HUD]
          </a>
        </div>
      </div>

      {/* Hero Right Visuals */}
      <div className="lg:col-span-5 relative flex items-center justify-center reveal-on-scroll z-10">
        {/* Soft Radial ambient lighting shadow */}
        <div className="absolute w-80 h-80 rounded-full bg-black/5 blur-[120px] z-0"></div>

        {/* HUD Frame — Blueprint frame with rivet corners */}
        <div className="relative w-full max-w-[450px] aspect-[4/5] rounded overflow-hidden steel-beam-border rivet-corners p-4 flex flex-col justify-center z-10 bg-white lg:-translate-y-16">
          
          {/* Render Visual with corner telemetry marks */}
          <div className="relative flex-1 overflow-hidden rounded bg-[#f3f3f5] flex items-center justify-center border border-black/5">
            <Carousel baseWidth={416} autoplay={true} loop={true} autoplayDelay={3500} />
            
            {/* Corner Ticks */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-black/20"></div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-black/20"></div>
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-black/20"></div>
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-black/20"></div>

            {/* Handwritten Annotation Overlays */}
            <div className="absolute top-6 left-6 font-serif italic text-[10px] text-black/40 -rotate-6 pointer-events-none">
              ↖ LOAD BEARING WALL
            </div>
            <div className="absolute bottom-8 right-6 font-serif italic text-[10px] text-black/40 rotate-3 pointer-events-none">
              FOUNDATION: 12.4m →
            </div>
            <div className="absolute top-1/2 left-8 font-serif italic text-[9px] text-black/30 -rotate-90 pointer-events-none">
              ELEV. +42.6m
            </div>
          </div>
        </div>

        {/* Bottom Rivet Corners (extra pair) */}
        <div className="absolute bottom-0 left-[calc(50%-225px)] w-2 h-2 rounded-full border border-black/20 bg-black/5 hidden lg:block"></div>
        <div className="absolute bottom-0 right-[calc(50%-225px)] w-2 h-2 rounded-full border border-black/20 bg-black/5 hidden lg:block"></div>
      </div>
      </div>
    </section>
  );
}
