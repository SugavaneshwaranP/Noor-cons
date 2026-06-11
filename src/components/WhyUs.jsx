import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Clock, HardHat, FileText, HeartPulse, Cpu } from 'lucide-react';

const cards = [
  {
    id: 1,
    step: '01',
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality Construction',
    desc: 'We utilize grade-A branded cement, rust-resistant TMT steel, and double-tested aggregates to secure high-performance load bearing capacities.',
    accent: '#ff4e00',
  },
  {
    id: 2,
    step: '02',
    icon: <Clock className="w-6 h-6" />,
    title: 'On-Time Delivery',
    desc: 'Our projects follow computerized Gantt schedules. Clients receive digital weekly progress logs and transparent completion checklists.',
    accent: '#111115',
  },
  {
    id: 3,
    step: '03',
    icon: <HardHat className="w-6 h-6" />,
    title: 'Expert Engineering',
    desc: 'Our sites are monitored by certified structural engineers, premium civil planners, and senior masonry supervisors.',
    accent: '#ff4e00',
  },
  {
    id: 4,
    step: '04',
    icon: <FileText className="w-6 h-6" />,
    title: 'Transparent Process',
    desc: 'We issue exact itemized estimations down to square feet before laying foundations — guaranteeing zero hidden or escalating fees.',
    accent: '#111115',
  },
  {
    id: 5,
    step: '05',
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Safety Standards',
    desc: 'Adhering to strict occupational safety policies. Personal protective equipment (PPE) and weekly safety drills are strictly enforced.',
    accent: '#ff4e00',
  },
  {
    id: 6,
    step: '06',
    icon: <Cpu className="w-6 h-6" />,
    title: 'Modern Technology',
    desc: 'Integrating Building Information Modeling (BIM) to visualize stress vectors, heat ratios, and wiring routing before construction begins.',
    accent: '#111115',
  },
];

const getElementTranslationY = (el) => {
  if (!el) return 0;
  const style = window.getComputedStyle(el);
  const transform = style.transform || style.webkitTransform;
  if (!transform || transform === 'none') return 0;
  
  const matrix = transform.match(/^matrix\((.+)\)$/);
  if (matrix) {
    const values = matrix[1].split(/\s*,\s*/);
    return parseFloat(values[5]) || 0;
  }
  
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    const values = matrix3d[1].split(/\s*,\s*/);
    return parseFloat(values[13]) || 0;
  }
  
  return 0;
};

export default function WhyUs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef(null);

  // Card dimensions
  const CARD_WIDTH = 340;
  const CARD_GAP = 20;
  const TOTAL_CARDS = cards.length;

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const viewH = window.innerHeight;
    const scrollRange = viewH * 0.8; // Use 80% of viewport height as horizontal scroll duration

    // Find the scroll stack card wrapper
    const card = section.closest('.scroll-stack-card');
    let traveled = 0;

    if (card) {
      // While pinned in the ScrollStack, the card's translateY goes from 0
      // upwards, representing the exact vertical scroll distance since pinning began.
      traveled = getElementTranslationY(card);
    } else {
      // Fallback scroll tracking if rendered outside of ScrollStack
      const headerEl = document.querySelector('header');
      const headerH = headerEl ? headerEl.offsetHeight : 0;
      traveled = Math.max(0, headerH - rect.top);
    }

    const rawProgress = traveled / scrollRange;
    const progress = Math.max(0, Math.min(1, rawProgress));

    setScrollProgress(progress);

    // Active card index based on progress
    const idx = Math.floor(progress * TOTAL_CARDS);
    setActiveIndex(Math.min(idx, TOTAL_CARDS - 1));
  }, [TOTAL_CARDS]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // initial

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Calculate how far the track should translate horizontally
  // At progress=0, show first card. At progress=1, show last card.
  const totalTrackWidth = TOTAL_CARDS * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
  const viewportPadding = 48; // px-6 * 2 sides
  const maxTranslate = Math.max(0, totalTrackWidth - (typeof window !== 'undefined' ? window.innerWidth : 1200) + viewportPadding + 80);
  const translateX = -scrollProgress * maxTranslate;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative h-full flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf9f6 0%, #f5f3ed 50%, #faf9f6 100%)' }}
    >
      {/* Rebar crosshatch background */}
      <div className="rebar-pattern absolute inset-0 pointer-events-none z-0"></div>

      <div className="w-full relative z-10 flex flex-col justify-center h-full px-6">

        {/* ── HEADER ── */}
        <div className="max-w-7xl w-full mx-auto mb-8 lg:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              {/* Mono tag */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#ff4e00]"></div>
                <span className="font-mono text-[10px] tracking-[0.35em] text-[#ff4e00] font-bold uppercase">
                  Why Choose Us
                </span>
              </div>

              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-black mb-2">
                Why Partner with{' '}
                <span className="font-serif italic font-normal text-neutral-400">Noor</span>
              </h2>

              <p className="font-sans text-base text-neutral-500 max-w-lg leading-relaxed">
                Six pillars of excellence that define every project we deliver — from foundation to finish.
              </p>
            </div>

            {/* Progress + dots */}
            <div className="flex items-center gap-3">
              {cards.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: i === activeIndex ? 24 : 8,
                    height: 8,
                    backgroundColor: i === activeIndex ? '#ff4e00' : 'rgba(0,0,0,0.08)',
                  }}
                ></div>
              ))}
              <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 ml-2">
                {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL_CARDS).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL CARD TRACK ── */}
        <div className="relative overflow-hidden w-screen -ml-6">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-20 pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, #f5f3ed 0%, transparent 100%)',
              opacity: scrollProgress > 0.02 ? 1 : 0,
            }}
          ></div>
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-20 pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(270deg, #f5f3ed 0%, transparent 100%)',
              opacity: scrollProgress < 0.95 ? 1 : 0,
            }}
          ></div>

          {/* Moving track */}
          <div
            ref={trackRef}
            className="flex gap-5 pl-6 pr-12 py-4"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
              willChange: 'transform',
            }}
          >
            {cards.map((card, i) => {
              // Determine if this card is near the active zone for a highlight effect
              const distance = Math.abs(i - scrollProgress * (TOTAL_CARDS - 1));
              const isNear = distance < 1.2;
              const cardOpacity = isNear ? 1 : 0.65;
              const cardScale = isNear ? 1 : 0.97;

              return (
                <div
                  key={card.id}
                  className="flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    opacity: cardOpacity,
                    transform: `scale(${cardScale})`,
                  }}
                >
                  <div
                    className="h-full rounded-lg border bg-white relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                    style={{
                      borderColor: isNear ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
                      boxShadow: isNear
                        ? '0 8px 32px rgba(0,0,0,0.06)'
                        : '0 2px 12px rgba(0,0,0,0.02)',
                    }}
                  >
                    {/* Top accent stripe */}
                    <div
                      className="h-[4px] w-full"
                      style={{
                        background: i % 2 === 0
                          ? 'repeating-linear-gradient(-45deg, #ff4e00, #ff4e00 6px, #111115 6px, #111115 12px)'
                          : '#111115',
                      }}
                    ></div>

                    <div className="p-6">
                      {/* Step + Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-mono text-[11px] font-bold"
                            style={{ backgroundColor: card.accent }}
                          >
                            {card.step}
                          </div>
                          <div className="w-8 h-[1px] bg-black/10"></div>
                        </div>
                        <div className="w-11 h-11 rounded-lg bg-[#faf9f6] border border-black/5 flex items-center justify-center text-black/70">
                          {card.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-extrabold text-[1.25rem] leading-tight text-black mb-3 tracking-tight">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-[13px] text-neutral-500 leading-[1.7] mb-5">
                        {card.desc}
                      </p>

                      {/* Bottom decorative line */}
                      <div className="flex items-center gap-2">
                        <div
                          className="h-[2px] flex-1"
                          style={{ backgroundColor: card.accent, opacity: 0.5 }}
                        ></div>
                        <div className="h-[2px] flex-[2] bg-black/5"></div>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.accent, opacity: 0.4 }}></div>
                      </div>
                    </div>

                    {/* Corner tick marks */}
                    <div className="absolute top-5 right-5 w-2 h-2 border-t border-r border-black/8 pointer-events-none"></div>
                    <div className="absolute bottom-5 left-5 w-2 h-2 border-b border-l border-black/8 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom tag */}
        <div className="text-center mt-6 font-mono text-[9px] text-neutral-300 tracking-[0.3em]">
          DOC: NOOR_QUALITY_STANDARDS — REV. 06 — SHEET 3 OF 4
        </div>
      </div>
    </section>
  );
}
