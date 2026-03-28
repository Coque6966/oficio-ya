import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { syncUser } from "@/lib/sync-user";

import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        if (!rateLimit(ip, 10)) {
            return new NextResponse("Demasiadas solicitudes", { status: 429 });
        }
        const { userId } = await auth();
        const body = await req.json();
        const { providerId, date, time, notes, state, address, zipCode, latitude, longitude } = body;

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        if (!providerId || !date || !time || !address || !state || !zipCode) {
            return new NextResponse("Faltan datos de ubicación o fecha", { status: 400 });
        }

        // Sync user to ensure client exists in Prisma
        await syncUser();

        // Check lead limits
        const providerProfile = await db.providerProfile.findUnique({
            where: { userId: providerId },
        });

        if (!providerProfile) {
            return new NextResponse("Proveedor no encontrado", { status: 404 });
        }

        const tier = providerProfile.subscriptionTier;
        const bookingCount = await db.booking.count({
            where: { providerId: providerId },
        });

        // 2 free leads (NONE), 7 for BASIC (2 free + 5 paid), unlimited for PRO
        const limits: Record<string, number> = {
            "NONE": 2,
            "BASIC": 7,
            "PRO": Infinity,
        };

        if (bookingCount >= (limits[tier] || 2)) {
            return new NextResponse("Límite de leads alcanzado. Por favor, mejora tu plan.", { status: 403 });
        }

        const booking = await db.booking.create({
            data: {
                clientId: userId,
                providerId: providerId,
                scheduledDate: new Date(date),
                startTime: time,
                notes: notes,
                state: state,
                address: address,
                zipCode: zipCode,
                latitude: latitude,
                longitude: longitude,
                status: "PENDING",
            },
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.log("[BOOKINGS_POST]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
}
