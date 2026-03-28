"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ReviewPage({ params }: { params: { id: string } }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    const handleSubmit = () => {
        if (rating === 0) return toast.error("Por favor selecciona una calificación");
        setSubmitted(true);
        setTimeout(() => {
            router.push("/dashboard/client");
        }, 2000);
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h1 className="text-3xl font-black text-white mb-2">¡Nueva Reseña Publicada!</h1>
                <p className="text-slate-400">Gracias por ayudar a la comunidad de OficioYa.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4 max-w-xl">
                <Card className="bg-white/5 border-white/10 shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-black uppercase tracking-tighter italic">Calificar Servicio</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">¿Cómo fue tu experiencia con el experto?</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        {/* Stars */}
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-transform active:scale-90"
                                >
                                    <Star
                                        className={`w-10 h-10 transition-colors ${(hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-white/10"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comentario (Opcional)</label>
                            <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Escribe aquí los detalles que más destacarías del servicio..."
                                className="bg-white/5 border-white/10 text-white min-h-[150px] focus:ring-blue-600 rounded-2xl p-4"
                            />
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1"
                        >
                            Publicar Reseña
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
