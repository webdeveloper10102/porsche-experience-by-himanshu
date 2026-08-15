import React, { useState } from 'react';
import { ChevronRight, Globe, Shield, ArrowUp, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenConfigurator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenConfigurator
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white/70 border-t border-white/10 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Creed (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-light tracking-[0.35em] uppercase text-white font-sans">
                PORSCHE
              </span>
            </div>

            <p className="text-xs text-white/50 leading-relaxed font-light max-w-sm">
              Dr. Ing. h.c. F. Porsche AG is the epitome of sports car manufacturing. Driven by Dreams, engineered with German precision and motorsport passion since 1948.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-mono text-white/80 tracking-wider uppercase block mb-2">
                Porsche Motorsport Dispatch
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border border-white/20 px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <span>Join</span>}
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Models */}
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block mb-4">
              Model Series
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li><button onClick={() => onNavigate('models')} className="hover:text-white transition-colors">911 GT3 RS</button></li>
              <li><button onClick={() => onNavigate('taycan')} className="hover:text-white transition-colors">Taycan Turbo GT</button></li>
              <li><button onClick={() => onNavigate('models')} className="hover:text-white transition-colors">718 Cayman GT4 RS</button></li>
              <li><button onClick={() => onNavigate('models')} className="hover:text-white transition-colors">911 Dakar</button></li>
              <li><button onClick={() => onNavigate('models')} className="hover:text-white transition-colors">Mission X Concept</button></li>
            </ul>
          </div>

          {/* Col 3: Experience & Engineering */}
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block mb-4">
              Experience
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li><button onClick={onOpenBooking} className="hover:text-white transition-colors">Track Day Reservations</button></li>
              <li><button onClick={() => onNavigate('aerodynamics')} className="hover:text-white transition-colors">Wind Tunnel Lab</button></li>
              <li><button onClick={() => onNavigate('comparison')} className="hover:text-white transition-colors">Head-to-Head Compare</button></li>
              <li><button onClick={() => onNavigate('acoustic-lab')} className="hover:text-white transition-colors">9,000 RPM Soundboard</button></li>
              <li><button onClick={onOpenConfigurator} className="hover:text-white transition-colors">Exclusive Manufaktur</button></li>
              <li><button onClick={() => onNavigate('live-intel')} className="hover:text-white transition-colors">Live Intel Terminal</button></li>
              <li><button onClick={() => onNavigate('heritage')} className="hover:text-white transition-colors">Motorsport Heritage</button></li>
            </ul>
          </div>

          {/* Col 4: Centers & Global */}
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block mb-4">
              Locations
            </span>
            <ul className="space-y-2 text-xs font-light text-white/50">
              <li>Stuttgart-Zuffenhausen, DE</li>
              <li>Weissach R&D, DE</li>
              <li>PEC Atlanta & LA, US</li>
              <li>PEC Silverstone, UK</li>
              <li>PEC Hockenheimring, DE</li>
              <li>PEC Shanghai & Tokyo</li>
            </ul>
          </div>

        </div>

        {/* Regulatory, Copyright & Fair-Use Portfolio Disclosures */}
        <div className="py-6 border-b border-white/5 space-y-3 text-[10px] font-mono text-white/40 leading-relaxed">
          <div className="p-3.5 bg-white/[0.03] border border-white/10 text-white/60">
            <strong className="text-white uppercase tracking-wider block mb-1">
              Portfolio & Educational Concept Demonstration Notice:
            </strong>
            This web application is an independent UI/UX and full-stack engineering concept created solely by <strong>Himanshu Mehta</strong> for non-commercial portfolio demonstration and software showcase purposes. All trademarks, brand names, vehicle designations, and logos are property of Dr. Ing. h.c. F. Porsche AG. This project is not affiliated with, sponsored by, or endorsed by Porsche.
          </div>

          <p>
            <strong>Fuel & Electricity Consumption (WLTP):</strong> 911 GT3 RS: Combined 13.4 l/100 km; CO₂ emissions 305 g/km. Taycan Turbo GT (Weissach): Combined 20.7 – 20.6 kWh/100 km; CO₂ emissions: 0 g/km; Range: 555 km.
          </p>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs font-mono text-white/50 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span>© {new Date().getFullYear()} Dr. Ing. h.c. F. Porsche AG.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-white/80 font-['Cinzel',serif] tracking-wider">
              Crafted by <strong className="text-white font-bold">Himanshu Mehta</strong>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Legal</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white hover:text-red-500 transition-colors"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
