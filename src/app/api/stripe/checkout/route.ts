import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        const body = await req.json();
        const { tier } = body;

        if (!userId || !user) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        // Get the provider profile
        const providerProfile = await db.providerProfile.findUnique({
            where: { userId },
        });

        if (!providerProfile) {
            return new NextResponse("Perfil de proveedor no encontrado", { status: 404 });
        }

        // Check if user already has a customer ID
        let stripeCustomerId = providerProfile.stripeCustomerId;

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
                metadata: {
                    userId,
                },
            });
            stripeCustomerId = customer.id;

            await db.providerProfile.update({
                where: { userId },
                data: { stripeCustomerId },
            });
        }

        // Define price IDs
        const priceIds: Record<string, string> = {
            BASIC: "price_1TFpmKRoipgaMXoRtjC6cuOs",
            PRO: "price_1TFpntRoipgaMXoRoJAcnv5B",
        };

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            line_items: [
                {
                    price: priceIds[tier],
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/provider?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=1`,
            metadata: {
                userId,
                tier,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.log("[STRIPE_CHECKOUT]", error);
        return new NextResponse("Error interno del servidor", { status: 500 });
    }
}
