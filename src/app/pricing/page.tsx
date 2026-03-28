"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Plan {
    name: string;
    price: string;
    description: string;
    features: string[];
    icon: any;
    tier: string;
    highlight?: boolean;
}

const PLANS: Plan[] = [
    {
        name: "Gratis",
        price: "0",
        description: "Prueba la plataforma sin compromiso.",
        features: [
            "Perfil profesional completo",
            "Aparece en resultados de búsqueda",
            "Primeros 2 leads/trabajos GRATIS",
            "Soporte básico",
        ],
        icon: Zap,
        tier: "NONE"
    },
    {
        name: "Básico",
        price: "99",
        description: "Para profesionales que empiezan.",
        features: [
            "Todo lo del plan Gratis",
            "Hasta 7 leads totales al mes",
            "Estadísticas de perfil",
            "Soporte prioritario",
        ],
        icon: Sparkles,
        tier: "BASIC",
        highlight: true
    },
    {
        name: "Pro",
        price: "199",
        description: "Sin límites para tu crecimiento.",
        features: [
            "Leads ILIMITADOS",
            "Prioridad máxima en búsquedas",
            "Insignia Pro destacada",
            "Analítica avanzada",
            "Soporte 24/7",
        ],
        icon: Shield,
        tier: "PRO"
    }
];

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const onSubscribe = async (tier: string) => {
        try {
            setLoading(tier);
            const response = await axios.post("/api/stripe/checkout", { tier });
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Algo salió mal. Por favor, intenta de nuevo.");
            console.error(error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-4xl md:text-6xl font-black mb-6">Elige el plan que <br /> <span className="text-blue-500">impulse tu negocio</span>.</h1>
                    <p className="text-slate-400 text-lg">Únete a miles de profesionales que ya están ganando más con OficioYa.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-white/5 border ${plan.highlight ? 'border-blue-500 shadow-[0_0_40px_-15px_rgba(37,99,235,0.5)]' : 'border-white/10'} p-8 rounded-3xl flex flex-col`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Más popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                    <plan.icon className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-slate-400 text-sm">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-5xl font-black">${plan.price}</span>
                                <span className="text-slate-400">/mes</span>
                            </div>

                            <div className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature: string) => (
                                    <div key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <Button
                                disabled={!!loading}
                                onClick={() => onSubscribe(plan.tier)}
                                className={`w-full h-12 text-lg font-bold rounded-xl ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20'}`}
                            >
                                {loading === plan.tier && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {loading === plan.tier ? "Cargando..." : "Suscribirme ahora"}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center bg-white/5 border border-white/10 p-12 rounded-3xl max-w-4xl mx-auto">
                    <h4 className="text-2xl font-bold mb-4">¿Tienes una empresa grande?</h4>
                    <p className="text-slate-400 mb-8">Ofrecemos planes personalizados para constructoras, agencias de limpieza y mantenimiento corporativo.</p>
                    <Link href="/contact">
                        <Button variant="outline" className="border-white/20 hover:bg-white/10">Contactar a Ventas</Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
