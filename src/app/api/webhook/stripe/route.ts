import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Error de Webhook: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.userId) {
            return new NextResponse("Se requiere el ID de usuario", { status: 400 });
        }

        await db.providerProfile.update({
            where: {
                userId: session.metadata.userId,
            },
            data: {
                subscriptionTier: session.metadata.tier as any,
            },
        });

        await db.subscriptionRecord.create({
            data: {
                stripeSubId: subscription.id,
                tier: session.metadata.tier as any,
                status: subscription.status,
                currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
                providerProfileId: (await db.providerProfile.findUnique({
                    where: { userId: session.metadata.userId }
                }))!.id,
            },
        });
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        await db.subscriptionRecord.update({
            where: {
                stripeSubId: subscription.id,
            },
            data: {
                status: subscription.status,
                currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
