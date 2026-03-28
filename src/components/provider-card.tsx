"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ProviderCardProps {
    provider: any;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
    return (
        <Card className="hover:shadow-lg transition-shadow border-slate-200 overflow-hidden group">
            <CardContent className="p-5">
                <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border border-slate-100 shadow-sm">
                        <AvatarImage src={provider.user.image || ""} />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                            {provider.user.name?.charAt(0) || "P"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-900 truncate">{provider.user.name}</h3>
                            {provider.isVerified && (
                                <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            )}
                        </div>

                        <div className="flex items-center text-sm text-yellow-600 font-bold mb-2">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            {provider.rating.toFixed(1)}
                            <span className="text-slate-400 font-normal ml-1">({provider.reviewCount} reseñas)</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                            {provider.categories.map((cat: any) => (
                                <Badge key={cat.id} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none text-[10px]">
                                    {cat.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        {provider.city || "Ciudad de México"}, {provider.state || "CDMX"}
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        Disponible lun - sáb
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Desde</span>
                    <span className="text-lg font-black text-slate-900">${provider.hourlyRate || 250}/hr</span>
                </div>
                <Link href={`/profile/${provider.id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold">
                        Ver Perfil
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
