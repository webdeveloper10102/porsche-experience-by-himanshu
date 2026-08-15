import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gauge, Zap, Wind, ChevronDown, Play, RotateCcw, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenBooking: () => void;
  onOpenConfigurator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenBooking,
  onOpenConfigurator
}) => {
  const [engineStarted, setEngineStarted] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [launching, setLaunching] = useState(false);

  const toggleEngine = () => {
    if (!engineStarted) {
      setEngineStarted(true);
      audioEngine.setMuted(false);
      audioEngine.start(2400);
      setTimeout(() => {
        audioEngine.setRpm(1200);
      }, 900);
    } else {
      setEngineStarted(false);
      audioEngine.stop();
    }
  };

  const triggerLaunchControl = () => {
    if (launching) return;
    setLaunching(true);
    setEngineStarted(true);
    audioEngine.setMuted(false);
    audioEngine.setRpm(4500); // 4500 RPM launch limiter
    
    audioEngine.triggerLaunchCountdown(() => {
      audioEngine.setRpm(8800);
      setTimeout(() => {
        audioEngine.playGearShift();
        audioEngine.setRpm(6500);
      }, 1000);
      setTimeout(() => {
        audioEngine.setRpm(1200);
        setLaunching(false);
      }, 2500);
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-black text-white"
    >
      {/* Background Watermark & Subtle Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="text-[20rem] sm:text-[32rem] font-black opacity-[0.03] select-none text-white tracking-tighter">
          911
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Main Title & Brand Tagline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full pt-4">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-red-600 uppercase tracking-[0.25em] text-xs sm:text-sm font-bold mb-3"
          >
            New Generation 992 • Flacht Motorsport
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-8xl lg:text-9xl font-light tracking-tighter leading-none mb-6 text-white"
          >
            911 GT3 <span className="font-bold italic">RS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-white/60 mb-8 leading-relaxed max-w-xl font-light"
          >
            The top athlete in the 911 family. Born in Flacht, refined on the Nürburgring, and built for the absolute limit of performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              id="hero-configure-cta"
              onClick={onOpenConfigurator}
              className="bg-white text-black px-8 sm:px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-colors"
            >
              Build Yours
            </button>

            <button
              id="hero-testdrive-cta"
              onClick={onOpenBooking}
              className="border border-white/40 text-white px-8 sm:px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors"
            >
              Reserve Track Drive
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Visual & Interactive Car Display */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full my-8">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full aspect-[16/9] max-h-[480px] overflow-hidden border border-white/15 group bg-black"
        >
          {/* Main Car Photo */}
          <img
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85"
            alt="Porsche 911 GT3 RS in Shark Blue on track"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Matrix Headlights Glow Simulation */}
          {headlightsOn && (
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-white/5 to-white/10 mix-blend-screen" />
          )}

          {/* Launching FX overlay */}
          {launching && (
            <div className="absolute inset-0 bg-red-600/20 mix-blend-overlay animate-ping pointer-events-none" />
          )}

          {/* Clean Glass Overlay Badges */}
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="px-3 py-1.5 bg-black/80 text-[10px] font-mono tracking-widest border border-white/20 text-white uppercase">
              Shark Blue
            </span>
            <span className="px-3 py-1.5 bg-red-600 text-[10px] font-mono tracking-widest text-white font-bold uppercase">
              Weissach Package
            </span>
          </div>

          {/* Headlight Toggle */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setHeadlightsOn(!headlightsOn)}
              className="px-3 py-1.5 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-[10px] font-mono tracking-widest text-white/90 flex items-center gap-2 transition-all uppercase"
            >
              <span className={`w-1.5 h-1.5 ${headlightsOn ? 'bg-white' : 'bg-white/30'}`} />
              <span>PDLS+ MATRIX {headlightsOn ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Interactive Floating Ignition Button */}
          <div className="absolute bottom-6 left-6 flex flex-wrap items-center gap-3">
            <button
              id="hero-engine-start-btn"
              onClick={toggleEngine}
              className={`px-5 py-3 font-mono text-xs tracking-widest uppercase flex items-center gap-2.5 border transition-all duration-300 ${
                engineStarted
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-black/90 border-white/30 text-white hover:bg-white hover:text-black'
              }`}
            >
              <div className={`w-2 h-2 ${engineStarted ? 'bg-white animate-pulse' : 'bg-red-600'}`} />
              <span className="font-bold">{engineStarted ? 'ENGINE RUNNING (FLAT-6)' : 'START IGNITION'}</span>
            </button>

            <button
              id="hero-launch-control-btn"
              onClick={triggerLaunchControl}
              disabled={launching}
              className={`px-5 py-3 font-mono text-xs tracking-widest uppercase flex items-center gap-2 border transition-all ${
                launching
                  ? 'bg-white text-black font-bold'
                  : 'bg-black/90 border-white/30 text-white hover:border-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{launching ? 'LAUNCH ENGAGED...' : 'LAUNCH CONTROL SIM'}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Technical Telemetry Minimalist Footer Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full pt-4">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* 4 Stats Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-14">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">
                Acceleration 0-100 km/h
              </div>
              <div className="text-3xl sm:text-4xl font-light italic text-white">
                3.2 <span className="text-sm not-italic font-sans text-white/60">s</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">
                Power (kW) / Power (PS)
              </div>
              <div className="text-3xl sm:text-4xl font-light italic text-white">
                386 <span className="text-sm not-italic font-sans text-white/60">/</span> 525
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">
                Top Speed
              </div>
              <div className="text-3xl sm:text-4xl font-light italic text-white">
                296 <span className="text-sm not-italic font-sans text-white/60">km/h</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">
                Total Downforce
              </div>
              <div className="text-3xl sm:text-4xl font-light italic text-white">
                860 <span className="text-sm not-italic font-sans text-white/60">kg</span>
              </div>
            </div>
          </div>

          {/* Minimalist Scroll Prompt */}
          <div className="text-left md:text-right cursor-pointer" onClick={onExploreClick}>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-mono">
              Scroll to Explore
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <div className="w-12 h-[1px] bg-white"></div>
              <div className="w-6 h-[1px] bg-white/40"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
