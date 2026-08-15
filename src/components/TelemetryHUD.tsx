import React, { useState, useEffect, useRef } from 'react';
import { Gauge, Wind, Zap, Activity } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface TelemetryHUDProps {
  activeSection: string;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [virtualSpeed, setVirtualSpeed] = useState(0);
  const [virtualRpm, setVirtualRpm] = useState(900);
  const [virtualGear, setVirtualGear] = useState('P');
  const [gForce, setGForce] = useState({ x: 0, y: 0 });
  const [isDrsActive, setIsDrsActive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const previousGear = useRef('P');

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);
      const dy = Math.abs(currentScrollY - lastScrollY.current);
      const scrollSpeed = (dy / dt) * 100; // pixels per 100ms

      // Speed calculation
      const calculatedSpeed = Math.min(296, Math.floor(scrollSpeed * 2.8));
      setVirtualSpeed(calculatedSpeed);

      // Gear & RPM mapping
      let gear = '1';
      let rpm = 900;

      if (calculatedSpeed < 10) {
        gear = '1';
        rpm = 900 + calculatedSpeed * 60;
      } else if (calculatedSpeed < 65) {
        gear = '1';
        rpm = 2500 + ((calculatedSpeed - 10) / 55) * 6000;
      } else if (calculatedSpeed < 110) {
        gear = '2';
        rpm = 4000 + ((calculatedSpeed - 65) / 45) * 4800;
      } else if (calculatedSpeed < 160) {
        gear = '3';
        rpm = 4500 + ((calculatedSpeed - 110) / 50) * 4400;
      } else if (calculatedSpeed < 210) {
        gear = '4';
        rpm = 5000 + ((calculatedSpeed - 160) / 50) * 3900;
      } else if (calculatedSpeed < 255) {
        gear = '5';
        rpm = 5500 + ((calculatedSpeed - 210) / 45) * 3400;
      } else if (calculatedSpeed < 285) {
        gear = '6';
        rpm = 6000 + ((calculatedSpeed - 255) / 30) * 2800;
      } else {
        gear = '7';
        rpm = 7200 + ((calculatedSpeed - 285) / 15) * 1800;
      }

      setVirtualGear(gear);
      setVirtualRpm(Math.min(9000, Math.floor(rpm)));

      // Shift sound trigger on gear change
      if (previousGear.current !== gear && calculatedSpeed > 20) {
        audioEngine.playGearShift();
        previousGear.current = gear;
      }

      // DRS activates at high speeds (> 180 km/h) or specific sections
      const drs = calculatedSpeed > 180 || activeSection === 'aerodynamics';
      setIsDrsActive(drs);

      // Simulated lateral G-force
      const gx = ((Math.sin(currentScrollY * 0.005) * scrollSpeed) / 120).toFixed(2);
      const gy = (scrollSpeed / 90).toFixed(2);
      setGForce({ x: parseFloat(gx), y: parseFloat(gy) });

      lastScrollY.current = currentScrollY;
      lastTime.current = now;

      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setVirtualSpeed(0);
        setVirtualRpm(900);
        setGForce({ x: 0, y: 0 });
      }, 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [activeSection]);

  const rpmPercent = Math.min(100, Math.max(0, ((virtualRpm - 900) / (9000 - 900)) * 100));

  return (
    <div
      id="porsche-telemetry-hud"
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 font-mono select-none ${
        collapsed ? 'translate-y-20 opacity-40 hover:opacity-100 hover:translate-y-0' : 'translate-y-0'
      }`}
    >
      <div className="bg-black/95 border border-white/20 p-4 shadow-2xl w-72 text-white">
        
        {/* HUD Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-white/80 uppercase font-semibold">
              Telemetry HUD
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40">{Math.round(scrollProgress)}%</span>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-[10px] text-white/50 hover:text-white"
            >
              {collapsed ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Speed & Gear Block */}
        <div className="grid grid-cols-3 gap-2 items-center mb-3">
          {/* Speedometer */}
          <div className="col-span-2 bg-white/5 p-2 border border-white/10 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-light italic tracking-tight text-white font-sans">
                {virtualSpeed}
              </span>
              <span className="text-[9px] text-white/50 ml-1">KM/H</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/60 font-sans">
                {Math.round(virtualSpeed * 0.621371)}
              </span>
              <span className="text-[9px] text-white/40 ml-0.5">MPH</span>
            </div>
          </div>

          {/* PDK Gear */}
          <div className="bg-white/5 p-2 border border-white/10 text-center">
            <span className="text-[9px] text-white/40 block">PDK</span>
            <span className="text-xl font-bold text-red-600">
              {virtualGear}
            </span>
          </div>
        </div>

        {/* RPM Tachometer Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[9px] text-white/50 mb-1">
            <span>{virtualRpm} RPM</span>
            <span className={virtualRpm > 8500 ? 'text-red-600 font-bold animate-pulse' : 'text-white/40'}>
              REDLINE 9,000
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 overflow-hidden flex">
            <div
              className={`h-full transition-all duration-75 ${
                virtualRpm > 8000
                  ? 'bg-red-600'
                  : virtualRpm > 5000
                  ? 'bg-white'
                  : 'bg-white/70'
              }`}
              style={{ width: `${rpmPercent}%` }}
            />
          </div>
        </div>

        {/* Aerodynamics & G-Force indicators */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[10px]">
          {/* Active DRS */}
          <div className="flex items-center justify-between bg-white/5 px-2 py-1.5 border border-white/5">
            <span className="text-white/50 flex items-center gap-1">
              <Wind className="w-3 h-3" /> DRS
            </span>
            <span className={`font-bold ${isDrsActive ? 'text-white' : 'text-white/30'}`}>
              {isDrsActive ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>

          {/* G-Force */}
          <div className="flex items-center justify-between bg-white/5 px-2 py-1.5 border border-white/5">
            <span className="text-white/50 flex items-center gap-1">
              <Activity className="w-3 h-3" /> G-FORCE
            </span>
            <span className="text-white font-mono">
              {gForce.y > 0 ? `+${gForce.y}g` : '0.0g'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
