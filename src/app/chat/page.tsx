"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import { useState } from "react";

const SAMPLE_MESSAGES = [
    { id: 1, sender: "provider", content: "Hola, vi que agendaste un servicio de plomería para mañana. ¿A qué hora te queda mejor?", time: "10:30 AM" },
    { id: 2, sender: "me", content: "Hola Juan, sí. A las 10:00 AM estaría perfecto.", time: "10:32 AM" },
    { id: 3, sender: "provider", content: "Excelente, ahí estaré puntualmente. Gracias.", time: "10:35 AM" },
];

export default function ChatPage() {
    const [messages, setMessages] = useState(SAMPLE_MESSAGES);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now(), sender: "me", content: input, time: "Ahora" }]);
        setInput("");
    };

    return (
        <main className="h-screen bg-slate-950 flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex-1 pt-16 flex container mx-auto px-0 md:px-4 overflow-hidden">
                {/* Chat List (Desktop) */}
                <aside className="hidden md:flex w-80 border-r border-white/10 flex-col bg-slate-900/50">
                    <div className="p-4 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white">Mensajes</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10">
                                <Avatar>
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white truncate">Juan Pérez</p>
                                    <p className="text-xs text-slate-500 truncate">Confirmado para mañana...</p>
                                </div>
                                <span className="text-[10px] text-slate-600">10:35 AM</span>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Active Conversation */}
                <div className="flex-1 flex flex-col bg-slate-950 md:bg-transparent">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                                <AvatarFallback>JP</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-white">Juan Pérez</p>
                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">En línea</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white"><Phone className="w-5 h-5" /></Button>
                            <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white"><Video className="w-5 h-5" /></Button>
                            <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white"><MoreVertical className="w-5 h-5" /></Button>
                        </div>
                    </div>

                    {/* Messages Loop */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${m.sender === "me"
                                        ? "bg-blue-600 text-white rounded-tr-none"
                                        : "bg-white/10 text-slate-200 rounded-tl-none border border-white/10"
                                    }`}>
                                    <p className="text-sm leading-relaxed">{m.content}</p>
                                    <p className={`text-[10px] mt-1 ${m.sender === "me" ? "text-blue-200" : "text-slate-500"}`}>{m.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 md:p-6 border-t border-white/10 bg-slate-900/50 pb-20 md:pb-6">
                        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
                            <Input
                                placeholder="Escribe un mensaje..."
                                className="bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <Button
                                onClick={handleSend}
                                size="icon"
                                className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
