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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [onlineUsers, setOnlineUsers] = useState(7);
  const [currentDateTime, setCurrentDateTime] = useState("");

  // INTRO POR CONTRASEÑA Y SECUENCIA DE MARCA (0: Loader, 1: Firewall, 2: Intro Cinemática, 3: Web Unlocked)
  const [loadingStep, setLoadingStep] = useState(0); 
  const [fakePassword, setFakePassword] = useState("");
  const [showFinalPhrase, setShowFinalPhrase] = useState(false);

  // MECÁNICAS INTERACTIVAS COMPILADAS
  const [cctvTime, setCctvTime] = useState("00:00:00");
  const [showTerminalConsole, setShowTerminalConsole] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["VANTUM LABS CORE v2.01", "Nodo Mendoza operativo. Enlace seguro."]);
  const [bioScanning, setBioScanning] = useState(false);
  const [bioText, setBioText] = useState("");
  const [bioSuccess, setBioSuccess] = useState(false);
  const [waitlistPercentage, setWaitlistPercentage] = useState(84);
  const logoClickCount = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    setOnlineUsers(Math.floor(Math.random() * (16 - 7 + 1)) + 7);

    // SISTEMA DE HORARIOS Y CCTV RUNNING
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

    // LISTA DE ESPERA MATEMÁTICA AUTOMATIZADA
    const nowTimestamp = Date.now();
    const targetTimestamp = new Date("2026-07-25T00:00:00").getTime();
    const creationTimestamp = new Date("2026-07-04T00:00:00").getTime();
    const totalDuration = targetTimestamp - creationTimestamp;
    const elapsedDuration = nowTimestamp - creationTimestamp;
    const progressRatio = Math.min(Math.max(elapsedDuration / totalDuration, 0), 1);
    setWaitlistPercentage(Math.floor(84 + (progressRatio * 12)));

    // SCRIPT CONTRASEÑA INTERFAZ - EXACTAMENTE 4 SEGUNDOS TOTALES
    const introDuration = 4000;
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
      }, (introDuration - 1500) / targetPass.length);

      const gatewayTimeout = setTimeout(() => {
        setLoadingStep(2);
        setTimeout(() => {
          setLoadingStep(3);
        }, 3200);
      }, introDuration);

      return () => {
        clearInterval(passInterval);
        clearTimeout(gatewayTimeout);
      };
    }, 1000);

    // CRONÓMETRO DINÁMICO
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
    const intervalId = setInterval(updateTimer, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 50;
      const y = (e.clientY - innerHeight / 2) / 50;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(loaderTimeout);
      clearInterval(timerInterval);
      clearInterval(intervalId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ANIMACIONES INTERNAS INYECTADAS
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("vantum-core-styles")) {
      const stylesheet = document.createElement("style");
      stylesheet.id = "vantum-core-styles";
      stylesheet.innerHTML = `
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); filter: blur(5px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes brandOut { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.98); filter: blur(5px); } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes vPulse { 0% { opacity: 0.03; transform: scale(1); } 50% { opacity: 0.08; transform: scale(1.005); } 100% { opacity: 0.03; transform: scale(1); } }
        .animate-fade-up { opacity: 0; animation: fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { opacity: 0; animation: fadeIn 1.5s ease-out forwards; }
        .animate-brand-out { animation: brandOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) 2.6s forwards; }
        .animate-v-giant { animation: vPulse 11s ease-in-out infinite; }
        .delay-100 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 300ms; }
        .delay-300 { animation-delay: 450ms; }
        .delay-400 { animation-delay: 600ms; }
        .delay-500 { animation-delay: 750ms; }
        .cctv-scanline { position: fixed; top: 0; left: 0; width: 100%; h-full: 2px; background: rgba(255,255,255,0.012); pointer-events: none; z-index: 99; animation: scanline 5s linear infinite; }
        .cctv-noise { position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.012'/%3E%3C/svg%3E"); pointer-events: none; z-index: 98; }
      `;
      document.head.appendChild(stylesheet);
    }
  }, []);

  const handleLogoClick = () => {
    logoClickCount.current += 1;
    if (logoClickCount.current === 3) {
      setShowTerminalConsole(true);
      setTerminalLogs(prev => [...prev, ">> TERMINAL OVERRIDE GRANTED // NODE ACCESS DEPLOYED."]);
      logoClickCount.current = 0;
    }
  };

  const processCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = `Comando inválido: '${cmd}'. Tipeá 'help'.`;
    if (cmd === "help") { response = "Registros válidos: 'help' // 'lote001' // 'clear' // 'exit'"; }
    else if (cmd === "lote001") { response = "DATOS: 30 unidades confinadas al taller de Maipú. Sin reabastecimiento."; }
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

  // INTRO FASE 0: INITIAL LOADER
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

  // INTRO FASE 1: SECURE FIREWALL
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
              <div className="text-white font-bold text-[9px] tracking-[0.2em] uppercase animate-[fadeIn_0.4s_ease-out_forwards]">
                // SISTEMA DESBLOQUEADO. [ DROP_001 IS COMING. ]
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // FASE 2: INTRO CINEMÁTICA DE IDENTIDAD DE MARCA
  if (isMounted && loadingStep === 2) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-6 select-none animate-brand-out relative overflow-hidden">
        <div className="cctv-noise" />
        <div className="space-y-8 flex flex-col items-center max-w-xl text-center">
          <img 
            src="/logo-real.png" 
            alt="Vantum Isotipo" 
            className="w-36 h-36 md:w-44 md:h-44 object-contain opacity-95 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] animate-fade-up"
          />
          <h2 className="text-2xl md:text-3xl font-extralight tracking-[0.65em] text-white uppercase pl-[0.65em] animate-fade-up delay-100">
            VANTUM
          </h2>
          <div className="w-12 h-[1px] bg-white/20 animate-fade-up delay-200" />
          <div className="space-y-2 font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-white/40 uppercase">
            <p className="animate-fade-up delay-300 font-medium tracking-[0.35em] text-white/60">BUILD WITH PURPOSE</p>
            <p className="animate-fade-up delay-400 font-light text-red-500/50">NOT FOR EVERYONE</p>
          </div>
        </div>
      </div>
    );
  }

  // FASE 3: TIENDA COMPLETA EN ESPAÑOL DESBLOQUEADA
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden font-sans relative antialiased animate-fade-in">
      
      <div className="cctv-scanline" />
      <div className="cctv-noise" />

      {/* RE-CALIBRACIÓN CROMÁTICA REC */}
      <div className="fixed top-6 right-6 font-mono text-[9px] tracking-[0.25em] text-white/30 flex items-center gap-2 z-50 select-none">
        <span className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
        <span>REC {cctvTime}</span>
      </div>

      {/* METADATOS COMPILADOS EN EL BORDE */}
      <div className="fixed bottom-6 left-6 font-mono text-[8px] tracking-[0.2em] text-white/20 flex flex-col gap-0.5 z-50 select-none uppercase hidden md:flex">
        <span>BÚNKER DE DISEÑO & DESARROLLO: MENDOZA, ARG</span>
        <span>LOGÍSTICA DE DISTRIBUCIÓN: ENVÍOS GLOBALES ACTIVADOS</span>
      </div>

      {/* AJUSTE MAESTRO DE SIMETRÍA: LA V GIGANTE QUEDA CAPTURADA EN FLEXBOX CONTRÉNTRICO ABSOLUTO EN EL ENTORNO CERO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        {/* Halo de luz cálida difusa de fondo que elimina la frialdad y suaviza los textos */}
        <div className="absolute w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-r from-red-950/10 via-transparent to-transparent blur-[120px] pointer-events-none opacity-60" style={{ backgroundImage: "radial-gradient(circle, rgba(139,30,30,0.11) 0%, transparent 75%)" }} />
        
        <img 
          src="/logo-real.png" 
          alt="Vantum Chasis Balanced Background" 
          className="w-[82%] max-w-[850px] object-contain opacity-10 select-none pointer-events-none animate-v-giant filter contrast-[1.10]"
        />
      </div>

      {/* 1. NAV BAR: AJUSTADO EL TAMAÑO DE LA ESQUINA SUPERIOR CON TEXTO ALINEADO */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo superior izquierdo corregido: Isotipo de escala robusta w-10 y tipografía estirada a tono */}
          <a href="#" className="flex items-center gap-4 hover:opacity-75 transition-opacity select-none group">
            <img src="/logo-real.png" alt="Vantum Isotipo" className="w-10 h-10 object-contain filter brightness-110 transition-transform duration-500 group-hover:rotate-6" />
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

      {/* 2. HERO SECTOR: LA V CHICA SUBE DE ESCALA A w-36 MD:w-44 PARA LOGRAR EL IMPACTO DOMINANTE */}
      <header className="relative min-h-[calc(100vh-20px)] flex flex-col justify-center items-center px-6 text-center z-10 pt-10 pb-20">
        <div className="space-y-12 max-w-4xl mx-auto flex flex-col items-center relative w-full">
          
          <div className="flex flex-wrap justify-center gap-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 border border-red-500/20 bg-red-500/5 px-3 py-1 rounded-full font-mono text-[9px] tracking-[0.2em] text-red-400 uppercase">
              <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
              EDICIÓN DE BARRIO 001
            </div>
            <div className="inline-flex items-center border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">
              LOTE ÚNICO // 30 PIEZAS
            </div>
          </div>
          
          {/* FIRMA CENTRAL RE-CORREGIDA MASIVA */}
          <div className="flex flex-col items-center space-y-6 relative z-10">
            {/* El Isotipo Central sube drásticamente a un chasis dominante para mandar en la pantalla */}
            <div 
              onClick={handleLogoClick}
              className="cursor-crosshair flex items-center justify-center group"
            >
              <img 
                src="/logo-real.png" 
                alt="Vantum Logo Focus" 
                className="w-36 h-36 md:w-44 md:h-44 object-contain opacity-[0.98] select-none pointer-events-none filter drop-shadow-[0_0_45px_rgba(255,255,255,0.09)] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extralight tracking-[0.75em] text-white uppercase pl-[0.75em] select-none">
              VANTUM
            </h2>
            
            <div className="flex items-center gap-4 font-mono text-[8px] md:text-[9px] tracking-[0.25em] text-white/30 uppercase select-none">
              <span className="font-semibold text-white/50">BUILD WITH PURPOSE</span>
              <span className="text-white/10">|</span>
              <span className="text-red-500/40">NOT FOR EVERYONE</span>
            </div>
          </div>

          <div className="space-y-5 max-w-2xl mx-auto relative z-10 pt-2">
            <h1 className="font-mono text-xs md:text-sm text-white tracking-[0.35em] uppercase font-bold">
              CONFECCIÓN URBANA PESADA DE ALTA DENSIDAD
            </h1>
            <p className="font-mono text-[11px] md:text-xs text-white/50 tracking-[0.22em] uppercase leading-relaxed text-center">
              Armamos bloques de moldería rígida bajo un control estricto de simetría estructural. No hacemos ropa en masa; confinamos colecciones numeradas de <span className="text-white font-bold">30 gorras exclusivas por modelo</span> desarrolladas en gabardina de 8 onzas de máximo grosor. Estética de búnker ajustada a la calle.
            </p>
          </div>

          {/* FILETES TÉCNICOS: ENMARCAN LAS MÉTRICAS INFERIORES EN UNA RECIPIENTE DE PLANO DE PRODUCCIÓN */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl font-mono text-[9px] tracking-widest uppercase text-white/30 relative z-10 border-t border-b border-white/5 py-4 bg-black/20 backdrop-blur-[1px]">
            <div className="px-2">
              <span className="text-white/50 block mb-0.5">// TEXTIL REFORZADO</span>
              GABARDINA 8OZ: 100%
            </div>
            <div className="px-2 border-l border-white/5">
              <span className="text-white/50 block mb-0.5">// INYECCIÓN BORDADO</span>
              HILO PREMIUM: STOCK
            </div>
            <div className="px-2 border-l border-white/5">
              <span className="text-white/50 block mb-0.5">// CONTORNO INTERNO</span>
              ENTRETELA ALTA DEN: OK
            </div>
            <div className="px-2 border-l border-white/5">
              <span className="text-red-400 block mb-0.5">// VOLUMEN DEL BATCH</span>
              30 EJEMPLARES: LISTO
            </div>
          </div>
        </div>

        {/* TIME COUNTER */}
        <div id="reloj-drop" className="mt-16 border border-white/5 bg-[#040404]/50 backdrop-blur-md p-8 md:p-12 w-full max-w-2xl mx-auto relative group hover:border-white/10 transition-colors rounded-sm z-10">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-black px-2.5 font-mono text-[8px] tracking-[0.25em] text-red-500 uppercase font-medium animate-pulse">
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
              <div 
                className="text-3xl md:text-5xl font-normal tracking-tight text-[#c23232] tabular-nums relative"
                style={{ textShadow: "0 0 12px rgba(194, 50, 50, 0.35)" }}
              >
                {timeLeft.seconds}
              </div>
              <div className="text-[8px] text-white/20 tracking-[0.2em] uppercase mt-1.5">Segundos</div>
            </div>
          </div>
        </div>

        {/* REGISTRO OPERACIONAL */}
        <div className="mt-8 font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase select-none z-10">
          ÚLTIMO REGISTRO DE CONEXIÓN: [{currentDateTime || "PROCESANDO..."}] vía Mendoza_Node_02
        </div>
        <div className="mt-2 font-mono text-[9px] tracking-[0.15em] text-red-500/40 uppercase select-none z-10">
          [ ESTADO DEL SERVIDOR: {onlineUsers} OPERATORES ONLINE EN EL NODO ]
        </div>

        <div className="mt-12 z-10">
          <a href="#modelos" className="border border-white bg-white text-black px-8 h-11 flex items-center justify-center font-mono text-[9px] tracking-[0.25em] uppercase hover:bg-transparent hover:text-white transition-all duration-300 rounded-sm font-medium">
            VER PIEZAS DISPONIBLES
          </a>
        </div>
      </header>

      {/* 3. SECCIÓN MANIFIESTO: ESTÁTICO CON TIPOGRAFÍA REFINADA, LIMPIDO Y CON UN TONO DE CALIDAD ABOLUTA */}
      <section id="manifiesto" className="py-36 border-y border-white/5 relative z-10 px-6 bg-[#020202]/30 backdrop-blur-[2px]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-mono text-[9px] text-white/40 tracking-[0.32em] uppercase tracking-widest">// PHILOSOPHY & IDENTITY</p>
          <p className="text-xl md:text-2xl font-light tracking-wide leading-relaxed text-white/90 font-serif italic text-center px-4">
            "No diseñamos accesorios ordinarios. Construimos bloques estructurales rígidos para el uso diario. Cada pieza responde a un control estricto de moldería urbana y simetría textil absoluta. VANTUM es la respuesta técnica a la saturación del mercado contemporáneo."
          </p>
        </div>
      </section>

      {/* 4. SECCIÓN MODELOS */}
      <section id="modelos" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
          <div>
            <p className="text-[9px] text-white/40 font-mono tracking-[0.25em] uppercase mb-2">// TEXTILE ARCHITECTURE</p>
            <h2 className="text-3xl font-extralight tracking-widest uppercase text-white/90">Edición de Barrio</h2>
          </div>
          <div className="font-mono text-[10px] text-white/40 flex items-center gap-4 mt-4 md:mt-0">
            <span>TAMAÑO DEL LOTE: 30 UNIDADES</span>
            <span className="text-white/10">|</span>
            <span>ESTADO: RESERVAS ABIERTAS</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* MODELO 01: OLIVE KHAKI */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm md:-translate-y-4">
            <div className="overflow-hidden bg-[#090909] relative aspect-square flex items-center justify-center border border-white/5 rounded-sm">
              <img src="/gorra-oliva.png" alt="Vantum Olive Khaki" className="w-[80%] h-[80%] object-contain scale-95 transition-all duration-1000 select-none pointer-events-none blur-[4px] grayscale opacity-50 contrast-125" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 01.OLV-KHK</span>
                <span className="text-green-500/50 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/10 tracking-widest text-[8px]">
                  // FICHA ABIERTA
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Olive Khaki</h3>
              <div className="relative mt-4">
                <p className="text-xs leading-relaxed font-light text-white/60 text-justify">
                  Estructura rígida armada verde oliva profundo. Isotipo lineal frontal bordado en relieve desértico y vivo perimetral inferior a tono. Visera de alta memoria elástica.
                </p>
              </div>
            </div>
          </div>

          {/* MODELO 02: CRIMSON STEALTH */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm">
            <div className="overflow-hidden bg-[#090909] relative aspect-square flex items-center justify-center border border-white/5 rounded-sm">
              <img src="/gorra-roja.png" alt="Vantum Crimson Stealth" className="w-[80%] h-[80%] object-contain scale-95 transition-all duration-1000 select-none pointer-events-none blur-[4px] grayscale opacity-50 contrast-125" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 02.CRMS-STL</span>
                <span className="text-green-500/50 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/10 tracking-widest text-[8px]">
                  // FICHA ABIERTA
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Crimson Stealth</h3>
              <div className="relative mt-4">
                <p className="text-xs leading-relaxed font-light text-white/60 text-justify">
                  Cuerpo rígido de gabardina negra pura de máxima densidad. Bordado frontal y líneas perimetrales inyectadas en hilo carmesí premium. Contraste urbano severo.
                </p>
              </div>
            </div>
          </div>

          {/* MODELO 03: ONYX GOLD */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm md:translate-y-4">
            <div className="overflow-hidden bg-[#090909] relative aspect-square flex items-center justify-center border border-white/5 rounded-sm">
              <img src="/gorra-oro.png" alt="Vantum Onyx Gold" className="w-[80%] h-[80%] object-contain scale-95 transition-all duration-1000 select-none pointer-events-none blur-[4px] grayscale opacity-50 contrast-125" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 03.ONX-GLD</span>
                <span className="text-green-500/50 font-medium bg-green-500/5 px-2 py-0.5 border border-green-500/10 tracking-widest text-[8px]">
                  // FICHA ABIERTA
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Onyx Gold</h3>
              <div className="relative mt-4">
                <p className="text-xs leading-relaxed font-light text-white/60 text-justify">
                  Base monocromática negra azabache estructurada. Isotipo frontal lineal bordado con hilo metálico de oro seleccionado. Sobriedad total y calce profundo.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* II. PORTAL MONUMENTAL CENTRAL DE RESERVA */}
      <section id="bloque-captura" className="py-24 px-6 max-w-4xl mx-auto relative z-10 text-center">
        <div className="border border-red-500/30 bg-[#050505] p-10 md:p-16 space-y-6 rounded-sm shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-radial-gradient from-red-950/5 via-transparent to-transparent pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(139,30,30,0.05) 0%, transparent 80%)" }} />
          
          <div className="font-mono text-[10px] md:text-[11px] text-red-500 uppercase tracking-[0.3em] font-medium animate-pulse">
            // REGISTRO DE ADMISIÓN - EDICIÓN DE BARRIO 001
          </div>
          
          <h2 className="text-xl md:text-2xl font-extralight tracking-widest text-white uppercase max-w-xl mx-auto leading-relaxed">
            SOLICITÁ TU LUGAR PARA ASEGURAR UNA DE LAS 30 PIEZAS EXCLUSIVAS ANTES DE QUE EL ACCESO SE CIERRE POR COMPLETO
          </h2>
          
          <div className="pt-4 max-w-xl mx-auto">
            <button 
              onClick={executeGeneralReserve}
              className={`w-full uppercase text-center py-5 text-[11px] md:text-xs font-bold tracking-[0.35em] transition-all duration-300 rounded-sm font-mono border cursor-pointer ${bioScanning && !bioSuccess ? "border-red-500/50 bg-red-950/20 text-red-400 animate-pulse cursor-wait" : bioSuccess ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-black shadow-[0_0_30px_rgba(239,68,68,0.05)]"}`}
            >
              {bioScanning ? bioText : "[ SOLICITAR ASIGNACIÓN DE PIEZA - BATCH 001 ]"}
            </button>
          </div>
          
          <div className="font-mono text-[8px] tracking-widest text-white/20 uppercase pt-2">
            CUPO DEL LOTE DISPONIBLE: {100 - waitlistPercentage}% // ACCESO RESTRINGIDO
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
                <p>Gabardina pesada de alta torsión de hilos. Máxima resistencia al roce del uso diario y protección de color certificada.</p>
              </div>
              <div className="border-l border-white/20 pl-6 space-y-3">
                <p className="text-white/80 font-medium tracking-wider">// PANEL INTERNO RÍGIDO</p>
                <p>Paneles frontales estructurados mediante fusión térmica alemana. Evita la deformación de la corona a largo plazo.</p>
              </div>
            </div>

            <div className="border border-white/5 bg-[#030303]/40 p-6 flex flex-col justify-between relative rounded-sm">
              <div className="text-[8px] text-white/30 mb-4 tracking-[0.2em] uppercase">// INDICE DE ESPECIFICACIONES TEXTILES</div>
              <table className="w-full text-left text-[11px] leading-relaxed">
                <thead>
                  <tr className="border-b border-white/10 text-white/60">
                    <th className="pb-2 font-light tracking-wider">COMPONENTE</th>
                    <th className="pb-2 font-light tracking-wider text-right">DIMENSIÓN</th>
                    <th className="pb-2 font-light tracking-wider text-right">ESTÁNDAR COLD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  <tr>
                    <td className="py-2 text-white/40">Altura de Corona</td>
                    <td className="py-2 text-right text-white/70">11.5 cm</td>
                    <td className="py-2 text-right text-white/50">Moldería Rígida Profunda</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/40">Ancho de Visera</td>
                    <td className="py-2 text-right text-white/70">18.0 cm</td>
                    <td className="py-2 text-right text-white/50">Memoria Elástica Perimetral</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/40">Regulador Trasero</td>
                    <td className="py-2 text-right text-white/70">Ajustable</td>
                    <td className="py-2 text-right text-white/50">Cierre de Presión / Polímero de Alta Tensión</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/40">Densidad de Costura</td>
                    <td className="py-2 text-right text-white/70">12 SPI</td>
                    <td className="py-2 text-right text-white/50">Filamento de Alta Torsión Reforzado</td>
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
            <p className="text-white/40 font-medium">SOPORTE CENTRAL: VANTUM553@GMAIL.COM // CONTROL DE LOGÍSTICA & CONFECCIÓN</p>
            <p className="text-red-500/40">SISTEMA DE PRODUCCIÓN CONFINADO. NINGUNA ESTRUCTURA SERÁ REEDITADA TRAS EL CIERRE DEL BATCH 001.</p>
            <p className="text-white/15 block pt-2">© 2026 DISTRIBUTION & LOGISTICS. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-8 text-white/30 font-medium">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TIKTOK</a>
            <a href="mailto:vantum553@gmail.com" className="hover:text-white transition-colors">GMAIL</a>
          </div>
        </div>
      </footer>

    </div>
  );
}