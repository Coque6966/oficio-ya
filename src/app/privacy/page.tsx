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
                    <h2 className="text-xl font-bold text-white uppercase italic mt-8">4. Exención de Responsabilidad Legal</h2>
                    <p className="text-slate-500">OficioYa opera estricta y únicamente como un intermediario tecnológico de conexión de búsquedas. No tenemos relación laboral o fiduciaria con los proveedores y <strong>no nos hacemos responsables de malas acciones, daños, disputas, incumplimientos, fraudes o acuerdos concretados dentro o fuera de la plataforma.</strong> Cada usuario es 100% responsable de verificar la identidad, historial y formalizar el trato seguro de sus propios servicios contratados de forma privada.</p>
                </div>
            </div>
        </main>
    );
}
