"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    
    // FECHA OBJETIVO: 25 de Julio de 2026
    const targetDate = new Date("2026-07-25T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setIsDropActive(true);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      });
      setIsDropActive(false);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    // Rastreador del mouse para interactividad del logo central
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 35;
      const y = (e.clientY - innerHeight / 2) / 35;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-vantum-black text-vantum-white selection:bg-vantum-white selection:text-vantum-black overflow-x-hidden font-sans relative antialiased">
      
      {/* GRILLA INDUSTRIAL DE FONDO */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* REVOLUCIÓN DE LUZ SUPERIOR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-vantum-white/[0.02] to-transparent blur-[120px] pointer-events-none z-0" />

      {/* 1. NAVEGACIÓN COMPACTA CON MINIATURA INCORPORADA */}
      <nav className="border-b border-vantum-white/5 backdrop-blur-md bg-vantum-black/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Acordate de guardar logo-vantum.jpg dentro de tu carpeta public */}
            <img src="/logo-vantum.jpg" alt="Vantum Isotype" className="w-6 h-6 object-cover border border-vantum-white/10" />
            <a href="#" className="text-xl font-light tracking-[0.4em] uppercase text-vantum-white hover:opacity-80 transition-opacity">
              VANTUM
            </a>
          </div>
          <div className="hidden md:flex items-center gap-12 text-[10px] font-mono tracking-[0.3em] uppercase text-vantum-gray">
            <a href="#manifiesto" className="hover:text-vantum-white transition-colors">// MANIFIESTO</a>
            <a href="#modelos" className="hover:text-vantum-white transition-colors">// MODELOS</a>
            <a href="#especificaciones" className="hover:text-vantum-white transition-colors">// ESPECIFICACIONES</a>
          </div>
          
          {isMounted && isDropActive ? (
            <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20lote%20001" target="_blank" rel="noopener noreferrer" className="border border-green-500/30 bg-green-500/10 px-5 py-2.5 text-[9px] font-mono tracking-[0.25em] uppercase text-green-400 hover:bg-green-400 hover:text-vantum-black transition-all duration-300">
              SOLICITAR ORDEN
            </a>
          ) : (
            <div className="border border-vantum-white/10 bg-vantum-white/5 px-5 py-2.5 text-[9px] font-mono tracking-[0.25em] uppercase text-vantum-gray/40 select-none cursor-not-allowed">
              GATEWAY LOCKED
            </div>
          )}
        </div>
      </nav>

      {/* 2. HERO SECTOR */}
      <header className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 text-center z-10 pt-12 pb-20">
        <div className="space-y-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full font-mono text-[9px] tracking-[0.25em] text-red-400 uppercase animate-pulse">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            {isMounted && isDropActive ? "SYSTEM STATUS // LIVE" : "SYSTEM HOLDING // EDICIÓN 001"}
          </div>
          
          {/* LOGO CENTRAL INTERACTIVO RECONFIGURADO: ROTACIÓN 360 Y SEGUIMIENTO */}
          <div 
            className="py-6 cursor-crosshair relative z-20 transition-transform duration-300 ease-out"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <svg 
              width="90" 
              height="90" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="animate-[spin_20s_linear_infinite]"
            >
              {/* Angulación ajustada y líneas reforzadas imitando el bordado original */}
              <path d="M15 15L50 88L85 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-vantum-white opacity-95" />
              <path d="M25 22L50 74L75 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-vantum-gray opacity-50" />
              <path d="M35 29L50 60L65 29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-vantum-white opacity-20" />
            </svg>
          </div>

          <p className="font-mono text-xs md:text-sm text-vantum-gray tracking-[0.18em] max-w-2xl mx-auto uppercase leading-relaxed">
            Estructuras de alta simetría. Estética urbana con rigor de ingeniería.
          </p>
        </div>

        {/* INTERFAZ DEL CONTADOR CON SEGUNDERO ROJO CON GLOW SISTÉMICO */}
        <div className="mt-16 border border-vantum-white/10 bg-vantum-black/60 backdrop-blur-md p-8 md:p-12 w-full max-w-3xl mx-auto relative group hover:border-vantum-white/20 transition-colors">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-vantum-black px-3 font-mono text-[9px] tracking-widest text-vantum-gray/60 uppercase">
            // TERMINAL TIME COUNTER
          </div>
          
          <div className="grid grid-cols-4 gap-4 md:gap-8 font-mono select-none">
            <div>
              <div className="text-4xl md:text-6xl font-extralight tracking-tight text-vantum-white tabular-nums">
                {isMounted ? timeLeft.days : "00"}
              </div>
              <div className="text-[9px] text-vantum-gray/40 tracking-[0.2em] uppercase mt-2">Días</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-extralight tracking-tight text-vantum-white tabular-nums">
                {isMounted ? timeLeft.hours : "00"}
              </div>
              <div className="text-[9px] text-vantum-gray/40 tracking-[0.2em] uppercase mt-2">Horas</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-extralight tracking-tight text-vantum-white tabular-nums">
                {isMounted ? timeLeft.minutes : "00"}
              </div>
              <div className="text-[9px] text-vantum-gray/40 tracking-[0.2em] uppercase mt-2">Minutos</div>
            </div>
            <div>
              {/* Segundero rojo con efecto difuminado e iluminación analógica */}
              <div 
                className="text-4xl md:text-6xl font-extralight tracking-tight text-red-500 tabular-nums relative"
                style={{ textShadow: "0 0 12px rgba(239, 68, 68, 0.7), 0 0 4px rgba(239, 68, 68, 0.4)" }}
              >
                {isMounted ? timeLeft.seconds : "00"}
              </div>
              <div className="text-[9px] text-vantum-gray/40 tracking-[0.2em] uppercase mt-2">Segundos</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 font-mono text-[10px] tracking-widest">
          <a href="#modelos" className="border border-vantum-white bg-vantum-white text-vantum-black px-8 h-12 flex items-center justify-center uppercase hover:bg-transparent hover:text-vantum-white transition-all duration-300">
            EXPLORAR CATÁLOGO
          </a>
        </div>
      </header>

      {/* 3. SECCIÓN MANIFIESTO */}
      <section id="manifiesto" className="py-32 border-y border-vantum-white/5 relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="font-mono text-[10px] text-vantum-gray tracking-[0.3em] uppercase">// OPERATIONAL PHILOSOPHY</p>
          <p className="text-xl md:text-3xl font-extralight tracking-wide leading-relaxed text-vantum-white/90">
            No diseñamos accesorios. Construimos bloques estructurales de uso diario. Cada pieza responde a un control estricto de geometría tridimensional y simetría textil absoluta. VANTUM es la respuesta técnica a la saturación urbana.
          </p>
        </div>
      </section>

      {/* 4. SECCIÓN MODELOS */}
      <section id="modelos" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between border-b border-vantum-white/10 pb-6">
          <div>
            <p className="text-[10px] text-vantum-gray font-mono tracking-[0.25em] uppercase mb-2">// TEXTILE ARCHITECTURE</p>
            <h2 className="text-4xl font-extralight tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-vantum-white to-vantum-gray">Edición de Barrio</h2>
          </div>
          <div className="font-mono text-[11px] text-vantum-gray/60 flex items-center gap-4 mt-4 md:mt-0">
            <span>BATCH SIZE: 500 UNITS</span>
            <span className="text-vantum-white/20">|</span>
            <span>STATUS: {isMounted && isDropActive ? "LIVE" : "HOLDING"}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* MODELO 01: OLIVE KHAKI */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/30 group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="overflow-hidden bg-vantum-black relative aspect-square flex items-center justify-center border border-vantum-white/[0.04]">
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-oliva.png" alt="Vantum Olive Khaki" className="w-[85%] h-[85%] object-contain scale-95 group-hover:scale-100 transition-all duration-700 ease-out" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 01.OLV-KHK</span>
                {isMounted && isDropActive ? (
                  <span className="text-green-400 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/20 tracking-widest text-[9px]">// SYSTEM LIVE</span>
                ) : (
                  <span className="text-amber-500/80 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">// LOCKED // AWAITING BATCH</span>
                )}
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vantum-white group-hover:to-vantum-gray transition-all duration-300">
                Olive Khaki
              </h3>
              <p className="text-xs text-vantum-gray/80 mt-4 leading-relaxed font-light">
                Chasis estructural verde oliva profundo. Isotipo lineal en alto relieve beige desértico y vivo perimetral inferior a tono. Estética militarizada de alta precisión.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM FLAT VISOR</span>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Olive%20Khaki%20(SPEC%20%2F%2F%2001.OLV-KHK)" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 group/btn font-medium">
                  SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              ) : (
                <span className="uppercase tracking-widest text-amber-500/40 cursor-not-allowed select-none animate-pulse">
                  SOLO ESPERA...
                </span>
              )}
            </div>
          </div>

          {/* MODELO 02: CRIMSON STEALTH */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/30 group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="overflow-hidden bg-vantum-black relative aspect-square flex items-center justify-center border border-vantum-white/[0.04]">
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-roja.png" alt="Vantum Crimson Stealth" className="w-[85%] h-[85%] object-contain scale-95 group-hover:scale-100 transition-all duration-700 ease-out" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 02.CRMS-STL</span>
                {isMounted && isDropActive ? (
                  <span className="text-green-400 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/20 tracking-widest text-[9px]">// SYSTEM LIVE</span>
                ) : (
                  <span className="text-amber-500/80 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">// LOCKED // AWAITING BATCH</span>
                )}
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vantum-white group-hover:to-vantum-gray transition-all duration-300">
                Crimson Stealth
              </h3>
              <p className="text-xs text-vantum-gray/80 mt-4 leading-relaxed font-light">
                Contraste crítico de alta hostilidad. Gabardina negra pura con isotipo frontal y vivos perimetrales inyectados en hilo carmesí. Diseñada para romper el entorno urbano.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM FLAT VISOR</span>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Crimson%20Stealth%20(SPEC%20%2F%2F%2002.CRMS-STL)" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 group/btn font-medium">
                  SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              ) : (
                <span className="uppercase tracking-widest text-amber-500/40 cursor-not-allowed select-none animate-pulse">
                  SOLO ESPERA...
                </span>
              )}
            </div>
          </div>

          {/* MODELO 03: ONYX GOLD */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/30 group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="overflow-hidden bg-vantum-black relative aspect-square flex items-center justify-center border border-vantum-white/[0.04]">
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-oro.png" alt="Vantum Onyx Gold" className="w-[85%] h-[85%] object-contain scale-95 group-hover:scale-100 transition-all duration-700 ease-out" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 03.ONX-GLD</span>
                {isMounted && isDropActive ? (
                  <span className="text-green-400 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/20 tracking-widest text-[9px]">// SYSTEM LIVE</span>
                ) : (
                  <span className="text-amber-500/80 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">// LOCKED // AWAITING BATCH</span>
                )}
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vantum-white group-hover:to-vantum-gray transition-all duration-300">
                Onyx Gold
              </h3>
              <p className="text-xs text-vantum-gray/80 mt-4 leading-relaxed font-light">
                Rigor clásico de ingeniería. Base monocromática negra con bordado lineal heráldico en hilo de oro seleccionado. Máxima simetría y sobriedad industrial.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM FLAT VISOR</span>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Onyx%20Gold%20(SPEC%20%2F%2F%2003.ONX-GLD)" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 group/btn font-medium">
                  SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              ) : (
                <span className="uppercase tracking-widest text-amber-500/40 cursor-not-allowed select-none animate-pulse">
                  SOLO ESPERA...
                </span>
              )}
            </div>
          </div>

        </div>

        {/* INDICADOR DE STOCK EN VIVO POST-DROP */}
        {isMounted && isDropActive && (
          <div className="mt-16 max-w-xl mx-auto border border-green-500/20 bg-green-500/5 p-4 font-mono text-[10px] tracking-widest text-center text-green-400 animate-fade-in">
            <div className="flex justify-between mb-2">
              <span>// BATCH LOTE 001 STATUS</span>
              <span>500 / 500 UNITS RESERVED</span>
            </div>
            <div className="w-full bg-green-950 h-1 border border-green-500/30 overflow-hidden">
              <div className="bg-green-400 h-full w-[100%] transition-all duration-1000" />
            </div>
          </div>
        )}
      </section>

      {/* 5. SECCIÓN ESPECIFICACIONES TÉCNICAS */}
      <section id="especificaciones" className="py-32 bg-vantum-black relative z-10 px-6 border-t border-vantum-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[10px] text-vantum-gray font-mono tracking-[0.25em] uppercase mb-2">// TECHNICAL CORE</p>
            <h2 className="text-4xl font-extralight tracking-widest uppercase text-vantum-white">Geometría de Precisión</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-mono text-xs text-vantum-gray">
            <div className="space-y-8">
              <div className="border-l-2 border-vantum-white/20 pl-6 space-y-3">
                <p className="text-vantum-white font-medium tracking-wider">// COMPOSICIÓN MATERIAL</p>
                <p>Gabardina pesada de 8 onzas con tramado de alta torsión estructural. Resistencia garantizada a la abrasión urbana y pérdida de color por exposición UV prolongada.</p>
              </div>
              <div className="border-l-2 border-vantum-white/20 pl-6 space-y-3">
                <p className="text-vantum-white font-medium tracking-wider">// ARQUITECTURA DEL CONTORNO</p>
                <p>Paneles reforzados internamente con entretela termo-fusionada alemana. Visera plana con memoria elástica perimetral y costuras de alta tensión simétricas.</p>
              </div>
            </div>

            {/* TABLA DE TOLERANCIAS INDUSTRIALES */}
            <div className="border border-vantum-white/10 bg-vantum-black/40 p-6 flex flex-col justify-between">
              <div className="text-[9px] text-vantum-white/40 mb-4 tracking-[0.2em] uppercase">// METRIC SYSTEM & TOLERANCE</div>
              <table className="w-full text-left text-[11px] leading-relaxed">
                <thead>
                  <tr className="border-b border-vantum-white/10 text-vantum-white">
                    <th className="pb-2 font-light tracking-wider">COMPONENTE</th>
                    <th className="pb-2 font-light tracking-wider text-right">DIMENSIÓN</th>
                    <th className="pb-2 font-light tracking-wider text-right">TOLERANCIA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vantum-white/[0.04]">
                  <tr>
                    <td className="py-2 text-vantum-white/80">Altura de Corona</td>
                    <td className="py-2 text-right text-vantum-white">11.5 cm</td>
                    <td className="py-2 text-right text-red-400">± 0.05 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-right text-vantum-white">18.0 cm</td>
                    <td className="py-2 text-right text-red-400">± 0.02 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-vantum-white/80">Ángulo de Inyección</td>
                    <td className="py-2 text-right text-vantum-white">180°C</td>
                    <td className="py-2 text-right text-red-400">Fixed</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-vantum-white/80">Densidad de Costura</td>
                    <td className="py-2 text-right text-vantum-white">12 SPI</td>
                    <td className="py-2 text-right text-red-400">Nominal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PIE DE PÁGINA */}
      <footer id="contacto" className="py-20 border-t border-vantum-white/5 bg-vantum-black relative z-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] tracking-widest text-vantum-gray">
          <div>
            <p className="text-vantum-white mb-1">VANTUM CORE LAB // OPERATIONAL GATEWAY</p>
            <p>© 2026 DISTRIBUTION & LOGISTICS. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-vantum-white transition-colors">INSTAGRAM</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-vantum-white transition-colors">TIKTOK</a>
            <a href="mailto:vantum553@gmail.com" className="hover:text-vantum-white transition-colors">GMAIL</a>
          </div>
        </div>
      </footer>

    </div>
  );
}