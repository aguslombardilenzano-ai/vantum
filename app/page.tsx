"use client";

import { useState, useEffect, useRef } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  
  // LOGÍSTICA GENERAL DE INTERFAZ
  const [isMounted, setIsMounted] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(7);
  const [currentDateTime, setCurrentDateTime] = useState("");

  // INTRO POR CONTRASEÑA Y SECUENCIA DE DESTELLOS RESTAURADA AL 100%
  const [loadingStep, setLoadingStep] = useState(0); 
  const [fakePassword, setFakePassword] = useState("");
  const [showFinalPhrase, setShowFinalPhrase] = useState(false);
  const [flashActive, setFlashActive] = useState(false);

  // CONTROL INTERACTIVO DE GALERÍA (INSTANTÁNEO POR OPACIDAD)
  const [activeViewWhite, setActiveViewWhite] = useState(0);
  const [activeViewBlack, setActiveViewBlack] = useState(0);

  // MECÁNICAS INTERACTIVAS COMPILADAS
  const [cctvTime, setCctvTime] = useState("00:00:00");
  const [showTerminalConsole, setShowTerminalConsole] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["VANTUM LABS CORE v2.01", "Nodo Mendoza operativo."]);
  const [bioScanning, setBioScanning] = useState(false);
  const [bioText, setBioText] = useState("");
  const [bioSuccess, setBioSuccess] = useState(false);
  const [waitlistPercentage, setWaitlistPercentage] = useState(84);
  const logoClickCount = useRef(0);

  const whiteCapImages = [
    "/gorra-blanca-frontal.jpg",
    "/gorra-blanca-derecha.jpg",
    "/gorra-blanca-izquierda.jpg",
    "/gorra-blanca-trasera.jpg"
  ];

  const blackCapImages = [
    "/gorra-negra-frontal.jpg",
    "/gorra-negra-derecha.jpg",
    "/gorra-negra-izquierda.jpg",
    "/gorra-negra-trasera.jpg"
  ];

  // CICLO INDEPENDIENTE EXCLUSIVO PARA LA INTRO DE DESTELLOS
  useEffect(() => {
    setIsMounted(true);
    
    const firewallDuration = 2000;
    
    const loaderTimeout = setTimeout(() => {
      setLoadingStep(1);

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
          setShowFinalPhrase(true);
        }
      }, 80);

      const gatewayTimeout = setTimeout(() => {
        clearInterval(passInterval);
        setLoadingStep(2);
        
        // Cadena secuencial de parpadeos violentos de identidad
        setTimeout(() => setFlashActive(true), 400);
        setTimeout(() => setFlashActive(false), 650);
        setTimeout(() => setFlashActive(true), 800);
        setTimeout(() => setFlashActive(false), 1050);

        setTimeout(() => {
          setLoadingStep(3);
        }, 2200);

      }, firewallDuration);

      return () => {
        clearInterval(passInterval);
        clearTimeout(gatewayTimeout);
      };
    }, 800);

    return () => clearTimeout(loaderTimeout);
  }, []);

  // RE-CALIBRACIÓN RELOJ Y LOGÍSTICA DE INTERFAZ
  useEffect(() => {
    if (loadingStep !== 3) return;

    setOnlineUsers(Math.floor(Math.random() * (16 - 7 + 1)) + 7);
    const startTime = Date.now();
    
    const timerInterval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(`${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${now.toLocaleTimeString()}`);
      
      const elapsed = Date.now() - startTime;
      const hrs = Math.floor(elapsed / 3600000).toString().padStart(2, "0");
      const mins = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, "0");
      const secs = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, "0");
      setCctvTime(`${hrs}:${mins}:${secs}`);
    }, 1000);

    const targetDate = new Date("2026-07-31T00:00:00").getTime();
    const creationTimestamp = new Date("2026-07-04T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const totalDuration = targetDate - creationTimestamp;
      const elapsedDuration = now - creationTimestamp;
      const progressRatio = Math.min(Math.max(elapsedDuration / totalDuration, 0), 1);
      setWaitlistPercentage(Math.floor(84 + (progressRatio * 12)));

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
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(intervalId);
    };
  }, [loadingStep]);

  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("vantum-core-styles")) {
      const stylesheet = document.createElement("style");
      stylesheet.id = "vantum-core-styles";
      stylesheet.innerHTML = `
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes brandOut { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.99); filter: blur(4px); } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes vPulse { 0% { opacity: 0.03; transform: scale(1); } 50% { opacity: 0.08; transform: scale(1.005); } 100% { opacity: 0.03; transform: scale(1); } }
        .animate-fade-in { opacity: 0; animation: fadeIn 1.2s ease-out forwards; }
        .animate-brand-out { animation: brandOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards; }
        .animate-v-giant { animation: vPulse 10s ease-in-out infinite; }
        .crimson-glow { filter: drop-shadow(0 0 8px rgba(225, 42, 42, 0.45)); }
        .cctv-scanline { position: fixed; top: 0; left: 0; width: 100%; height: 2px; background: rgba(255,255,255,0.012); pointer-events: none; z-index: 99; animation: scanline 5s linear infinite; }
        .cctv-noise { position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.012'/%3E%3C/svg%3E"); pointer-events: none; z-index: 98; }
      `;
      document.head.appendChild(stylesheet);
    }
  }, []);

  const handleLogoClick = () => {
    logoClickCount.current += 1;
    if (logoClickCount.current === 3) {
      setShowTerminalConsole(true);
      setTerminalLogs(prev => [...prev, ">> TERMINAL OVERRIDE GRANTED."]);
      logoClickCount.current = 0;
    }
  };

  const processCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;
    let response = `Comando inválido: '${cmd}'.`;
    if (cmd === "help") response = "Registros: 'lote001' // 'clear' // 'exit'";
    else if (cmd === "lote001") response = "20 unidades en Maipú. Numeradas 01-10 por modelo.";
    else if (cmd === "clear") { setTerminalLogs([]); setTerminalInput(""); return; }
    else if (cmd === "exit") { setShowTerminalConsole(false); setTerminalInput(""); return; }
    setTerminalLogs(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput("");
  };

  const executeGeneralReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    if (bioScanning || bioSuccess) return;

    setBioScanning(true);
    setBioText("PROCESANDO SOLICITUD...");

    setTimeout(() => {
      setBioText("COMPILANDO RESERVA DEL BATCH...");
      setTimeout(() => {
        setBioText("CUPO ASIGNADO");
        setBioSuccess(true);
        setTimeout(() => {
          setBioScanning(false);
          setBioSuccess(false);
          window.open("https://wa.me/5492617616121?text=Solicito%20verificaci%C3%B3n%20de%20stock%20para%20el%20Batch%20001.%20C%C3%B3digo%20de%20sistema%3A%20VANTUM-CORE.", "_blank");
        }, 500);
      }, 600);
    }, 700);
  };

  if (isMounted && loadingStep === 0) {
    return (
      <div className="min-h-screen bg-black text-white/50 font-mono flex flex-col justify-center items-center px-6 select-none">
        <div className="w-full max-w-xs space-y-3">
          <div className="text-[9px] tracking-[0.3em] uppercase opacity-50">// VANTUM NETWORK INTERFACE...</div>
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-white/40 w-1/4" style={{ animation: "loading 1.4s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    );
  }

  if (isMounted && loadingStep === 1) {
    return (
      <div className="min-h-screen bg-black font-mono flex flex-col justify-center items-center px-6 select-none relative">
        <div className="w-full max-w-sm p-6 space-y-5 text-left border border-white/10 bg-[#030303] shadow-2xl">
          <div className="flex items-center gap-2.5 text-white/40">
            <span className="w-1 h-1 bg-white/30 rounded-full animate-pulse" />
            <span className="text-[9px] tracking-[0.3em] uppercase">CONTROL DE ACCESO VANTUM</span>
          </div>
          <div className="space-y-3">
            <div className="space-y-0.5">
              <div className="text-[8px] text-white/30 uppercase tracking-widest">NODO DE ENLACE:</div>
              <div className="text-xs text-white/70">root@mendoza_node_02</div>
            </div>
            <div className="space-y-1">
              <div className="text-[8px] text-white/30 uppercase tracking-widest">INGRESAR CREDENCIAL:</div>
              <div className="h-7 w-full bg-white/[0.03] border border-white/10 px-2.5 flex items-center text-xs text-white/80 tracking-widest">
                {fakePassword}
                {!showFinalPhrase && <span className="w-1 h-3 bg-white/50 ml-0.5 animate-pulse" />}
              </div>
            </div>
          </div>
          <div className="h-4 font-mono">
            {showFinalPhrase && (
              <div className="text-white font-bold text-[9px] tracking-[0.2em] uppercase">
                // SISTEMA DESBLOQUEADO. [ DROP_001 IS COMING. ]
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isMounted && loadingStep === 2) {
    return (
      <div className={`min-h-screen transition-colors duration-[40ms] flex flex-col justify-center items-center px-6 select-none animate-brand-out relative overflow-hidden ${flashActive ? "bg-white text-black" : "bg-black text-white"}`}>
        <div className="cctv-noise" />
        
        {!flashActive && (
          <div className="space-y-2 font-mono text-[10px] md:text-[11px] tracking-[0.32em] text-white/40 uppercase text-center animate-fade-in">
            <p className="font-medium tracking-[0.35em] text-white/70">BUILD WITH PURPOSE</p>
            <p className="font-light text-red-500/60 crimson-glow">NOT FOR EVERYONE</p>
          </div>
        )}

        {flashActive && (
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <img 
              src="/logo-real.png" 
              alt="VANTUM CORE MASTER FLASH" 
              className="w-[450px] h-[450px] md:w-[600px] md:h-[600px] object-contain absolute opacity-100 filter invert select-none"
            />
            <h2 className="text-5xl md:text-8xl font-black tracking-[0.75em] text-black uppercase pl-[0.75em] relative z-10 mix-blend-difference select-none">
              VANTUM
            </h2>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden font-sans relative antialiased animate-fade-in">
      
      <div className="cctv-scanline" />
      <div className="cctv-noise" />

      {/* RE-CALIBRACIÓN CROMÁTICA REC */}
      <div className="fixed top-6 right-6 font-mono text-[9px] tracking-[0.25em] text-white/30 flex items-center gap-2 z-50 select-none">
        <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
        <span>REC {cctvTime}</span>
      </div>

      {/* METADATOS EN EL BORDE */}
      <div className="fixed bottom-6 left-6 font-mono text-[8px] tracking-[0.2em] text-white/20 flex flex-col gap-0.5 z-50 select-none uppercase hidden md:flex">
        <span>BÚNKER DE DISEÑO & DESARROLLO: MENDOZA, ARG</span>
        <span>LOGÍSTICA DE DISTRIBUCIÓN: ENVÍOS GLOBALES ACTIVADOS</span>
      </div>

      {/* HALO LUMÍNICO BASE DEL HERO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden h-[100vh]">
        <div className="absolute w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-r from-red-950/15 via-transparent to-transparent blur-[130px] opacity-60 animate-pulse" />
      </div>

      {/* 1. NAV BAR */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-4 hover:opacity-75 transition-opacity select-none group">
            <img src="/logo-real.png" alt="Vantum Isotipo" className="w-10 h-10 object-contain filter brightness-110" />
            <span className="text-sm font-light tracking-[0.45em] uppercase text-white/90 pl-0.5">VANTUM</span>
          </a>
          <div className="hidden md:flex items-center gap-12 text-[9px] font-mono tracking-[0.25em] uppercase text-white/40">
            <a href="#manifiesto" className="hover:text-white transition-colors">[ EL MANIFIESTO ]</a>
            <a href="#modelos" className="hover:text-white transition-colors">[ GORRAS DISPONIBLES ]</a>
            <a href="#especificaciones" className="hover:text-white transition-colors">[ PLANO DE MEDIDAS ]</a>
          </div>
          <button 
            onClick={() => document.getElementById("bloque-captura")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-red-500/30 bg-red-500/5 px-4 py-2 text-[9px] font-mono tracking-[0.2em] uppercase text-red-400 rounded-sm hover:bg-red-500 hover:text-black transition-colors font-medium cursor-pointer"
          >
            [ ACCESO AL BATCH ]
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTOR */}
      <header className="relative min-h-[calc(100vh-20px)] flex flex-col justify-center items-center px-6 text-center z-10 pt-10 pb-20 overflow-hidden">
        <div className="space-y-12 max-w-4xl mx-auto flex flex-col items-center relative w-full z-10">
          
          <div className="flex flex-wrap justify-center gap-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 border border-red-500/20 bg-red-500/5 px-3 py-1 rounded-full font-mono text-[9px] tracking-[0.2em] text-red-400 uppercase crimson-glow">
              <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
              EDICIÓN DE BARRIO 001
            </div>
            <div className="inline-flex items-center border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">
              LOTE ÚNICO // 2 MODELOS // 10 UNIDADES NUMERADAS
            </div>
          </div>
          
          {/* CONCLAVE DE MOLDERÍA CENTRAL ESCALA 3x CON CORCHETES COMPLETAMENTE ESTÁTICOS */}
          <div className="flex items-center justify-center my-36 relative w-full gap-24 md:gap-40 select-none">
            <span className="font-mono text-3xl md:text-5xl text-white/20 tracking-normal font-extralight select-none">[</span>
            <div onClick={handleLogoClick} className="cursor-crosshair flex items-center justify-center group relative z-10">
              <img 
                src="/logo-real.png" 
                alt="Vantum Monolith 3x Scaled" 
                className="w-48 h-48 md:w-56 md:h-56 object-contain opacity-[0.98] filter drop-shadow-[0_0_50px_rgba(255,255,255,0.12)] transform scale-[2.8] md:scale-[3.0] transition-transform duration-700 ease-out"
              />
            </div>
            <span className="font-mono text-3xl md:text-5xl text-white/20 tracking-normal font-extralight select-none">]</span>
          </div>

          {/* FIRMA DE NOMBRE */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            <h2 className="text-2xl md:text-3xl font-extralight tracking-[0.75em] text-white uppercase pl-[0.75em] select-none relative z-10">
              VANTUM
            </h2>
            <div className="flex items-center gap-4 font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase select-none relative z-10">
              <span className="font-semibold text-white/50">BUILD WITH PURPOSE</span>
              <span className="text-white/10">|</span>
              <span className="text-[#e12a2a] font-medium crimson-glow">NOT FOR EVERYONE</span>
            </div>
          </div>

          {/* LA V GIGANTE ATRÁS DE LA BIENVENIDA */}
          <div className="w-full max-w-2xl mx-auto relative py-12 px-4 group">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <img 
                src="/logo-real.png" 
                alt="Vantum Presentation Background Core" 
                className="w-[85%] max-w-[500px] object-contain opacity-[0.09] animate-v-giant filter contrast-125 select-none"
              />
            </div>

            <div className="space-y-5 relative z-10 select-none">
              <h1 className="font-mono text-xs md:text-sm text-white tracking-[0.35em] uppercase font-bold">
                CONFECCIÓN URBANA PESADA DE ALTA DENSIDAD
              </h1>
              <p className="font-mono text-[11px] md:text-xs text-white/70 tracking-[0.22em] uppercase leading-relaxed text-center">
                Armamos bloques de moldería rígida bajo un control estricto de simetría estructural. No hacemos ropa en masa; confinamos colecciones numeradas de <span className="text-white font-bold">10 gorras exclusivas por modelo</span> desarrolladas en gabardina esmerilada de máximo grosor. Estética de búnker ajustada a la calle.
              </p>
            </div>
          </div>

          {/* FILETES TÉCNICOS */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl font-mono text-[9px] tracking-widest uppercase text-white/30 relative z-10 border-t border-b border-white/5 py-4 bg-black/20 backdrop-blur-[1px]">
            <div className="px-2">
              <span className="text-white/50 block mb-0.5">// TEXTIL REFORZADO</span>
              GABARDINA ESMERILADA
            </div>
            <div className="px-2 border-l border-white/5">
              <span className="text-white/50 block mb-0.5">// INYECCIÓN BORDADO</span>
              HILO PUNTEADO: ALTA DEN
            </div>
            <div className="px-2 border-l border-white/5">
              <span className="text-white/50 block mb-0.5">// CONTORNO TRASERO</span>
              PIEZAS NUMERADAS: 01-10
            </div>
            <div className="px-2 border-l border-white/5">
              <span className="text-[#e12a2a] font-medium block mb-0.5 crimson-glow">// VOLUMEN DEL BATCH</span>
              20 EJEMPLARES TOTALES
            </div>
          </div>
        </div>

        {/* TIME COUNTER */}
        <div id="reloj-drop" className="mt-16 border border-white/5 bg-[#040404]/50 backdrop-blur-md p-8 md:p-12 w-full max-w-2xl mx-auto relative group hover:border-white/10 transition-colors rounded-sm z-10">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-black px-2.5 font-mono text-[8px] tracking-[0.25em] text-[#e12a2a] uppercase font-medium animate-pulse crimson-glow">
            // [ SISTEMA EN ESPERA DE LANZAMIENTO GENERAL ]
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-6 font-mono select-none">
            <div>
              <div className="text-3xl md:text-5xl font-extralight tracking-tight text-white/90 tabular-nums">{timeLeft.days}</div>
              <div className="text-[8px] text-white/40 tracking-[0.2em] uppercase mt-1.5">Días</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extralight tracking-tight text-white/90 tabular-nums">{timeLeft.hours}</div>
              <div className="text-[8px] text-white/40 tracking-[0.2em] uppercase mt-1.5">Horas</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extralight tracking-tight text-white/90 tabular-nums">{timeLeft.minutes}</div>
              <div className="text-[8px] text-white/40 tracking-[0.2em] uppercase mt-1.5">Minutos</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-normal tracking-tight text-[#e12a2a] tabular-nums relative crimson-glow">{timeLeft.seconds}</div>
              <div className="text-[8px] text-white/20 tracking-[0.2em] uppercase mt-1.5">Segundos</div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. SECCIÓN MANIFIESTO */}
      <section id="manifiesto" className="py-36 border-y border-white/5 relative z-10 px-6 bg-[#020202]/30 backdrop-blur-[2px]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-mono text-[9px] text-white/40 tracking-[0.32em] uppercase tracking-widest">// PHILOSOPHY & IDENTITY</p>
          <p className="text-base md:text-lg font-light tracking-[0.18em] leading-relaxed text-white/80 font-sans uppercase text-center px-4">
            No diseñamos accesorios ordinarios. Construimos bloques estructurales rígidos para el uso diario. Cada pieza responde a un control estricto de moldería urbana y simetría textil absoluta. VANTUM es la respuesta técnica a la saturación del mercado contemporáneo.
          </p>
        </div>
      </section>

      {/* 4. SECCIÓN MODELOS: CARGA SIMULTÁNEA DE 4 VISTAS (0 MILISEGUNDOS DE DELAY AL INTERCAMBIAR) */}
      <section id="modelos" className="py-32 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
          <div>
            <p className="text-[9px] text-white/40 font-mono tracking-[0.25em] uppercase mb-2">// TEXTILE ARCHITECTURE</p>
            <h2 className="text-3xl font-extralight tracking-widest uppercase text-white/90">Edición de Barrio</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
          
          {/* MODELO 01: ONYX WHITE BEIGE */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm">
            <div className="space-y-5">
              
              {/* Contenedor Cuadrado Inflexible Anti-Blur con Pilas de Capas Pre-cargadas */}
              <div className="overflow-hidden bg-[#090909] relative aspect-square w-full border border-white/5 rounded-sm">
                {whiteCapImages.map((src, idx) => (
                  <img 
                    key={idx}
                    src={src} 
                    alt={`Vantum White Cap Angle ${idx + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none contrast-105 transition-opacity duration-[150ms] ease-in-out ${activeViewWhite === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`} 
                  />
                ))}
              </div>

              {/* Botonera Hardware */}
              <div className="grid grid-cols-4 gap-2 font-mono text-[9px] tracking-widest">
                {["01 FRONTAL", "02 LAT DER", "03 LAT IZQ", "04 TRASERA"].map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveViewWhite(index)}
                    className={`border py-2 text-center transition-all rounded-sm uppercase font-medium cursor-pointer ${activeViewWhite === index ? "border-[#e12a2a] bg-red-500/5 text-red-400 crimson-glow font-bold" : "border-white/5 bg-white/[0.01] text-white/40 hover:text-white/80 hover:border-white/10"}`}
                  >
                    {label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 01.WHT-BGE</span>
                <span className="text-green-500/50 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/10 tracking-widest text-[8px]">
                  // EDICIÓN NUMERADA [01-10]
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Onyx White Beige</h3>
              <p className="text-xs leading-relaxed font-light text-white/60 text-justify mt-4">
                Cuerpo limpio confeccionado íntegramente en gabardina esmerilada blanca pura. Bloque tipográfico frontal y detalles de chasis bordados con hilo punteado de alta densidad en tonalidad beige orgánica.
              </p>
            </div>
          </div>

          {/* MODELO 02: CRIMSON ONYX STEALTH */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm">
            <div className="space-y-5">
              
              {/* Contenedor Cuadrado Inflexible Anti-Blur con Pilas de Capas Pre-cargadas */}
              <div className="overflow-hidden bg-[#090909] relative aspect-square w-full border border-white/5 rounded-sm">
                {blackCapImages.map((src, idx) => (
                  <img 
                    key={idx}
                    src={src} 
                    alt={`Vantum Black Cap Angle ${idx + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none contrast-105 transition-opacity duration-[150ms] ease-in-out ${activeViewBlack === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`} 
                  />
                ))}
              </div>

              {/* Botonera Hardware */}
              <div className="grid grid-cols-4 gap-2 font-mono text-[9px] tracking-widest">
                {["01 FRONTAL", "02 LAT DER", "03 LAT IZQ", "04 TRASERA"].map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveViewBlack(index)}
                    className={`border py-2 text-center transition-all rounded-sm uppercase font-medium cursor-pointer ${activeViewBlack === index ? "border-[#e12a2a] bg-red-500/5 text-red-400 crimson-glow font-bold" : "border-white/5 bg-white/[0.01] text-white/40 hover:text-white/80 hover:border-white/10"}`}
                  >
                    {label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 02.BLK-SLV</span>
                <span className="text-green-500/50 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/10 tracking-widest text-[8px]">
                  // EDICIÓN NUMERADA [01-10]
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Crimson Onyx Stealth</h3>
              <p className="text-xs leading-relaxed font-light text-white/60 text-justify mt-4">
                Estructura armada en gabardina esmerilada negra de alta torsión. Isotipo monumental de moldería concéntrica inyectado en el panel frontal con hilo punteado de alta densidad color gris plateado.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PORTAL CENTRAL DE RESERVA */}
      <section id="bloque-captura" className="py-24 px-6 max-w-4xl mx-auto relative z-10 text-center">
        <div className="border border-red-500/30 bg-[#050505] p-10 md:p-16 space-y-6 rounded-sm shadow-2xl relative overflow-hidden">
          <div className="font-mono text-[10px] md:text-[11px] text-[#e12a2a] uppercase tracking-[0.3em] font-medium animate-pulse crimson-glow">
            // REGISTRO DE ADMISIÓN - EDICIÓN DE BARRIO 001
          </div>
          <h2 className="text-xl md:text-2xl font-extralight tracking-widest text-white uppercase max-w-xl mx-auto leading-relaxed">
            SOLICITÁ TU LUGAR PARA ASEGURAR UNA DE LAS 20 PIEZAS EXCLUSIVAS ANTES DE QUE EL ACCESO SE CIERRE POR COMPLETO
          </h2>
          <div className="pt-4 max-w-xl mx-auto">
            <button 
              onClick={executeGeneralReserve}
              className={`w-full uppercase text-center py-5 text-[11px] md:text-xs font-bold tracking-[0.35em] transition-all duration-300 rounded-sm font-mono border cursor-pointer border-[#e12a2a] bg-red-500/10 text-red-400 hover:bg-[#e12a2a] hover:text-black crimson-glow`}
            >
              {bioScanning ? bioText : "[ SOLICITAR ASIGNACIÓN DE PIEZA - BATCH 001 ]"}
            </button>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN MEDIDAS */}
      <section id="especificaciones" className="py-32 bg-black relative z-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[9px] text-white/40 font-mono tracking-[0.25em] uppercase mb-2">// TECHNICAL CORE</p>
            <h2 className="text-3xl font-extralight tracking-widest uppercase text-white">Moldería & Dimensiones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-mono text-xs text-white/40">
            <div className="space-y-8">
              <div className="border-l border-white/20 pl-6 space-y-3">
                <p className="text-white/80 font-medium tracking-wider">// DETALLES DE CONFECCIÓN</p>
                <p>Gabardina de alta densidad con acabado esmerilado. Textura premium de tacto suave y alta durabilidad estructural.</p>
              </div>
              <div className="border-l border-white/20 pl-6 space-y-3">
                <p className="text-white/80 font-medium tracking-wider">// PANEL INTERNO RÍGIDO</p>
                <p>Paneles frontales estructurados mediante entretela fusionada a presión térmica.</p>
              </div>
            </div>
            <div className="border border-white/5 bg-[#030303]/40 p-6 rounded-sm">
              <table className="w-full text-left text-[11px] leading-relaxed">
                <thead>
                  <tr className="border-b border-white/10 text-white/60">
                    <th className="pb-2 font-light tracking-wider">COMPONENTE</th>
                    <th className="pb-2 font-light tracking-wider text-right">DIMENSIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 text-white/40">Altura de Corona</td>
                    <td className="py-2 text-right text-white/70">11.5 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/40">Ancho de Visera</td>
                    <td className="py-2 text-right text-white/70">18.0 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* EASTER EGG */}
      {showTerminalConsole && (
        <div className="fixed bottom-0 right-0 w-full md:w-[450px] h-[250px] bg-black border-t md:border-l border-white/10 text-white/60 font-mono text-[11px] flex flex-col p-4 z-50 shadow-2xl">
          <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-2 text-[9px]">
            <span>// CONSOLA DE ANULACIÓN DEL SISTEMA</span>
            <button onClick={() => setShowTerminalConsole(false)} className="text-white/30 hover:text-white uppercase">[ CERRAR ]</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 p-1">
            {terminalLogs.map((log, index) => <p key={index} className="leading-relaxed whitespace-pre-wrap">{log}</p>)}
          </div>
          <form onSubmit={processCommand} className="mt-2 flex gap-2 border-t border-white/5 pt-2">
            <span className="text-white/40 font-bold">$</span>
            <input 
              type="text" 
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white/70 font-mono text-[11px]"
              placeholder="Inyectar comando..."
              autoFocus
            />
          </form>
        </div>
      )}

      {/* 6. PIE DE PÁGINA */}
      <footer id="contacto" className="py-20 border-t border-white/5 bg-black relative z-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[9px] tracking-widest text-white/20 uppercase text-center md:text-left">
          <div className="space-y-1">
            <p className="text-white/40 font-medium">SOPORTE CENTRAL: VANTUM553@GMAIL.COM</p>
            <p className="text-[#e12a2a]/60 font-medium crimson-glow">SISTEMA DE PRODUCCIÓN CONFINADO. BATCH 001.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}