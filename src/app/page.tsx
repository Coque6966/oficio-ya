import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import * as Icons from "lucide-react";

export default async function Home() {
  const categories = await db.serviceCategory.findMany();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />

      {/* Categories Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">Directorio de Confianza</Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic leading-none">¿Qué servicio <span className="text-blue-500">buscas hoy?</span></h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium">La red de profesionales más grande y segura de México. Agenda hoy mismo.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category: any) => {
            // @ts-ignore
            const Icon = Icons[category.icon || "Wrench"];
            return (
              <Link
                key={category.id}
                href={`/search?category=${category.slug}`}
                className="group relative"
              >
                <Card className="bg-white/[0.03] border-white/5 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 overflow-hidden h-40 flex items-center justify-center">
                  <CardContent className="p-0 flex flex-col items-center justify-center text-center">
                    <div className="p-3 bg-white/5 rounded-2xl mb-3 group-hover:bg-white/20 transition-all">
                      {Icon && <Icon className="w-8 h-8 text-blue-500 group-hover:text-white" />}
                    </div>
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 group-hover:text-white">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">¿Eres un experto en tu oficio?</h2>
            <p className="text-blue-100 text-xl mb-10 font-medium">Únete a la plataforma que está cambiando la forma de trabajar en México. Más clientes, más seguridad, más ganancias.</p>
            <Link href="/dashboard/provider/setup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-black uppercase italic px-10 h-16 text-lg rounded-2xl shadow-xl shadow-black/10">
                Empezar Ahora <Icons.ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
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
