import React, { useState } from 'react';
import { X, Gauge, Check, Calendar, MapPin, User, ShieldCheck, QrCode, Download, Sparkles } from 'lucide-react';
import { PORSCHE_MODELS, EXPERIENCE_CENTERS } from '../data/porscheData';
import { TestDriveBooking } from '../types';

interface ExperienceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModelId?: string;
  defaultBuildSummary?: string;
}

export const ExperienceBookingModal: React.FC<ExperienceBookingModalProps> = ({
  isOpen,
  onClose,
  defaultModelId = '911-gt3-rs',
  defaultBuildSummary
}) => {
  const [formData, setFormData] = useState<TestDriveBooking>({
    modelId: defaultModelId,
    experienceCenter: 'pec-atlanta',
    preferredDate: '2026-09-18',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    drivingLicenseValid: true,
    trackCoachRequested: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const selectedModel = PORSCHE_MODELS.find((m) => m.id === formData.modelId) || PORSCHE_MODELS[0];
  const selectedCenter = EXPERIENCE_CENTERS.find((c) => c.id === formData.experienceCenter) || EXPERIENCE_CENTERS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `POR-PEC-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setIsSubmitted(true);
  };

  const handleDownloadTicket = () => {
    alert(`VIP Pass #${ticketId} downloaded successfully! An official Porsche Concierge invitation has been confirmed for ${selectedCenter.name}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-black border border-white/20 p-6 sm:p-10 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 border border-white/20 hover:border-white text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="text-red-600 uppercase tracking-[0.25em] text-xs font-bold mb-1 font-mono">
                Porsche Experience Center
              </div>
              <h3 className="text-3xl font-light uppercase text-white font-sans">
                Reserve VIP <span className="font-bold italic">Session</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
                {defaultBuildSummary ? `Configured: ${defaultBuildSummary}` : 'Experience full-throttle dynamics on closed circuit handling tracks.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Vehicle Selection */}
              <div>
                <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                  Select Porsche Model
                </label>
                <select
                  value={formData.modelId}
                  onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-sm font-sans text-white focus:outline-none focus:border-white"
                >
                  {PORSCHE_MODELS.map((model) => (
                    <option key={model.id} value={model.id} className="bg-black text-white">
                      {model.name} — {model.powerPS} PS ({model.engineType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Center Location */}
              <div>
                <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                  Porsche Experience Center Location
                </label>
                <select
                  value={formData.experienceCenter}
                  onChange={(e) => setFormData({ ...formData, experienceCenter: e.target.value })}
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-sm font-sans text-white focus:outline-none focus:border-white"
                >
                  {EXPERIENCE_CENTERS.map((center) => (
                    <option key={center.id} value={center.id} className="bg-black text-white">
                      {center.name} ({center.country} - {center.trackLength})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    Preferred Session Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    1-on-1 Factory Instructor
                  </label>
                  <div className="flex items-center h-10 px-3 bg-black border border-white/20">
                    <input
                      type="checkbox"
                      id="coach-check"
                      checked={formData.trackCoachRequested}
                      onChange={(e) => setFormData({ ...formData, trackCoachRequested: e.target.checked })}
                      className="w-4 h-4 accent-red-600 mr-2"
                    />
                    <label htmlFor="coach-check" className="text-xs font-mono text-white/80 cursor-pointer">
                      Include 1-on-1 Pro Driver Coaching
                    </label>
                  </div>
                </div>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ferry"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Porsche"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="driver@porsche.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 911-0992"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Generate VIP Track Pass</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Success Ticket Pass View */
          <div className="text-center py-4">
            <div className="w-12 h-12 border border-white/30 text-white flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-red-500" />
            </div>

            <h3 className="text-2xl font-light uppercase text-white font-sans">
              VIP Pass <span className="font-bold italic">Confirmed</span>
            </h3>
            <p className="text-xs text-white/60 font-mono mt-1 mb-6">
              Your Porsche Experience Center reservation is secured.
            </p>

            {/* Boarding Pass Card */}
            <div className="bg-black border border-white/30 p-6 text-left mb-6 relative overflow-hidden shadow-2xl">
              
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-bold block">
                    PORSCHE EXPERIENCE VIP INVITATION
                  </span>
                  <span className="text-lg font-light text-white font-sans">{selectedModel.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-white/40 uppercase block">PASS ID</span>
                  <span className="text-xs font-mono font-bold text-white">{ticketId}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4">
                <div>
                  <span className="text-white/40 block text-[10px]">CIRCUIT LOCATION</span>
                  <span className="text-white font-semibold">{selectedCenter.name}</span>
                  <span className="text-[10px] text-white/50 block">{selectedCenter.country}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">DATE & DRIVER</span>
                  <span className="text-white font-semibold">{formData.preferredDate}</span>
                  <span className="text-[10px] text-white/50 block">{formData.firstName} {formData.lastName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono text-white/70 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                  <span>1-on-1 Factory Driving Instructor Included</span>
                </div>
                <QrCode className="w-8 h-8 text-white/80" />
              </div>

            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownloadTicket}
                className="flex-1 py-3 bg-white text-black hover:bg-red-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Digital Pass</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-6 border border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-widest transition-all"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
