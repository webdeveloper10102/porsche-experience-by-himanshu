import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ChevronRight, Shield, Download, Gauge, RotateCcw, Share2, Layers } from 'lucide-react';
import { PORSCHE_MODELS } from '../data/porscheData';
import { ConfiguratorState } from '../types';

interface BespokeStudioProps {
  initialModelId?: string;
  onBookWithConfig: (modelId: string, buildSummary: string) => void;
}

export const BespokeStudio: React.FC<BespokeStudioProps> = ({
  initialModelId = '911-gt3-rs',
  onBookWithConfig
}) => {
  const [config, setConfig] = useState<ConfiguratorState>({
    modelId: initialModelId,
    selectedColorIndex: 0,
    selectedWheelIndex: 0,
    hasWeissachPackage: true,
    hasPCCB: true,
    caliperColor: 'yellow',
    interiorTheme: 'race-tex-black',
    sportExhaustActive: true
  });

  useEffect(() => {
    if (initialModelId) {
      setConfig((prev) => ({
        ...prev,
        modelId: initialModelId,
        selectedColorIndex: 0,
        selectedWheelIndex: 0
      }));
    }
  }, [initialModelId]);

  const [activeTab, setActiveTab] = useState<'exterior' | 'wheels' | 'weissach' | 'interior'>('exterior');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const currentModel = PORSCHE_MODELS.find((m) => m.id === config.modelId) || PORSCHE_MODELS[0];

  const wheelsList = [
    { name: '20/21-inch Forged Lightweight Magnesium (Weissach)', price: 0, finish: 'Satin Black' },
    { name: '20/21-inch GT3 RS Center-Lock Forged Aluminium', price: 0, finish: 'Brushed Silver' },
    { name: '20/21-inch Wheels in Neodyme (Gold Bronze)', price: 1200, finish: 'Neodyme' },
    { name: '20/21-inch Wheels in Pyro Red Accent', price: 1200, finish: 'Pyro Red' }
  ];

  const interiorThemes = [
    { id: 'race-tex-black', name: 'Race-Tex & Leather with Guards Red Stitching', price: 0, imageHex: '#1E1E24' },
    { id: 'carbon-yellow', name: 'Full Carbon Bucket Seats with Racing Yellow Stitching', price: 4200, imageHex: '#25231A' },
    { id: 'leather-bordeaux', name: 'Club Leather Interior in Bordeaux Red & Black', price: 5800, imageHex: '#4A1218' },
    { id: 'heritage-pepita', name: 'Heritage Design Classic Pepita Houndstooth', price: 9200, imageHex: '#353839' }
  ];

  // Calculate total configured price
  const weissachPrice = config.hasWeissachPackage ? (config.modelId === '911-gt3-rs' ? 33520 : 28000) : 0;
  const pccbPrice = config.hasPCCB ? 9210 : 0;
  const wheelsPrice = wheelsList[config.selectedWheelIndex]?.price || 0;
  const interiorPrice = interiorThemes.find((i) => i.id === config.interiorTheme)?.price || 0;
  const colorPrice = currentModel.colors[config.selectedColorIndex]?.type === 'pts' ? 14750 : currentModel.colors[config.selectedColorIndex]?.type === 'special' ? 4220 : 0;

  const totalCalculatedPrice = currentModel.basePriceUSD + weissachPrice + pccbPrice + wheelsPrice + interiorPrice + colorPrice;

  const handleShareBuild = () => {
    const buildCode = `POR-${config.modelId.toUpperCase()}-${config.selectedColorIndex}${config.selectedWheelIndex}-${config.hasWeissachPackage ? 'W' : 'S'}-${Date.now().toString().slice(-4)}`;
    navigator.clipboard?.writeText?.(`Porsche Build Code: ${buildCode} | Model: ${currentModel.name} | Total MSRP: $${totalCalculatedPrice.toLocaleString()}`);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleBookTestDrive = () => {
    const summary = `${currentModel.name} (${currentModel.colors[config.selectedColorIndex]?.name}, ${config.hasWeissachPackage ? 'Weissach Package' : 'Standard'}, MSRP $${totalCalculatedPrice.toLocaleString()})`;
    onBookWithConfig(config.modelId, summary);
  };

  return (
    <section
      id="configurator"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] sm:text-[28rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        BESPOKE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono">
              05 // Porsche Exclusive Manufaktur
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight font-sans">
              Bespoke <span className="font-bold italic">Studio</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-light leading-relaxed">
            Customize your Porsche with individual paint finishes, lightweight aerodynamic Weissach carbon, and motorsport cockpit trims.
          </p>
        </div>

        {/* Model Switcher Bar */}
        <div className="flex flex-wrap gap-2 mb-8 border border-white/20 p-1">
          {PORSCHE_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setConfig({ ...config, modelId: model.id, selectedColorIndex: 0 })}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                config.modelId === model.id
                  ? 'bg-white text-black font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* Configurator Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Dynamic Vehicle Canvas / Visual Stage (7 cols) */}
          <div className="lg:col-span-7 bg-black border border-white/20 p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl">
            
            {/* Top Config Status Tags */}
            <div className="flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 bg-white/10 border border-white/20 text-white">
                  {currentModel.colors[config.selectedColorIndex]?.name}
                </span>
                {config.hasWeissachPackage && (
                  <span className="text-xs font-mono px-3 py-1 bg-red-600 text-white font-bold">
                    WEISSACH CARBON
                  </span>
                )}
              </div>

              <span className="text-xs font-mono text-white/40">
                Studio View 01
              </span>
            </div>

            {/* Vehicle Preview Container */}
            <div className="relative aspect-[16/10] overflow-hidden mb-6 flex items-center justify-center bg-black border border-white/15 group">
              
              {/* Main Model Image */}
              <img
                src={currentModel.heroImage}
                alt={currentModel.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Weissach Carbon Fiber Hood Overlay Indicator */}
              {config.hasWeissachPackage && (
                <div className="absolute top-3 right-3 bg-black/90 px-3 py-1 text-[10px] font-mono text-white border border-white/20 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-red-500" />
                  <span>Carbon Bonnet & Wing</span>
                </div>
              )}
            </div>

            {/* Configured Telemetry Specs Bar */}
            <div className="grid grid-cols-4 gap-2 bg-white/5 p-3.5 border border-white/10 text-center font-mono">
              <div>
                <span className="text-[9px] text-white/40 block">OUTPUT</span>
                <span className="text-sm font-bold text-white">{currentModel.powerPS} PS</span>
              </div>
              <div>
                <span className="text-[9px] text-white/40 block">0-100 KM/H</span>
                <span className="text-sm font-bold text-white">{currentModel.zeroToHundred} s</span>
              </div>
              <div>
                <span className="text-[9px] text-white/40 block">TOP SPEED</span>
                <span className="text-sm font-bold text-white">{currentModel.topSpeedKmh} km/h</span>
              </div>
              <div>
                <span className="text-[9px] text-white/40 block">DOWNFORCE</span>
                <span className="text-sm font-bold text-red-500">{currentModel.aerodynamics.downforceKgAt285} kg</span>
              </div>
            </div>

          </div>

          {/* Right: Customization Controls & Pricing Calculator (5 cols) */}
          <div className="lg:col-span-5 bg-black border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Customizer Subtabs */}
              <div className="grid grid-cols-4 gap-1 border border-white/20 p-1 mb-6">
                {[
                  { id: 'exterior', label: 'Paint' },
                  { id: 'wheels', label: 'Wheels' },
                  { id: 'weissach', label: 'Aero' },
                  { id: 'interior', label: 'Cabin' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-black font-bold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Exterior Paint Colors */}
              {activeTab === 'exterior' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Select Paint Finish
                    </span>
                    <span className="text-xs font-mono text-red-500 font-bold">
                      {colorPrice > 0 ? `+$${colorPrice.toLocaleString()}` : 'Included'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {currentModel.colors.map((color, idx) => {
                      const isSelected = config.selectedColorIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setConfig({ ...config, selectedColorIndex: idx })}
                          className={`p-2.5 border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white/10 border-white text-white'
                              : 'bg-black border-white/20 hover:border-white/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="w-4 h-4 border border-white/30"
                              style={{ backgroundColor: color.hex }}
                            />
                            {isSelected && <Check className="w-3.5 h-3.5 text-red-500" />}
                          </div>
                          <span className="text-[11px] font-bold text-white line-clamp-1">{color.name}</span>
                          <span className="text-[9px] font-mono text-white/40 uppercase">{color.type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Wheels & Brakes */}
              {activeTab === 'wheels' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                    Motorsport Wheel Sets
                  </span>
                  <div className="space-y-2">
                    {wheelsList.map((wheel, idx) => {
                      const isSelected = config.selectedWheelIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setConfig({ ...config, selectedWheelIndex: idx })}
                          className={`w-full p-3 border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-white/10 border-white'
                              : 'bg-black border-white/20 hover:border-white/40'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{wheel.name}</div>
                            <div className="text-[10px] font-mono text-white/40">Finish: {wheel.finish}</div>
                          </div>
                          <span className="text-xs font-mono text-white/70">
                            {wheel.price > 0 ? `+$${wheel.price.toLocaleString()}` : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* PCCB Ceramic Brakes Toggle */}
                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => setConfig({ ...config, hasPCCB: !config.hasPCCB })}
                      className={`w-full p-3 border flex items-center justify-between transition-all ${
                        config.hasPCCB ? 'bg-white/10 border-white' : 'bg-black border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Ceramic Composite Brakes (PCCB)</div>
                        <div className="text-[10px] font-mono text-white/40">410mm Carbon Ceramic Discs with Yellow Calipers</div>
                      </div>
                      <span className="text-xs font-mono text-red-500 font-bold">
                        {config.hasPCCB ? '+$9,210' : 'Standard Steel'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Weissach Package & Carbon Aero */}
              {activeTab === 'weissach' && (
                <div className="space-y-4">
                  <div
                    onClick={() => setConfig({ ...config, hasWeissachPackage: !config.hasWeissachPackage })}
                    className={`p-4 border cursor-pointer transition-all ${
                      config.hasWeissachPackage
                        ? 'bg-white/10 border-red-600'
                        : 'bg-black border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Weissach Package</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-red-500">
                        +$33,520
                      </span>
                    </div>
                    <p className="text-xs text-white/70 font-light leading-relaxed mb-3">
                      Exposed visual carbon weave on front lid, roof, rear wing, and exterior mirror upper trims. CFRP anti-roll bars and coupling rods.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-red-500">
                      <Check className="w-3.5 h-3.5" />
                      <span>Shaves 22 kg of total vehicle weight</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Cabin & Interior Theme */}
              {activeTab === 'interior' && (
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                    Cockpit Trims & Bucket Seats
                  </span>
                  {interiorThemes.map((theme) => {
                    const isSelected = config.interiorTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => setConfig({ ...config, interiorTheme: theme.id as typeof config.interiorTheme })}
                        className={`w-full p-3 border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-white/10 border-white'
                            : 'bg-black border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{theme.name}</div>
                          <div className="text-[10px] font-mono text-white/40">Includes Sport Chrono Package</div>
                        </div>
                        <span className="text-xs font-mono text-white/70">
                          {theme.price > 0 ? `+$${theme.price.toLocaleString()}` : 'Included'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Total Price Summary & Action Buttons */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Total Configured MSRP</span>
                  <div className="text-2xl sm:text-3xl font-light text-white font-sans">
                    ${totalCalculatedPrice.toLocaleString()} <span className="text-xs font-mono text-white/40">USD</span>
                  </div>
                </div>
                <button
                  onClick={handleShareBuild}
                  className="px-3.5 py-1.5 border border-white/20 hover:border-white text-xs font-mono tracking-wider text-white flex items-center gap-1.5 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? 'Code Copied!' : 'Share Build'}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="configurator-book-experience-btn"
                  onClick={handleBookTestDrive}
                  className="flex-1 py-3.5 bg-white text-black hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Gauge className="w-4 h-4" />
                  <span>Test Drive This Build</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
