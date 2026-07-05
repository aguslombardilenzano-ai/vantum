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
  
  // CONTROL DE INTERFAZ Y LOGÍSTICA DE CARGA
  const [isMounted, setIsMounted] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isDescUnlocked, setIsDescUnlocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [onlineUsers, setOnlineUsers] = useState(7);
  const [currentDateTime, setCurrentDateTime] = useState("");

  // CONFIGURACIÓN INTRO ACCESO (FIJADO EN 4 SEGUNDOS STRICT)
  const [loadingStep, setLoadingStep] = useState(0); // 0: Loader, 1: Firewall, 2: Web Unlocked
  const [fakePassword, setFakePassword] = useState("");
  const [showFinalPhrase, setShowFinalPhrase] = useState(false);

  // CONTROL INTERACTIVO PREMIUM
  const [cctvTime, setCctvTime] = useState("00:00:00");
  const [showTerminalConsole, setShowTerminalConsole] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["VANTUM CORE GATEWAY v1.02", "Authorized terminal link established."]);
  const [bioScanning, setBioScanning] = useState(false);
  const [bioText, setBioText] = useState("");
  const [bioSuccess, setBioSuccess] = useState(false);
  const [waitlistPercentage, setWaitlistPercentage] = useState(84);
  const logoClickCount = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    setOnlineUsers(Math.floor(Math.random() * (14 - 7 + 1)) + 7);

    // CRONÓMETRO INTERNO CCTV
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

    // DINÁMICA DE CAPACIDAD AUTOMATIZADA
    const nowTimestamp = Date.now();
    const targetTimestamp = new Date("2026-07-25T00:00:00").getTime();
    const creationTimestamp = new Date("2026-07-04T00:00:00").getTime();
    const totalDuration = targetTimestamp - creationTimestamp;
    const elapsedDuration = nowTimestamp - creationTimestamp;
    const progressRatio = Math.min(Math.max(elapsedDuration / totalDuration, 0), 1);
    setWaitlistPercentage(Math.floor(84 + (progressRatio * 12)));

    // ORQUESTADOR FIREWALL: EXACTAMENTE 4 SEGUNDOS TOTALES
    const introDuration = 4000;
    
    const loaderTimeout = setTimeout(() => {
      setLoadingStep(1);

      // Simulación de escritura automática de contraseña
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
      }, introDuration);

      return () => {
        clearInterval(passInterval);
        clearTimeout(gatewayTimeout);
      };
    }, 1000);

    // TIEMPOS DEL DROP CRONOLÓGICO
    const targetDate = new Date("2026-07-25T00:00:00").getTime();
    const descUnlockDate = new Date("2026-07-23T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (now >= descUnlockDate) { setIsDescUnlocked(true); } else { setIsDescUnlocked(false); }

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

  // INYECCIÓN DE ESTILOS CSS REFINADOS
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("vantum-core-styles")) {
      const stylesheet = document.createElement("style");
      stylesheet.id = "vantum-core-styles";
      stylesheet.innerHTML = `
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .animate-fade-up { opacity: 0; animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { opacity: 0; animation: fadeIn 1.5s ease-out forwards; }
        .delay-100 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 300ms; }
        .delay-300 { animation-delay: 450ms; }
        .delay-400 { animation-delay: 600ms; }
        .delay-500 { animation-delay: 750ms; }
        .cctv-scanline { position: fixed; top: 0; left: 0; width: 100%; h-full: 2px; background: rgba(255,255,255,0.01); pointer-events: none; z-index: 99; animation: scanline 6s linear infinite; }
        .cctv-noise { position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.008'/%3E%3C/svg%3E"); pointer-events: none; z-index: 98; }
      `;
      document.head.appendChild(stylesheet);
    }
  }, []);

  const handleLogoClick = () => {
    logoClickCount.current += 1;
    if (logoClickCount.current === 3) {
      setShowTerminalConsole(true);
      setTerminalLogs(prev => [...prev, ">> ACCESS OVERRIDE DEPLOYED SUCCESSFULLY."]);
      logoClickCount.current = 0;
    }
  };

  const processCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = `Statement unknown: '${cmd}'. Type 'help'.`;
    if (cmd === "help") { response = "Registers: 'help' // 'lote001' // 'clear' // 'exit'"; }
    else if (cmd === "lote001") { response = "CONFIDENTIAL: 30 physical elements built at Maipú node. Zero restock."; }
    else if (cmd === "clear") { setTerminalLogs([]); setTerminalInput(""); return; }
    else if (cmd === "exit") { setShowTerminalConsole(false); setTerminalInput(""); return; }

    setTerminalLogs(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput("");
  };

  const executeBiometricScan = (e: React.MouseEvent, modelText: string) => {
    e.preventDefault();
    if (bioScanning || bioSuccess) return;

    setBioScanning(true);
    setBioText("VERIFYING SECURITY ID...");

    setTimeout(() => {
      setBioText("COMPILING CREDENTIALS...");
      setTimeout(() => {
        setBioText("GATEWAY GRANTED");
        setBioSuccess(true);
        setTimeout(() => {
          setBioScanning(false);
          setBioSuccess(false);
          window.open(`https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20unirme%20a%20la%20lista%20de%20espera%20para%20la%20pieza%20Vantum%20${modelText}.`, "_blank");
        }, 500);
      }, 600);
    }, 700);
  };

  // INTRO FASE 0: INITIAL LOADER
  if (isMounted && loadingStep === 0) {
    return (
      <div className="min-h-screen bg-black text-white/40 font-mono flex flex-col justify-center items-center px-6 select-none">
        <div className="w-full max-w-xs space-y-3">
          <div className="text-[9px] tracking-[0.3em] uppercase opacity-40">// MOUNTING VANTUM GATEWAY...</div>
          <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-white/30 w-1/4" style={{ animation: "loading 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    );
  }

  // INTRO FASE 1: SECURE FIREWALL (FIJADO EN 4 SEGUNDOS TOTALES)
  if (isMounted && loadingStep === 1) {
    return (
      <div className="min-h-screen bg-black font-mono flex flex-col justify-center items-center px-6 select-none relative">
        <div className="w-full max-w-sm p-6 space-y-5 text-left border border-white/5 bg-[#030303]">
          <div className="flex items-center gap-2.5 text-white/50">
            <span className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
            <span className="text-[9px] tracking-[0.3em] uppercase">VANTUM SECURITY CONTROL</span>
          </div>
          <div className="space-y-3">
            <div className="space-y-0.5">
              <div className="text-[8px] text-white/20 uppercase tracking-widest">GATEWAY LINK:</div>
              <div className="text-xs text-white/60">root@mendoza_node_02</div>
            </div>
            <div className="space-y-1">
              <div className="text-[8px] text-white/20 uppercase tracking-widest">DECRYPT PASS:</div>
              <div className="h-7 w-full bg-white/[0.02] border border-white/10 px-2.5 flex items-center text-xs text-white/70 tracking-widest">
                {fakePassword}
                {!showFinalPhrase && <span className="w-1 h-3 bg-white/40 ml-0.5 animate-pulse" />}
              </div>
            </div>
          </div>
          <div className="h-4 font-mono">
            {showFinalPhrase && (
              <div className="text-white/80 font-bold text-[9px] tracking-[0.2em] uppercase animate-[fadeIn_0.4s_ease-out_forwards]">
                // ACCESS OK. [ DROP_001 IS COMING. ]
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // FASE 2: ENTRADA A LA WEB REFINADA (MINIMALISMO DE ALTA GAMA)
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden font-sans relative antialiased">
      
      {/* ATMÓSFERA SUTIL CCTV */}
      <div className="cctv-scanline" />
      <div className="cctv-noise" />

      {/* REFINAMIENTO DE GRABACIÓN */}
      <div className="fixed top-6 right-6 font-mono text-[9px] tracking-[0.25em] text-white/20 flex items-center gap-2 z-50 select-none">
        <span className="w-1 h-1 bg-white/30 rounded-full animate-pulse" />
        <span>REC {cctvTime}</span>
      </div>

      {/* COORDENADAS COLD INDEX EN MARGEN */}
      <div className="fixed bottom-6 left-6 font-mono text-[8px] tracking-[0.2em] text-white/15 flex flex-col gap-0.5 z-50 select-none uppercase hidden md:flex">
        <span>LAT: 32.9796° S // LON: 68.7911° W</span>
        <span>PRODUCTION NODE: MAIPÚ_CENTRAL_LAB</span>
      </div>

      {/* 1. NAVEGACIÓN COMPACTA CON INDEXACIÓN PREMIUM `[ INDICE ]` */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-black/40 sticky top-0 z-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="text-lg font-light tracking-[0.5em] uppercase text-white hover:opacity-70 transition-opacity">
            VANTUM
          </a>
          <div className="hidden md:flex items-center gap-10 text-[9px] font-mono tracking-[0.3em] uppercase text-white/40">
            <a href="#manifiesto" className="hover:text-white transition-colors">[ MNF-01 ]</a>
            <a href="#modelos" className="hover:text-white transition-colors">[ MDL-001 ]</a>
            <a href="#especificaciones" className="hover:text-white transition-colors">[ SPC-TRC ]</a>
          </div>
          
          <div className="border border-white/10 bg-white/[0.02] px-4 py-2 text-[9px] font-mono tracking-[0.2em] uppercase text-white/30 select-none rounded-sm">
            GATEWAY LOCKED
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTOR RECONSTRUIDO DESDE CERO (RECIERDO PREMIUM ELEVADO) */}
      <header className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 text-center z-10 pt-12 pb-20">
        <div className="space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* IDENTIFICADORES DE BATCH REFINADOS */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-up delay-100">
            <div className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
              <span className="w-1 h-1 bg-white/30 rounded-full animate-pulse" />
              EDICIÓN 001
            </div>
            <div className="inline-flex items-center border border-white/10 bg-white/[0.02] px-3 py-1 rounded-full font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
              TOTAL BATCH // 30 UNITS ONLY
            </div>
          </div>
          
          {/* OPTIMIZACIÓN LOGO: ISOTIPO VECTORIAL SVG ESTÁTICO PREMIUM EN LUGAR DE IMAGEN `.PNG` */}
          <div 
            onClick={handleLogoClick}
            className="py-6 cursor-crosshair relative z-20 transition-transform duration-500 ease-out flex items-center justify-center animate-fade-up delay-200"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <svg className="w-16 h-16 text-white/80 opacity-90 select-none pointer-events-none filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 20L45 80H55L85 20H73L50 66L27 20H15Z" fill="currentColor"/>
              <path d="M28 20L47 58H53L72 20H64L50 48L36 20H28Z" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>

          <p className="font-mono text-[11px] text-white/50 tracking-[0.25em] max-w-2xl mx-auto uppercase leading-relaxed animate-fade-up delay-300">
            Estructuras de alta simetría. Estética urbana con rigor de ingeniería.
          </p>
        </div>

        {/* CONTADOR TEXTUAL REFINADO */}
        <div className="mt-16 border border-white/5 bg-[#050505]/40 backdrop-blur-md p-8 md:p-12 w-full max-w-2xl mx-auto relative group hover:border-white/10 transition-colors rounded-sm animate-fade-up delay-400">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-black px-2.5 font-mono text-[8px] tracking-[0.25em] text-white/30 uppercase">
            // TERMINAL TIME COUNTER
          </div>
          
          <div className="grid grid-cols-4 gap-2 md:gap-6 font-mono select-none">
            <div>
              <div className="text-3xl md:text-5xl font-extralight tracking-tight text-white/80 tabular-nums">{timeLeft.days}</div>
              <div className="text-[8px] text-white/30 tracking-[0.2em] uppercase mt-1.5">Días</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extralight tracking-tight text-white/80 tabular-nums">{timeLeft.hours}</div>
              <div className="text-[8px] text-white/30 tracking-[0.2em] uppercase mt-1.5">Horas</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-extralight tracking-tight text-white/80 tabular-nums">{timeLeft.minutes}</div>
              <div className="text-[8px] text-white/30 tracking-[0.2em] uppercase mt-1.5">Minutos</div>
            </div>
            <div>
              {/* OPTIMIZACIÓN SEGUNDERO: ROJO CARMESÍ ATENUADO Y DIFUMINADO CON BAJA LUMINISCENCIA CLONANDO `image_44f613.jpg` */}
              <div 
                className="text-3xl md:text-5xl font-light tracking-tight text-[#8b1e1e] tabular-nums relative"
                style={{ textShadow: "0 0 10px rgba(139, 30, 30, 0.4)" }}
              >
                {timeLeft.seconds}
              </div>
              <div className="text-[8px] text-white/20 tracking-[0.2em] uppercase mt-1.5">Segundos</div>
            </div>
          </div>
        </div>

        {/* LOGS HISTÓRICOS DE ACCESO REAL */}
        <div className="mt-8 font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase select-none animate-fade-up delay-500">
          LAST CONNECTION REGISTRY: [{currentDateTime || "COMPUTING..."}] via Mendoza_Node_02
        </div>

        <div className="mt-2 font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase select-none animate-fade-up delay-500">
          [ SERVER STATUS: {onlineUsers} OPERATORS ONLINE IN NODE ]
        </div>

        <div className="mt-12 animate-fade-up delay-500">
          <a href="#modelos" className="border border-white bg-white text-black px-8 h-11 flex items-center justify-center font-mono text-[9px] tracking-[0.25em] uppercase hover:bg-transparent hover:text-white transition-all duration-300 rounded-sm">
            EXPLORAR CATÁLOGO
          </a>
        </div>
      </header>

      {/* 3. SECCIÓN MANIFIESTO */}
      <section id="manifiesto" className="py-32 border-y border-white/5 relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">// OPERATIONAL PHILOSOPHY</p>
          <p className="text-lg md:text-2xl font-extralight tracking-wide leading-relaxed text-white/80">
            No diseñamos accesorios. Construimos bloques estructurales de uso diario. Cada pieza responde a un control estricto de geometría tridimensional y simetría textil absoluta. VANTUM es la respuesta técnica a la saturación urbana.
          </p>
        </div>
      </section>

      {/* 4. SECCIÓN MODELOS: ASIMETRÍA EN LÍNEA DE FUGA */}
      <section id="modelos" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
          <div>
            <p className="text-[9px] text-white/40 font-mono tracking-[0.25em] uppercase mb-2">// TEXTILE ARCHITECTURE</p>
            <h2 className="text-3xl font-extralight tracking-widest uppercase text-white/90">Edición de Barrio</h2>
          </div>
          <div className="font-mono text-[10px] text-white/30 flex items-center gap-4 mt-4 md:mt-0">
            <span>BATCH SIZE: 30 UNITS</span>
            <span className="text-white/10">|</span>
            <span>STATUS: HOLDING</span>
          </div>
        </div>
        
        {/* GRILLA CON LÍNEA DE FUGA ASIMÉTRICA (DESPLAZAMIENTOS ESTRATÉGICOS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* MODELO 01: OLIVE KHAKI (DESPLAZADO LEVEMENTE ARRIBA) */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm md:-translate-y-4">
            <div className="overflow-hidden bg-[#090909] relative aspect-square flex items-center justify-center border border-white/5 rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none z-20" />
              <img src="/gorra-oliva.png" alt="Vantum Olive Khaki" className={`w-[80%] h-[80%] object-contain scale-95 transition-all duration-1000 ease-out select-none pointer-events-none ${isMounted && !isDropActive ? "blur-[4px] grayscale opacity-60 contrast-125" : ""}`} />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 01.OLV-KHK</span>
                <span className="text-white/30 font-medium tracking-widest">
                  {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Olive Khaki</h3>
              <div className="relative mt-4 min-h-[65px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-5 pointer-events-none" : "text-white/60"}`}>
                  Chasis estructural verde oliva profundo. Isotipo lineal en alto relieve beige desértico y vivo perimetral inferior a tono. Estética militarizada de alta precisión.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-white/40 bg-black/5 text-center font-medium">[ DATA ENCRYPTED ]</span>
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-4 font-mono">
              <div className="flex justify-between items-center text-[8px] text-white/20 tracking-wider">
                <span>PREMIUM FLAT VISOR</span>
                <span>CAPACITY: {waitlistPercentage}%</span>
              </div>
              <button 
                onClick={(e) => executeBiometricScan(e, "Olive Khaki")}
                className={`uppercase text-center py-2.5 text-[9px] font-medium tracking-widest transition-all duration-300 rounded-sm font-mono border ${bioScanning && !bioSuccess ? "border-white/30 bg-white/5 text-white/60 animate-pulse cursor-wait" : bioSuccess ? "border-white bg-white text-black" : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white hover:text-black"}`}
              >
                {bioScanning ? bioText : "[ UNIRSE A LA LISTA DE ESPERA ]"}
              </button>
            </div>
          </div>

          {/* MODELO 02: CRIMSON STEALTH (CENTRADO NOMINAL) */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm">
            <div className="overflow-hidden bg-[#090909] relative aspect-square flex items-center justify-center border border-white/5 rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none z-20" />
              <img src="/gorra-roja.png" alt="Vantum Crimson Stealth" className={`w-[80%] h-[80%] object-contain scale-95 transition-all duration-1000 ease-out select-none pointer-events-none ${isMounted && !isDropActive ? "blur-[4px] grayscale opacity-60 contrast-125" : ""}`} />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 02.CRMS-STL</span>
                <span className="text-white/30 font-medium tracking-widest">
                  {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Crimson Stealth</h3>
              <div className="relative mt-4 min-h-[65px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-5 pointer-events-none" : "text-white/60"}`}>
                  Contraste crítico de alta hostilidad. Gabardina negra pura con isotipo frontal y vivos perimetrales inyectados en hilo carmesí. Diseñada para romper el entorno urbano.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-white/40 bg-black/5 text-center font-medium">[ DATA ENCRYPTED ]</span>
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-4 font-mono">
              <div className="flex justify-between items-center text-[8px] text-white/20 tracking-wider">
                <span>PREMIUM FLAT VISOR</span>
                <span>CAPACITY: {waitlistPercentage}%</span>
              </div>
              <button 
                onClick={(e) => executeBiometricScan(e, "Crimson Stealth")}
                className={`uppercase text-center py-2.5 text-[9px] font-medium tracking-widest transition-all duration-300 rounded-sm font-mono border ${bioScanning && !bioSuccess ? "border-white/30 bg-white/5 text-white/60 animate-pulse cursor-wait" : bioSuccess ? "border-white bg-white text-black" : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white hover:text-black"}`}
              >
                {bioScanning ? bioText : "[ UNIRSE A LA LISTA DE ESPERA ]"}
              </button>
            </div>
          </div>

          {/* MODELO 03: ONYX GOLD (DESPLAZADO LEVEMENTE ABAJO) */}
          <div className="relative border border-white/5 bg-[#040404]/60 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-white/10 rounded-sm md:translate-y-4">
            <div className="overflow-hidden bg-[#090909] relative aspect-square flex items-center justify-center border border-white/5 rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none z-20" />
              <img src="/gorra-oro.png" alt="Vantum Onyx Gold" className={`w-[80%] h-[80%] object-contain scale-95 transition-all duration-1000 ease-out select-none pointer-events-none ${isMounted && !isDropActive ? "blur-[4px] grayscale opacity-60 contrast-125" : ""}`} />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-wider">
                <span>SPEC // 03.ONX-GLD</span>
                <span className="text-white/30 font-medium tracking-widest">
                  {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                </span>
              </div>
              <h3 className="text-xl font-light tracking-widest uppercase mt-2.5 text-white/90">Onyx Gold</h3>
              <div className="relative mt-4 min-h-[65px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-5 pointer-events-none" : "text-white/60"}`}>
                  Rigor clásico de ingeniería. Base monocromática negra con bordado lineal heráldico en hilo de oro seleccionado. Máxima simetría y sobriedad industrial.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-white/40 bg-black/5 text-center font-medium">[ DATA ENCRYPTED ]</span>
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-4 font-mono">
              <div className="flex justify-between items-center text-[8px] text-white/20 tracking-wider">
                <span>PREMIUM FLAT VISOR</span>
                <span>CAPACITY: {waitlistPercentage}%</span>
              </div>
              <button 
                onClick={(e) => executeBiometricScan(e, "Onyx Gold")}
                className={`uppercase text-center py-2.5 text-[9px] font-medium tracking-widest transition-all duration-300 rounded-sm font-mono border ${bioScanning && !bioSuccess ? "border-white/30 bg-white/5 text-white/60 animate-pulse cursor-wait" : bioSuccess ? "border-white bg-white text-black" : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white hover:text-black"}`}
              >
                {bioScanning ? bioText : "[ UNIRSE A LA LISTA DE ESPERA ]"}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECCIÓN ESPECIFICACIONES TÉCNICAS */}
      <section id="especificaciones" className="py-32 bg-black relative z-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[9px] text-white/40 font-mono tracking-[0.25em] uppercase mb-2">// TECHNICAL CORE</p>
            <h2 className="text-3xl font-extralight tracking-widest uppercase text-white">Geometría de Precisión</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-mono text-xs text-white/40">
            <div className="space-y-8">
              <div className="border-l border-white/20 pl-6 space-y-3">
                <p className="text-white/80 font-medium tracking-wider">// COMPOSICIÓN MATERIAL</p>
                <p>Gabardina pesada de 8 onzas con tramado de alta torsión estructural. Resistencia garantizada a la abrasión urbana y pérdida de color por exposición UV prolongada.</p>
              </div>
              <div className="border-l border-white/20 pl-6 space-y-3">
                <p className="text-white/80 font-medium tracking-wider">// ARQUITECTURA DEL CONTORNO</p>
                <p>Paneles reforzados internamente con entretela termo-fusionada alemana. Visera plana con memoria elástica perimetral y costuras de alta tensión simétricas.</p>
              </div>
            </div>

            <div className="border border-white/5 bg-[#030303]/40 p-6 flex flex-col justify-between relative rounded-sm">
              <div className="text-[8px] text-white/30 mb-4 tracking-[0.2em] uppercase">// METRIC SYSTEM & TOLERANCE</div>
              <table className={`w-full text-left text-[11px] leading-relaxed transition-all duration-1000 ${isMounted && !isDescUnlocked ? "blur-[5px] opacity-5 pointer-events-none select-none" : ""}`}>
                <thead>
                  <tr className="border-b border-white/10 text-white/60">
                    <th className="pb-2 font-light tracking-wider">COMPONENTE</th>
                    <th className="pb-2 font-light tracking-wider text-right">DIMENSIÓN</th>
                    <th className="pb-2 font-light tracking-wider text-right">TOLERANCIA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  <tr>
                    <td className="py-2 text-white/40">Altura de Corona</td>
                    <td className="py-2 text-right text-white/70">11.5 cm</td>
                    <td className="py-2 text-right text-white/30">± 0.05 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/40">Ancho de Visera</td>
                    <td className="py-2 text-right text-white/70">18.0 cm</td>
                    <td className="py-2 text-right text-white/30">± 0.02 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/40">Ángulo de Inyección</td>
                    <td className="py-2 text-right text-white/70">180°C</td>
                    <td className="py-2 text-right text-white/30">Fixed</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white/40">Densidad de Costura</td>
                    <td className="py-2 text-right text-white/70">12 SPI</td>
                    <td className="py-2 text-right text-white/30">Nominal</td>
                  </tr>
                </tbody>
              </table>
              {isMounted && !isDescUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-widest text-white/40 uppercase text-center font-medium">[ METRICS LOCKED ]</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INTERFAZ DEL MODO TERMINAL (CLI EASTER EGG CONSERVADO) */}
      {showTerminalConsole && (
        <div className="fixed bottom-0 right-0 w-full md:w-[450px] h-[250px] bg-black border-t md:border-l border-white/10 text-white/60 font-mono text-[11px] flex flex-col p-4 z-50 shadow-2xl animate-fade-in">
          <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-2 text-[9px]">
            <span>// OVERRIDE CONTROL CONSOLE</span>
            <button onClick={() => setShowTerminalConsole(false)} className="text-white/30 hover:text-white uppercase">[ CLOSE ]</button>
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
              placeholder="Inject statement..."
              autoFocus
            />
          </form>
        </div>
      )}

      {/* 6. PIE DE PÁGINA */}
      <footer id="contacto" className="py-20 border-t border-white/5 bg-black relative z-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[9px] tracking-widest text-white/30">
          <div>
            <p className="text-white/50 mb-1">VANTUM CORE LAB // OPERATIONAL GATEWAY</p>
            <p>© 2026 DISTRIBUTION & LOGISTICS. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TIKTOK</a>
            <a href="mailto:vantum553@gmail.com" className="hover:text-white transition-colors">GMAIL</a>
          </div>
        </div>
      </footer>

    </div>
  );
}