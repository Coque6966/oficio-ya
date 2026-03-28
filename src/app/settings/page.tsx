"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Lock, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4 max-w-2xl">
                <h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Configuraciones</h1>

                <div className="space-y-6">
                    {/* Perfil */}
                    <Card className="bg-white/5 border-white/10 overflow-hidden rounded-3xl">
                        <CardHeader className="border-b border-white/5 bg-white/5">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <User className="w-5 h-5 text-blue-500" /> Información del Perfil
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Nombre</label>
                                    <Input placeholder="Jorge Arturo" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Apellido</label>
                                    <Input placeholder="Rodríguez" className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Teléfono</label>
                                <div className="relative">
                                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <Input placeholder="+52 55 1234 5678" className="bg-white/5 border-white/10 pl-10" />
                                </div>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold rounded-xl mt-4">
                                Guardar Cambios
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Seguridad */}
                    <Card className="bg-white/5 border-white/10 overflow-hidden rounded-3xl">
                        <CardHeader className="border-b border-white/5 bg-white/5">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <Lock className="w-5 h-5 text-orange-500" /> Seguridad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-emerald-500" />
                                    <div>
                                        <p className="text-sm font-bold">Autenticación de dos pasos</p>
                                        <p className="text-[10px] text-slate-500">Aumenta la seguridad de tu cuenta.</p>
                                    </div>
                                </div>
                                <Button variant="ghost" className="text-blue-500 font-bold hover:bg-white/5">Activar</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notificaciones */}
                    <Card className="bg-white/5 border-white/10 overflow-hidden rounded-3xl">
                        <CardHeader className="border-b border-white/5 bg-white/5">
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <Bell className="w-5 h-5 text-purple-500" /> Notificaciones
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                                {["Email", "SMS", "Notificaciones Push"].map((type) => (
                                    <div key={type} className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{type}</span>
                                        <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                            <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
