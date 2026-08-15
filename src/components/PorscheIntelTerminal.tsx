import React, { useState } from 'react';
import { Search, Globe, ExternalLink, Sparkles, Cpu, Trophy, Gauge, ArrowRight, Loader2, BookOpen, AlertCircle } from 'lucide-react';

interface IntelResponse {
  text: string;
  sources: { title: string; uri: string }[];
  modelUsed: string;
}

const PRESET_QUERIES = [
  {
    id: 'nurburgring-records',
    title: 'Nürburgring Lap Times',
    query: 'What are the latest official Nürburgring Nordschleife lap record times for the Porsche 911 GT3 RS and Taycan Turbo GT with Weissach package?',
    category: 'Telemetry'
  },
  {
    id: 'pts-catalog',
    title: 'Paint to Sample (PTS) List',
    query: 'What are the most iconic Porsche Exclusive Manufaktur Paint to Sample (PTS) colors available and how does the PTS Plus process work?',
    category: 'Manufaktur'
  },
  {
    id: 'drs-aerodynamics',
    title: '992 GT3 RS Active Aero & DRS',
    query: 'Explain the active aerodynamics, DRS wing mechanism, and downforce telemetry on the Porsche 911 GT3 RS (992 generation).',
    category: 'Engineering'
  },
  {
    id: 'racing-results',
    title: '24h Le Mans & WEC Standings',
    query: 'What are the recent race results, podium finishes, and championship standings for the Porsche 963 LMDh in WEC Hypercar and IMSA GTP?',
    category: 'Motorsport'
  }
];

export const PorscheIntelTerminal: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IntelResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const handleSearch = async (searchPrompt: string) => {
    if (!searchPrompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    setQuery(searchPrompt);

    try {
      const res = await fetch('/api/porsche-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: searchPrompt }),
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve live Porsche intelligence');
      }

      const data: IntelResponse = await res.json();
      setResponse(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Network error occurred while contacting Porsche Intelligence.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <section
      id="live-intel"
      className="relative py-24 bg-black border-t border-white/10 text-white overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] sm:text-[24rem] font-black opacity-[0.02] select-none text-white pointer-events-none tracking-tighter">
        TELEMETRY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-2 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>07 // Real-Time Search Grounding Intel</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white font-sans">
              Porsche <span className="font-bold italic">Live Terminal</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/60 font-light leading-relaxed">
            Real-time telemetry, lap records, and Exclusive Manufaktur catalog powered by Google Search Grounding.
          </p>
        </div>

        {/* Quick Query Selector Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {PRESET_QUERIES.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setActivePreset(preset.id);
                  handleSearch(preset.query);
                }}
                className={`p-4 border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white/10 border-white text-white'
                    : 'bg-black border-white/20 hover:border-white/40 text-white/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase">
                    {preset.category}
                  </span>
                  <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">
                  {preset.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Search Input Terminal */}
        <div className="bg-black border border-white/20 p-6 sm:p-8 mb-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about lap records, PTS codes, 800V charging, or active aerodynamics..."
                className="w-full bg-black border border-white/20 pl-11 pr-4 py-3.5 text-xs sm:text-sm font-mono text-white placeholder-white/40 focus:outline-none focus:border-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-8 py-3.5 bg-white text-black hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Grounding...</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Query Intel</span>
                </>
              )}
            </button>
          </form>

          {/* Status Indicator Bar */}
          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-white/40 pt-4 mt-4 border-t border-white/10 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Google Search Grounding Engine // Active</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Model: gemini-3.5-flash</span>
              <span>Source Verification: Real-Time Web</span>
            </div>
          </div>
        </div>

        {/* Results Display Area */}
        {loading && (
          <div className="bg-black border border-white/20 p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-red-500 mb-4" />
            <div className="text-sm font-mono text-white uppercase tracking-wider mb-1">
              Executing Grounded Web Search
            </div>
            <p className="text-xs text-white/50 font-light">
              Querying verified motorsport databases, Nürburgring records, and Porsche engineering bulletins...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-black border border-red-500/40 p-6 flex items-start gap-3 text-red-400 font-mono text-xs">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-bold mb-1">Search Grounding Dispatch Alert</div>
              <div>{error}</div>
            </div>
          </div>
        )}

        {response && !loading && (
          <div className="bg-black border border-white/20 p-6 sm:p-10 shadow-2xl animate-fade-in">
            
            {/* Intel Answer Content */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="text-xs font-mono text-white/60 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-500" />
                  <span>Verified Porsche Engineering Dispatch</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 bg-white/10 border border-white/20 text-white">
                  SEARCH GROUNDED
                </span>
              </div>

              <div className="text-sm sm:text-base text-white/90 font-light leading-relaxed whitespace-pre-line">
                {response.text}
              </div>
            </div>

            {/* Verified Web Citations & Sources */}
            {response.sources && response.sources.length > 0 && (
              <div className="pt-6 border-t border-white/10">
                <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-white/60" />
                  <span>Verified Web Citations & Grounding Sources</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {response.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 border border-white/10 hover:border-white/40 transition-all flex items-start justify-between group"
                    >
                      <div className="pr-2">
                        <div className="text-xs font-bold text-white line-clamp-1 group-hover:text-red-500 transition-colors">
                          {source.title}
                        </div>
                        <div className="text-[10px] font-mono text-white/40 truncate max-w-[220px] mt-0.5">
                          {source.uri}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white shrink-0 mt-0.5 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
