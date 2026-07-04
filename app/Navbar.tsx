import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-vantum-dark bg-vantum-black/70 backdrop-blur-md px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-light tracking-[0.25em] text-vantum-white hover:opacity-80 transition-opacity">
          VANTUM
        </Link>

        {/* ENLACES CENTRALES */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-light tracking-[0.15em] text-vantum-gray">
          <Link href="#modelos" className="hover:text-vantum-white transition-colors uppercase">
            Modelos
          </Link>
          <Link href="#especificaciones" className="hover:text-vantum-white transition-colors uppercase">
            Especificaciones
          </Link>
          <Link href="#ingenieria" className="hover:text-vantum-white transition-colors uppercase">
            Ingeniería
          </Link>
        </div>

        {/* BOTÓN DERECHO DE ACCIÓN */}
        <div>
          <Link 
            href="#contacto" 
            className="text-xs font-light tracking-widest uppercase border border-vantum-white/20 px-4 py-2 text-vantum-white hover:bg-vantum-white hover:text-vantum-black transition-all duration-300"
          >
            Contacto
          </Link>
        </div>

      </div>
    </nav>
  );
}