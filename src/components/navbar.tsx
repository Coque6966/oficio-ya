"use client";

import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";

export const Navbar = () => {
    const { userId } = useAuth();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-4 md:px-8">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src="/images/logo-premium.png"
                        alt="OficioYa Logo"
                        className="w-8 h-8 rounded-lg"
                    />
                    <span className="text-2xl font-black text-white tracking-tighter">
                        Oficio<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Ya</span>
                    </span>
                </Link>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link href="/search" className="hover:text-blue-500 transition-colors">Explorar</Link>
                    <Link href="/pricing" className="hover:text-blue-500 transition-colors">Soy Profesional</Link>
                    <Link href="/help" className="hover:text-blue-500 transition-colors">Ayuda</Link>
                </div>

                {/* Auth Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="ghost" className="text-blue-500 font-bold border border-blue-500/20 hover:bg-blue-500/10">Panel Admin</Button>
                    </Link>
                    {userId ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="hidden md:block">
                                <Button variant="ghost" className="text-slate-300 hover:text-white">Mi Panel</Button>
                            </Link>
                            <UserButton />
                        </div>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost" className="text-slate-300 hover:text-white border border-white/10">Inicia Sesión</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Regístrate</Button>
                            </SignUpButton>
                        </>
                    )}
                    <Button variant="ghost" size="icon" className="md:hidden text-slate-300">
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};
