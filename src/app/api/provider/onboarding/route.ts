import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { syncUser } from "@/lib/sync-user";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { bio, hourlyRate, city, latitude, longitude } = body;

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const safeParseRate = (val: any) => { const n = parseFloat(val); return isNaN(n) ? 0 : n; };
        const safeParseCoord = (val: any, def: number) => { const n = parseFloat(val); return isNaN(n) ? def : n; };

        const safeRate = safeParseRate(hourlyRate);
        const safeLat = safeParseCoord(latitude, 19.4326);
        const safeLng = safeParseCoord(longitude, -99.1332);

        // Sync user to ensure it exists in Prisma before updating
        await syncUser();

        // Update user role to PROVIDER
        await db.user.update({
            where: { id: userId },
            data: { role: "PROVIDER" }
        });

        // Create or update provider profile (safe from NaN Database crashes)
        const profile = await db.providerProfile.upsert({
            where: { userId },
            update: {
                bio: bio || null,
                hourlyRate: safeRate,
                city: city || "Local",
                latitude: safeLat,
                longitude: safeLng,
            },
            create: {
                userId,
                bio: bio || null,
                hourlyRate: safeRate,
                city: city || "Local",
                latitude: safeLat,
                longitude: safeLng,
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.log("[PROVIDER_ONBOARDING_POST]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
}
