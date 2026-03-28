"use client";

import { Navbar } from "@/components/navbar";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20">
            <Navbar />
            <div className="pt-32 container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Términos de Servicio</h1>
                <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>Bienvenido a OficioYa. Al usar nuestra plataforma, aceptas los siguientes términos:</p>
                    <h2 className="text-xl font-bold text-white uppercase italic">1. Uso del Servicio</h2>
                    <p>OficioYa es un marketplace que conecta usuarios con profesionales independientes. No somos responsables de la calidad individual del trabajo realizado.</p>
                    <h2 className="text-xl font-bold text-white uppercase italic">2. Comisiones y Pagos</h2>
                    <p>Los profesionales pagan una suscripción para aparecer en el listado. Los pagos de servicios son acordados entre el cliente y el experto.</p>
                    <h2 className="text-xl font-bold text-white uppercase italic">3. Conducta del Usuario</h2>
                    <p>Queda prohibido el uso de la plataforma para fines ilegales o acoso.</p>
                </div>
            </div>
        </main>
    );
}
