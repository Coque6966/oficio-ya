import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        if (!rateLimit(ip, 10)) {
            return new NextResponse("Too many requests", { status: 429 });
        }
        const { userId } = await auth();
        const body = await req.json();
        const { providerId, date, time, notes } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!providerId || !date || !time) {
            return new NextResponse("Missing data", { status: 400 });
        }

        // Check lead limits
        const providerProfile = await db.providerProfile.findUnique({
            where: { userId: providerId },
        });

        if (!providerProfile) {
            return new NextResponse("Provider not found", { status: 404 });
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
            return new NextResponse("Lead limit reached. Please upgrade your plan.", { status: 403 });
        }

        const booking = await db.booking.create({
            data: {
                clientId: userId,
                providerId: providerId,
                scheduledDate: new Date(date),
                startTime: time,
                notes: notes,
                status: "PENDING",
            },
        });

        return NextResponse.json(booking);
    } catch (error) {
        console.log("[BOOKINGS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
