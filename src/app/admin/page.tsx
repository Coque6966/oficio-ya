import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { AdminStats } from "@/components/admin/stat-cards";
import { AdminCharts } from "@/components/admin/data-charts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { VerifyButton } from "@/components/admin/verify-button";

export default async function AdminDashboard() {
    const { userId } = await auth();

    // Real stats from DB
    const [userCount, bookingCount, providers] = await Promise.all([
        db.user.count(),
        db.booking.count(),
        db.providerProfile.findMany({
            include: { user: true, categories: true },
            orderBy: { createdAt: "desc" }
        })
    ]);

    return (
        <main className="min-h-screen bg-slate-950 text-white pb-20">
            <Navbar />

            <div className="pt-28 container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black italic tracking-tighter uppercase">Panel de Control</h1>
                            <p className="text-slate-500 text-xs">Bienvenido de nuevo, Administrador.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-10 rounded-xl text-xs text-white">
                            <Download className="w-4 h-4 mr-2" /> Reporte CSV
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 h-10 rounded-xl text-xs font-bold">
                            Configuración Global
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <AdminStats stats={{ users: userCount, bookings: bookingCount }} />

                {/* Analytics Charts */}
                <AdminCharts />

                {/* Provider Management Table */}
                <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold">Gestión de Expertos</h2>
                        <div className="relative w-full md:w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <Input placeholder="Buscar experto..." className="bg-white/5 border-white/10 pl-9 h-9 text-xs" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="text-slate-400 text-[10px] uppercase font-bold">Nombre</TableHead>
                                    <TableHead className="text-slate-400 text-[10px] uppercase font-bold">Categoría</TableHead>
                                    <TableHead className="text-slate-400 text-[10px] uppercase font-bold">Estado</TableHead>
                                    <TableHead className="text-slate-400 text-[10px] uppercase font-bold text-right">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {providers.map((p: any) => (
                                    <TableRow key={p.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center font-bold text-blue-500 text-xs">
                                                    {p.user.name?.[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm tracking-tight">{p.user.name}</span>
                                                    <span className="text-[10px] text-slate-500">{p.user.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-white/10 text-white text-[9px] uppercase tracking-widest px-2">
                                                {p.categories[0]?.name || "N/A"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {p.isVerified ? (
                                                <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-bold uppercase">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    Verificado
                                                </div>
                                            ) : (
                                                <div className="text-slate-500 text-[10px] font-bold uppercase">Pendiente</div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <VerifyButton providerId={p.id} isVerified={p.isVerified} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </main>
    );
}
