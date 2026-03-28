import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, CalendarCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProviderDashboard() {
    const { userId } = await auth();

    const profile = await db.providerProfile.findUnique({
        where: { userId: userId as string },
        include: {
            user: true,
            categories: true,
        }
    });

    const bookings = await db.booking.findMany({
        where: { providerId: userId as string },
        include: {
            client: true
        },
        orderBy: {
            scheduledDate: "desc"
        }
    });

    const stats = [
        { label: "Ganancias totales", value: "$12,450", icon: DollarSign, color: "text-emerald-500" },
        { label: "Trabajos activos", value: bookings.filter((b: any) => b.status === "CONFIRMED").length, icon: CalendarCheck, color: "text-blue-500" },
        { label: "Clientes nuevos", value: "12", icon: Users, color: "text-purple-500" },
        { label: "Crecimiento", value: "+15%", icon: TrendingUp, color: "text-orange-500" },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-12 container mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Panel del Profesional</h1>
                        <p className="text-slate-500">Bienvenido de nuevo, {profile?.user.name}</p>
                    </div>
                    <Badge className="bg-blue-600 text-white px-4 py-1.5 text-sm font-bold shadow-lg">
                        Plan {profile?.subscriptionTier}
                    </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="border-slate-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Bookings */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Próximos Trabajos</h2>
                        {bookings.length > 0 ? (
                            bookings.map((booking: any) => (
                                <Card key={booking.id} className="border-slate-200">
                                    <CardContent className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                                                <CalendarCheck className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{booking.client.name}</p>
                                                <p className="text-xs text-slate-500">{booking.scheduledDate.toLocaleDateString()} a las {booking.startTime}</p>
                                            </div>
                                        </div>
                                        <Badge variant={booking.status === "PENDING" ? "outline" : "default"}>
                                            {booking.status}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-slate-400 italic">No tienes trabajos pendientes.</p>
                        )}
                    </div>

                    {/* Tips / Promotion */}
                    <div className="space-y-6">
                        <Card className="bg-blue-600 text-white border-none shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-lg">¡Llega a más clientes!</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-blue-100 mb-6">
                                    Los profesionales con plan **Premium** aparecen primero en las búsquedas y reciben 3x más solicitudes.
                                </p>
                                <Button className="w-full bg-white text-blue-600 font-bold hover:bg-slate-100 border-none">
                                    Ver Planes Premium
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </main>
    );
}
