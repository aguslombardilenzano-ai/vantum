export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-vantum-black/80 backdrop-blur-md border-b border-vantum-white/[0.04] font-mono">
      {/* Línea decorativa milimétrica superior */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-vantum-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Identificador de Marca */}
        <a href="#" className="text-sm tracking-[0.4em] uppercase font-light hover:text-vantum-gray transition-colors">
          VANTUM
        </a>

        {/* Terminal de Navegación de sección */}
        <div className="hidden md:flex items-center gap-12 text-[10px] tracking-[0.3em] uppercase text-vantum-gray">
          <a href="#modelos" className="hover:text-vantum-white transition-colors relative group py-2">
            <span>MODELOS</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-vantum-white transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#especificaciones" className="hover:text-vantum-white transition-colors relative group py-2">
            <span>ESPECIFICACIONES</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-vantum-white transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contacto" className="hover:text-vantum-white transition-colors relative group py-2">
            <span>DISTRIBUCIÓN</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-vantum-white transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* Botón de Acción Perimetral */}
        <div>
          <a 
            href="#contacto" 
            className="border border-vantum-white/20 px-5 py-2.5 text-[9px] tracking-[0.25em] uppercase hover:bg-vantum-white hover:text-vantum-black transition-all duration-300"
          >
            CONTACTO
          </a>
        </div>
      </div>
    </nav>
  );
}