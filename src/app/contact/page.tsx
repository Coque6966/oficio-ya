"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.");
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Contacto y Soporte</h1>
                        <p className="text-slate-400 text-lg">¿Tienes dudas o necesitas ayuda con la plataforma? Estamos aquí para ti.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            { icon: Mail, label: "Correo", val: "soporte@oficioya.com", color: "text-blue-500" },
                            { icon: Phone, label: "WhatsApp", val: "+52 55 9876 5432", color: "text-emerald-500" },
                            { icon: MapPin, label: "Oficina", val: "Ciudad de México, MX", color: "text-purple-500" },
                        ].map((item) => (
                            <Card key={item.label} className="bg-white/5 border-white/10 text-center p-6">
                                <item.icon className={`w-8 h-8 mx-auto mb-4 ${item.color}`} />
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                                <p className="font-bold text-white mt-1">{item.val}</p>
                            </Card>
                        ))}
                    </div>

                    <Card className="bg-white/5 border-white/10 overflow-hidden rounded-3xl">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Nombre Completo</label>
                                        <Input required className="bg-white/5 border-white/10" placeholder="Juan Pérez" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Correo Electrónico</label>
                                        <Input required type="email" className="bg-white/5 border-white/10" placeholder="juan@gmail.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Asunto</label>
                                    <Input required className="bg-white/5 border-white/10" placeholder="Duda sobre los planes premium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Mensaje</label>
                                    <Textarea required className="bg-white/5 border-white/10 min-h-[150px]" placeholder="Escribe aquí tu consulta..." />
                                </div>
                                <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-bold text-lg rounded-2xl flex gap-2">
                                    <MessageCircle className="w-5 h-5" /> Enviar Mensaje
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
