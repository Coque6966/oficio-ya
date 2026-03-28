import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Icons from "lucide-react";

export default async function Home() {
  const categories = await db.serviceCategory.findMany({
    take: 12,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />

      {/* Categories Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">¿Qué podemos hacer por ti?</h2>
          <p className="text-slate-400 text-lg">Busca por categorías y encuentra al mejor profesional.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category: any) => {
            // @ts-ignore
            const Icon = Icons[category.icon || "Wrench"];
            return (
              <Link
                key={category.id}
                href={`/search?category=${category.slug}`}
                className="group"
              >
                <Card className="bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-blue-500/50 transition-all duration-300 overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-blue-500/10 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                      {Icon && <Icon className="w-8 h-8 text-blue-500" />}
                    </div>
                    <h3 className="font-bold text-slate-200 group-hover:text-white">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900/50 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.Verified className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-2">Profesionales Verificados</h4>
              <p className="text-slate-400">Validamos la identidad y antecedentes de todos nuestros expertos.</p>
            </div>
            <div>
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.Star className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-2">Reseñas Reales</h4>
              <p className="text-slate-400">Solo clientes verificados pueden calificar el servicio.</p>
            </div>
            <div>
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.CalendarCheck className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-2">Agenda Instantánea</h4>
              <p className="text-slate-400">Reserva tu servicio en segundos con confirmación real.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-premium.png"
                alt="OficioYa Logo"
                className="w-10 h-10 rounded-lg grayscale opacity-50"
              />
              <span className="text-2xl font-black text-white/50 tracking-tighter">OficioYa</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-500">
              <Link href="/contact" className="hover:text-blue-500 transition-colors">Contacto</Link>
              <Link href="/terms" className="hover:text-blue-500 transition-colors">Términos</Link>
              <Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacidad</Link>
            </div>
          </div>
          <div className="text-center text-slate-600 text-xs pt-8 border-t border-white/5">
            <p>© 2026 OficioYa. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
