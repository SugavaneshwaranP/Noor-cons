import React from 'react';
import { Sun, Droplet, Clock, Shield, Coins, FileSpreadsheet } from 'lucide-react';

const PACKAGES = {
  luminosity: {
    rate: 4500,
    name: 'Noor Luminosity Villa Package @ ₹4,500/sqft',
    desc: 'Futuristic Eco-Living (Villas & Premium Residences)',
    image: '/coastal_villa.png'
  },
  nova: {
    rate: 3800,
    name: 'Nova Apex Smart Home Package @ ₹3,800/sqft',
    desc: 'High-Density Decarbonized Living (Apartments & Custom Homes)',
    image: '/smart_home.png'
  },
  helix: {
    rate: 5800,
    name: 'Tech-Helix Corporate Package @ ₹5,800/sqft',
    desc: 'Heavy Structural Commercial Nexus (Offices & Tech Parks)',
    image: '/tech_park.png'
  },
  oceanic: {
    rate: 6500,
    name: 'Oceanic Horizon Net-Zero Package @ ₹6,500/sqft',
    desc: 'Marine-Grade Off-Grid Luxury (Coastal & High-Exposure)',
    image: '/coastal_villa.png'
  }
};

export default function SmartHUD({ 
  calculator, 
  updateCalculator, 
  estimates, 
  setAllocationModal 
}) {
  const currentPackage = calculator.package;
  const packageDetails = PACKAGES[currentPackage] || PACKAGES.luminosity;
  const currentRate = packageDetails.rate;

  // Row total calculations
  const getGroundTotal = () => Number(calculator.groundFloor || 0) * currentRate;
  const getFirstTotal = () => Number(calculator.firstFloor || 0) * currentRate;
  const getSecondTotal = () => Number(calculator.secondFloor || 0) * currentRate;
  const getThirdTotal = () => Number(calculator.thirdFloor || 0) * currentRate;
  const getFourthTotal = () => Number(calculator.fourthFloor || 0) * currentRate;
  const getSumpTotal = () => Number(calculator.waterSump || 0) * 24;
  const getSepticTotal = () => Number(calculator.septicTank || 0) * 24;
  const getCompoundTotal = () => {
    const area = Number(calculator.compoundLength || 0) * Number(calculator.compoundHeight || 0);
    return area * 400;
  };

  const totalCost = estimates.totalCostInRs;

  return (
    <section id="estimator" className="bg-[#ff4e00] text-white py-6 lg:py-8 px-4 md:px-8 relative overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Safety Stripe Header Bar */}
      <div className="safety-stripe-thin w-full h-[6px] absolute top-0 left-0 right-0 z-20"></div>

      {/* Hide number input spin buttons */}
      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Blinds Shadow Overlay */}
      <div className="window-shadow-overlay absolute inset-0 pointer-events-none"></div>

      {/* Rebar pattern behind everything */}
      <div className="absolute inset-0 rebar-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Section Title, Project Spotlight & Telemetry (Span 4) */}
        <div className="lg:col-span-4 space-y-6 reveal-on-scroll">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#4c1300] leading-none mb-1">
              Smart HUD
            </h2>
            <h2 className="font-serif italic font-normal text-3xl md:text-4xl text-[#4c1300] leading-none">
              estimator.
            </h2>
          </div>

          {/* Project Spotlight linked to selected package */}
          <div className="bg-[#4c1300]/10 border border-[#4c1300]/20 rounded p-4 relative overflow-hidden backdrop-blur-sm">
            <span className="font-mono text-[9px] text-white/70 tracking-widest block mb-2 font-bold uppercase">// ACTIVE PROJECT ALIGNMENT</span>
            
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded bg-neutral-900 border border-white/10 overflow-hidden shrink-0 relative pin-mark">
                <img 
                  src={packageDetails.image} 
                  alt={packageDetails.label} 
                  className="w-full h-full object-cover opacity-90 transition-all duration-500" 
                />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-white">{packageDetails.label}</h4>
                <p className="font-sans text-[11px] text-white/80 leading-snug mt-1">{packageDetails.desc}</p>
              </div>
            </div>
            
            <div className="mt-3.5 pt-3 border-t border-white/10 font-mono text-[10px] text-white/70 flex justify-between">
              <span>UNIT SPEC RATE:</span>
              <span className="font-bold text-white">₹{currentRate.toLocaleString('en-IN')}/SQFT</span>
            </div>
          </div>

          {/* Live Telemetry Display */}
          <div className="bg-black/10 border border-white/10 rounded p-4 font-mono text-[11px] space-y-3 backdrop-blur-sm">
            <div className="flex justify-between items-baseline">
              <span className="text-white/80 uppercase tracking-widest font-bold">ESTIMATED VALUATION</span>
              <span key={estimates.cost} className="text-xl font-bold text-white animate-recalc">₹{estimates.cost} Lakhs</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-white/10 pt-2">
              <span className="text-white/80 uppercase tracking-widest font-bold">BUILT TIMELINE</span>
              <span key={estimates.timeline} className="text-white font-bold animate-recalc">{estimates.timeline} Months</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-white/80 uppercase tracking-widest font-bold">ESTIMATED SOLAR YIELD</span>
              <span key={estimates.energy} className="text-white font-bold animate-recalc">{estimates.energy} kWp</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-white/80 uppercase tracking-widest font-bold">CARBON OFFSET</span>
              <span key={estimates.carbon} className="text-white font-bold animate-recalc">{estimates.carbon} T/Yr</span>
            </div>
          </div>

          {/* CTA Action */}
          <button 
            onClick={() => setAllocationModal(true)}
            className="w-full py-4 bg-white text-[#ff4e00] hover:bg-neutral-50 transition-all font-mono text-xs font-bold tracking-widest rounded-none shadow-lg hover:shadow-xl active:scale-[0.98] transition-transform steel-beam-border border-white flex items-center justify-center gap-2"
          >
            <Coins className="w-4 h-4" />
            TRANSMIT ALLOCATION DEED
          </button>

          {/* Approved Stamp Watermark */}
          <div className="flex justify-center pt-2">
            <div className="stamp-seal border-white text-white opacity-85">
              APPROVED<br/>FOR<br/>CONSTRUCTION
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Construction Cost Calculator Spreadsheet (Span 8) */}
        <div className="lg:col-span-8 reveal-on-scroll">
          <div className="bg-white text-black rounded shadow-2xl p-4 md:p-5 border border-black/10 relative overflow-hidden rivet-corners">
            
            {/* Corner Ticks inside the sheet */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-black/20"></div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-black/20"></div>
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-black/20"></div>
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-black/20"></div>

            {/* Header & Subtitle */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-neutral-200 pb-3 mb-4 gap-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-[#ff4e00]" />
                <div>
                  <h3 className="font-mono font-bold text-lg uppercase tracking-tight text-neutral-900 leading-none">
                    Construction Cost Calculator
                  </h3>
                  <p className="font-sans text-xs text-neutral-500 mt-1">
                    Arrive at your premium construction estimate dynamically
                  </p>
                </div>
              </div>

              {/* Package selector dropdown */}
              <div className="flex items-center gap-2">
                <label className="font-mono text-[10px] font-bold text-neutral-600 uppercase shrink-0">Package:</label>
                <select
                  value={currentPackage}
                  onChange={(e) => updateCalculator('package', e.target.value)}
                  className="px-3 py-2 border border-neutral-200 rounded text-xs font-sans font-semibold bg-neutral-50 focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00] text-neutral-800 cursor-pointer"
                >
                  <option value="luminosity">{PACKAGES.luminosity.name}</option>
                  <option value="nova">{PACKAGES.nova.name}</option>
                  <option value="helix">{PACKAGES.helix.name}</option>
                  <option value="oceanic">{PACKAGES.oceanic.name}</option>
                </select>
              </div>
            </div>

            {/* Spreadsheet Table */}
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-left border-collapse text-xs font-sans min-w-[650px]">
                <thead>
                  <tr className="bg-neutral-50 border-t border-b border-neutral-200 text-neutral-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3 w-[40%]">Type of Construction</th>
                    <th className="py-2.5 px-3 w-[20%] text-center">Area / Capacity</th>
                    <th className="py-2.5 px-3 w-[10%] text-center">Unit</th>
                    <th className="py-2.5 px-3 w-[15%] text-right">Price</th>
                    <th className="py-2.5 px-3 w-[15%] text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  
                  {/* Ground Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Ground Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.groundFloor || ''}
                        onChange={(e) => updateCalculator('groundFloor', e.target.value)}
                        className="w-28 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getGroundTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* First Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">First Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.firstFloor || ''}
                        onChange={(e) => updateCalculator('firstFloor', e.target.value)}
                        className="w-28 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getFirstTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Second Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Second Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.secondFloor || ''}
                        onChange={(e) => updateCalculator('secondFloor', e.target.value)}
                        className="w-28 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getSecondTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Third Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Third Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.thirdFloor || ''}
                        onChange={(e) => updateCalculator('thirdFloor', e.target.value)}
                        className="w-28 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getThirdTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Fourth Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Fourth Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.fourthFloor || ''}
                        onChange={(e) => updateCalculator('fourthFloor', e.target.value)}
                        className="w-28 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getFourthTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* RCC Water Sump Size */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">RCC Water Sump Size</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number"
                        min="0"
                        placeholder="No. of Liters"
                        value={calculator.waterSump || ''}
                        onChange={(e) => updateCalculator('waterSump', e.target.value)}
                        className="w-28 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">ltr</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹24</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getSumpTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* RCC Septic Tank Size */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">RCC Septic Tank Size</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number"
                        min="0"
                        placeholder="No. of Liters"
                        value={calculator.septicTank || ''}
                        onChange={(e) => updateCalculator('septicTank', e.target.value)}
                        className="w-28 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">ltr</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹24</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getSepticTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Compound Wall Size */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Compound Wall Size</td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex gap-1 justify-center items-center">
                        <input 
                          type="number"
                          min="0"
                          placeholder="L (ft)"
                          value={calculator.compoundLength || ''}
                          onChange={(e) => updateCalculator('compoundLength', e.target.value)}
                          className="w-14 px-1 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                        />
                        <span className="text-neutral-400 font-mono">×</span>
                        <input 
                          type="number"
                          min="0"
                          placeholder="H (ft)"
                          value={calculator.compoundHeight || ''}
                          onChange={(e) => updateCalculator('compoundHeight', e.target.value)}
                          className="w-14 px-1 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">
                      {(Number(calculator.compoundLength || 0) * Number(calculator.compoundHeight || 0)).toLocaleString()} sqft
                    </td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹400</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getCompoundTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Grand Total Row */}
                  <tr className="bg-neutral-50 font-bold border-t-2 border-neutral-300">
                    <td colSpan="4" className="py-3 px-3 text-right font-mono text-xs uppercase tracking-wider text-neutral-800">
                      Grand Total:
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-[#ff4e00]">
                      ₹{totalCost.toLocaleString('en-IN')} <span className="text-[10px] text-neutral-500 font-normal">({estimates.cost} Lakhs)</span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Stripe Bottom Bar */}
      <div className="safety-stripe-thin w-full h-[6px] absolute bottom-0 left-0 right-0 z-20"></div>
    </section>
  );
}
