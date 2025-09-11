import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DeepDev Courses",
  description: "Plataforma de cursos de José con un diseño moderno",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body 
        className="min-h-screen text-white bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundColor: "#0f172a" // fallback color
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="fixed inset-0 bg-black/40 -z-10"></div>
        
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen p-4 
                        backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-lg mt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
