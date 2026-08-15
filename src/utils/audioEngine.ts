class PorscheAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isRunning: boolean = false;
  private currentMode: 'flat6' | 'electric' = 'flat6';

  // Flat 6 synthesis nodes
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private throttleGain: GainNode | null = null;

  // Electric synthesis nodes
  private electricOsc1: OscillatorNode | null = null;
  private electricOsc2: OscillatorNode | null = null;
  private electricFilter: BiquadFilterNode | null = null;

  private currentRpm: number = 900;
  private targetRpm: number = 900;
  private rpmAnimationId: number | null = null;

  constructor() {
    // Lazy initialized on first user gesture to adhere to browser autoplay policies
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.25, this.ctx.currentTime, 0.05);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setMode(mode: 'flat6' | 'electric') {
    this.currentMode = mode;
    if (this.isRunning) {
      this.stop();
      this.start(this.currentRpm);
    }
  }

  public start(initialRpm: number = 900) {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.isRunning) return;

      this.currentRpm = initialRpm;
      this.targetRpm = initialRpm;
      const now = this.ctx.currentTime;

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, now);
      this.masterGain.connect(this.ctx.destination);

      if (this.currentMode === 'flat6') {
        this.setupFlat6(now);
      } else {
        this.setupElectric(now);
      }

      this.isRunning = true;
      this.startRpmLoop();
    } catch {
      // Audio fallback graceful
    }
  }

  private setupFlat6(now: number) {
    if (!this.ctx || !this.masterGain) return;

    // Filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, now);
    this.filterNode.Q.setValueAtTime(3.5, now);
    this.filterNode.connect(this.masterGain);

    // Throttle Gain
    this.throttleGain = this.ctx.createGain();
    this.throttleGain.gain.setValueAtTime(0.7, now);
    this.throttleGain.connect(this.filterNode);

    // Flat-6 Fundamental Frequency = (RPM / 60) * (6 cylinders / 2 strokes) = RPM * 0.05
    const baseFreq = (this.currentRpm / 60) * 3;

    // Oscillator 1: Fundamental sawtooth (aggressive combustion)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(baseFreq, now);

    // Oscillator 2: 2nd harmonic triangle (engine block resonance)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(baseFreq * 2, now);

    // Oscillator 3: Sub harmonic sine (exhaust bass thump)
    this.osc3 = this.ctx.createOscillator();
    this.osc3.type = 'sine';
    this.osc3.frequency.setValueAtTime(baseFreq * 0.5, now);

    // Individual gains
    const g1 = this.ctx.createGain();
    g1.gain.setValueAtTime(0.5, now);
    const g2 = this.ctx.createGain();
    g2.gain.setValueAtTime(0.35, now);
    const g3 = this.ctx.createGain();
    g3.gain.setValueAtTime(0.6, now);

    this.osc1.connect(g1);
    this.osc2.connect(g2);
    this.osc3.connect(g3);

    g1.connect(this.throttleGain);
    g2.connect(this.throttleGain);
    g3.connect(this.throttleGain);

    this.osc1.start(now);
    this.osc2.start(now);
    this.osc3.start(now);
  }

  private setupElectric(now: number) {
    if (!this.ctx || !this.masterGain) return;

    this.electricFilter = this.ctx.createBiquadFilter();
    this.electricFilter.type = 'bandpass';
    this.electricFilter.frequency.setValueAtTime(600, now);
    this.electricFilter.Q.setValueAtTime(4.0, now);
    this.electricFilter.connect(this.masterGain);

    const freq = 180 + (this.currentRpm / 9000) * 1200;

    this.electricOsc1 = this.ctx.createOscillator();
    this.electricOsc1.type = 'sine';
    this.electricOsc1.frequency.setValueAtTime(freq, now);

    this.electricOsc2 = this.ctx.createOscillator();
    this.electricOsc2.type = 'triangle';
    this.electricOsc2.frequency.setValueAtTime(freq * 1.5, now);

    const eg1 = this.ctx.createGain();
    eg1.gain.setValueAtTime(0.4, now);
    const eg2 = this.ctx.createGain();
    eg2.gain.setValueAtTime(0.2, now);

    this.electricOsc1.connect(eg1);
    this.electricOsc2.connect(eg2);

    eg1.connect(this.electricFilter);
    eg2.connect(this.electricFilter);

    this.electricOsc1.start(now);
    this.electricOsc2.start(now);
  }

  public setRpm(rpm: number) {
    this.targetRpm = Math.max(800, Math.min(9000, rpm));
    if (!this.isRunning && !this.isMuted) {
      this.start(this.targetRpm);
    }
  }

  private startRpmLoop() {
    const update = () => {
      // Smooth interpolation toward target RPM
      const diff = this.targetRpm - this.currentRpm;
      this.currentRpm += diff * 0.15;

      if (this.ctx && this.isRunning) {
        const now = this.ctx.currentTime;
        const rpmRatio = (this.currentRpm - 800) / (9000 - 800);

        if (this.currentMode === 'flat6') {
          const baseFreq = (this.currentRpm / 60) * 3;
          if (this.osc1 && this.osc2 && this.osc3) {
            this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.03);
            this.osc2.frequency.setTargetAtTime(baseFreq * 2, now, 0.03);
            this.osc3.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.03);
          }

          if (this.filterNode) {
            // Cutoff opens from 450Hz at idle to 4200Hz at 9000 RPM
            const cutoff = 450 + Math.pow(rpmRatio, 1.4) * 3800;
            this.filterNode.frequency.setTargetAtTime(cutoff, now, 0.04);
          }

          if (this.throttleGain) {
            const vol = 0.5 + rpmRatio * 0.6;
            this.throttleGain.gain.setTargetAtTime(vol, now, 0.03);
          }
        } else {
          // Electric mode
          const freq = 160 + Math.pow(rpmRatio, 1.2) * 1400;
          if (this.electricOsc1 && this.electricOsc2) {
            this.electricOsc1.frequency.setTargetAtTime(freq, now, 0.03);
            this.electricOsc2.frequency.setTargetAtTime(freq * 1.5, now, 0.03);
          }
          if (this.electricFilter) {
            this.electricFilter.frequency.setTargetAtTime(freq, now, 0.03);
          }
        }
      }

      this.rpmAnimationId = requestAnimationFrame(update);
    };

    this.rpmAnimationId = requestAnimationFrame(update);
  }

  public playGearShift() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      // Quick throttle blip / exhaust pop
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      const popFilter = this.ctx.createBiquadFilter();

      popOsc.type = 'sawtooth';
      popOsc.frequency.setValueAtTime(140, now);
      popOsc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

      popFilter.type = 'lowpass';
      popFilter.frequency.setValueAtTime(800, now);

      popGain.gain.setValueAtTime(0.6, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      popOsc.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(this.masterGain || this.ctx.destination);

      popOsc.start(now);
      popOsc.stop(now + 0.1);
    } catch {
      // Ignored
    }
  }

  public triggerLaunchCountdown(onGo?: () => void) {
    if (!this.ctx) this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // 3 Beeps + 1 GO
      for (let i = 0; i < 3; i++) {
        const beepOsc = this.ctx.createOscillator();
        const beepGain = this.ctx.createGain();
        beepOsc.type = 'sine';
        beepOsc.frequency.setValueAtTime(880, now + i * 0.8);
        beepGain.gain.setValueAtTime(0.3, now + i * 0.8);
        beepGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.8 + 0.15);

        beepOsc.connect(beepGain);
        beepGain.connect(this.masterGain || this.ctx.destination);
        beepOsc.start(now + i * 0.8);
        beepOsc.stop(now + i * 0.8 + 0.2);
      }

      // GO signal
      const goTime = now + 2.4;
      const goOsc = this.ctx.createOscillator();
      const goGain = this.ctx.createGain();
      goOsc.type = 'sine';
      goOsc.frequency.setValueAtTime(1760, goTime);
      goGain.gain.setValueAtTime(0.5, goTime);
      goGain.gain.exponentialRampToValueAtTime(0.001, goTime + 0.4);

      goOsc.connect(goGain);
      goGain.connect(this.masterGain || this.ctx.destination);
      goOsc.start(goTime);
      goOsc.stop(goTime + 0.5);

      if (onGo) {
        setTimeout(onGo, 2400);
      }
    } catch {
      if (onGo) onGo();
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.rpmAnimationId) {
      cancelAnimationFrame(this.rpmAnimationId);
      this.rpmAnimationId = null;
    }
    try {
      if (this.osc1) { this.osc1.stop(); this.osc1.disconnect(); this.osc1 = null; }
      if (this.osc2) { this.osc2.stop(); this.osc2.disconnect(); this.osc2 = null; }
      if (this.osc3) { this.osc3.stop(); this.osc3.disconnect(); this.osc3 = null; }
      if (this.electricOsc1) { this.electricOsc1.stop(); this.electricOsc1.disconnect(); this.electricOsc1 = null; }
      if (this.electricOsc2) { this.electricOsc2.stop(); this.electricOsc2.disconnect(); this.electricOsc2 = null; }
      if (this.noiseNode) { this.noiseNode.disconnect(); this.noiseNode = null; }
    } catch {
      // Ignored
    }
  }
}

export const audioEngine = new PorscheAudioEngine();
