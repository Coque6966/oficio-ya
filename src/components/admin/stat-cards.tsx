import { Users, CreditCard, CalendarCheck, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminStats = ({ stats }: { stats: any }) => {
    const cards = [
        { label: "Usuarios Totales", val: stats.users, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Ingresos del Mes", val: "$45,200", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Citas Finalizadas", val: stats.bookings, icon: CalendarCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Tasa de Crecimiento", val: "+12.5%", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((c) => (
                <Card key={c.label} className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{c.label}</CardTitle>
                        <div className={`p-2 rounded-lg ${c.bg}`}>
                            <c.icon className={`w-4 h-4 ${c.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl md:text-2xl font-black text-white">{c.val}</div>
                        <p className="text-[10px] text-slate-500 mt-1">Sincronizado ahora</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
