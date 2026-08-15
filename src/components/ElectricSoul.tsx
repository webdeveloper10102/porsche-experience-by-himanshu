import React, { useState, useEffect } from 'react';
import { Zap, BatteryCharging, Trophy, Activity, Gauge, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const ElectricSoul: React.FC = () => {
  const [attackModeActive, setAttackModeActive] = useState(false);
  const [attackSecondsLeft, setAttackSecondsLeft] = useState(10);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [chargeRate, setChargeRate] = useState(320); // kW

  const triggerAttackMode = () => {
    if (attackModeActive) return;
    setAttackModeActive(true);
    setAttackSecondsLeft(10);
    audioEngine.setMode('electric');
    audioEngine.setMuted(false);
    audioEngine.setRpm(8900);

    const interval = setInterval(() => {
      setAttackSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAttackModeActive(false);
          audioEngine.setRpm(1200);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <section
      id="taycan"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] sm:text-[28rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        TAYCAN
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono">
              03 // E-Performance & Electric Soul
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white font-sans">
              Taycan Turbo GT <span className="font-bold italic">1,108 PS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-light leading-relaxed">
            Unleashing Silicon Carbide (SiC) inverters, 900A pulse currents, and Formula E-inspired Attack Mode on track and road.
          </p>
        </div>

        {/* Taycan Feature Grid & Attack Mode Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Visual & Attack Mode Trigger (7 cols) */}
          <div className="lg:col-span-7 bg-black border border-white/20 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between mb-4 z-10">
              <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 border border-white/20 uppercase tracking-widest">
                800-Volt Architecture
              </span>
              <span className="text-xs font-mono text-white/50">
                0-100 km/h in 2.2s (Weissach)
              </span>
            </div>

            {/* Taycan Photo */}
            <div className="relative aspect-[16/9] overflow-hidden mb-6 border border-white/15 group bg-black">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=80"
                alt="Porsche Taycan Turbo GT"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Electric Attack Mode Visual Aura */}
              {attackModeActive && (
                <div className="absolute inset-0 bg-red-600/15 mix-blend-color-dodge animate-pulse pointer-events-none" />
              )}
            </div>

            {/* Interactive Attack Mode Activation Banner */}
            <div className="bg-black/90 p-4 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 ${attackModeActive ? 'text-red-500 animate-bounce' : 'text-white/40'}`} />
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    {attackModeActive ? `ATTACK MODE ACTIVE (${attackSecondsLeft}s)` : 'Formula E Attack Mode (+120 kW)'}
                  </span>
                </div>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  Overboost power surges from 789 PS to 1,108 PS for 10 seconds.
                </p>
              </div>

              <button
                id="taycan-attack-mode-btn"
                onClick={triggerAttackMode}
                disabled={attackModeActive}
                className={`px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                  attackModeActive
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-black hover:bg-red-600 hover:text-white'
                }`}
              >
                {attackModeActive ? `${attackSecondsLeft}s REMAINING` : 'ENGAGE ATTACK MODE'}
              </button>
            </div>

          </div>

          {/* Right: Technical Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Nürburgring Record Card */}
            <div className="bg-white/5 border border-white/10 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-white/60 flex items-center gap-1.5 uppercase tracking-wider">
                  <Trophy className="w-4 h-4 text-red-500" /> Nürburgring Nordschleife
                </span>
                <span className="text-[10px] font-mono text-white/40">20.832 KM</span>
              </div>
              <div className="text-3xl font-light italic text-white font-sans my-1">
                7:07.55 <span className="text-sm not-italic font-mono text-red-500">MIN</span>
              </div>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                26 seconds faster than the previous Taycan Turbo S and over 2.2 seconds quicker than competing track configurations.
              </p>
            </div>

            {/* 800V Ultra-Fast Charging Simulation */}
            <div className="bg-white/5 border border-white/10 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <BatteryCharging className="w-4 h-4 text-red-500" /> High-Power Charging
                </span>
                <span className="text-xs font-mono text-white/60">320 kW Peak</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-white/60 mb-1">
                <span>10% to 80% State of Charge</span>
                <span className="text-white font-bold">18 MIN</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 overflow-hidden mb-3">
                <div className="h-full bg-red-600 w-[78%]" />
              </div>
              <p className="text-xs text-white/50 font-mono">
                Continuous battery pre-conditioning maintains rapid charging speeds across extreme ambient temperatures.
              </p>
            </div>

            {/* Silicon Carbide Inverter Card */}
            <div className="bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-red-500" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">900A Silicon Carbide (SiC) Inverters</span>
              </div>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                New semiconductor materials reduce switching losses in power electronics, enabling ultra-fast throttle response and sustained power output.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
