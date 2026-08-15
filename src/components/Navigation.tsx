import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ChevronRight, Gauge, Radio, Shield, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenConfigurator: (modelId?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenConfigurator
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioMode, setAudioMode] = useState<'flat6' | 'electric'>('flat6');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
    if (!nextMuted) {
      audioEngine.start(1200);
    }
  };

  const toggleAudioMode = (mode: 'flat6' | 'electric') => {
    setAudioMode(mode);
    audioEngine.setMode(mode);
  };

  const navLinks = [
    { id: 'hero', label: 'Genesis' },
    { id: 'aerodynamics', label: 'Aero' },
    { id: 'models', label: 'Models' },
    { id: 'comparison', label: 'Compare' },
    { id: 'taycan', label: 'Electric Soul' },
    { id: 'acoustic-lab', label: 'Sound Lab' },
    { id: 'configurator', label: 'Studio' },
    { id: 'live-intel', label: 'Live Intel' },
    { id: 'heritage', label: 'Heritage' }
  ];

  return (
    <header
      id="porsche-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-black via-black/90 to-transparent'
      }`}
    >
      {/* Designer Head Attribution Banner */}
      <div className="w-full bg-gradient-to-r from-black via-[#161618] to-black border-b border-white/10 py-1.5 px-4 text-center overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-[10px] sm:text-xs">
          <span className="w-1 h-1 bg-red-600 rotate-45 animate-pulse hidden sm:inline-block" />
          <span 
            className="font-['Cinzel',serif] font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-white hover:brightness-125 transition-all"
            style={{ textShadow: '0 0 16px rgba(255, 255, 255, 0.2)' }}
          >
            THIS WEBSITE WAS CREATED BY <span className="text-white underline decoration-red-600 underline-offset-4 font-black">HIMANSHU MEHTA</span>
          </span>
          <span className="w-1 h-1 bg-red-600 rotate-45 animate-pulse hidden sm:inline-block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between">
        
        {/* Brand Logo / Wordmark */}
        <div 
          onClick={() => onNavigate('hero')}
          className="cursor-pointer flex items-center gap-3 group"
          id="nav-logo-brand"
        >
          <div className="w-5 h-5 border border-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 bg-white"></div>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] uppercase text-white font-sans">
            PORSCHE
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  isActive
                    ? 'text-white opacity-100'
                    : 'text-white/60 hover:text-white hover:opacity-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Controls: Audio Synthesizer & Experience CTA */}
        <div className="flex items-center space-x-4">
          
          {/* Engine Acoustic Sound Controller */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-white/20 text-xs">
            <button
              id="nav-audio-mute-toggle"
              onClick={toggleMute}
              title={isMuted ? 'Unmute Porsche Flat-6 acoustics' : 'Mute audio'}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <div className="flex items-end gap-[2px] h-2.5">
                    <span className="w-[1.5px] h-1.5 bg-red-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-[1.5px] h-2.5 bg-red-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-[1.5px] h-2 bg-red-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </button>
            
            <div className="w-[1px] h-3 bg-white/20" />

            <button
              onClick={() => toggleAudioMode(audioMode === 'flat6' ? 'electric' : 'flat6')}
              className="text-[10px] uppercase font-mono tracking-widest text-white/60 hover:text-white transition-colors"
              title="Toggle Flat-6 combustion vs E-Sound"
            >
              {audioMode === 'flat6' ? (
                <span className="text-white">Flat-6</span>
              ) : (
                <span className="text-red-500">E-Sound</span>
              )}
            </button>
          </div>

          {/* Direct CTA Buttons in Clean Minimal Style */}
          <button
            id="nav-book-experience-btn"
            onClick={onOpenBooking}
            className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-white text-black px-5 py-2 hover:bg-red-600 hover:text-white transition-all"
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Test Drive</span>
          </button>

          <button
            id="nav-configurator-quick-btn"
            onClick={() => onOpenConfigurator()}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest border border-white/30 px-5 py-2 hover:bg-white hover:text-black transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white border border-white/20 hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/98 border-b border-white/10 px-8 py-6 transition-all">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2.5 px-3 text-xs tracking-[0.2em] font-semibold uppercase border-b border-white/5 flex items-center justify-between ${
                  activeSection === link.id
                    ? 'text-red-600 font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Gauge className="w-4 h-4" />
                <span>Reserve VIP Experience</span>
              </button>

              <button
                onClick={() => {
                  onOpenConfigurator();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 border border-white/40 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Bespoke Studio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
