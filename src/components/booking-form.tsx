"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    date: z.date({
        message: "Selecciona una fecha.",
    }),
    time: z.string({
        message: "Selecciona una hora.",
    }),
    notes: z.string().optional(),
});

interface BookingFormProps {
    providerId: string;
    hourlyRate: number;
}

const TIME_SLOTS = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
];

export const BookingForm = ({ providerId, hourlyRate }: BookingFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/bookings", {
                ...values,
                providerId,
            });

            toast.success("¡Reserva solicitada con éxito!");
            router.push("/dashboard/client/bookings");
        } catch (error) {
            toast.error("Algo salió mal. Intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedDate = form.watch("date");

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Fecha del servicio</label>
                <Popover>
                    <PopoverTrigger
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-full justify-start text-left font-normal border-slate-200 h-10",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Elegir día"}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => form.setValue("date", date!)}
                            initialFocus
                            locale={es}
                            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Horario de inicio</label>
                <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => (
                        <Button
                            key={slot}
                            type="button"
                            variant={form.watch("time") === slot ? "secondary" : "outline"}
                            className={cn(
                                "h-9 text-xs border-slate-200",
                                form.watch("time") === slot && "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                            )}
                            onClick={() => form.setValue("time", slot)}
                        >
                            {slot}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Reserva mínima (1hr)</p>
                    <p className="text-2xl font-black text-slate-900">${hourlyRate}</p>
                </div>
                <Button
                    type="submit"
                    disabled={isLoading || !form.watch("date") || !form.watch("time")}
                    className="bg-blue-600 hover:bg-blue-700 font-bold px-8"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Agendar Ahora"}
                </Button>
            </div>

            <p className="text-[10px] text-slate-400 text-center uppercase tracking-tight">
                No se te cobrará nada hasta que se confirme el servicio.
            </p>
        </form>
    );
};
