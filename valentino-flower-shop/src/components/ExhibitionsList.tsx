import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Volume2, VolumeX, Eye, Lightbulb, Compass, Award } from "lucide-react";
import { Exhibition } from "../types";
import ProceduralFlower from "./ProceduralFlower";

export default function ExhibitionsList() {
  const [activeExhibition, setActiveExhibition] = useState<Exhibition | null>(null);
  const [synthPlaying, setSynthPlaying] = useState<boolean>(false);
  const [roomBrightness, setRoomBrightness] = useState<number>(0.15); // Dark room theme
  const [bloomScale, setBloomScale] = useState<number>(0.75);
  const [species, setSpecies] = useState<"rose" | "tulip" | "hybrid" | "orchid">("rose");

  // Web Audio Hook references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef1 = useRef<OscillatorNode | null>(null);
  const oscillatorRef2 = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const exhibitions: Exhibition[] = [
    {
      id: "ex-red-room",
      dates: "12 EKİM — 24 EKİM",
      title: "Kırmızı Oda: Gül Çalışması",
      location: "Metaverse Pavilion 04",
      colorBackground: "#844e5f",
      synthFrequency: 65.41, // Low C
      visualSeed: 12
    },
    {
      id: "ex-tulip-mania",
      dates: "05 KASIM — 18 KASIM",
      title: "Lale Çılgınlığı 2.0",
      location: "Cam Galeri (VR)",
      colorBackground: "#526442",
      synthFrequency: 73.42, // Low D
      visualSeed: 8
    },
    {
      id: "ex-solaris-winter",
      dates: "01 ARALIK — 15 ARALIK",
      title: "Solaris Kışı",
      location: "Hiper-Gerçekçi Süiti",
      colorBackground: "#685682",
      synthFrequency: 55.00, // Low A
      visualSeed: 16
    }
  ];

  // Map exhibition themes to procedural species on load
  const loadExhibition = (ex: Exhibition) => {
    setActiveExhibition(ex);
    
    if (ex.id === "ex-red-room") {
      setSpecies("rose");
    } else if (ex.id === "ex-tulip-mania") {
      setSpecies("tulip");
    } else {
      setSpecies("orchid");
    }
  };

  // Synthesizer Web Audio logic
  const toggleSynth = () => {
    if (!activeExhibition) return;

    if (synthPlaying) {
      // Pause synthesis
      stopSynth();
    } else {
      // Start synthesis
      startSynth();
    }
  };

  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Initialize primary low-frequency oscillator for cozy atmospheric drone
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(activeExhibition ? activeExhibition.synthFrequency : 65.41, ctx.currentTime);
      
      // Secondary subtle detuned oscillator to create a beautiful sweeping chorus effect
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime((activeExhibition ? activeExhibition.synthFrequency : 65.41) * 1.5 + 0.5, ctx.currentTime);

      // Low pass filter to remove harshness and create an underwater warm feeling
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(2.0, ctx.currentTime);

      // Volume Gain Node
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime); // Safe warm volume ratio

      // Connections
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();

      oscillatorRef1.current = osc1;
      oscillatorRef2.current = osc2;
      gainNodeRef.current = gainNode;

      setSynthPlaying(true);
    } catch (err) {
      console.warn("Audio Context could not boot securely due to browser iframe security constraints.", err);
    }
  };

  const stopSynth = () => {
    try {
      if (oscillatorRef1.current) oscillatorRef1.current.stop();
      if (oscillatorRef2.current) oscillatorRef2.current.stop();
      setSynthPlaying(false);
    } catch (e) {}
  };

  // Turn off synth on modal close
  const handleClose = () => {
    stopSynth();
    setActiveExhibition(null);
  };

  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <section id="sergiler" className="py-24 bg-[#1C1B1B] text-canvas px-6 md:px-16 relative">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Exhibition Section Header */}
        <div className="flex flex-col text-left mb-16 border-b border-canvas/10 pb-10" id="ex-header-node">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-3 font-semibold">
            SÜRÜKLEYİCİ ALANLAR
          </span>
          <h2 className="font-serif text-[36px] md:text-[52px] font-bold tracking-tight">
            Sergiler
          </h2>
        </div>

        {/* List Grid rows */}
        <div className="flex flex-col" id="exhibitions-rows-list">
          {exhibitions.map((ex) => (
            <div
              key={ex.id}
              onClick={() => loadExhibition(ex)}
              className="group border-b border-canvas/10 py-10 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors hover:bg-canvas/[0.02]"
              id={`row-${ex.id}`}
            >
              {/* Left Details: Dates & Title */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 text-left">
                <div className="font-mono text-xs uppercase tracking-widest text-[#c5a880] min-w-[150px]">
                  {ex.dates}
                </div>
                <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] font-medium group-hover:text-primary transition-colors">
                  {ex.title}
                </h3>
              </div>

              {/* Right Location & Diagonal Action Button */}
              <div className="flex items-center justify-between md:justify-end gap-8 mt-5 md:mt-0">
                <div className="flex flex-col text-left md:text-right">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-canvas/40">Sanal Konum</span>
                  <span className="font-sans text-[13px] text-canvas/80 font-medium">{ex.location}</span>
                </div>
                
                {/* Visual Action Button with rotative arrow - Editorial Sharp */}
                <div className="w-12 h-12 rounded-none border border-canvas/15 flex items-center justify-center text-canvas group-hover:bg-canvas group-hover:text-neutral-dark transition-all duration-300 transform group-hover:rotate-45" id={`ex-icon-${ex.id}`}>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Atmospheric Immersive Full-screen Virtual Space Overlay */}
      {activeExhibition && (
        <div className="fixed inset-0 z-50 flex flex-col h-screen w-screen bg-[#0C0C0C] overflow-hidden text-canvas" id="immersive-player">
          
          {/* Ambient lighting halo projecting the custom color background */}
          <div 
            className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none transition-all duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeExhibition.colorBackground} 0%, transparent 60%)`,
              opacity: roomBrightness * 1.5
            }}
          />

          {/* Top Floating Control Bar */}
          <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-canvas/10 bg-[#0C0C0C]/50 backdrop-blur-md">
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#c5a880] font-bold">SANAL PAVILION AKTİF</span>
              <h4 className="font-serif text-md md:text-lg font-bold">{activeExhibition.title}</h4>
            </div>

            {/* Close immersive player */}
            <button
              onClick={handleClose}
              className="px-5 py-3 rounded-none bg-canvas text-neutral-dark text-[10px] font-bold uppercase tracking-widest hover:bg-canvas/90 transition-colors"
              id="close-player-btn"
            >
              Galeriden Çık
            </button>
          </div>

          {/* Core Player Interface split between Visual & Config Panel */}
          <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
            
            {/* Ambient Flower Stage Area */}
            <div className="lg:col-span-8 flex flex-col justify-between p-8 min-h-[50vh] relative">
              
              {/* Synth status & Sound trigger */}
              <div className="flex items-center space-x-4 self-start bg-canvas/5 border border-canvas/10 pl-4 pr-5 py-2.5 rounded-none backdrop-blur-md">
                <button
                  onClick={toggleSynth}
                  className="w-8 h-8 rounded-none bg-canvas text-neutral-dark flex items-center justify-center hover:bg-[#c5a880] transition-all"
                  id="sound-synth-toggle"
                >
                  {synthPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-canvas/40">Sesli Alan Ambiyansı</span>
                  <span className="text-[11px] font-sans text-canvas/90 font-light">
                    {synthPlaying ? "Yapay Drone Ses Sentezi Açık (~" + activeExhibition.synthFrequency.toFixed(1) + "Hz)" : "Sesi Etkinleştirmek için Tıklayın"}
                  </span>
                </div>
              </div>

              {/* Vector Flower Centered Target with glowing pulse ring */}
              <div className="my-auto flex items-center justify-center relative scale-[0.85] sm:scale-100 transition-transform">
                <div 
                  className="absolute border border-canvas/5 select-none animate-pulse-ring pointer-events-none"
                  style={{
                    width: "360px",
                    height: "360px",
                    accentColor: activeExhibition.colorBackground,
                    boxShadow: `0 0 80px ${activeExhibition.colorBackground}20`
                  }}
                />
                
                <ProceduralFlower
                  species={species}
                  petalCount={activeExhibition.visualSeed}
                  symmetry={0.96}
                  glowness={bloomScale}
                  hue={activeExhibition.colorBackground}
                  className="w-80 h-80 relative z-10 duration-1000"
                  isSpinning={synthPlaying}
                />
              </div>

              {/* Interactive Coordinates info */}
              <div className="flex justify-between items-end border-t border-canvas/10 pt-4 self-stretch text-[10px] font-mono text-canvas/40">
                <div className="flex items-center space-x-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Pavilion Node: #9262-VR</span>
                </div>
                <span>Render: 4K Raytraced Vecs (WebGL SIM)</span>
              </div>
            </div>

            {/* Immersive Room Configurator Side Panel */}
            <div className="lg:col-span-4 bg-[#111111] border-t lg:border-t-0 lg:border-l border-canvas/10 p-8 md:p-10 flex flex-col justify-between text-left">
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-center space-x-2 text-[#c5a880] mb-3">
                    <Award className="w-4 h-4" />
                    <span className="font-mono text-xs uppercase tracking-widest font-semibold">Pavilion Sergisi</span>
                  </div>
                  <h5 className="font-serif text-[24px] font-bold text-canvas mb-4">
                    Dijital Sergi Odası
                  </h5>
                  <p className="font-sans text-[13px] text-canvas/60 leading-relaxed mb-6 font-light">
                    Valentino Flower Shop'un sürükleyici pavilyonu, botanik felsefemizi sanal gerçeklikle bir araya getiriyor. Bu alandaki ışık yoğunluğu ve akort frekansı eserin zihinsel uyumunu tetikler.
                  </p>
                </div>

                {/* Configuration Sliders */}
                <div className="space-y-6 pt-6 border-t border-canvas/10">
                  <h6 className="font-mono text-[10px] uppercase tracking-wider text-canvas/45 font-bold mb-3">
                    Çevre Modülatörleri
                  </h6>

                  {/* Slider 1: Ambient light/opacity */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="flex items-center space-x-1.5 font-sans">
                        <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Ambiyans Parlaklığı</span>
                      </span>
                      <span className="font-mono font-bold text-canvas/70">{Math.round(roomBrightness * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.5"
                      step="0.01"
                      value={roomBrightness}
                      onChange={(e) => setRoomBrightness(parseFloat(e.target.value))}
                      className="w-full accent-canvas bg-canvas/10 h-[2px]"
                      id="ambient-brigthness"
                    />
                  </div>

                  {/* Slider 2: Glow/Bloom scale */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="flex items-center space-x-1.5 font-sans">
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span>Çiçek Işıma Yoğunluğu</span>
                      </span>
                      <span className="font-mono font-bold text-canvas/70">{Math.round(bloomScale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1.5"
                      step="0.05"
                      value={bloomScale}
                      onChange={(e) => setBloomScale(parseFloat(e.target.value))}
                      className="w-full accent-primary bg-canvas/10 h-[2px]"
                      id="flower-bloom-brigthness"
                    />
                  </div>

                  {/* Style selector inside exhibition player */}
                  <div>
                    <span className="block font-sans text-xs mb-2 text-canvas/60 font-semibold">Sergi Akışı Türü</span>
                    <div className="grid grid-cols-4 gap-2">
                      {(["rose", "tulip", "hybrid", "orchid"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSpecies(type)}
                          className={`py-1.5 rounded-none text-[10px] uppercase font-mono tracking-wider transition-colors border ${
                            species === type
                              ? "bg-canvas text-[#111] border-canvas font-bold"
                              : "bg-transparent text-canvas/60 border-canvas/10 hover:border-canvas/30"
                          }`}
                        >
                          {type === "rose" ? "Gül" : type === "tulip" ? "Lale" : type === "orchid" ? "Orkide" : "Hibrit"}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Informative advice */}
              <div className="pt-8 border-t border-canvas/10 text-xs text-canvas/40 leading-relaxed font-sans mt-8">
                En iyi deneyimi yakalamak için kulaklıklarınızı takmanız ve oda ışıklarını azaltmanız tavsiye edilir. Hoş geldiniz.
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
