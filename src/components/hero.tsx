"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background patterns/gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
                    Encuentra el <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">experto ideal</span> <br /> para tu hogar [DEPLOY#1].
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    Plomeros, electricistas, niñeras y más. Con reseñas reales y agendamiento instantáneo.
                </p>

                <form
                    onSubmit={handleSearch}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex flex-col md:row max-w-3xl mx-auto shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-300 md:flex-row gap-2"
                >
                    <div className="flex-1 flex items-center px-4 bg-white/5 rounded-xl border border-white/10 focus-within:border-amber-500 transition-colors">
                        <Search className="text-slate-400 w-5 h-5 mr-3" />
                        <Input
                            placeholder="¿Qué servicio necesitas?"
                            className="bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-lg"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        size="lg"
                        className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
                    >
                        Buscar
                    </Button>
                </form>

                <div className="mt-8 flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <span className="text-slate-400 text-sm">Populares:</span>
                    {["Plomero", "Electricista", "Limpieza", "Pintor"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => router.push(`/search?q=${tag}`)}
                            className="text-xs px-3 py-1 bg-white/5 border border-white/10 text-slate-300 rounded-full hover:bg-white/10 hover:border-blue-500 transition-all"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
