import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin } from "lucide-react";

export default async function ClientDashboard() {
    const { userId } = await auth();

    const bookings = await db.booking.findMany({
        where: { clientId: userId as string },
        include: {
            provider: {
                include: {
                    profile: true
                }
            }
        },
        orderBy: {
            scheduledDate: "desc"
        }
    });

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-12 container mx-auto px-4">
                <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Mis Servicios</h1>

                <div className="grid gap-6">
                    {bookings.length > 0 ? (
                        bookings.map((booking: any) => (
                            <Card key={booking.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                                    <div className="flex items-center gap-4 flex-1">
                                        <Avatar className="w-16 h-16 border border-slate-100">
                                            <AvatarImage src={booking.provider.image || ""} />
                                            <AvatarFallback>{booking.provider.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Profesional</p>
                                            <h3 className="text-xl font-bold text-slate-900">{booking.provider.name}</h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-8 items-center justify-center md:justify-end">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-blue-500" />
                                            <div className="text-sm">
                                                <p className="font-bold text-slate-700">{booking.scheduledDate.toLocaleDateString()}</p>
                                                <p className="text-slate-400">{booking.startTime}</p>
                                            </div>
                                        </div>

                                        <div className="text-center md:text-right">
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Estado</p>
                                            <Badge
                                                variant={booking.status === "CONFIRMED" ? "default" : "secondary"}
                                                className={booking.status === "PENDING" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : ""}
                                            >
                                                {booking.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-400 text-lg">Aún no has agendado ningún servicio.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
