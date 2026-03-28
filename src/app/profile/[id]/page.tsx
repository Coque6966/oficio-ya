import { Navbar } from "@/components/navbar";
import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ShieldCheck, Mail, Phone, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BookingForm } from "@/components/booking-form";
import { notFound } from "next/navigation";

export default async function ProviderProfilePage({ params }: { params: { id: string } }) {
    const provider = await db.providerProfile.findUnique({
        where: { id: params.id },
        include: {
            user: true,
            categories: true,
            reviews: {
                include: {
                    author: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });

    if (!provider) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <Avatar className="w-32 h-32 border-4 border-slate-50 shadow-md">
                                    <AvatarImage src={provider.user.image || ""} />
                                    <AvatarFallback className="bg-blue-100 text-blue-700 text-3xl font-bold">
                                        {provider.user.name?.charAt(0) || "P"}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-black text-slate-900">{provider.user.name}</h1>
                                        {provider.isVerified && (
                                            <Badge className="bg-blue-500 hover:bg-blue-600">
                                                <ShieldCheck className="w-4 h-4 mr-1" /> Verificado
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-slate-500 mb-4">
                                        <div className="flex items-center text-yellow-600 font-bold">
                                            <Star className="w-5 h-5 fill-current mr-1" />
                                            {provider.rating.toFixed(1)}
                                            <span className="text-slate-400 font-normal ml-1">({provider.reviewCount} reseñas)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {provider.city}, {provider.state}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            8+ años de exp.
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {provider.categories.map((cat: any) => (
                                            <Badge key={cat.id} variant="outline" className="border-blue-200 text-blue-600 bg-blue-50/50">
                                                {cat.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Precio por hora</p>
                                    <p className="text-4xl font-black text-slate-900">${provider.hourlyRate}</p>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            <div className="prose prose-slate max-w-none">
                                <h3 className="text-xl font-bold mb-4">Sobre mí</h3>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {provider.bio || "Este profesional aún no ha añadido una descripción."}
                                </p>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-2xl font-black text-slate-900 mb-8">Opiniones de clientes</h3>
                            <div className="space-y-8">
                                {provider.reviews.length > 0 ? (
                                    provider.reviews.map((review: any) => (
                                        <div key={review.id} className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={review.author.image || ""} />
                                                    <AvatarFallback>{review.author.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-bold text-slate-900">{review.author.name}</p>
                                                    <div className="flex items-center text-yellow-600 text-sm">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-slate-400 ml-auto">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-sm italic">"{review.comment}"</p>
                                            <Separator className="pt-4" />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 italic">No hay reseñas para este profesional todavía.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 sticky top-24">
                            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" /> Agenda tu servicio
                            </h3>
                            <BookingForm providerId={provider.id} hourlyRate={provider.hourlyRate ?? 0} />
                        </div>

                        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg">
                            <h4 className="font-bold mb-2 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-2" /> Garantía OficioYa
                            </h4>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                Si no estás satisfecho con el trabajo, te devolvemos tu dinero o enviamos a otro experto sin costo.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
