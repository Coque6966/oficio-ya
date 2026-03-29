"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle2, ShieldCheck, ArrowRight, Loader2, FileCheck, ScanLine } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Tesseract from "tesseract.js";
import dynamic from "next/dynamic";
import { FaceDetection } from "@/components/face-detection";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Dynamically import the map to avoid SSR window errors
const LocationPickerMap = dynamic(
    () => import("../../../../components/map/location-picker").then((mod) => mod.LocationPickerMap),
    { ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-slate-800 rounded-xl" /> }
);

export default function ProviderOnboardingPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [scanningId, setScanningId] = useState(false);
    const [idFile, setIdFile] = useState<File | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        bio: "",
        hourlyRate: "",
        city: "Ciudad de México",
        state: "",
        address: "",
        zipCode: "",
        latitude: "19.4326",
        longitude: "-99.1332",
    });
    const router = useRouter();

    const onSubmit = async () => {
        try {
            setLoading(true);
            await axios.post("/api/provider/onboarding", formData);
            toast.success("¡Perfil enviado para revisión!");
            router.push("/dashboard/provider");
            router.refresh();
        } catch (error) {
            toast.error("Error al guardar perfil");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (step === 1 && !profileFile) {
            toast.error("Seguridad Biométrica: Debes escanear tu rostro para crear el perfil.");
            return;
        }
        if (step === 2 && !idFile) {
            toast.error("Seguridad: Es OBLIGATORIO escanear tu Identificación Oficial para continuar.");
            return;
        }
        if (step < 3) setStep(step + 1);
        else onSubmit();
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-4 max-w-2xl">
                {/* Progress bar */}
                <div className="flex gap-2 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-1 flex-1 rounded-full transition-all ${s <= step ? "bg-blue-600" : "bg-white/10"}`}
                        />
                    ))}
                </div>

                <Card className="bg-white/5 border-white/10 shadow-2xl">
                    <CardHeader className="text-center">
                        {step === 1 && (
                            <>
                                <CardTitle className="text-3xl font-black">Información Básica</CardTitle>
                                <CardDescription className="text-slate-400">Cuéntanos un poco sobre tu experiencia y tarifas.</CardDescription>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <CardTitle className="text-3xl font-black">Verificación de Identidad</CardTitle>
                                <CardDescription className="text-slate-400">Sube una foto de tu INE o Pasaporte para validar tu perfil.</CardDescription>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <CardTitle className="text-3xl font-black">Zonas de Cobertura</CardTitle>
                                <CardDescription className="text-slate-400">Selecciona las ciudades y colonias donde trabajas.</CardDescription>
                            </>
                        )}
                    </CardHeader>

                    <CardContent className="p-8 space-y-6">
                        {step === 1 && (
                            <>
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-300">Foto de Perfil Biométrica</label>
                                    <FaceDetection
                                        label="Escaneo de Rostro Obligatorio"
                                        onCapture={(file) => setProfileFile(file)}
                                    />
                                    <p className="text-[10px] text-slate-500 text-center italic">Este escaneo valida que eres una persona real.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300">Biografía Profesional</label>
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Describe tu experiencia, herramientas y especialidades..."
                                        className="bg-white/5 border-white/10 text-white min-h-[120px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300">Tarifa por Hora (MXN)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                        <Input
                                            value={formData.hourlyRate}
                                            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            type="number" placeholder="Ej. 350" className="bg-white/5 border-white/10 text-white pl-8"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <FaceDetection
                                    label="Escanear INE / Pasaporte Original"
                                    onCapture={(file) => setIdFile(file)}
                                />
                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                                    <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                    <p className="text-xs text-blue-200">
                                        Nuestro sistema valida la autenticidad de tu identificación en tiempo real. No se aceptan fotocopias.
                                    </p>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Estado</label>
                                        <Input
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            placeholder="Ej. Chihuahua" className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Ciudad Principal</label>
                                        <Input
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="Ciudad de México" className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-[2fr_1fr] gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Dirección Exacta</label>
                                        <Input
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Calle y Número, Colonia" className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-300">Código Postal</label>
                                        <Input
                                            value={formData.zipCode}
                                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                            placeholder="00000" className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 flex justify-between">
                                        <span>Tu Ubicación en el Mapa</span>
                                        <span className="text-blue-500 font-normal">Mueve el mapa para ser preciso</span>
                                    </label>
                                    <LocationPickerMap
                                        defaultLocation={[19.4326, -99.1332]}
                                        onChange={({ lat, lng }) => setFormData({ ...formData, latitude: lat.toString(), longitude: lng.toString() })}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 italic">Usamos tu ubicación para mostrarte a clientes cercanos.</p>
                            </div>
                        )}

                        <Button
                            disabled={loading}
                            onClick={nextStep}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    {step === 3 ? "Finalizar Registro" : "Continuar"} <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main >
    );
}
