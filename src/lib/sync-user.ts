import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function syncUser() {
    try {
        const { userId } = await auth();
        if (!userId) return null;

        const user = await currentUser();
        if (!user) return null;

        return await db.user.upsert({
            where: { id: userId },
            update: {},
            create: {
                id: userId,
                email: user.emailAddresses[0]?.emailAddress || `${userId}@oficioya.app`,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario',
                role: "CLIENT",
            }
        });
    } catch (error) {
        console.error("[SYNC_USER_ERROR]", error);
        return null;
    }
}
