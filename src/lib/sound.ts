'use client';

/**
 * AFTERHRS PRODUCTIONS — Procedural Web Audio Sound Engine
 * Strictly opt-in (NEVER autoplays). Generates an authentic underground
 * darkroom sub-bass drone (55Hz A1 + 82.4Hz E2 fifth + filtered vinyl/tape hiss)
 * and subtle tactile UI impulses using native Web Audio API nodes.
 */
class AfterhrsSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioNode | null = null;
  private lfoNode: OscillatorNode | null = null;

  public get active(): boolean {
    return this.isPlaying;
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      await this.start();
      return true;
    }
  }

  public async start(): Promise<void> {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    const now = this.ctx.currentTime;

    // Warm darkroom low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    filter.Q.setValueAtTime(3.2, now);
    filter.connect(this.masterGain);

    // Slow LFO modulating the filter cutoff (breathing crimson room effect)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.14, now);
    lfoGain.gain.setValueAtTime(48, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);
    this.lfoNode = lfo;

    // Sub-bass fundamental (55Hz A1) & dark fifth (82.41Hz E2) + detuned saw
    const freqs = [
      { freq: 55.0, type: 'sine' as OscillatorType, gain: 0.35 },
      { freq: 55.25, type: 'sawtooth' as OscillatorType, gain: 0.12 },
      { freq: 82.41, type: 'triangle' as OscillatorType, gain: 0.14 },
      { freq: 110.0, type: 'sine' as OscillatorType, gain: 0.08 },
    ];

    this.oscillators = freqs.map(({ freq, type, gain }) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      oscGain.gain.setValueAtTime(gain, now);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start(now);
      return osc;
    });

    // Subtle analog room atmosphere (filtered Brownian noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 0.15;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(320, now);
    noiseFilter.Q.setValueAtTime(1.5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    whiteNoise.start(now);
    this.noiseNode = whiteNoise;

    // Smooth fade-in
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, now + 1.4);
  }

  public stop(): void {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.isPlaying = false;

    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    const oscsToStop = [...this.oscillators];
    const lfoToStop = this.lfoNode;
    const noiseToStop = this.noiseNode as AudioBufferSourceNode | null;
    this.oscillators = [];
    this.lfoNode = null;
    this.noiseNode = null;

    setTimeout(() => {
      oscsToStop.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {
          // ignore already stopped
        }
      });
      try {
        lfoToStop?.stop();
        lfoToStop?.disconnect();
        noiseToStop?.stop();
        noiseToStop?.disconnect();
      } catch {
        // ignore
      }
    }, 500);
  }

  /**
   * Subtle tactile interaction pulse — fires ONLY when the user has explicitly enabled sound.
   */
  public playHoverTick(pitch = 180): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const tickGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.065);

      tickGain.gain.setValueAtTime(0.06, now);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

      osc.connect(tickGain);
      tickGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore audio context errors
    }
  }
}

export const soundEngine = new AfterhrsSoundEngine();

