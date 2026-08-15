import React, { useState } from 'react';
import { PORSCHE_MODELS } from '../data/porscheData';
import { CarModel } from '../types';
import { ArrowRight, Check, Sparkles, Scale, Zap, Gauge, Wind, Layers } from 'lucide-react';

interface ModelCompareMatrixProps {
  onSelectModelForConfig: (modelId: string) => void;
}

export const ModelCompareMatrix: React.FC<ModelCompareMatrixProps> = ({ onSelectModelForConfig }) => {
  const [modelAId, setModelAId] = useState<string>('911-gt3-rs');
  const [modelBId, setModelBId] = useState<string>('taycan-turbo-gt');

  const modelA = PORSCHE_MODELS.find((m) => m.id === modelAId) || PORSCHE_MODELS[0];
  const modelB = PORSCHE_MODELS.find((m) => m.id === modelBId) || PORSCHE_MODELS[1];

  // Power to weight calculations (PS / Ton)
  const powerToWeightA = Math.round((modelA.powerPS / (modelA.weightKg / 1000)));
  const powerToWeightB = Math.round((modelB.powerPS / (modelB.weightKg / 1000)));

  return (
    <section
      id="comparison"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] sm:text-[24rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        COMPARE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono flex items-center gap-2">
              <Scale className="w-3.5 h-3.5" />
              <span>08 // Direct Telemetry Matchup</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white font-sans">
              Head to Head <span className="font-bold italic">Matrix</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-light leading-relaxed">
            Side-by-side performance benchmarks, power-to-weight ratios, active aerodynamics, and track telemetry.
          </p>
        </div>

        {/* Model Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Selector A */}
          <div className="bg-black border border-white/20 p-6">
            <label className="block text-xs font-mono text-red-500 uppercase tracking-widest mb-3">
              Vehicle Alpha
            </label>
            <select
              value={modelAId}
              onChange={(e) => setModelAId(e.target.value)}
              className="w-full bg-black border border-white/20 px-4 py-3 text-sm font-sans text-white focus:outline-none focus:border-white"
            >
              {PORSCHE_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-black text-white">
                  {m.name} — {m.powerPS} PS ({m.engineType.split(' ')[0]})
                </option>
              ))}
            </select>

            <div className="mt-4 relative aspect-[16/9] overflow-hidden border border-white/10 bg-black">
              <img
                src={modelA.heroImage}
                alt={modelA.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2.5 py-1 text-[10px] font-mono text-white border border-white/20">
                {modelA.series}
              </div>
            </div>
          </div>

          {/* Selector B */}
          <div className="bg-black border border-white/20 p-6">
            <label className="block text-xs font-mono text-white/60 uppercase tracking-widest mb-3">
              Vehicle Beta
            </label>
            <select
              value={modelBId}
              onChange={(e) => setModelBId(e.target.value)}
              className="w-full bg-black border border-white/20 px-4 py-3 text-sm font-sans text-white focus:outline-none focus:border-white"
            >
              {PORSCHE_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-black text-white">
                  {m.name} — {m.powerPS} PS ({m.engineType.split(' ')[0]})
                </option>
              ))}
            </select>

            <div className="mt-4 relative aspect-[16/9] overflow-hidden border border-white/10 bg-black">
              <img
                src={modelB.heroImage}
                alt={modelB.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2.5 py-1 text-[10px] font-mono text-white border border-white/20">
                {modelB.series}
              </div>
            </div>
          </div>

        </div>

        {/* Head-to-Head Comparison Specs Table */}
        <div className="bg-black border border-white/20 shadow-2xl overflow-hidden mb-8">
          
          {/* Header Row */}
          <div className="grid grid-cols-3 p-4 bg-white/5 border-b border-white/15 text-center font-mono text-xs uppercase tracking-wider">
            <div className="text-left font-bold text-red-500">{modelA.name}</div>
            <div className="text-white/40">Metric Benchmark</div>
            <div className="text-right font-bold text-white">{modelB.name}</div>
          </div>

          {/* Power (PS) */}
          <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-center font-mono text-xs sm:text-sm">
            <div className={`text-left font-bold ${modelA.powerPS >= modelB.powerPS ? 'text-red-500' : 'text-white/60'}`}>
              {modelA.powerPS} PS / {modelA.powerKW} kW
            </div>
            <div className="text-white/50 text-[10px] sm:text-xs uppercase">Peak Output</div>
            <div className={`text-right font-bold ${modelB.powerPS >= modelA.powerPS ? 'text-white' : 'text-white/60'}`}>
              {modelB.powerPS} PS / {modelB.powerKW} kW
            </div>
          </div>

          {/* 0-100 KM/H */}
          <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-center font-mono text-xs sm:text-sm bg-white/[0.02]">
            <div className={`text-left font-bold ${modelA.zeroToHundred <= modelB.zeroToHundred ? 'text-red-500' : 'text-white/60'}`}>
              {modelA.zeroToHundred} s
            </div>
            <div className="text-white/50 text-[10px] sm:text-xs uppercase">0 - 100 km/h</div>
            <div className={`text-right font-bold ${modelB.zeroToHundred <= modelA.zeroToHundred ? 'text-white' : 'text-white/60'}`}>
              {modelB.zeroToHundred} s
            </div>
          </div>

          {/* Top Speed */}
          <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-center font-mono text-xs sm:text-sm">
            <div className={`text-left font-bold ${modelA.topSpeedKmh >= modelB.topSpeedKmh ? 'text-red-500' : 'text-white/60'}`}>
              {modelA.topSpeedKmh} km/h ({modelA.topSpeedMph} mph)
            </div>
            <div className="text-white/50 text-[10px] sm:text-xs uppercase">Top Track Speed</div>
            <div className={`text-right font-bold ${modelB.topSpeedKmh >= modelA.topSpeedKmh ? 'text-white' : 'text-white/60'}`}>
              {modelB.topSpeedKmh} km/h ({modelB.topSpeedMph} mph)
            </div>
          </div>

          {/* Peak Downforce */}
          <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-center font-mono text-xs sm:text-sm bg-white/[0.02]">
            <div className={`text-left font-bold ${modelA.aerodynamics.downforceKgAt285 >= modelB.aerodynamics.downforceKgAt285 ? 'text-red-500' : 'text-white/60'}`}>
              {modelA.aerodynamics.downforceKgAt285} kg
            </div>
            <div className="text-white/50 text-[10px] sm:text-xs uppercase">Downforce @ 285 km/h</div>
            <div className={`text-right font-bold ${modelB.aerodynamics.downforceKgAt285 >= modelA.aerodynamics.downforceKgAt285 ? 'text-white' : 'text-white/60'}`}>
              {modelB.aerodynamics.downforceKgAt285} kg
            </div>
          </div>

          {/* Power-to-Weight */}
          <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-center font-mono text-xs sm:text-sm">
            <div className={`text-left font-bold ${powerToWeightA >= powerToWeightB ? 'text-red-500' : 'text-white/60'}`}>
              {powerToWeightA} PS / Ton ({modelA.weightKg} kg)
            </div>
            <div className="text-white/50 text-[10px] sm:text-xs uppercase">Power-to-Weight & Kerb Weight</div>
            <div className={`text-right font-bold ${powerToWeightB >= powerToWeightA ? 'text-white' : 'text-white/60'}`}>
              {powerToWeightB} PS / Ton ({modelB.weightKg} kg)
            </div>
          </div>

          {/* Nürburgring Lap Time */}
          <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-center font-mono text-xs sm:text-sm bg-white/[0.02]">
            <div className="text-left font-bold text-red-500">
              {modelA.nurburgringLapTime || 'N/A'}
            </div>
            <div className="text-white/50 text-[10px] sm:text-xs uppercase">Nordschleife Lap Record</div>
            <div className="text-right font-bold text-white">
              {modelB.nurburgringLapTime || 'N/A'}
            </div>
          </div>

          {/* Powertrain Architecture */}
          <div className="grid grid-cols-3 p-4 border-b border-white/10 items-center text-center font-mono text-xs">
            <div className="text-left text-white/80 line-clamp-2">
              {modelA.engineType}
            </div>
            <div className="text-white/50 text-[10px] uppercase">Engine Architecture</div>
            <div className="text-right text-white/80 line-clamp-2">
              {modelB.engineType}
            </div>
          </div>

          {/* MSRP Base */}
          <div className="grid grid-cols-3 p-4 items-center text-center font-mono text-xs sm:text-sm bg-white/5">
            <div className="text-left">
              <span className="text-lg sm:text-xl font-bold text-white block">${modelA.basePriceUSD.toLocaleString()}</span>
              <button
                onClick={() => onSelectModelForConfig(modelA.id)}
                className="mt-2 px-3 py-1.5 bg-red-600 hover:bg-white hover:text-black text-white text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1"
              >
                <span>Build {modelA.name}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="text-white/50 text-[10px] sm:text-xs uppercase">Starting Base MSRP</div>
            
            <div className="text-right">
              <span className="text-lg sm:text-xl font-bold text-white block">${modelB.basePriceUSD.toLocaleString()}</span>
              <button
                onClick={() => onSelectModelForConfig(modelB.id)}
                className="mt-2 px-3 py-1.5 bg-white text-black hover:bg-red-600 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1"
              >
                <span>Build {modelB.name}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
