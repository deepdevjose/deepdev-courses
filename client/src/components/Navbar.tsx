"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl 
                    bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl 
                    shadow-lg flex justify-between items-center px-6 py-3">
      <div className="text-xl font-bold text-white">🚀 DeepDev</div>
      <div className="flex space-x-6 text-white/80">
        <Link href="/" className="hover:text-white transition">Inicio</Link>
        <Link href="/cursos" className="hover:text-white transition">Cursos</Link>
        <Link href="/contacto" className="hover:text-white transition">Contacto</Link>
        <Link href="/login" className="px-4 py-1 rounded-xl bg-white/20 hover:bg-white/30 transition">
          Login
        </Link>
      </div>
    </nav>
  );
}
