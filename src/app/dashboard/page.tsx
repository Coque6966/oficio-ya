import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "@/lib/sync-user";

export default async function DashboardRoot() {
    const { userId } = await auth();

    // Redirect unauthenticated users to home
    if (!userId) {
        redirect("/");
    }

    // Ensure user exists locally and get their role
    const user = await syncUser();

    if (user?.role === "PROVIDER") {
        redirect("/dashboard/provider");
    } else {
        redirect("/dashboard/client");
    }
}
