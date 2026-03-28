"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 border border-red-500/50">
                <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 italic">¡Vaya! Algo salió mal</h1>
            <p className="text-slate-400 max-w-md mb-8">
                Hemos tenido un problema inesperado. No te preocupes, tus datos están seguros. Por favor, intenta recargar la página.
            </p>
            <div className="flex gap-4">
                <Button
                    onClick={() => reset()}
                    className="bg-blue-600 hover:bg-blue-700 font-bold px-8 h-12 rounded-xl flex gap-2"
                >
                    <RefreshCcw className="w-4 h-4" /> Reintentar
                </Button>
                <Button
                    variant="outline"
                    onClick={() => window.location.href = "/"}
                    className="border-white/10 text-white hover:bg-white/5 font-bold px-8 h-12 rounded-xl"
                >
                    Ir al Inicio
                </Button>
            </div>
            <p className="mt-12 text-[10px] text-slate-600 font-mono">
                Error Digest: {error.digest || "N/A"}
            </p>
        </div>
    );
}
