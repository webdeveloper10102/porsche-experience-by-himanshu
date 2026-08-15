import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gauge, Zap, Wind, ArrowRight, Sparkles, Volume2, ShieldCheck, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { PORSCHE_MODELS } from '../data/porscheData';
import { CarModel } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface ModelShowcaseProps {
  onSelectModelForConfig: (modelId: string) => void;
  onOpenBookingWithModel: (modelId: string) => void;
}

export const ModelShowcase: React.FC<ModelShowcaseProps> = ({
  onSelectModelForConfig,
  onOpenBookingWithModel
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModelId, setActiveModelId] = useState<string>('911-gt3-rs');
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  const filteredModels = selectedCategory === 'all'
    ? PORSCHE_MODELS
    : PORSCHE_MODELS.filter((m) => m.category === selectedCategory);

  const currentModel = PORSCHE_MODELS.find((m) => m.id === activeModelId) || PORSCHE_MODELS[0];

  const handleModelSelect = (id: string) => {
    setActiveModelId(id);
    setActiveColorIndex(0);
    setActiveGalleryIndex(0);
    
    // Switch acoustic profile
    if (id.includes('taycan') || id.includes('mission')) {
      audioEngine.setMode('electric');
    } else {
      audioEngine.setMode('flat6');
    }
  };

  const playEngineSound = () => {
    audioEngine.setMuted(false);
    audioEngine.start(2000);
    setTimeout(() => {
      audioEngine.setRpm(5500);
    }, 400);
    setTimeout(() => {
      audioEngine.setRpm(8500);
    }, 1000);
    setTimeout(() => {
      audioEngine.playGearShift();
      audioEngine.setRpm(3000);
    }, 1800);
    setTimeout(() => {
      audioEngine.setRpm(1000);
    }, 2800);
  };

  return (
    <section
      id="models"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] sm:text-[30rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        MODELS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono">
              02 // The Engineering Lineup
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white font-sans">
              Precision <span className="font-bold italic">Legends</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border border-white/20 p-1">
            {[
              { id: 'all', label: 'All Models' },
              { id: 'super-sport', label: 'Super Sport' },
              { id: 'electric', label: 'E-Performance' },
              { id: 'heritage', label: 'Heritage & Rallye' },
              { id: 'hypercar', label: 'Hypercar Vision' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model Selection Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {filteredModels.map((car) => {
            const isSelected = car.id === activeModelId;
            return (
              <button
                key={car.id}
                onClick={() => handleModelSelect(car.id)}
                className={`p-4 text-left border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white/10 border-white text-white'
                    : 'bg-black border-white/20 hover:border-white/40 text-white/80'
                }`}
              >
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                  {car.series}
                </div>
                <div className="text-sm font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                  {car.name}
                </div>
                <div className="mt-2 text-xs font-mono text-white/60">
                  {car.powerPS} PS • {car.zeroToHundred}s
                </div>
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Model Spotlight Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-black border border-white/20 p-6 sm:p-10 shadow-2xl">
          
          {/* Left: Dynamic Gallery & 360 Visuals (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Top Tags */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-mono font-bold uppercase tracking-wider">
                    {currentModel.series}
                  </span>
                  {currentModel.nurburgringLapTime && (
                    <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-mono tracking-wider">
                      Ring: {currentModel.nurburgringLapTime}
                    </span>
                  )}
                </div>

                <button
                  onClick={playEngineSound}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black text-xs font-mono tracking-wider text-white border border-white/20 transition-all group"
                  title="Rev Engine Note"
                >
                  <Volume2 className="w-3.5 h-3.5 text-red-500 group-hover:text-black" />
                  <span>ACOUSTIC REV</span>
                </button>
              </div>

              {/* Main Vehicle Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black border border-white/15 mb-4 group">
                <img
                  src={currentModel.galleryImages[activeGalleryIndex]?.url || currentModel.heroImage}
                  alt={currentModel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Image caption badge */}
                <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 text-xs font-mono text-white/90 border border-white/20">
                  {currentModel.galleryImages[activeGalleryIndex]?.title || 'Profile Stance'}
                </div>
              </div>

              {/* Angle Switcher Thumbnails */}
              {currentModel.galleryImages.length > 1 && (
                <div className="flex gap-2">
                  {currentModel.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`flex-1 py-2 px-2 text-[11px] font-mono tracking-wider border transition-all text-center ${
                        activeGalleryIndex === idx
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-black border-white/20 text-white/50 hover:text-white'
                      }`}
                    >
                      {img.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Color Swatch Picker */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-white/60 tracking-wider uppercase">
                  Exterior Finish: <strong className="text-white">{currentModel.colors[activeColorIndex]?.name}</strong>
                </span>
                <span className="text-[10px] font-mono text-red-500 uppercase">
                  {currentModel.colors[activeColorIndex]?.type}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {currentModel.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveColorIndex(idx)}
                    title={color.name}
                    className={`w-7 h-7 transition-all border ${
                      activeColorIndex === idx
                        ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                        : 'border-white/30 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right: Technical Specs & Engineering Deep-Dive (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl sm:text-4xl font-light tracking-tight uppercase text-white font-sans">
                {currentModel.name}
              </h3>
              <p className="text-xs text-red-600 font-mono tracking-widest uppercase mt-1 mb-6">
                {currentModel.tagline}
              </p>

              {/* 4 Core Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Max Output</span>
                  <div className="text-2xl font-light italic text-white font-sans mt-0.5">
                    {currentModel.powerPS} <span className="text-xs font-normal not-italic text-red-600">PS</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{currentModel.powerKW} kW</span>
                </div>

                <div className="bg-white/5 p-3.5 border border-white/10">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">0 - 100 km/h</span>
                  <div className="text-2xl font-light italic text-white font-sans mt-0.5">
                    {currentModel.zeroToHundred} <span className="text-xs font-normal not-italic text-white/60">s</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">Top: {currentModel.topSpeedKmh} km/h</span>
                </div>

                <div className="bg-white/5 p-3.5 border border-white/10">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Max Torque</span>
                  <div className="text-2xl font-light italic text-white font-sans mt-0.5">
                    {currentModel.torqueNm} <span className="text-xs font-normal not-italic text-white/60">Nm</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{currentModel.transmission.split(' ')[0]}</span>
                </div>

                <div className="bg-white/5 p-3.5 border border-white/10">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Curb Weight</span>
                  <div className="text-2xl font-light italic text-white font-sans mt-0.5">
                    {currentModel.weightKg} <span className="text-xs font-normal not-italic text-white/60">kg</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">Cd: {currentModel.aerodynamics.dragCoefficient}</span>
                </div>
              </div>

              {/* Powertrain & Transmission Details */}
              <div className="bg-white/5 p-4 border border-white/10 mb-6 space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">ENGINE</span>
                  <span className="text-white font-medium text-right max-w-[200px] truncate">{currentModel.engineType}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">GEARBOX</span>
                  <span className="text-white">{currentModel.transmission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">DOWNFORCE @ 285 KM/H</span>
                  <span className="text-red-500 font-bold">{currentModel.aerodynamics.downforceKgAt285} kg</span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2 mb-6">
                {currentModel.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                    <span className="w-1 h-1 bg-red-600 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white font-semibold">{h.title}: </strong>
                      <span className="text-white/60 font-light">{h.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => onSelectModelForConfig(currentModel.id)}
                className="flex-1 py-3.5 bg-white text-black hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bespoke Studio</span>
              </button>

              <button
                onClick={() => onOpenBookingWithModel(currentModel.id)}
                className="flex-1 py-3.5 border border-white/40 text-white hover:bg-white hover:text-black text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Gauge className="w-4 h-4" />
                <span>Book Test Drive</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
