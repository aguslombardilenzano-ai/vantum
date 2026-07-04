"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: "20",
    hours: "11",
    minutes: "29",
    seconds: "58",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTimeRemaining = () => {
      const targetDate = new Date("July 25, 2026 00:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      };
    };

    setTimeLeft(calculateTimeRemaining());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-vantum-black text-vantum-white min-h-screen pt-24 overflow-x-hidden font-sans selection:bg-vantum-white selection:text-vantum-black relative">
      
      {/* FONDO GLOBAL DE PAPEL MILIMETRADO INDUSTRIAL */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* 1. SECCIÓN HERO (Foco Mecánico e Isotipo Oficial) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 border-b border-vantum-white/[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-6 border border-vantum-white/10 px-3 py-1 bg-vantum-black/80 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
            <span className="text-[9px] font-mono tracking-[0.4em] text-vantum-gray uppercase">
              SYSTEM LIVE // EDICIÓN 001
            </span>
          </div>

          {/* ISOTIPO OFICIAL CON PULSO DE ILUMINACIÓN */}
          <div className="w-64 h-40 md:w-80 md:h-48 mb-6 flex items-center justify-center select-none overflow-hidden animate-[pulse_4s_ease-in-out_infinite] hover:scale-105 transition-transform duration-700">
            <img 
              src="/logo-vantum.png" 
              alt="Vantum Isotipo Oficial" 
              className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-vantum-white via-vantum-white to-vantum-white/40 select-none mr-[-0.4em]">
            VANTUM
          </h1>
          
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-vantum-white/20 to-transparent my-8" />
          
          <p className="text-xs md:text-sm text-vantum-gray uppercase tracking-[0.5em] max-w-xl mx-auto leading-relaxed px-4 mr-[-0.5em]">
            Estructuras de alta simetría. Estética urbana con rigor de ingeniería.
          </p>
          
          <div className="mt-12 flex gap-4">
            <a 
              href="#drop-timer" 
              className="inline-flex items-center justify-center text-[10px] font-mono tracking-[0.25em] uppercase border border-red-500/30 bg-red-500/5 text-red-400 px-6 py-3 transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/50 mr-[-0.25em]"
            >
              LAUNCH COUNTDOWN
            </a>
            <a 
              href="#modelos" 
              className="inline-flex items-center justify-center text-[10px] font-mono tracking-[0.25em] uppercase border border-vantum-white/20 bg-vantum-black px-6 py-3 transition-all duration-300 hover:border-vantum-white mr-[-0.25em]"
            >
              EXPLORAR CATÁLOGO
            </a>
          </div>
        </div>
      </section>

      {/* [NUEVO] 2. SECCIÓN MANIFIESTO (Declaración de Principios Técnicos) */}
      <section className="py-24 border-b border-vantum-white/[0.03] px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-12 relative z-10">
          <div className="md:w-1/3 font-mono text-[10px] text-vantum-gray tracking-[0.3em] uppercase md:sticky md:top-32">
            // MANIFESTO OVERRIDE <br />
            <span className="text-vantum-white/20">CORE VALUES // 001</span>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg md:text-2xl font-extralight tracking-wide leading-relaxed text-vantum-gray uppercase">
              NO CREAMOS ACCESORIOS. REINVENTAMOS EL <span className="text-vantum-white font-normal">CHASIS TEXTIL</span> MEDIANTE PROPORCIONES MATEMÁTICAS ESTRICTAS. CADA PANEL, COSTURA Y VIVO PERIMETRAL DE NUESTRAS PIEZAS RESPONDE A UN RIGOR ESTÉTICO QUE RECHAZA LO GENÉRICO. VANTUM ES LA INTERSECCIÓN ABSOLUTA ENTRADA LA UTALIDAD URBANA Y LA SIMETRÍA INDUSTRIAL.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TIMER DEL DROP CRÍTICO */}
      <section id="drop-timer" className="py-24 px-6 border-b border-vantum-white/[0.03] relative bg-gradient-to-b from-transparent via-vantum-white/[0.005] to-transparent">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[10px] text-red-500 font-mono tracking-[0.4em] uppercase mb-4">// CRITICAL TIMELINE INTERCEPTED</p>
          <h2 className="text-2xl md:text-3xl font-extralight tracking-widest uppercase mb-12">Cuenta Regresiva Lanzamiento Lote 001</h2>
          
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto font-mono">
            <div className="border border-vantum-white/[0.06] bg-vantum-black/60 p-4 md:p-6 backdrop-blur-sm">
              <span className="text-3xl md:text-5xl font-extralight block text-vantum-white tabular-nums">
                {isMounted ? timeLeft.days : "20"}
              </span>
              <span className="text-[9px] text-vantum-gray tracking-widest uppercase block mt-2">DÍAS</span>
            </div>
            <div className="border border-vantum-white/[0.06] bg-vantum-black/60 p-4 md:p-6 backdrop-blur-sm">
              <span className="text-3xl md:text-5xl font-extralight block text-vantum-white tabular-nums">
                {isMounted ? timeLeft.hours : "11"}
              </span>
              <span className="text-[9px] text-vantum-gray tracking-widest uppercase block mt-2">HRS</span>
            </div>
            <div className="border border-vantum-white/[0.06] bg-vantum-black/60 p-4 md:p-6 backdrop-blur-sm">
              <span className="text-3xl md:text-5xl font-extralight block text-vantum-white tabular-nums">
                {isMounted ? timeLeft.minutes : "29"}
              </span>
              <span className="text-[9px] text-vantum-gray tracking-widest uppercase block mt-2">MINS</span>
            </div>
            <div className="border border-vantum-white/[0.06] bg-vantum-black/60 p-4 md:p-6 backdrop-blur-sm relative overflow-hidden">
              <span className="text-3xl md:text-5xl font-extralight block text-red-400 tabular-nums animate-pulse">
                {isMounted ? timeLeft.seconds : "58"}
              </span>
              <span className="text-[9px] text-red-400/60 tracking-widest uppercase block mt-2">SEGS</span>
            </div>
          </div>
          <p className="text-[10px] font-mono text-vantum-gray/50 tracking-wider mt-8">
            * Una vez finalizado el tiempo, las solicitudes de piezas a través de las terminales de distribución quedarán habilitadas de forma estricta por orden de llegada.
          </p>
        </div>
      </section>

      {/* 4. SECCIÓN MODELOS */}
      <section id="modelos" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between border-b border-vantum-white/10 pb-6">
          <div>
            <p className="text-[10px] text-vantum-gray font-mono tracking-[0.25em] uppercase mb-2">// TEXTILE ARCHITECTURE</p>
            <h2 className="text-4xl font-extralight tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-vantum-white to-vantum-gray">Edición de Barrio</h2>
          </div>
          <div className="font-mono text-[11px] text-vantum-gray/60 flex items-center gap-4 mt-4 md:mt-0">
            <span>BATCH SIZE: 500 UNITS</span>
            <span className="text-vantum-white/20">|</span>
            <span>STATUS: OPERATIONAL</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Gorra 1 */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/30 group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="overflow-hidden bg-vantum-black relative aspect-square flex items-center justify-center border border-vantum-white/[0.04]">
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-azul.png" alt="Vantum Onyx Navy" className="w-[85%] h-[85%] object-contain scale-95 group-hover:scale-100 transition-all duration-700 ease-out" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 01.NV-CRM</span>
                <span className="text-yellow-500/80 font-medium bg-yellow-500/5 px-2 py-0.5 border border-yellow-500/10">RESERVA PREVIA</span>
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vantum-white group-hover:to-vantum-gray transition-all duration-300">
                Onyx Navy
              </h3>
              <p className="text-xs text-vantum-gray/80 mt-4 leading-relaxed font-light">
                Gabardina premium azul marino de alta densidad. Contraste estructural con visera curva crema y bordado heráldico en hilo de oro 3D de alta definición.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM CLOSED BACK</span>
              <a href="#contacto" className="uppercase tracking-widest text-vantum-white hover:text-vantum-gray transition-colors flex items-center gap-1 group/btn">
                RESERVAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Gorra 2 */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/30 group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="overflow-hidden bg-vantum-black relative aspect-square flex items-center justify-center border border-vantum-white/[0.04]">
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-verde.png" alt="Vantum Olive Stealth" className="w-[85%] h-[85%] object-contain scale-95 group-hover:scale-100 transition-all duration-700 ease-out" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 02.OLV-STL</span>
                <span className="text-green-400/80 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/10">AVAILABLE</span>
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vantum-white group-hover:to-vantum-gray transition-all duration-300">
                Olive Stealth
              </h3>
              <p className="text-xs text-vantum-gray/80 mt-4 leading-relaxed font-light">
                Chasis de gabardina verde oliva con corte simétrico de visera plana. Isotipo frontal VANTUM de alto relieve inyectado con hilo beige seleccionado.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM FLAT VISOR</span>
              <a href="#contacto" className="uppercase tracking-widest text-vantum-white hover:text-vantum-gray transition-colors flex items-center gap-1 group/btn">
                SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Gorra 3 */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/30 group hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="overflow-hidden bg-vantum-black relative aspect-square flex items-center justify-center border border-vantum-white/[0.04]">
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-negra.png" alt="Vantum Dark Industrial" className="w-[85%] h-[85%] object-contain scale-95 group-hover:scale-100 transition-all duration-700 ease-out" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 03.BLK-IND</span>
                <span className="text-green-400/80 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/10">AVAILABLE</span>
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vantum-white group-hover:to-vantum-gray transition-all duration-300">
                Dark Industrial
              </h3>
              <p className="text-xs text-vantum-gray/80 mt-4 leading-relaxed font-light">
                Monocromía rigurosa. Gabardina negra pura, vivo perimetral beige en visera y fijaciones traseras con placa de aleación mate grabada a láser.
              </p>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">LASER CUT ENGRAVED</span>
              <a href="#contacto" className="uppercase tracking-widest text-vantum-white hover:text-vantum-gray transition-colors flex items-center gap-1 group/btn">
                SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* [NUEVO] 5. RE-INSPECCIÓN DE MACROS (Grid asimétrico de detalles de ingeniería) */}
      <section className="py-24 border-t border-b border-vantum-white/[0.03] px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[10px] text-vantum-gray font-mono tracking-[0.25em] uppercase mb-2">// COMPONENT DECONSTRUCTION</p>
          <h2 className="text-3xl font-extralight tracking-widest uppercase">Geometría de Precisión</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-vantum-white/[0.04] bg-vantum-black/40 p-6 md:col-span-2 h-64 flex flex-col justify-between relative group hover:border-vantum-white/20 transition-colors">
            <div className="text-[9px] font-mono text-vantum-gray tracking-wider">// DETALLE 01 // TEXTURA DE CHASIS</div>
            <span className="text-xs font-light text-vantum-gray/60 uppercase">Imagen Macro: Trama Gabardina Pesada Rígida 100% Algodón Peinado</span>
            <div className="absolute inset-0 bg-gradient-to-t from-vantum-black via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
          <div className="border border-vantum-white/[0.04] bg-vantum-black/40 p-6 h-64 flex flex-col justify-between relative group hover:border-vantum-white/20 transition-colors">
            <div className="text-[9px] font-mono text-vantum-gray tracking-wider">// DETALLE 02 // NÚCLEO 3D</div>
            <span className="text-xs font-light text-vantum-gray/60 uppercase">Close-up: Relieve Inyectado Espuma Automotriz</span>
          </div>
          <div className="border border-vantum-white/[0.04] bg-vantum-black/40 p-6 h-64 flex flex-col justify-between relative group hover:border-vantum-white/20 transition-colors">
            <div className="text-[9px] font-mono text-vantum-gray tracking-wider">// DETALLE 03 // GRABADO LÁSER</div>
            <span className="text-xs font-light text-vantum-gray/60 uppercase">Enfoque: Cierre Posterior Aleación Mate CNC</span>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN ESPECIFICACIONES & LOGÍSTICA / CUIDADO */}
      <section id="especificaciones" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <p className="text-[10px] text-vantum-gray font-mono tracking-[0.3em] uppercase mb-2">// RIGOR ANALYSIS & PROTOCOLS</p>
          <h2 className="text-3xl font-extralight tracking-widest uppercase">Ficha de Ingeniería Textil</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 overflow-x-auto border border-vantum-white/[0.06] bg-vantum-black/20">
            <table className="w-full text-left border-collapse font-light tracking-wide">
              <thead>
                <tr className="border-b border-vantum-white/10 text-[10px] uppercase tracking-[0.2em] text-vantum-gray font-mono bg-vantum-white/[0.01]">
                  <th className="p-5 font-light">Componente</th>
                  <th className="p-5 font-light">Configuración Estándar</th>
                  <th className="p-5 font-light text-right">Tolerancia</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-vantum-white/[0.04] font-mono">
                <tr className="hover:bg-vantum-white/[0.01] transition-colors">
                  <td className="p-6 font-normal text-vantum-white">Chasis Base</td>
                  <td className="p-6 text-vantum-gray font-sans">Gabardina pesada de alta densidad, 100% algodón orgánico peinado de calado rígido.</td>
                  <td className="p-6 text-right text-vantum-gray/70">±0.2mm Simetría</td>
                </tr>
                <tr className="hover:bg-vantum-white/[0.01] transition-colors">
                  <td className="p-6 font-normal text-vantum-white">Bordado Frontal</td>
                  <td className="p-6 text-vantum-gray font-sans">Isotipo inyectado con espuma sintética automotriz, hilo satinado de alta resistencia a rayos UV.</td>
                  <td className="p-6 text-right text-vantum-gray/70">3.5mm Real Core</td>
                </tr>
                <tr className="hover:bg-vantum-white/[0.01] transition-colors">
                  <td className="p-6 font-normal text-vantum-white">Fijación</td>
                  <td className="p-6 text-vantum-gray font-sans">Ajuste anatómico cerrado perimetral de alta tensión sin herrajes perforados expuestos.</td>
                  <td className="p-6 text-right text-vantum-gray/70">100% Simétrico</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-vantum-white/[0.06] bg-vantum-black/30 p-6 font-mono text-[11px] text-vantum-gray leading-relaxed">
            <div className="border-b border-vantum-white/10 pb-3 mb-4">
              <span className="text-vantum-white block font-light tracking-widest text-xs uppercase">// PROTOCOLO LOGÍSTICO</span>
            </div>
            <p className="font-sans text-xs mb-4">
              Despachos certificados a toda la República Argentina a través de terminales de correo prioritario asegurado (Andreani / Correo Argentino). Tracking code asignado de forma inmediata.
            </p>
            
            <div className="border-b border-vantum-white/10 pb-3 mb-4 mt-6">
              <span className="text-vantum-white block font-light tracking-widest text-xs uppercase">// GUÍA DE PRESERVACIÓN</span>
            </div>
            <ul className="space-y-2 list-none p-0 font-sans text-xs">
              <li><strong className="font-mono text-[10px] text-vantum-white block">01. LIMPIEZA INTERNA</strong> Usar paño húmedo microfibra con jabón neutro en banda de sudor. No sumergir chasis.</li>
              <li><strong className="font-mono text-[10px] text-vantum-white block">02. PROTECCIÓN DEL BORDADO</strong> Limpiar isotipo frontal 3D únicamente con cepillo de cerdas blandas en seco.</li>
              <li><strong className="font-mono text-[10px] text-vantum-white block">03. SECADO GEOMÉTRICO</strong> Secar a la sombra en posición horizontal con molde interno para preservar la rigidez estructural de la gabardina.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. SECCIÓN CONTACTO / MATRIZ DE ENLACES VERIFICADOS */}
      <section id="contacto" className="py-32 px-6 md:px-12 bg-gradient-to-b from-vantum-white/[0.01] to-transparent border-t border-vantum-white/[0.04]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[10px] text-vantum-gray font-mono tracking-[0.3em] uppercase mb-3">// COMMUNICATIONS OVERRIDE</p>
          <h2 className="text-3xl font-extralight tracking-widest uppercase mb-8">Canales de Distribución Oficial</h2>
          <p className="text-xs md:text-sm text-vantum-gray leading-relaxed font-light mb-16 max-w-xl mx-auto font-sans">
            Haz clic en cualquiera de nuestras terminales operativas para establecer comunicación inmediata, revisar lanzamientos o coordinar entregas de lotes verificados.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <a href="https://wa.me/5492617616121" target="_blank" rel="noopener noreferrer" className="relative border border-vantum-white/[0.06] bg-vantum-black/50 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-vantum-white/30 group overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.01)]">
              <div className="absolute inset-0 bg-gradient-to-b from-vantum-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[9px] font-mono tracking-widest text-vantum-gray group-hover:text-vantum-white transition-colors group-hover:animate-pulse">// SECURE CHAT</span>
              <span className="text-sm font-light tracking-widest uppercase mt-2">WHATSAPP</span>
              <span className="text-[9px] font-mono text-vantum-gray/40 mt-3 group-hover:translate-x-1 transition-transform">ABRIR CHAT →</span>
            </a>

            <a href="https://www.instagram.com/vantum.co?igsh=a3V4Mm91ZWliOWZ3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="relative border border-vantum-white/[0.06] bg-vantum-black/50 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-vantum-white/30 group overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.01)]">
              <div className="absolute inset-0 bg-gradient-to-b from-vantum-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[9px] font-mono tracking-widest text-vantum-gray group-hover:text-vantum-white transition-colors group-hover:animate-pulse">// ARCHIVE FEED</span>
              <span className="text-sm font-light tracking-widest uppercase mt-2">INSTAGRAM</span>
              <span className="text-[9px] font-mono text-vantum-gray/40 mt-3 group-hover:translate-x-1 transition-transform">VER PORTFOLIO →</span>
            </a>

            <a href="https://www.tiktok.com/@vantum.co?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="relative border border-vantum-white/[0.06] bg-vantum-black/50 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-vantum-white/30 group overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.01)]">
              <div className="absolute inset-0 bg-gradient-to-b from-vantum-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[9px] font-mono tracking-widest text-vantum-gray group-hover:text-vantum-white transition-colors group-hover:animate-pulse">// LAB RECORDINGS</span>
              <span className="text-sm font-light tracking-widest uppercase mt-2">TIKTOK</span>
              <span className="text-[9px] font-mono text-vantum-gray/40 mt-3 group-hover:translate-x-1 transition-transform">VER VIDEOS →</span>
            </a>

            <a href="mailto:vantum553@gmail.com" className="relative border border-vantum-white/[0.06] bg-vantum-black/50 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-vantum-white/30 group overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.01)]">
              <div className="absolute inset-0 bg-gradient-to-b from-vantum-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[9px] font-mono tracking-widest text-vantum-gray group-hover:text-vantum-white transition-colors group-hover:animate-pulse">// INBOX TERMINAL</span>
              <span className="text-sm font-light tracking-widest uppercase mt-2">GMAIL</span>
              <span className="text-[9px] font-mono text-vantum-gray/40 mt-3 group-hover:translate-x-1 transition-transform">REDACCIÓN DIRECTA →</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-vantum-white/[0.04] text-center text-[9px] text-vantum-gray/40 uppercase tracking-[0.3em] font-mono relative z-10">
        &copy; {new Date().getFullYear()} VANTUM. LAB DE INGENIERÍA TEXTIL. TODOS LOS DERECHOS RESERVADOS.
      </footer>

    </main>
  );
}