export default function Footer() {
  return (
    <footer className="mt-20 w-full">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          {/* Glassmorphism gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative px-8 py-6 text-center">
            <p className="text-white/80 text-sm font-light tracking-wide">
              © {new Date().getFullYear()} DeepDev Courses. Hecho con ❤️ por José.
            </p>
            
            <div className="flex justify-center items-center space-x-6 mt-4">
              <a 
                href="https://github.com/deepdevjose" 
                target="_blank" 
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 text-sm font-medium"
              >
                GitHub
              </a>
              <div className="w-px h-4 bg-white/30" />
              <a 
                href="https://www.linkedin.com/in/jos%C3%A9-manuel-cortes-cer%C3%B3n/" 
                target="_blank" 
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 text-sm font-medium"
              >
                LinkedIn
              </a>
              <div className="w-px h-4 bg-white/30" />
              <a 
                href="https://instagram.com/deepdevjose" 
                target="_blank" 
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110 text-sm font-medium"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
