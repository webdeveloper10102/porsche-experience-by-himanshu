import React, { useState } from 'react';
import { Trophy, Flag, Shield, Award, ChevronRight, Zap, Mountain, Gauge } from 'lucide-react';
import { MOTORSPORT_MILESTONES } from '../data/porscheData';

export const MotorsportHeritage: React.FC = () => {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  const activeMilestone = MOTORSPORT_MILESTONES[activeMilestoneIndex];

  return (
    <section
      id="heritage"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] sm:text-[28rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono">
              06 // 75+ Years of Racing DNA
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white font-sans">
              Forged on the <span className="font-bold italic">Racetrack</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-light leading-relaxed">
            Over 30,000 motorsport victories across Le Mans, Nürburgring, Daytona, and Dakar. We race to build better road cars.
          </p>
        </div>

        {/* Heritage Timeline Horizon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {MOTORSPORT_MILESTONES.map((m, idx) => {
            const isSelected = activeMilestoneIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveMilestoneIndex(idx)}
                className={`p-4 border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white/10 border-white text-white'
                    : 'bg-black border-white/20 hover:border-white/40 text-white/80'
                }`}
              >
                <div className="text-xl font-light italic font-sans text-white mb-1">
                  {m.year}
                </div>
                <div className="text-xs font-bold text-white line-clamp-1 group-hover:text-red-500 transition-colors">
                  {m.category}
                </div>
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Milestone Spotlight Card */}
        <div className="bg-black border border-white/20 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Milestone Details (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-mono font-bold">
                {activeMilestone.year}
              </span>
              <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
                {activeMilestone.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-light uppercase text-white font-sans mb-4">
              {activeMilestone.title}
            </h3>

            <p className="text-base text-white/70 leading-relaxed font-light mb-6">
              {activeMilestone.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="bg-white/5 p-3.5 border border-white/10">
                <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Motorsport Philosophy</span>
                <span className="text-white font-bold">Transfer from Track to Street</span>
              </div>
              <div className="bg-white/5 p-3.5 border border-white/10">
                <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Total Racing Victories</span>
                <span className="text-red-500 font-bold">30,000+ Worldwide</span>
              </div>
            </div>
          </div>

          {/* Archival Racing Heritage Visual (5 cols) */}
          <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden border border-white/15 bg-black shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
              alt="Porsche Racing Heritage on Track"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                Porsche Motorsport Flacht R&D
              </div>
              <div className="text-[10px] font-mono text-white/50">
                Where every 911 GT3 and RSR is born.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
