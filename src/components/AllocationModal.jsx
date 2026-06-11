import React from 'react';
import { X } from 'lucide-react';

export default function AllocationModal({ 
  selectedProject, 
  setAllocationModal, 
  setSelectedProject, 
  estimates,
  calculator
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel rounded border-black/10 p-6 md:p-8 overflow-hidden bg-white shadow-xl">
        {/* Telemetry Corner Borders */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-black/20"></div>
        <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-black/20"></div>
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-black/20"></div>
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-black/20"></div>

        {/* Close Button */}
        <button 
          onClick={() => {
            setAllocationModal(false);
            setSelectedProject(null);
          }}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-black/5 pb-4 mb-6">
          <span className="font-mono text-[10px] text-neutral-500 tracking-widest block mb-1 font-semibold">
            // SECURE PORTAL APPLICATION
          </span>
          <h3 className="font-display font-bold text-xl text-black">
            {selectedProject ? `ALLOCATION: ${selectedProject.title}` : 'PROJECT INQUIRY PORTAL'}
          </h3>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          alert("Telemetry transmission complete. Noor systems analyst will contact you shortly.");
          setAllocationModal(false);
          setSelectedProject(null);
        }} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-mono text-[10px] text-neutral-500 tracking-wider mb-1.5 uppercase font-semibold">CLIENT FULL NAME</label>
            <input 
              type="text" 
              required
              placeholder="Enter full legal name"
              className="w-full px-4 py-2.5 rounded bg-neutral-50 border border-black/10 focus:border-black focus:outline-none font-mono text-xs text-black" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-neutral-500 tracking-wider mb-1.5 uppercase font-semibold">MOBILE PHONE</label>
              <input 
                type="tel" 
                required
                placeholder="+91 99999 99999"
                className="w-full px-4 py-2.5 rounded bg-neutral-50 border border-black/10 focus:border-black focus:outline-none font-mono text-xs text-black" 
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-neutral-500 tracking-wider mb-1.5 uppercase font-semibold">EMAIL ADDRESS</label>
              <input 
                type="email" 
                required
                placeholder="name@domain.com"
                className="w-full px-4 py-2.5 rounded bg-neutral-50 border border-black/10 focus:border-black focus:outline-none font-mono text-xs text-black" 
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-neutral-500 tracking-wider mb-1.5 uppercase font-semibold">ALLOCATION SPECIFICS</label>
            <textarea 
              rows="3"
              placeholder={selectedProject 
                ? `Requesting allocation details for: ${selectedProject.title}` 
                : `Describe your custom build requirement (e.g. details on ${estimates.packageName} with ${estimates.floorArea} sqft)`
              }
              className="w-full px-4 py-2.5 rounded bg-neutral-50 border border-black/10 focus:border-black focus:outline-none font-mono text-xs text-black resize-none"
            ></textarea>
          </div>

          {/* Dynamic cost alert if estimate is active */}
          {!selectedProject && (
            <div className="bg-neutral-50 rounded p-3.5 border border-black/5 font-mono text-[10px] text-neutral-600 leading-relaxed">
              <div className="font-bold text-black mb-1">// CURRENT SELECTION ESTIMATE:</div>
              <div className="uppercase space-y-0.5">
                <div>PACKAGE: <span className="font-bold text-black">{estimates.packageName}</span></div>
                <div>TOTAL AREA: <span className="font-bold text-black">{estimates.floorArea} SQ FT</span></div>
                <div>WATER SUMP: <span className="font-bold text-black">{calculator.waterSump} Ltr</span> | SEPTIC TANK: <span className="font-bold text-black">{calculator.septicTank} Ltr</span></div>
                <div>COMPOUND WALL: <span className="font-bold text-black">{calculator.compoundLength}L × {calculator.compoundHeight}H ft</span></div>
                <div className="pt-1 text-[11px] border-t border-black/5 mt-1">ESTIMATED VALUATION: <span className="text-black font-bold text-xs">₹{estimates.cost} LAKHS</span></div>
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3 bg-black text-white hover:bg-neutral-850 transition-all font-mono text-[11px] font-bold tracking-widest rounded mt-2"
          >
            TRANSMIT SECURE APPLICATION
          </button>
        </form>
      </div>
    </div>
  );
}
