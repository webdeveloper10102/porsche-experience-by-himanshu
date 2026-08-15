import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Gauge, Zap, Flame, Radio, Play, RotateCcw } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const AcousticLab: React.FC = () => {
  const [rpm, setRpm] = useState<number>(900);
  const [isPressingGas, setIsPressingGas] = useState<boolean>(false);
  const [engineType, setEngineType] = useState<'flat6' | 'electric'>('flat6');
  const [sportExhaust, setSportExhaust] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const gasInterval = useRef<number | null>(null);

  useEffect(() => {
    if (isPressingGas) {
      audioEngine.setMuted(false);
      setIsMuted(false);
      gasInterval.current = window.setInterval(() => {
        setRpm((prev) => {
          const next = Math.min(9000, prev + 240);
          audioEngine.setRpm(next);
          return next;
        });
      }, 30);
    } else {
      if (gasInterval.current) {
        clearInterval(gasInterval.current);
        gasInterval.current = null;
      }
      // Return to idle smoothly
      const idleInterval = window.setInterval(() => {
        setRpm((prev) => {
          if (prev <= 950) {
            clearInterval(idleInterval);
            audioEngine.setRpm(900);
            return 900;
          }
          const next = Math.max(900, prev - 180);
          audioEngine.setRpm(next);
          return next;
        });
      }, 30);

      return () => clearInterval(idleInterval);
    }

    return () => {
      if (gasInterval.current) clearInterval(gasInterval.current);
    };
  }, [isPressingGas]);

  const handleModeChange = (mode: 'flat6' | 'electric') => {
    setEngineType(mode);
    audioEngine.setMode(mode);
    audioEngine.setRpm(rpm);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setRpm(val);
    audioEngine.setMuted(false);
    setIsMuted(false);
    audioEngine.setRpm(val);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioEngine.setMuted(next);
    if (!next) {
      audioEngine.start(rpm);
    }
  };

  const rpmDegree = ((rpm - 800) / (9000 - 800)) * 240 - 120; // -120 deg to +120 deg for analog needle

  return (
    <section
      id="acoustic-lab"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] sm:text-[28rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        9000
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono">
              04 // Interactive Acoustic Studio
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white font-sans">
              The Resonance of <span className="font-bold italic">9,000 RPM</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-light leading-relaxed">
            Experience the acoustic harmonics synthesized live in your browser using the Web Audio API mathematical harmonic engine.
          </p>
        </div>

        {/* Central Soundboard Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-black border border-white/20 p-6 sm:p-10 shadow-2xl">
          
          {/* Left: Interactive Analog Tachometer & Sound Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-between">
            
            {/* Top Sound Profile Selector */}
            <div className="w-full flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-3">
              <div className="flex items-center gap-2 border border-white/20 p-1">
                <button
                  onClick={() => handleModeChange('flat6')}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                    engineType === 'flat6'
                      ? 'bg-white text-black font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  4.0L Atmospheric Flat-6
                </button>
                <button
                  onClick={() => handleModeChange('electric')}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                    engineType === 'electric'
                      ? 'bg-white text-black font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Electric Sport Sound
                </button>
              </div>

              <button
                onClick={toggleMute}
                className="p-2.5 border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-red-500" />}
              </button>
            </div>

            {/* Analog Circular Tachometer Dial */}
            <div className="relative my-8 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/20 bg-black shadow-2xl flex items-center justify-center p-4">
                
                {/* Dial Ticks & Markers */}
                <div className="absolute inset-4 rounded-full border border-white/10 flex items-center justify-center">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                    const angle = (num / 9) * 240 - 120;
                    const isRedline = num >= 8;
                    return (
                      <div
                        key={num}
                        className="absolute text-xs font-mono font-bold"
                        style={{
                          transform: `rotate(${angle}deg) translate(0, -110px) rotate(${-angle}deg)`
                        }}
                      >
                        <span className={isRedline ? 'text-red-600 font-black' : 'text-white/80'}>{num}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Dial Center Hub */}
                <div className="relative z-20 w-24 h-24 rounded-full bg-black border border-white/30 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-2xl font-light font-sans text-white tracking-tight leading-none">
                    {rpm}
                  </span>
                  <span className="text-[8px] font-mono text-white/40 tracking-widest uppercase mt-0.5">
                    RPM
                  </span>
                  <span className="text-[8px] font-mono text-red-600 font-bold">
                    {rpm > 8500 ? 'LIMITER' : 'FLAT-6'}
                  </span>
                </div>

                {/* Rotating Needle */}
                <div
                  className="absolute w-0.5 h-32 bg-red-600 origin-bottom transition-transform duration-75 z-10 shadow-[0_0_8px_#D11D27]"
                  style={{
                    bottom: '50%',
                    transform: `rotate(${rpmDegree}deg)`
                  }}
                />

                {/* Redline Glow Arc */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-red-600 rounded-tr-full opacity-80 pointer-events-none" />
              </div>
            </div>

            {/* Slider Manual Control */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-mono text-white/50">
                <span>IDLE (900 RPM)</span>
                <span className="text-red-500 font-bold">REDLINE (9,000 RPM)</span>
              </div>
              <input
                type="range"
                min="900"
                max="9000"
                step="50"
                value={rpm}
                onChange={handleSliderChange}
                className="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-red-600"
              />
            </div>

          </div>

          {/* Right: Accelerator Pedal & Dynamic Exhaust Acoustics (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-6 lg:pt-0 lg:pl-6 lg:border-l border-white/10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Dynamic Throttle
                </h3>
                <span className={`text-[10px] font-mono px-2.5 py-1 ${sportExhaust ? 'bg-red-600 text-white font-bold' : 'border border-white/20 text-white/60'}`}>
                  VALVES {sportExhaust ? 'OPEN' : 'CLOSED'}
                </span>
              </div>

              {/* Sport Exhaust Toggle */}
              <button
                onClick={() => setSportExhaust(!sportExhaust)}
                className="w-full py-3 px-4 mb-6 border border-white/20 flex items-center justify-between text-xs font-mono text-white/80 hover:border-white transition-all"
              >
                <span>Porsche Sport Exhaust (PSE)</span>
                <span className="font-bold text-white">{sportExhaust ? 'SPORT LOUD' : 'QUIET STANDARD'}</span>
              </button>

              {/* Big Interactive Gas Pedal Button */}
              <div className="mb-6 flex flex-col items-center">
                <button
                  id="acoustic-gas-pedal-btn"
                  onMouseDown={() => setIsPressingGas(true)}
                  onMouseUp={() => setIsPressingGas(false)}
                  onMouseLeave={() => setIsPressingGas(false)}
                  onTouchStart={() => setIsPressingGas(true)}
                  onTouchEnd={() => setIsPressingGas(false)}
                  className={`w-full py-8 border transition-all duration-150 flex flex-col items-center justify-center select-none cursor-pointer group ${
                    isPressingGas
                      ? 'bg-red-600 text-white border-red-500 scale-98'
                      : 'bg-black border-white/30 hover:border-white text-white'
                  }`}
                >
                  <Flame className={`w-8 h-8 mb-2 transition-transform ${isPressingGas ? 'text-white scale-110 animate-pulse' : 'text-red-500'}`} />
                  <span className="text-sm sm:text-base font-bold tracking-widest uppercase font-mono">
                    {isPressingGas ? 'FULL THROTTLE // 9,000 RPM' : 'HOLD GAS PEDAL'}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-wider mt-1">
                    Touch & hold or click & hold mouse
                  </span>
                </button>
              </div>

              {/* Acoustic Wave Telemetry */}
              <div className="bg-white/5 p-4 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-white/40">Harmonic Base Freq:</span>
                  <span className="text-white font-bold">{Math.round((rpm / 60) * 3)} Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Intake Process Volume:</span>
                  <span className="text-white font-bold">{Math.round((rpm / 9000) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Cylinder Fire Rate:</span>
                  <span className="text-red-500 font-bold">{Math.round((rpm / 60) * 6)} cycles/sec</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-white/40 font-mono mt-4">
              * Engineered using harmonic synthesis reflecting the 180° firing order of the Porsche boxer crankshaft.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
