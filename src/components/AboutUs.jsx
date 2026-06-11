import React, { useEffect, useRef } from 'react';
import { Building2, ShieldCheck, Users, Award, CalendarDays, MapPin, Ruler, HardHat } from 'lucide-react';

export default function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.about-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  const milestones = [
    { year: '2010', label: 'Foundation Laid', desc: 'Operations began with a vision for luxury construction in Tamil Nadu.' },
    { year: '2012', label: 'Officially Registered', desc: 'Incorporated as a Private Limited Company under MCA.' },
    { year: '2018', label: 'Smart Home Division', desc: 'Launched IoT-integrated residential smart living projects.' },
    { year: '2024', label: 'Net-Zero Milestone', desc: 'First fully net-zero energy residential complex delivered.' },
    { year: '2026', label: 'Expanding Horizons', desc: 'Pioneering eco-luxury villas along the East Coast Road corridor.' },
  ];

  const coreValues = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Structural Integrity',
      value: '99.88%',
      desc: 'Every beam, every column — engineered to exceed IS 456 standards.',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Expert Team',
      value: '12+',
      desc: 'Senior civil architects, safety coordinators & certified structural designers.',
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Client Trust',
      value: '6+',
      desc: 'Happy clients across residential, commercial & coastal verticals.',
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: 'Projects Delivered',
      value: '450K+',
      desc: 'Sq ft of premium residential and commercial space developed.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-8 lg:py-12 px-6 h-full flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf9f6 0%, #f3f1eb 50%, #faf9f6 100%)' }}
    >
      {/* Subtle rebar crosshatch pattern overlay */}
      <div className="rebar-pattern absolute inset-0 pointer-events-none z-0"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="about-reveal mb-12 lg:mb-16">
          {/* Mono Tag */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-[#ff4e00]"></div>
            <span className="font-mono text-[10px] tracking-[0.35em] text-[#ff4e00] font-bold uppercase">
              Company Overview
            </span>
          </div>

          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-black mb-4">
            Pioneering Luxury &<br />
            <span className="font-serif italic font-normal text-neutral-400">
              Structural Strength
            </span>
          </h2>

          <p className="font-sans text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            At Noor Infrastructure, we believe that construction is not just about raw materials — it is an art of shaping the future. Since 2010, our firm has built a legendary reputation for executing residential complexes, modern commercial towers, and highly durable industrial spaces.
          </p>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">

          {/* LEFT COLUMN: Image + Registration Card */}
          <div className="lg:col-span-5 about-reveal" style={{ animationDelay: '0.15s' }}>
            {/* Inspection Image with steel-beam border */}
            <div className="relative overflow-hidden rounded steel-beam-border group">
              <img
                src="/about_inspection.png"
                alt="Architectural structure inspection by Noor Infrastructure engineers"
                className="w-full h-[320px] lg:h-[380px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Bottom overlay info */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="w-4 h-4 text-[#ff4e00]" />
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#ff4e00] font-bold">
                    STRUCTURAL INSPECTION
                  </span>
                </div>
                <p className="font-sans text-[13px] text-white/80 leading-relaxed">
                  Operating with senior civil architects, safety coordinators, and certified structural designers.
                </p>
              </div>

              {/* Corner survey marks */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#ff4e00]/60"></div>
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#ff4e00]/60"></div>
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#ff4e00]/60"></div>
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#ff4e00]/60"></div>
            </div>

            {/* Registration Card */}
            <div className="mt-5 p-5 rounded bg-white border border-black/8 relative clipboard-doc" style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.04)' }}>
              <div className="flex items-start gap-4">
                {/* Stamp seal */}
                <div className="stamp-seal flex-shrink-0 hidden sm:flex">
                  EST.<br />2012<br />VERIFIED
                </div>
                <div className="flex-1">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 font-bold block mb-1.5">CORPORATE REGISTRATION</span>
                  <h4 className="font-display font-bold text-base text-black mb-1">Noor Infrastructure Pvt. Ltd.</h4>
                  <div className="space-y-1 font-mono text-[10px] text-neutral-500 tracking-wider">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3 h-3 text-[#ff4e00]" />
                      <span>ESTABLISHED: <strong className="text-black">2012</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-3 h-3 text-[#ff4e00]" />
                      <span>REG NO: <strong className="text-black">U45200BR2012PTC018397</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-[#ff4e00]" />
                      <span>OPERATIONS SINCE: <strong className="text-black">2010</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Core Values + Mission */}
          <div className="lg:col-span-7">

            {/* Core Values Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {coreValues.map((item, i) => (
                <div
                  key={i}
                  className="about-reveal glass-panel glass-panel-hover rounded p-5 relative group"
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  {/* Top icon + value row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded bg-black flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <span className="font-display font-extrabold text-2xl md:text-3xl text-black tracking-tight">
                      {item.value}
                    </span>
                  </div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] text-[#ff4e00] font-bold uppercase mb-1.5">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[12px] text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Pin mark accent */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ff4e00]/30"></div>
                </div>
              ))}
            </div>

            {/* Mission Statement - Editorial Block */}
            <div className="about-reveal p-6 rounded bg-black text-white relative overflow-hidden" style={{ animationDelay: '0.6s' }}>
              {/* Blueprint grid overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="safety-stripe-thin w-6 h-3 rounded-sm"></div>
                  <span className="font-mono text-[9px] tracking-[0.35em] text-[#ff4e00] font-bold">OUR MISSION</span>
                </div>
                <p className="font-serif italic text-lg md:text-xl text-white/90 leading-relaxed mb-4">
                  "We deliver customized layouts that represent elegance, luxury, and absolute resilience — from concept to completion."
                </p>
                <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-wider text-white/50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    RESIDENTIAL COMPLEXES
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    COMMERCIAL TOWERS
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    INDUSTRIAL SPACES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MILESTONE TIMELINE ── */}
        <div className="about-reveal" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-[2px] bg-black"></div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 font-bold">JOURNEY MILESTONES</span>
          </div>

          {/* Timeline Track */}
          <div className="relative">
            {/* Horizontal line connector (desktop) */}
            <div className="hidden lg:block absolute top-[15px] left-0 right-0 h-[2px] bg-black/10 z-0"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex flex-col items-center lg:items-center text-center">
                  {/* Circle dot */}
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center z-10 mb-3 shadow-sm">
                    <div className={`w-3 h-3 rounded-full ${i === milestones.length - 1 ? 'bg-[#ff4e00] animate-pulse' : 'bg-black'}`}></div>
                  </div>
                  {/* Year */}
                  <span className="font-display font-extrabold text-xl text-black tracking-tight mb-1">{m.year}</span>
                  {/* Label */}
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#ff4e00] font-bold uppercase mb-1">{m.label}</span>
                  {/* Description */}
                  <p className="font-sans text-[11px] text-neutral-500 leading-relaxed max-w-[180px]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom revision tag */}
        <div className="text-center mt-12 font-mono text-[9px] text-neutral-300 tracking-[0.3em]">
          DOC: NOOR_INFRA_PROFILE — REV. 03 — SHEET 2 OF 4
        </div>

      </div>

      {/* CSS for reveal animations */}
      <style>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-visible .about-reveal,
        .about-reveal.about-visible {
          opacity: 1;
          transform: translateY(0);
        }
        section.about-visible .about-reveal {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
