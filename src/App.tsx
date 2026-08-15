import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { TelemetryHUD } from './components/TelemetryHUD';
import { HeroSection } from './components/HeroSection';
import { ScrollyGenesis } from './components/ScrollyGenesis';
import { ModelShowcase } from './components/ModelShowcase';
import { ModelCompareMatrix } from './components/ModelCompareMatrix';
import { ElectricSoul } from './components/ElectricSoul';
import { AcousticLab } from './components/AcousticLab';
import { BespokeStudio } from './components/BespokeStudio';
import { PorscheIntelTerminal } from './components/PorscheIntelTerminal';
import { MotorsportHeritage } from './components/MotorsportHeritage';
import { ExperienceBookingModal } from './components/ExperienceBookingModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedModelForBooking, setSelectedModelForBooking] = useState<string>('911-gt3-rs');
  const [buildSummaryForBooking, setBuildSummaryForBooking] = useState<string>('');
  const [configuratorInitialModel, setConfiguratorInitialModel] = useState<string>('911-gt3-rs');

  // Scroll spy to detect active section
  useEffect(() => {
    const sectionIds = [
      'hero',
      'aerodynamics',
      'models',
      'comparison',
      'taycan',
      'acoustic-lab',
      'configurator',
      'live-intel',
      'heritage'
    ];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Fallback
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const handleOpenBooking = (modelId: string = '911-gt3-rs', summary?: string) => {
    setSelectedModelForBooking(modelId);
    setBuildSummaryForBooking(summary || '');
    setBookingModalOpen(true);
  };

  const handleOpenConfigurator = (modelId: string = '911-gt3-rs') => {
    setConfiguratorInitialModel(modelId);
    handleNavigate('configurator');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D11D27] selection:text-white font-sans antialiased">
      
      {/* Top Precision Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenConfigurator={handleOpenConfigurator}
      />

      {/* Live Motorsport Telemetry Overlay */}
      <TelemetryHUD activeSection={activeSection} />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={() => handleNavigate('aerodynamics')}
        onOpenBooking={() => handleOpenBooking('911-gt3-rs')}
        onOpenConfigurator={() => handleOpenConfigurator('911-gt3-rs')}
      />

      {/* 01 // Aerodynamics & Wind Tunnel Streamline Lab */}
      <ScrollyGenesis />

      {/* 02 // Engineering Lineup & 360 Spotlight */}
      <ModelShowcase
        onSelectModelForConfig={(id) => handleOpenConfigurator(id)}
        onOpenBookingWithModel={(id) => handleOpenBooking(id)}
      />

      {/* 03 // Head to Head Telemetry Comparison Matrix */}
      <ModelCompareMatrix
        onSelectModelForConfig={(id) => handleOpenConfigurator(id)}
      />

      {/* 04 // Electric Soul & Taycan Attack Mode */}
      <ElectricSoul />

      {/* 05 // 9,000 RPM Acoustic Studio & Gas Pedal Soundboard */}
      <AcousticLab />

      {/* 06 // Porsche Exclusive Manufaktur Bespoke Studio */}
      <BespokeStudio
        initialModelId={configuratorInitialModel}
        onBookWithConfig={(id, summary) => handleOpenBooking(id, summary)}
      />

      {/* 07 // Live Google Search Grounding Porsche Intelligence Terminal */}
      <PorscheIntelTerminal />

      {/* 08 // 75+ Years Motorsport Heritage Timeline */}
      <MotorsportHeritage />

      {/* VIP Test Drive & Track Reservation Modal */}
      <ExperienceBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultModelId={selectedModelForBooking}
        defaultBuildSummary={buildSummaryForBooking}
      />

      {/* Official Footer with WLTP Compliance */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenConfigurator={() => handleOpenConfigurator()}
      />

    </div>
  );
}
