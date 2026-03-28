import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function makeAdmin(email: string) {
    try {
        await prisma.user.update({
            where: { email },
            data: { role: "ADMIN" },
        });
        console.log(`✅ Usuario ${email} ahora es ADMINISTRADOR.`);
    } catch (error: any) {
        console.error("❌ Error: Asegúrate de que el usuario ya se haya registrado en la app.");
        console.error(error.message);
    } finally {
        await prisma.$disconnect();
    }
}

const email = process.argv[2];
if (!email) {
    console.log("Uso: npx tsx src/scripts/make-admin.ts tu-email@ejemplo.com");
} else {
    makeAdmin(email);
}
