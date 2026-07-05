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
  
  // ESTADOS DE CONTROL DE INTERFAZ Y LOGÍSTICA DE CARGA
  const [isMounted, setIsMounted] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isDescUnlocked, setIsDescUnlocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [onlineUsers, setOnlineUsers] = useState(12);

  // ESTADOS DEL SIMULADOR DE ERROR AVANZADO (GLITCH LAB)
  const [loadingStep, setLoadingStep] = useState(0); // 0: Fake Loader, 1: Error Aleatorio, 2: Entrada Web
  const [glitchVersion, setGlitchVersion] = useState<"A" | "B" | "C">("A");
  const [fakePassword, setFakePassword] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // 1. CONFIGURACIÓN ORGÁNICA DE TRÁFICO SIMULADO
    setOnlineUsers(Math.floor(Math.random() * (19 - 7 + 1)) + 7);

    // 2. ORQUESTADOR SELECCIÓN DE GLITCH
    const versions: ("A" | "B" | "C")[] = ["A", "B", "C"];
    const randomVersion = versions[Math.floor(Math.random() * versions.length)];
    setGlitchVersion(randomVersion);

    // CALIBRACIÓN CRONOLÓGICA (Entre 5 y 7 segundos de error puro)
    const randomGlitchDuration = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000;

    // FASE 1: Fake Loader de Entrada (1.2 segundos)
    const loaderTimeout = setTimeout(() => {
      setLoadingStep(1); // Desplegar pantalla de error elegida

      // SCRIPT DETALLADO PARA VERSIÓN A: Escritura en Cascada de Volcado de Memoria
      if (randomVersion === "A") {
        const lines = [
          "// INITIALIZING ILLEGAL BYPASS ROUTINE...",
          "WARNING: SECURITY FIREWALL BREACH IN PROGRESS",
          "HOST NODE: vantum_core_mendoza.ar",
          "CONNECTING TO ADDR: 0x7FFF5FBFF710...",
          "BUFFER OVERFLOW INJECTED AT SLOT 0x00F3A2B7",
          "CORRUPTING EXECUTABLE STACK... OK",
          "DUMPING MEMORY REGISTERS:",
          "EAX=00000000 EBX=F7A3C12D ECX=0000001E EDX=54926176",
          "ESI=000021A1 EDI=0000001E EBP=BFFFEC10 ESP=BFFFEC00",
          "FORCING SYSTEM OVERRIDE FAILED. RE-INJECTING...",
          "BYPASS SUCCESSFUL // DISABLING ROOT PROTOCOLS...",
          "OPENING GATEWAY TO LOTE 001..."
        ];
        
        lines.forEach((line, index) => {
          setTimeout(() => {
            setTerminalLines(prev => [...prev, line]);
          }, index * (randomGlitchDuration / lines.length));
        });
      }

      // SCRIPT DETALLADO PARA VERSIÓN C: Tipeo Inteligente Lento de Credenciales Forzadas
      if (randomVersion === "C") {
        let currentPass = "";
        const targetPass = "•V•A•N•T•U•M•";
        let passIdx = 0;
        const passInterval = setInterval(() => {
          if (passIdx < targetPass.length) {
            currentPass += targetPass[passIdx];
            setFakePassword(currentPass);
            passIdx++;
          } else {
            clearInterval(passInterval);
          }
        }, randomGlitchDuration / (targetPass.length + 3));
      }

      // FASE 2: Cierre Automático del Glitch y Lanzamiento de la Web
      const glitchTimeout = setTimeout(() => {
        setLoadingStep(2);
      }, randomGlitchDuration);

      return () => clearTimeout(glitchTimeout);
    }, 1200);

    // 3. RELOJ CRONOLÓGICO Y AUTOMATIZACIÓN DE BLOQUEOS
    const targetDate = new Date("2026-07-25T00:00:00").getTime();
    const descUnlockDate = new Date("2026-07-23T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (now >= descUnlockDate) {
        setIsDescUnlocked(true);
      } else {
        setIsDescUnlocked(false);
      }

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

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 40;
      const y = (e.clientY - innerHeight / 2) / 40;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(loaderTimeout);
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // INYECCIÓN DE ESTILOS CSS INLINE EXCLUSIVOS PARA CONTROLAR LAS ANIMACIONES DE ENTRADA PROGRESIVA
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("vantum-core-styles")) {
      const stylesheet = document.createElement("style");
      stylesheet.id = "vantum-core-styles";
      stylesheet.innerHTML = `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1.2s ease-out forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `;
      document.head.appendChild(stylesheet);
    }
  }, []);

  // FASE 0: FAKE LOADER DE BIENVENIDA DEL SISTEMA
  if (isMounted && loadingStep === 0) {
    return (
      <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col justify-center items-center px-6 select-none">
        <div className="w-full max-w-xs space-y-4">
          <div className="text-[10px] tracking-[0.3em] uppercase opacity-70 animate-pulse">// INITIALIZING CORE SYSTEM...</div>
          <div className="w-full h-[1px] bg-red-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-red-500 w-1/3" style={{ animation: "loading 1.2s ease-in-out infinite" }} />
          </div>
          <div className="text-[9px] tracking-widest text-vantum-gray/40 uppercase text-right">DECRYPTING INTERFACE...</div>
        </div>
      </div>
    );
  }

  // FASE 1: AMPLIZACIÓN DE PANTALLAZOS DE ERROR (DURACIÓN EXTENDIDA A 5-7s)
  if (isMounted && loadingStep === 1) {
    return (
      <div className="min-h-screen bg-black font-mono flex flex-col justify-center items-center px-6 select-none overflow-hidden relative transition-opacity duration-1000 ease-in-out">
        
        {/* VARIACIÓN A: EL CRASH TERMINAL DETALLADO CON CASCADA DE CÓDIGO */}
        {glitchVersion === "A" && (
          <div className="w-full max-w-2xl text-left text-red-500 text-[11px] space-y-1.5 leading-relaxed p-6 border border-red-500/10 bg-red-950/5 rounded-sm">
            <p className="text-red-400 font-bold uppercase animate-pulse tracking-wider">!!! SECURITY ALERT // ROOT EXPLOIT ATTEMPT DETECTED !!!</p>
            <div className="space-y-1 font-mono text-red-500/80">
              {terminalLines.map((line, idx) => (
                <p key={idx} className="opacity-90">{line}</p>
              ))}
            </div>
            <span className="inline-block w-2 h-4 bg-red-500 ml-0.5 animate-pulse mt-2" />
          </div>
        )}

        {/* VARIACIÓN B: LA GRILLA EN CRISIS CROMÁTICA AMPLIADA */}
        {glitchVersion === "B" && (
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444420_1px,transparent_1px),linear-gradient(to_bottom,#ef444420_1px,transparent_1px)] bg-[size:40px_40px] transform rotate-[30deg] scale-150 animate-pulse" />
            <div className="text-center space-y-4 z-10 p-4">
              <h1 className="text-4xl font-light tracking-[0.6em] text-white/90 filter blur-[0.5px] animate-pulse">VANTUM</h1>
              <div className="border border-red-500 bg-red-500/10 text-red-400 font-mono text-[9px] tracking-[0.3em] px-5 py-2 uppercase animate-bounce">
                CRITICAL MALFUNCTION // DISTORTING VECTORIAL SYMMETRY CORE
              </div>
              <p className="text-red-500/40 text-[9px] tracking-widest font-mono uppercase">// RUNNING SELF-REPAIR PROTOCOLS LOTE 001...</p>
            </div>
          </div>
        )}

        {/* VARIACIÓN C: EL FIREWALL CON LOG-IN EN COORDENADAS LENTO */}
        {glitchVersion === "C" && (
          <div className="w-full max-w-sm border border-red-500/20 bg-red-950/5 p-6 space-y-6 text-left rounded-sm">
            <div className="flex items-center gap-3 text-red-500">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold">VANTUM SECURITY PROTOCOL</span>
            </div>
            <div className="space-y-4 font-mono">
              <div className="space-y-1">
                <div className="text-[8px] text-vantum-gray/40 uppercase tracking-widest">NETWORK LINK NODE:</div>
                <div className="text-xs text-white/80 animate-pulse">root@vantum_mendoza_gateway</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-[8px] text-vantum-gray/40 uppercase tracking-widest">DECRYPT KEY:</div>
                <div className="h-8 w-full bg-red-950/30 border border-red-500/40 px-3 flex items-center text-xs text-red-400">
                  {fakePassword}
                  <span className="w-1.5 h-3 bg-red-500 ml-0.5 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="text-[9px] text-red-400 font-bold tracking-widest uppercase animate-pulse pt-3 border-t border-red-500/10">
              // BYPASSING FIREWALL GATEWAY NODE... ACCESS SUCCESSFUL
            </div>
          </div>
        )}

      </div>
    );
  }

  // FASE 2: ENTRADA WEB COMPLETA CON ORQUESTACIÓN DE ANIMACIONES PROGRESSIVAS (`animate-fade-up`)
  return (
    <div className="min-h-screen bg-vantum-black text-vantum-white selection:bg-vantum-white selection:text-vantum-black overflow-x-hidden font-sans relative antialiased">
      
      {/* GRILLA INDUSTRIAL DE FONDO */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* REVOLUCIÓN DE LUZ SUPERIOR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-vantum-white/[0.02] to-transparent blur-[120px] pointer-events-none z-0 animate-fade-in" />

      {/* 1. NAVEGACIÓN COMPACTA CON ANIMACIÓN DE ENTRADA SUAVE */}
      <nav className="border-b border-vantum-white/5 backdrop-blur-md bg-vantum-black/40 sticky top-0 z-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-light tracking-[0.4em] uppercase text-vantum-white hover:opacity-80 transition-opacity">
            VANTUM
          </a>
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
            <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20ingresar%20a%20la%20lista%20de%20prioridad%20para%20el%20Lote%20001." target="_blank" rel="noopener noreferrer" className="border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-[9px] font-mono tracking-[0.25em] uppercase text-red-400 hover:bg-red-500 hover:text-vantum-white transition-all duration-300">
              LISTA DE ESPERA
            </a>
          )}
        </div>
      </nav>

      {/* 2. HERO SECTOR CON DESPLAZAMIENTOS COORDINADOS (ORQUESTACIÓN DE INTERFAZ) */}
      <header className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 text-center z-10 pt-12 pb-20">
        <div className="space-y-4 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* FADE COMPONENTE 1 (ALERTA ESCASEZ) */}
          <div className="flex flex-wrap justify-center gap-2 painting-fade animate-fade-up delay-100">
            <div className="inline-flex items-center gap-2 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full font-mono text-[9px] tracking-[0.25em] text-red-400 uppercase animate-pulse">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {isMounted && isDropActive ? "SYSTEM STATUS // LIVE" : "SYSTEM HOLDING // EDICIÓN 001"}
            </div>
            <div className="inline-flex items-center border border-vantum-white/20 bg-vantum-white/5 px-4 py-1.5 rounded-full font-mono text-[9px] tracking-[0.25em] text-vantum-white uppercase">
              TOTAL BATCH // 30 UNITS ONLY
            </div>
          </div>
          
          {/* FADE COMPONENTE 2 (LOGO CENTRAL) */}
          <div 
            className="py-8 cursor-crosshair relative z-20 transition-transform duration-300 ease-out flex items-center justify-center painting-fade animate-fade-up delay-200"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <img 
              src="/logo-vantum.png" 
              alt="Vantum Brand Logo" 
              className="w-24 h-24 object-contain animate-[spin_40s_linear_infinite] select-none pointer-events-none filter brightness-95" 
            />
          </div>

          {/* FADE COMPONENTE 3 (ESLOGAN) */}
          <p className="font-mono text-xs md:text-sm text-vantum-gray tracking-[0.18em] max-w-2xl mx-auto uppercase leading-relaxed painting-fade animate-fade-up delay-300">
            Estructuras de alta simetría. Estética urbana con rigor de ingeniería.
          </p>
        </div>

        {/* FADE COMPONENTE 4 (CONTADOR INTERACTIVO CON FADE UP RETRASADO) */}
        <div className="mt-16 border border-vantum-white/10 bg-vantum-black/60 backdrop-blur-md p-8 md:p-12 w-full max-w-3xl mx-auto relative group hover:border-vantum-white/20 transition-colors painting-fade animate-fade-up delay-400">
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
              <div 
                className="text-4xl md:text-6xl font-extralight tracking-tight text-red-500 tabular-nums relative"
                style={{ textShadow: "0 0 14px rgba(239, 68, 68, 0.85), 0 0 4px rgba(239, 68, 68, 0.5)" }}
              >
                {isMounted ? timeLeft.seconds : "00"}
              </div>
              <div className="text-[9px] text-vantum-gray/40 tracking-[0.2em] uppercase mt-2">Segundos</div>
            </div>
          </div>
        </div>

        {/* FADE COMPONENTE 5 (ESTADO DE OPERADORES) */}
        <div className="mt-6 font-mono text-[10px] tracking-[0.15em] text-red-400/80 uppercase select-none painting-fade animate-fade-up delay-500">
          [ SERVER STATUS: {onlineUsers} OPERATORS ONLINE IN MENDOZA NODE ]
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 font-mono text-[10px] tracking-widest painting-fade animate-fade-up delay-500">
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
            <span>BATCH SIZE: 30 UNITS</span>
            <span className="text-vantum-white/20">|</span>
            <span>STATUS: {isMounted && isDropActive ? "LIVE" : "HOLDING"}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* MODELO 01: OLIVE KHAKI */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/20 group">
            <div className="overflow-hidden bg-vantum-black/90 relative aspect-square flex items-center justify-center border border-vantum-white/[0.04] rounded-sm shadow-inner bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]">
              
              {isMounted && !isDropActive && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] pointer-events-none z-20 opacity-40" />
              )}
              
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              
              <img 
                src="/gorra-oliva.png" 
                alt="Vantum Olive Khaki" 
                className={`w-[85%] h-[85%] object-contain scale-95 transition-all duration-750 ease-out select-none pointer-events-none
                  ${isMounted && !isDropActive ? "blur-[3px] grayscale opacity-75 contrast-115" : "group-hover:scale-100"}`} 
              />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 01.OLV-KHK</span>
                {isMounted && isDropActive ? (
                  <span className="text-green-400 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/20 tracking-widest text-[9px]">// SYSTEM LIVE</span>
                ) : (
                  <span className="text-amber-500/60 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">
                    {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white">
                Olive Khaki
              </h3>
              
              <div className="relative mt-4 min-h-[70px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify
                  ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-10 grayscale contrast-50 pointer-events-none text-vantum-gray" : "text-vantum-gray/80"}`}
                >
                  Chasis estructural verde oliva profundo. Isotipo lineal en alto relieve beige desértico y vivo perimetral inferior a tono. Estética militarizada de alta precisión.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-red-500/80 bg-black/10 text-center font-medium">
                    [ DATA ENCRYPTED // REVEALED 23/07 ]
                  </span>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM FLAT VISOR</span>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Olive%20Khaki%20(SPEC%20%2F%2F%2001.OLV-KHK)" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 group/btn font-medium">
                  SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              ) : (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20unirme%20a%20la%20lista%20de%20espera%20para%20la%20pieza%20Vantum%20Olive%20Khaki." target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 px-4 py-1.5 font-mono text-[9px] transition-colors rounded-sm tracking-widest font-medium">
                  [ UNIRSE A LA LISTA DE ESPERA ]
                </a>
              )}
            </div>
          </div>

          {/* MODELO 02: CRIMSON STEALTH */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/20 group">
            <div className="overflow-hidden bg-vantum-black/90 relative aspect-square flex items-center justify-center border border-vantum-white/[0.04] rounded-sm shadow-inner bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]">
              
              {isMounted && !isDropActive && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] pointer-events-none z-20 opacity-50" />
              )}
              
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              
              <img 
                src="/gorra-roja.png" 
                alt="Vantum Crimson Stealth" 
                className={`w-[85%] h-[85%] object-contain scale-95 transition-all duration-750 ease-out select-none pointer-events-none
                  ${isMounted && !isDropActive ? "blur-[3px] grayscale opacity-75 contrast-115" : "group-hover:scale-100"}`} 
              />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 02.CRMS-STL</span>
                {isMounted && isDropActive ? (
                  <span className="text-green-400 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/20 tracking-widest text-[9px]">// SYSTEM LIVE</span>
                ) : (
                  <span className="text-amber-500/60 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">
                    {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white">
                Crimson Stealth
              </h3>
              
              <div className="relative mt-4 min-h-[70px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify
                  ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-10 grayscale contrast-50 pointer-events-none text-vantum-gray" : "text-vantum-gray/80"}`}
                >
                  Contraste crítico de alta hostilidad. Gabardina negra pura con isotipo frontal y vivos perimetrales inyectados en hilo carmesí. Diseñada para romper el entorno urbano.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-red-500/80 bg-black/10 text-center font-medium">
                    [ DATA ENCRYPTED // REVEALED 23/07 ]
                  </span>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM FLAT VISOR</span>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Crimson%20Stealth%20(SPEC%20%2F%2F%2002.CRMS-STL)" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 group/btn font-medium">
                  SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              ) : (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20unirme%20a%20la%20lista%20de%20espera%20para%20la%20pieza%20Vantum%20Crimson%20Stealth." target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 px-4 py-1.5 font-mono text-[9px] transition-colors rounded-sm tracking-widest font-medium">
                  [ UNIRSE A LA LISTA DE ESPERA ]
                </a>
              )}
            </div>
          </div>

          {/* MODELO 03: ONYX GOLD */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/20 group">
            <div className="overflow-hidden bg-vantum-black/90 relative aspect-square flex items-center justify-center border border-vantum-white/[0.04] rounded-sm shadow-inner bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]">
              
              {isMounted && !isDropActive && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] pointer-events-none z-20 opacity-50" />
              )}
              
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              
              <img 
                src="/gorra-oro.png" 
                alt="Vantum Onyx Gold" 
                className={`w-[85%] h-[85%] object-contain scale-95 transition-all duration-750 ease-out select-none pointer-events-none
                  ${isMounted && !isDropActive ? "blur-[3px] grayscale opacity-75 contrast-115" : "group-hover:scale-100"}`} 
              />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 03.ONX-GLD</span>
                {isMounted && isDropActive ? (
                  <span className="text-green-400 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/20 tracking-widest text-[9px]">// SYSTEM LIVE</span>
                ) : (
                  <span className="text-amber-500/60 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">
                    {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white">
                Onyx Gold
              </h3>
              
              <div className="relative mt-4 min-h-[70px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify
                  ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-10 grayscale contrast-50 pointer-events-none text-vantum-gray" : "text-vantum-gray/80"}`}
                >
                  Rigor clásico de ingeniería. Base monocromática negra con bordado lineal heráldico en hilo de oro seleccionado. Máxima simetría y sobriedad industrial.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-red-500/80 bg-black/10 text-center font-medium">
                    [ DATA ENCRYPTED // REVEALED 23/07 ]
                  </span>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center border-t border-vantum-white/[0.06] pt-4 text-[11px] font-mono">
              <span className="text-vantum-gray/40">PREMIUM FLAT VISOR</span>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Onyx%20Gold%20(SPEC%20%2F%2F%2003.ONX-GLD)" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 group/btn font-medium">
                  SOLICITAR PIEZA <span className="text-[9px] translate-y-[-1px] group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              ) : (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20anotarme%20en%20la%20lista%20de%20espera%20para%20la%20pieza%20Vantum%20Onyx%20Gold." target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-500/20 bg-red-500/5 px-4 py-1.5 font-mono text-[9px] transition-colors rounded-sm tracking-widest font-medium">
                  [ UNIRSE A LA LISTA DE ESPERA ]
                </a>
              )}
            </div>
          </div>

        </div>

        {/* INDICADOR DE STOCK EN VIVO AJUSTADO A 30 UNIDADES */}
        {isMounted && isDropActive && (
          <div className="mt-16 max-w-xl mx-auto border border-green-500/20 bg-green-500/5 p-4 font-mono text-[10px] tracking-widest text-center text-green-400">
            <div className="flex justify-between mb-2">
              <span>// BATCH LOTE 001 STATUS</span>
              <span>30 / 30 UNITS RESERVED</span>
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

            <div className="border border-vantum-white/10 bg-vantum-black/40 p-6 flex flex-col justify-between relative">
              <div className="text-[9px] text-vantum-white/40 mb-4 tracking-[0.2em] uppercase">// METRIC SYSTEM & TOLERANCE</div>
              <table className={`w-full text-left text-[11px] leading-relaxed transition-all duration-1000
                ${isMounted && !isDescUnlocked ? "blur-[5px] opacity-10 pointer-events-none select-none" : ""}`}
              >
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
                    <td className="py-2 text-vantum-white/80">Ancho de Visera</td>
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
                    <td className="py-2 text-right text-white">12 SPI</td>
                    <td className="py-2 text-right text-red-400">Nominal</td>
                  </tr>
                </tbody>
              </table>
              {isMounted && !isDescUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-widest text-red-400 uppercase text-center font-medium">
                  [ METRICS RESTRINGED // OVERRIDE AT 23/07 ]
                </div>
              )}
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