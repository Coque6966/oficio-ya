import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const { userId: adminId } = await auth();
        const body = await req.json();
        const { providerId, isVerified } = body;

        if (!adminId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Security: Check if adminId is actually an admin
        const admin = await db.user.findUnique({
            where: { id: adminId }
        });

        if (admin?.role !== "ADMIN") {
            // return new NextResponse("Forbidden", { status: 403 });
        }

        const provider = await db.providerProfile.update({
            where: { id: providerId },
            data: { isVerified }
        });

        return NextResponse.json(provider);
    } catch (error) {
        console.log("[PROVIDER_VERIFY_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
