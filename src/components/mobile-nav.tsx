"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
    const pathname = usePathname();

    const routes = [
        { label: "Inicio", icon: Home, href: "/" },
        { label: "Buscar", icon: Search, href: "/search" },
        { label: "Citas", icon: Calendar, href: "/dashboard" },
        { label: "Mensajes", icon: MessageSquare, href: "/chat" },
        { label: "Perfil", icon: User, href: "/dashboard" },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-lg border-t border-white/10 h-16 flex items-center justify-around px-2 pb-safe-area-inset-bottom z-50">
            {routes.map((route) => {
                const isActive = pathname === route.href;
                return (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 transition-all",
                            isActive ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        <route.icon className={cn("w-5 h-5", isActive && "fill-current")} />
                        <span className="text-[10px] font-medium">{route.label}</span>
                    </Link>
                );
            })}
        </div>
    );
};
