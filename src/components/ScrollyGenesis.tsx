import React, { useState, useEffect, useRef } from 'react';
import { Wind, Gauge, Shield, Zap, Info, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export const ScrollyGenesis: React.FC = () => {
  const [aeroMode, setAeroMode] = useState<'downforce' | 'drs' | 'airbrake'>('downforce');
  const [selectedHotspot, setSelectedHotspot] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const hotspots = [
    {
      id: 0,
      title: 'Swan-Neck Carbon Rear Wing with DRS',
      location: 'Rear Axle / Upper Deck',
      description: 'The highest point of the wing sits higher than the roof for the first time on a road-legal Porsche. A hydraulic actuator adjusts the upper wing blade in milliseconds between maximum downforce and minimal drag (DRS).',
      spec: 'Up to 409 kg downforce on rear axle alone at 285 km/h',
      x: 82, // percentage on diagram
      y: 32
    },
    {
      id: 1,
      title: 'Central Radiator Motorsport Concept',
      location: 'Front Bonnet & Nose',
      description: 'Derived straight from the Le Mans-winning 911 RSR: rather than three radiators, a single large central radiator is angled in the nose. This frees up the flanks for active aerodynamic wing elements.',
      spec: 'Air exits through giant CFRP bonnet nostrils',
      x: 28,
      y: 46
    },
    {
      id: 2,
      title: 'Front Wheel Arch Louvers & Side Blades',
      location: 'Front Fenders',
      description: 'Wheel rotation causes high pressure in the wheel arches. Louvers ventilate this air, reducing aerodynamic lift, while vertical side blades guide airflow precisely down the vehicle flank.',
      spec: 'Reduces front axle aerodynamic lift by 45%',
      x: 35,
      y: 58
    },
    {
      id: 3,
      title: 'Active Underbody Front Diffuser',
      location: 'Front Underbody Lip',
      description: 'Two continuously adjustable hydraulic flaps beneath the front splitter sync in real-time with the rear wing to maintain ideal aerodynamic balance across every braking and cornering phase.',
      spec: 'Synchronized dual-axle aero mapping',
      x: 18,
      y: 72
    }
  ];

  // Wind tunnel canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
      color: string;
      baseY: number;
    }

    const particles: Particle[] = [];
    const particleCount = 75;

    for (let i = 0; i < particleCount; i++) {
      const baseY = Math.random() * height;
      particles.push({
        x: Math.random() * width,
        y: baseY,
        baseY: baseY,
        speed: 4 + Math.random() * 8,
        length: 20 + Math.random() * 50,
        opacity: 0.2 + Math.random() * 0.7,
        color: Math.random() > 0.6 ? '#64D2FF' : Math.random() > 0.3 ? '#D11D27' : '#ffffff'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Speed multiplier based on aero mode
      const speedMult = aeroMode === 'drs' ? 1.6 : aeroMode === 'airbrake' ? 0.6 : 1.1;

      particles.forEach((p) => {
        p.x += p.speed * speedMult;
        if (p.x > width + p.length) {
          p.x = -p.length;
          p.y = p.baseY = Math.random() * height;
        }

        // Deflect particles around the central car profile area
        const carCenterX = width * 0.5;
        const carCenterY = height * 0.6;
        const dx = p.x - carCenterX;
        const dy = p.y - carCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetY = p.baseY;
        if (dist < 180 && p.x > width * 0.2 && p.x < width * 0.8) {
          if (p.baseY < carCenterY) {
            // Deflect over roof / wing
            const lift = aeroMode === 'airbrake' ? 70 : aeroMode === 'downforce' ? 45 : 25;
            targetY = p.baseY - (180 - dist) * 0.45 - (p.x > width * 0.65 ? lift : 0);
          } else {
            // Deflect underbody
            targetY = p.baseY + (180 - dist) * 0.25;
          }
        }
        p.y += (targetY - p.y) * 0.15;

        // Draw streamline
        ctx.beginPath();
        const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.length, p.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, p.color);
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = aeroMode === 'downforce' ? 2 : 1.5;
        ctx.globalAlpha = p.opacity;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [aeroMode]);

  return (
    <section
      id="aerodynamics"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] sm:text-[28rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        AERO
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono">
              01 // Motorsport Aerodynamics Lab
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white font-sans">
              Sculpted by <span className="font-bold italic">Airflow</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-light leading-relaxed">
            Every surface, intake, and vent serves a singular purpose: turning high-speed airflow into unyielding lateral grip on track.
          </p>
        </div>

        {/* Wind Tunnel Simulator Screen */}
        <div className="relative w-full bg-black border border-white/20 p-6 sm:p-8 mb-8">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-white/80 uppercase font-semibold">
                Weissach Wind Tunnel Active Streamlines
              </span>
            </div>

            {/* Active Aero Mode Switcher in Minimalist Style */}
            <div className="flex items-center gap-2 border border-white/20 p-1">
              <button
                onClick={() => setAeroMode('downforce')}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                  aeroMode === 'downforce'
                    ? 'bg-white text-black font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Max Downforce (34°)
              </button>
              <button
                onClick={() => setAeroMode('drs')}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                  aeroMode === 'drs'
                    ? 'bg-white text-black font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                DRS Low Drag (0°)
              </button>
              <button
                onClick={() => setAeroMode('airbrake')}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                  aeroMode === 'airbrake'
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Airbrake (85°)
              </button>
            </div>
          </div>

          {/* Interactive Visual Stage with Canvas Overlay */}
          <div className="relative w-full h-[360px] sm:h-[480px] my-6 border border-white/10 bg-black flex items-center justify-center overflow-hidden">
            
            {/* Background Streamline Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

            {/* Central Car Aero Profile Asset */}
            <div className="relative z-0 max-w-3xl w-full px-6 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80"
                alt="Porsche 911 GT3 RS aero silhouette"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] brightness-90"
              />
            </div>

            {/* Interactive Hotspot Markers */}
            {hotspots.map((spot) => {
              const isSelected = selectedHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 group p-2 transition-all ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <span className="relative flex h-5 w-5">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-red-600' : 'bg-white'
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-5 w-5 border border-white items-center justify-center text-[9px] font-bold text-white shadow-lg ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-black text-white'
                      }`}
                    >
                      {spot.id + 1}
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Aero Mode Telemetry Overlay HUD */}
            <div className="absolute bottom-4 right-4 z-20 bg-black/90 border border-white/20 p-3 text-xs font-mono">
              <div className="text-white/40 text-[9px] uppercase tracking-widest mb-1.5">Aero Telemetry @ 285 km/h</div>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-white/40 block text-[9px]">DOWNFORCE</span>
                  <span className="text-sm font-bold text-white">
                    {aeroMode === 'downforce' ? '860 kg' : aeroMode === 'drs' ? '410 kg' : '1,150 kg'}
                  </span>
                </div>
                <div className="w-[1px] h-6 bg-white/20" />
                <div>
                  <span className="text-white/40 block text-[9px]">DRAG (Cd)</span>
                  <span className="text-sm font-bold text-white">
                    {aeroMode === 'downforce' ? '0.39' : aeroMode === 'drs' ? '0.27' : '0.65'}
                  </span>
                </div>
                <div className="w-[1px] h-6 bg-white/20" />
                <div>
                  <span className="text-white/40 block text-[9px]">WING ANGLE</span>
                  <span className="text-sm font-bold text-red-500">
                    {aeroMode === 'downforce' ? '+34°' : aeroMode === 'drs' ? '0° (DRS)' : '+85° (AIR)'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Active Hotspot Inspector Card */}
          <div className="bg-white/5 border border-white/10 p-5 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-red-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                  {selectedHotspot + 1}
                </span>
                <h3 className="text-base font-bold text-white tracking-wide">
                  {hotspots[selectedHotspot].title}
                </h3>
              </div>
              <span className="text-xs font-mono text-white/70 bg-white/10 px-2.5 py-1 border border-white/10">
                {hotspots[selectedHotspot].location}
              </span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed mb-3 font-light">
              {hotspots[selectedHotspot].description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-white/90 bg-white/5 px-3 py-2 border border-white/10">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              <span>Engineering Telemetry: {hotspots[selectedHotspot].spec}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
