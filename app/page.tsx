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
  
  // LOGÍSTICA DE CARGA Y ESTADOS PRINCIPALES
  const [isMounted, setIsMounted] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isDescUnlocked, setIsDescUnlocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [onlineUsers, setOnlineUsers] = useState(12);
  const [currentDateTime, setCurrentDateTime] = useState("");

  // CONFIGURACIÓN DE ERRORES Y FRASES DE AUTOR
  const [loadingStep, setLoadingStep] = useState(0); // 0: Loader, 1: Glitch, 2: Web
  const [glitchVersion, setGlitchVersion] = useState<"A" | "B" | "C">("A");
  const [fakePassword, setFakePassword] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showFinalPhrase, setShowFinalPhrase] = useState(false);

  // CONTROL EN VIVO DE INTERACCIONES AVANZADAS (CCTV, CLI, BIOMETRÍA, CAPACIDAD)
  const [cctvTime, setCctvTime] = useState("00:00:00");
  const [showTerminalConsole, setShowTerminalConsole] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["VANTUM TERMINAL CORE v1.0.0", "Type 'help' for available options."]);
  const [bioScanning, setBioScanning] = useState(false);
  const [bioText, setBioText] = useState("");
  const [bioSuccess, setBioSuccess] = useState(false);
  const [waitlistPercentage, setWaitlistPercentage] = useState(84);
  const logoClickCount = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    
    // 1. RELOJ DE ÚLTIMO ACCESO Y CRONÓMETRO CCTV RUNNING EN VIVO
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

    // 2. CÁLCULO DE CAPACIDAD DE LISTA DE ESPERA BASADO EN DÍAS RESTANTES
    const nowTimestamp = Date.now();
    const targetTimestamp = new Date("2026-07-25T00:00:00").getTime();
    const creationTimestamp = new Date("2026-07-04T00:00:00").getTime(); // Inicio campaña
    const totalDuration = targetTimestamp - creationTimestamp;
    const elapsedDuration = nowTimestamp - creationTimestamp;
    const progressRatio = Math.min(Math.max(elapsedDuration / totalDuration, 0), 1);
    setWaitlistPercentage(Math.floor(84 + (progressRatio * 12))); // Escala de 84% a 96% automáticamente

    // 3. SELECCIÓN DINÁMICA DE DURACIÓN Y VERSIONES DE ERROR (5 a 7 segundos)
    setOnlineUsers(Math.floor(Math.random() * (19 - 7 + 1)) + 7);
    const versions: ("A" | "B" | "C")[] = ["A", "B", "C"];
    const randomVersion = versions[Math.floor(Math.random() * versions.length)];
    setGlitchVersion(randomVersion);
    const randomGlitchDuration = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000;

    const loaderTimeout = setTimeout(() => {
      setLoadingStep(1);

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
          "FORCING SYSTEM OVERRIDE FAILED. RE-INJECTING..."
        ];
        lines.forEach((line, index) => {
          setTimeout(() => {
            setTerminalLines(prev => [...prev, line]);
          }, index * ((randomGlitchDuration - 1800) / lines.length));
        });
        setTimeout(() => { setShowFinalPhrase(true); }, randomGlitchDuration - 1500);
      }

      if (randomVersion === "B") {
        setTimeout(() => { setShowFinalPhrase(true); }, randomGlitchDuration - 1800);
      }

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
            setShowFinalPhrase(true);
          }
        }, (randomGlitchDuration - 2000) / targetPass.length);
      }

      const glitchTimeout = setTimeout(() => {
        setLoadingStep(2);
      }, randomGlitchDuration);

      return () => clearTimeout(glitchTimeout);
    }, 1200);

    // 4. TEMPORIZADOR GENERAL DEL DROP Y DESBLOQUEOS DE CONTENIDO
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
      const x = (e.clientX - innerWidth / 2) / 40;
      const y = (e.clientY - innerHeight / 2) / 40;
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

  // INYECCIÓN DE ESTILOS CSS ESTRATÉGICOS DE ENTRADA Y CCTV DE FONDO
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("vantum-core-styles")) {
      const stylesheet = document.createElement("style");
      stylesheet.id = "vantum-core-styles";
      stylesheet.innerHTML = `
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .animate-fade-up { opacity: 0; animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { opacity: 0; animation: fadeIn 1.2s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .cctv-scanline { position: fixed; top: 0; left: 0; width: 100%; h-full: 4px; background: rgba(255,255,255,0.015); pointer-events: none; z-index: 99; animation: scanline 4s linear infinite; }
        .cctv-noise { position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.015'/%3E%3C/svg%3E"); pointer-events: none; z-index: 98; }
      `;
      document.head.appendChild(stylesheet);
    }
  }, []);

  // LÓGICA DE MANEJO DE COMANDOS DEL MODO TERMINAL (CLI EASTER EGG)
  const handleLogoClick = () => {
    logoClickCount.current += 1;
    if (logoClickCount.current === 3) {
      setShowTerminalConsole(true);
      setTerminalLogs(prev => [...prev, ">> TERMINAL COUPLING DETECTED. OVERRIDE GRANTED."]);
      logoClickCount.current = 0;
    }
  };

  const processCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    if (cmd === "help") {
      response = "Valid registers: 'help' // 'lote001' // 'clear' // 'exit'";
    } else if (cmd === "lote001") {
      response = "DECRYPT DATA: Batch confined to 30 specimens. Modalities deployed at Maipú Lab. Delivery locked until 25/07.";
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (cmd === "exit") {
      setShowTerminalConsole(false);
      setTerminalInput("");
      return;
    }

    setTerminalLogs(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput("");
  };

  // MANEJADOR SIMULADOR BIOMÉTRICO CON RETENCIÓN DEL LINK DE WHATSAPP
  const executeBiometricScan = (e: React.MouseEvent, modelText: string) => {
    e.preventDefault();
    if (bioScanning || bioSuccess) return;

    setBioScanning(true);
    setBioSuccess(false);
    setBioText("SCANNING OPERATOR ID...");

    setTimeout(() => {
      setBioText("AUTHENTICATING PROTOCOLS...");
      setTimeout(() => {
        setBioText("ACCESS GRANTED // CONNECTING LINK");
        setBioSuccess(true);
        setTimeout(() => {
          setBioScanning(false);
          setBioSuccess(false);
          window.open(`https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20unirme%20a%20la%20lista%20de%20espera%20para%20la%20pieza%20Vantum%20${modelText}.`, "_blank");
        }, 600);
      }, 700);
    }, 800);
  };

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

  // FASE 1: PANTALLAZOS DE ERROR (DURACIÓN AMPLIADA CON MENSAJES DE ESTADO VARIABLES)
  if (isMounted && loadingStep === 1) {
    return (
      <div className="min-h-screen bg-black font-mono flex flex-col justify-center items-center px-6 select-none overflow-hidden relative">
        
        {/* VARIACIÓN A: EL CRASH TERMINAL DETALLADO + FRASE */}
        {glitchVersion === "A" && (
          <div className="w-full max-w-2xl text-left text-red-500 text-[11px] space-y-1.5 leading-relaxed p-6 border border-red-500/10 bg-red-950/5 rounded-sm">
            <p className="text-red-400 font-bold uppercase tracking-wider">!!! SECURITY ALERT // ROOT EXPLOIT ATTEMPT DETECTED !!!</p>
            <div className="space-y-1 font-mono text-red-500/80">
              {terminalLines.map((line, idx) => (
                <p key={idx} className="opacity-90">{line}</p>
              ))}
              {showFinalPhrase && (
                <p className="text-white font-bold tracking-[0.15em] pt-2 text-xs uppercase animate-[fadeIn_0.5s_ease-out_forwards]">
                  // BYPASS SUCCESSFUL. [ BUILDING IN SILENCE. ]
                </p>
              )}
            </div>
            {!showFinalPhrase && <span className="inline-block w-2 h-4 bg-red-500 ml-0.5 animate-pulse mt-1" />}
          </div>
        )}

        {/* VARIACIÓN B: LA GRILLA EN CRISIS CROMÁTICA + FRASE */}
        {glitchVersion === "B" && (
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444420_1px,transparent_1px),linear-gradient(to_bottom,#ef444420_1px,transparent_1px)] bg-[size:40px_40px] transform rotate-[30deg] scale-150" />
            <div className="text-center space-y-4 z-10 p-4">
              <h1 className="text-4xl font-light tracking-[0.6em] text-white/90 filter blur-[0.5px]">VANTUM</h1>
              <div className="transition-all duration-500">
                {showFinalPhrase ? (
                  <div className="border border-white bg-white/10 text-white font-mono text-xs tracking-[0.25em] px-6 py-2.5 uppercase font-bold animate-[fadeIn_0.6s_ease-out_forwards]">
                    [ SYSTEM RE-CALIBRATED // NOT FOR EVERYONE. ]
                  </div>
                ) : (
                  <div className="border border-red-500 bg-red-500/10 text-red-400 font-mono text-[9px] tracking-[0.3em] px-5 py-2 uppercase animate-pulse">
                    CRITICAL MALFUNCTION // DISTORTING VECTORIAL SYMMETRY CORE
                  </div>
                )}
              </div>
              <p className="text-vantum-gray/40 text-[9px] tracking-widest font-mono uppercase">// NODE STATUS LOTE 001</p>
            </div>
          </div>
        )}

        {/* VARIACIÓN C: EL FIREWALL CON LOG-IN TIPEADO + FRASE */}
        {glitchVersion === "C" && (
          <div className="w-full max-w-sm border border-red-500/20 bg-red-950/5 p-6 space-y-6 text-left rounded-sm">
            <div className="flex items-center gap-3 text-red-500">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold">VANTUM SECURITY PROTOCOL</span>
            </div>
            <div className="space-y-4 font-mono">
              <div className="space-y-1">
                <div className="text-[8px] text-vantum-gray/40 uppercase tracking-widest">NETWORK LINK NODE:</div>
                <div className="text-xs text-white/80">root@vantum_mendoza_gateway</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-[8px] text-vantum-gray/40 uppercase tracking-widest">DECRYPT KEY:</div>
                <div className="h-8 w-full bg-red-950/30 border border-red-500/40 px-3 flex items-center text-xs text-red-400">
                  {fakePassword}
                  {!showFinalPhrase && <span className="w-1.5 h-3 bg-red-500 ml-0.5 animate-pulse" />}
                </div>
              </div>
            </div>
            <div className="h-4 font-mono">
              {showFinalPhrase && (
                <div className="text-white font-bold text-[10px] tracking-[0.18em] uppercase animate-[fadeIn_0.5s_ease-out_forwards]">
                  // DECRYPT SUCCESSFUL. [ DROP_001 IS COMING. ]
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    );
  }

  // FASE 2: ENTRADA WEB COMPLETA CON ANIMACIONES PROGRESIVAS Y FILTROS INTEGRADOS
  return (
    <div className="min-h-screen bg-vantum-black text-vantum-white selection:bg-vantum-white selection:text-vantum-black overflow-x-hidden font-sans relative antialiased">
      
      {/* CAPAS DE CAPTURA ATMOSFÉRICA CCTV */}
      <div className="cctv-scanline" />
      <div className="cctv-noise" />

      {/* RELOJ DE GRABACIÓN CCTV EN VIVO */}
      <div className="fixed top-6 right-6 font-mono text-[9px] tracking-widest text-red-500/70 flex items-center gap-2 z-50 select-none">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        <span>REC {cctvTime}</span>
      </div>

      {/* MENDOZA GRID CORE: COORDENADAS INDUSTRIALES GEOGRÁFICAS EN MARGEN */}
      <div className="fixed bottom-6 left-6 font-mono text-[8px] tracking-widest text-vantum-gray/30 flex flex-col gap-0.5 z-50 select-none uppercase hidden md:flex">
        <span>LAT: 32.9796° S // LON: 68.7911° W</span>
        <span>PRODUCTION ARCHITECTURE NODE: MAIPÚ_CENTRAL_LAB</span>
      </div>

      {/* 1. NAVEGACIÓN COMPACTA */}
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
            <div className="border border-vantum-white/10 bg-vantum-white/5 px-5 py-2.5 text-[9px] font-mono tracking-[0.25em] uppercase text-vantum-gray/40 select-none cursor-not-allowed">
              GATEWAY LOCKED
            </div>
          )}
        </div>
      </nav>

      {/* 2. HERO SECTOR CON DESPLAZAMIENTOS COORDINADOS ACCIONADOS POR CSS */}
      <header className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 text-center z-10 pt-12 pb-20">
        <div className="space-y-4 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* ALERTA ESCASEZ BATCH */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-up delay-100">
            <div className="inline-flex items-center gap-2 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full font-mono text-[9px] tracking-[0.25em] text-red-400 uppercase animate-pulse">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {isMounted && isDropActive ? "SYSTEM STATUS // LIVE" : "SYSTEM HOLDING // EDICIÓN 001"}
            </div>
            <div className="inline-flex items-center border border-vantum-white/20 bg-vantum-white/5 px-4 py-1.5 rounded-full font-mono text-[9px] tracking-[0.25em] text-vantum-white uppercase">
              TOTAL BATCH // 30 UNITS ONLY
            </div>
          </div>
          
          {/* LOGO CENTRAL INTERACTIVO CON DETECTOR DE TRIPLE ACCESO DISRUPTIVO */}
          <div 
            onClick={handleLogoClick}
            className="py-8 cursor-crosshair relative z-20 transition-transform duration-300 ease-out flex items-center justify-center animate-fade-up delay-200"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            title="Click 3 times to inject terminal override"
          >
            <img 
              src="/logo-vantum.png" 
              alt="Vantum Brand Logo" 
              className="w-24 h-24 object-contain animate-[spin_40s_linear_infinite] select-none pointer-events-none filter brightness-95" 
            />
          </div>

          <p className="font-mono text-xs md:text-sm text-vantum-gray tracking-[0.18em] max-w-2xl mx-auto uppercase leading-relaxed animate-fade-up delay-300">
            Estructuras de alta simetría. Estética urbana con rigor de ingeniería.
          </p>
        </div>

        {/* CONTADOR DE TIEMPO TERMINAL */}
        <div className="mt-16 border border-vantum-white/10 bg-vantum-black/60 backdrop-blur-md p-8 md:p-12 w-full max-w-3xl mx-auto relative group hover:border-vantum-white/20 transition-colors animate-fade-up delay-400">
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

        {/* LOG DE FECHA COMPLETA DE ACCESO VIVO */}
        <div className="mt-6 font-mono text-[10px] tracking-[0.12em] text-vantum-gray/30 uppercase select-none animate-fade-up delay-500">
          LAST CONNECTION REGISTRY: [{currentDateTime || "COMPUTING..."}] via Mendoza_Node_02
        </div>

        <div className="mt-4 font-mono text-[10px] tracking-[0.15em] text-red-400/80 uppercase select-none animate-fade-up delay-500">
          [ SERVER STATUS: {onlineUsers} OPERATORS ONLINE IN NODE ]
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 font-mono text-[10px] tracking-widest animate-fade-up delay-500">
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

      {/* 4. SECCIÓN MODELOS COMPLETA */}
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
              {isMounted && !isDropActive && ( <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] pointer-events-none z-20 opacity-40" /> )}
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-oliva.png" alt="Vantum Olive Khaki" className={`w-[85%] h-[85%] object-contain scale-95 transition-all duration-750 ease-out select-none pointer-events-none ${isMounted && !isDropActive ? "blur-[3px] grayscale opacity-75 contrast-115" : "group-hover:scale-100"}`} />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 01.OLV-KHK</span>
                <span className="text-amber-500/60 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">
                  {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                </span>
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white">Olive Khaki</h3>
              <div className="relative mt-4 min-h-[70px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-10 grayscale contrast-50 pointer-events-none text-vantum-gray" : "text-vantum-gray/80"}`}>
                  Chasis estructural verde oliva profundo. Isotipo lineal en alto relieve beige desértico y vivo perimetral inferior a tono. Estética militarizada de alta precisión.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-red-500/80 bg-black/10 text-center font-medium">[ DATA ENCRYPTED // REVEALED 23/07 ]</span>
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-vantum-white/[0.06] pt-4 font-mono">
              <div className="flex justify-between items-center text-[10px] text-vantum-gray/50">
                <span>PREMIUM FLAT VISOR</span>
                <span>WAITLIST CAPACITY: {waitlistPercentage}% [CRITICAL]</span>
              </div>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Olive%20Khaki." target="_blank" rel="noopener noreferrer" className="uppercase text-center text-green-400 border border-green-500/20 bg-green-500/5 py-2.5 text-[10px] font-medium tracking-widest hover:bg-green-400 hover:text-black transition-colors rounded-sm">SOLICITAR PIEZA →</a>
              ) : (
                <button 
                  onClick={(e) => executeBiometricScan(e, "Olive Khaki")}
                  className={`uppercase text-center py-2.5 text-[10px] font-medium tracking-widest transition-all duration-300 rounded-sm font-mono border ${bioScanning && !bioSuccess ? "border-red-500/50 bg-red-950/20 text-red-400 animate-pulse cursor-wait" : bioSuccess ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-400 hover:text-black"}`}
                >
                  {bioScanning ? bioText : "[ UNIRSE A LA LISTA DE ESPERA ]"}
                </button>
              )}
            </div>
          </div>

          {/* MODELO 02: CRIMSON STEALTH */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/20 group">
            <div className="overflow-hidden bg-vantum-black/90 relative aspect-square flex items-center justify-center border border-vantum-white/[0.04] rounded-sm shadow-inner bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]">
              {isMounted && !isDropActive && ( <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] pointer-events-none z-20 opacity-50" /> )}
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-roja.png" alt="Vantum Crimson Stealth" className={`w-[85%] h-[85%] object-contain scale-95 transition-all duration-750 ease-out select-none pointer-events-none ${isMounted && !isDropActive ? "blur-[3px] grayscale opacity-75 contrast-115" : "group-hover:scale-100"}`} />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 02.CRMS-STL</span>
                <span className="text-amber-500/60 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">
                  {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                </span>
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white">Crimson Stealth</h3>
              <div className="relative mt-4 min-h-[70px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-10 grayscale contrast-50 pointer-events-none text-vantum-gray" : "text-vantum-gray/80"}`}>
                  Contraste crítico de alta hostilidad. Gabardina negra pura con isotipo frontal y vivos perimetrales inyectados en hilo carmesí. Diseñada para romper el entorno urbano.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-red-500/80 bg-black/10 text-center font-medium">[ DATA ENCRYPTED // REVEALED 23/07 ]</span>
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-vantum-white/[0.06] pt-4 font-mono">
              <div className="flex justify-between items-center text-[10px] text-vantum-gray/50">
                <span>PREMIUM FLAT VISOR</span>
                <span>WAITLIST CAPACITY: {waitlistPercentage}% [CRITICAL]</span>
              </div>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Crimson%20Stealth." target="_blank" rel="noopener noreferrer" className="uppercase text-center text-green-400 border border-green-500/20 bg-green-500/5 py-2.5 text-[10px] font-medium tracking-widest hover:bg-green-400 hover:text-black transition-colors rounded-sm">SOLICITAR PIEZA →</a>
              ) : (
                <button 
                  onClick={(e) => executeBiometricScan(e, "Crimson Stealth")}
                  className={`uppercase text-center py-2.5 text-[10px] font-medium tracking-widest transition-all duration-300 rounded-sm font-mono border ${bioScanning && !bioSuccess ? "border-red-500/50 bg-red-950/20 text-red-400 animate-pulse cursor-wait" : bioSuccess ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-400 hover:text-black"}`}
                >
                  {bioScanning ? bioText : "[ UNIRSE A LA LISTA DE ESPERA ]"}
                </button>
              )}
            </div>
          </div>

          {/* MODELO 03: ONYX GOLD */}
          <div className="relative border border-vantum-white/[0.06] bg-vantum-black/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-500 hover:border-vantum-white/20 group">
            <div className="overflow-hidden bg-vantum-black/90 relative aspect-square flex items-center justify-center border border-vantum-white/[0.04] rounded-sm shadow-inner bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]">
              {isMounted && !isDropActive && ( <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] pointer-events-none z-20 opacity-50" /> )}
              <div className="absolute w-full h-[2px] bg-vantum-white/30 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] pointer-events-none z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <img src="/gorra-oro.png" alt="Vantum Onyx Gold" className={`w-[85%] h-[85%] object-contain scale-95 transition-all duration-750 ease-out select-none pointer-events-none ${isMounted && !isDropActive ? "blur-[3px] grayscale opacity-75 contrast-115" : "group-hover:scale-100"}`} />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between font-mono text-[10px] text-vantum-gray tracking-wider">
                <span>SPEC // 03.ONX-GLD</span>
                <span className="text-amber-500/60 font-medium bg-amber-500/5 px-2 py-0.5 border border-amber-500/10 tracking-widest text-[9px]">
                  {isDescUnlocked ? "// FICHA DISPONIBLE" : "// ARCHIVO RESTRINGIDO"}
                </span>
              </div>
              <h3 className="text-2xl font-light tracking-widest uppercase mt-3 text-vantum-white">Onyx Gold</h3>
              <div className="relative mt-4 min-h-[70px]">
                <p className={`text-xs leading-relaxed font-light transition-all duration-1000 select-none text-justify ${isMounted && !isDescUnlocked ? "blur-[4px] opacity-10 grayscale contrast-50 pointer-events-none text-vantum-gray" : "text-vantum-gray/80"}`}>
                  Rigor clásico de ingeniería. Base monocromática negra con bordado lineal heráldico en hilo de oro seleccionado. Máxima simetría y sobriedad industrial.
                </p>
                {isMounted && !isDescUnlocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-red-500/80 bg-black/10 text-center font-medium">[ DATA ENCRYPTED // REVEALED 23/07 ]</span>
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-vantum-white/[0.06] pt-4 font-mono">
              <div className="flex justify-between items-center text-[10px] text-vantum-gray/50">
                <span>PREMIUM FLAT VISOR</span>
                <span>WAITLIST CAPACITY: {waitlistPercentage}% [CRITICAL]</span>
              </div>
              {isMounted && isDropActive ? (
                <a href="https://wa.me/5492617616121?text=Hola%20Agust%C3%ADn!%20Quiero%20solicitar%20la%20pieza%20Vantum%20Onyx%20Gold." target="_blank" rel="noopener noreferrer" className="uppercase text-center text-green-400 border border-green-500/20 bg-green-500/5 py-2.5 text-[10px] font-medium tracking-widest hover:bg-green-400 hover:text-black transition-colors rounded-sm">SOLICITAR PIEZA →</a>
              ) : (
                <button 
                  onClick={(e) => executeBiometricScan(e, "Onyx Gold")}
                  className={`uppercase text-center py-2.5 text-[10px] font-medium tracking-widest transition-all duration-300 rounded-sm font-mono border ${bioScanning && !bioSuccess ? "border-red-500/50 bg-red-950/20 text-red-400 animate-pulse cursor-wait" : bioSuccess ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-400 hover:text-black"}`}
                >
                  {bioScanning ? bioText : "[ UNIRSE A LA LISTA DE ESPERA ]"}
                </button>
              )}
            </div>
          </div>

        </div>
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
              <table className={`w-full text-left text-[11px] leading-relaxed transition-all duration-1000 ${isMounted && !isDescUnlocked ? "blur-[5px] opacity-10 pointer-events-none select-none" : ""}`}>
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
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] tracking-widest text-red-400 uppercase text-center font-medium">[ METRICS RESTRINGED // OVERRIDE AT 23/07 ]</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EASTER EGG: INTERFAZ MODO TERMINAL DESBLOQUEADA POR TRIPLE TAP */}
      {showTerminalConsole && (
        <div className="fixed bottom-0 right-0 w-full md:w-[450px] h-[250px] bg-black border-t md:border-l border-red-500/30 text-red-500 font-mono text-[11px] flex flex-col p-4 z-50 shadow-2xl animate-fade-in">
          <div className="flex justify-between items-center border-b border-red-500/20 pb-1.5 mb-2 text-[9px]">
            <span>// OVERRIDE CONTROL CONSOLE</span>
            <button onClick={() => setShowTerminalConsole(false)} className="text-vantum-gray hover:text-red-400 uppercase">[ CLOSE ]</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 p-1 selection:bg-red-500 selection:text-black">
            {terminalLogs.map((log, index) => <p key={index} className="leading-relaxed whitespace-pre-wrap">{log}</p>)}
          </div>
          <form onSubmit={processCommand} className="mt-2 flex gap-2 border-t border-red-500/10 pt-2">
            <span className="text-red-400 font-bold">$</span>
            <input 
              type="text" 
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-red-400 font-mono text-[11px]"
              placeholder="Inject statement..."
              autoFocus
            />
          </form>
        </div>
      )}

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