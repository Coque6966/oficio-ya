import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { bio, hourlyRate, city, latitude, longitude } = body;

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        // Update user role to PROVIDER
        await db.user.update({
            where: { id: userId },
            data: { role: "PROVIDER" }
        });

        // Create or update provider profile
        const profile = await db.providerProfile.upsert({
            where: { userId },
            update: {
                bio,
                hourlyRate: parseFloat(hourlyRate),
                city,
                latitude: parseFloat(latitude) || 19.4326,
                longitude: parseFloat(longitude) || -99.1332,
            },
            create: {
                userId,
                bio,
                hourlyRate: parseFloat(hourlyRate),
                city,
                latitude: parseFloat(latitude) || 19.4326,
                longitude: parseFloat(longitude) || -99.1332,
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.log("[PROVIDER_ONBOARDING_POST]", error);
        return new NextResponse("Error interno", { status: 500 });
    }
}
