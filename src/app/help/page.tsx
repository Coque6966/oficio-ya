"use client";

import { Navbar } from "@/components/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ShieldAlert, CreditCard, Wrench } from "lucide-react";

export default function HelpPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20">
            <Navbar />
            <div className="pt-32 container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <div className="inline-flex p-4 rounded-full bg-blue-500/10 mb-6">
                        <HelpCircle className="w-12 h-12 text-blue-500" />
                    </div>
                    <h1 className="text-4xl font-black mb-4 italic uppercase tracking-tighter">Centro de Ayuda</h1>
                    <p className="text-slate-400">Resuelve tus dudas sobre reservas, pagos y seguridad en OficioYa.</p>
                </div>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                            <Wrench className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white uppercase italic">Para Clientes</h2>
                        </div>
                        <Accordion className="w-full">
                            <AccordionItem value="c-1" className="border-white/10">
                                <AccordionTrigger className="text-left font-bold hover:text-blue-400">¿Cómo contrato un servicio seguro?</AccordionTrigger>
                                <AccordionContent className="text-slate-400 leading-relaxed">
                                    Busca al profesional que necesites. Te recomendamos elegir a aquellos con insignias <span className="text-blue-400 font-bold">Premium</span> o altas calificaciones. OficioYa te permite agendar una fecha exacta usando tu mapa para establecer la dirección con el proveedor.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="c-2" className="border-white/10">
                                <AccordionTrigger className="text-left font-bold hover:text-blue-400">¿OficioYa es responsable del trabajo realizado?</AccordionTrigger>
                                <AccordionContent className="text-slate-400 leading-relaxed">
                                    <strong className="text-slate-200">No.</strong> OficioYa es estrictamente un canal tecnológico para facilitar búsquedas. Las cotizaciones finales, la resolución de problemas y la supervisión del trabajo acordado es entera responsabilidad tuya y del trabajador externo.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 pt-8">
                            <ShieldAlert className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white uppercase italic">Para Profesionales</h2>
                        </div>
                        <Accordion className="w-full">
                            <AccordionItem value="p-1" className="border-white/10">
                                <AccordionTrigger className="text-left font-bold hover:text-blue-400">¿Por qué me piden Identificación Oficial?</AccordionTrigger>
                                <AccordionContent className="text-slate-400 leading-relaxed">
                                    Para evitar el fraude y mantener altos estándares de seguridad en la comunidad, todos los profesionales pasan por un escaneo de Inteligencia Artificial que revisa el Instituto Nacional Electoral (INE) o Pasaporte de forma automatizada al crear la cuenta.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="p-2" className="border-white/10">
                                <AccordionTrigger className="text-left font-bold hover:text-blue-400">¿Cuáles son los niveles de suscripción?</AccordionTrigger>
                                <AccordionContent className="text-slate-400 leading-relaxed">
                                    Tenemos <strong className="text-white">Plan Gratis</strong> (Inicia tu perfil, pero sin prioridad máxima), <strong className="text-white">Plan Básico</strong> y <strong className="text-white">Plan Pro</strong>. Los proveedores Pro lideran categóricamente todas las posiciones en las búsquedas en su ciudad.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 pt-8">
                            <CreditCard className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white uppercase italic">Facturación</h2>
                        </div>
                        <Accordion className="w-full">
                            <AccordionItem value="f-1" className="border-white/10">
                                <AccordionTrigger className="text-left font-bold hover:text-blue-400">Métodos de cobro y pagos seguros</AccordionTrigger>
                                <AccordionContent className="text-slate-400 leading-relaxed">
                                    Todas las transacciones y suscripciones son manejadas enrutadamente con el protocolo de cifrado militar de Stripe. OficioYa JAMÁS guardará directamente los datos de tu tarjeta de crédito en sus servidores de texto.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    <section className="mt-12 p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-center">
                        <h2 className="text-2xl font-black text-white uppercase italic mb-2">Soporte Directo</h2>
                        <p className="text-slate-400 mb-6 font-medium">Si tienes una emergencia o duda técnica, contacta al propietario:</p>
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-blue-400 tracking-tighter uppercase">Jorge Arturo Rodriguez Araujo</p>
                            <a href="tel:4462322001" className="text-3xl font-black text-white hover:text-blue-500 transition-colors">446 232 2001</a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
