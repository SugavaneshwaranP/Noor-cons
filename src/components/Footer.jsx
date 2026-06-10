import React from 'react';
import { Building2, MapPin, Phone, Clock, FileText, ArrowUpRight, Shield } from 'lucide-react';

export default function Footer({ timeText }) {
  const mapUrl = "https://maps.google.com/?q=Noor+Infrastructure+Kalpakkam";

  return (
    <footer id="contact" className="py-8 lg:py-12 px-6 h-full relative z-10 border-t border-white/5 bg-black text-white flex flex-col justify-center concrete-texture">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        
        {/* Brand/Contact Details */}
        <div className="lg:col-span-5 reveal-on-scroll">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-8 h-8 rounded bg-white p-[1px] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider text-white">
              NOOR<span className="font-serif italic font-normal text-lg text-neutral-400">.infra</span>
            </span>
          </div>
          <p className="text-neutral-300 text-sm mb-8 leading-relaxed max-w-sm font-sans">
            Constructing premium sustainable smart properties on the East Coast Road, Pudupattinam. Certified A-Grade infrastructure developers.
          </p>

          <div className="space-y-4 font-mono text-[12px]">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#ff4e00] shrink-0 mt-0.5" />
              <span className="text-neutral-300">
                5, East Coast Rd, Pudupattinam,<br />
                Dhawood Nagar, Kalpakkam, Meiyur,<br />
                Tamil Nadu 603102
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#ff4e00]" />
              <a href="tel:+917305130207" className="text-neutral-300 hover:text-white transition-colors font-medium">
                073051 30207
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-neutral-550" />
              <span className="text-neutral-400">
                Open · Closes 7:30 pm
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-white/10 font-mono font-medium">
                PLUS CODE: G46W+J8 Kalpakkam, Tamil Nadu
              </span>
            </div>
          </div>

          {/* Construction Permit Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-white/10 bg-neutral-950 font-mono text-[8px] font-bold tracking-widest text-neutral-300 uppercase">
              <Shield className="w-3 h-3 text-[#ff4e00]" />
              RERA REGISTERED
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-white/10 bg-neutral-950 font-mono text-[8px] font-bold tracking-widest text-neutral-300 uppercase">
              <Shield className="w-3 h-3 text-[#ff4e00]" />
              ISO 9001:2015
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-white/10 bg-neutral-950 font-mono text-[8px] font-bold tracking-widest text-neutral-300 uppercase">
              <Shield className="w-3 h-3 text-green-500" />
              IGBC GREEN
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-8 font-mono text-[11px] tracking-wider reveal-on-scroll">
          <div>
            <div className="text-white font-bold tracking-widest mb-4">// CORE_LINKS</div>
            <ul className="space-y-2.5 text-neutral-400">
              <li><a href="#projects" className="hover:text-white transition-colors">PROJECTS</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">PROCESS</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">HUD ESTIMATOR</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">REVIEWS</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold tracking-widest mb-4">// TELEMETRY</div>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  GOOGLE MAPS <ArrowUpRight className="w-3 h-3 text-[#ff4e00]" />
                </a>
              </li>
              <li><a href="#contact" className="hover:text-white transition-colors">SUPPORT_DECK</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">WHITEPAPER <FileText className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Clickable Custom SVG telemetry map container */}
        <div className="lg:col-span-4 reveal-on-scroll">
          <a 
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded p-4 border border-white/10 relative bg-neutral-950 aspect-square flex flex-col justify-between overflow-hidden hover:border-[#ff4e00]/50 transition-all duration-300 cursor-pointer block"
            title="Open coordinates in Google Maps"
          >
            <div className="absolute top-2 left-2 text-[10px] font-mono text-neutral-400 font-semibold group-hover:text-white transition-colors flex items-center gap-1.5">
              <span>// REGIONAL_MAP_LINK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff4e00] opacity-70 group-hover:opacity-100 transition-all" />
            </div>

            {/* Vector Blueprint rendering */}
            <div className="flex-1 flex items-center justify-center relative my-4 border border-white/5 bg-[#0a1628] blueprint-grid rounded overflow-hidden">
              {/* Layout coordinates */}
              <div className="absolute inset-x-0 top-[40%] h-[1px] border-b border-dashed border-[#1a3a5c]/50"></div>
              <div className="absolute inset-y-0 left-[60%] w-[1px] border-r border-dashed border-[#1a3a5c]/50"></div>
              
              {/* ECR road line */}
              <div className="absolute w-[200%] h-4 bg-[#0d1f38] -rotate-12 top-[35%] left-[-50%] border-y border-white/5 flex items-center justify-center">
                <span className="font-mono text-[9px] text-[#5a8ab5] tracking-widest font-semibold">EAST COAST ROAD (ECR)</span>
              </div>
              
              {/* Bay of Bengal */}
              <div className="absolute right-0 top-0 bottom-0 w-[30%] bg-[#071120] border-l border-white/5 flex items-center justify-center">
                <span className="font-mono text-[8px] text-[#5a8ab5] -rotate-90 tracking-widest uppercase font-semibold">BAY OF BENGAL</span>
              </div>

              {/* Beacon Marker */}
              <div className="absolute top-[34%] left-[58%] flex items-center justify-center">
                <span className="absolute w-5 h-5 rounded-full bg-[#ff4e00]/20 border border-[#ff4e00]/40 animate-ping"></span>
                <span className="relative w-2.5 h-2.5 rounded-full bg-[#ff4e00] border border-white shadow-[0_0_10px_rgba(255,78,0,0.5)]"></span>
                <span className="absolute left-4 font-mono text-[9px] font-bold text-white bg-black px-1.5 py-0.5 rounded border border-white/10 shrink-0 group-hover:bg-[#ff4e00] group-hover:text-black transition-colors">
                  NOOR.HQ
                </span>
              </div>
            </div>

            {/* Coordinate telemetry metadata */}
            <div className="font-mono text-[10px] text-neutral-300 flex justify-between font-medium">
              <span>COORDS: G46W+J8 KALPAKKAM</span>
              <span className="text-neutral-450">PUDUPATTINAM SEC</span>
            </div>
          </a>
        </div>
      </div>

      {/* Safety-Stripe Bottom Border */}
      <div className="construction-tape w-full mt-6 relative z-10"></div>

      {/* Copyright/Contract details */}
      <div className="max-w-7xl mx-auto w-full mt-4 pt-4 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-neutral-500 gap-3 tracking-widest relative z-10">
        <div>
          © 2026 NOOR INFRASTRUCTURE FOUNDATION, LTD. ALL SYSTEM DATA SECURED.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">PRIVACY_LEDGER</a>
          <a href="#" className="hover:text-white transition-colors">TERMS_OF_GRID</a>
          <span>DEED_CONTRACT: 0x5d6...ba4</span>
        </div>
      </div>
    </footer>
  );
}
