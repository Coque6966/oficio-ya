"use client";

import { Navbar } from "@/components/navbar";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20">
            <Navbar />
            <div className="pt-32 container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Política de Privacidad</h1>
                <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>Tu privacidad es nuestra prioridad.</p>
                    <h2 className="text-xl font-bold text-white uppercase italic">1. Datos que Recolectamos</h2>
                    <p>Nombre, correo electrónico y ubicación (si la permites) para facilitar la búsqueda de servicios.</p>
                    <h2 className="text-xl font-bold text-white uppercase italic">2. Uso de Datos</h2>
                    <p>Utilizamos tus datos exclusivamente para conectar clientes con profesionales y mejorar la seguridad de la plataforma.</p>
                    <h2 className="text-xl font-bold text-white uppercase italic">3. Terceros</h2>
                    <p>Tus datos de pago son gestionados de forma segura por Stripe y tu identidad por Clerk.</p>
                </div>
            </div>
        </main>
    );
}
