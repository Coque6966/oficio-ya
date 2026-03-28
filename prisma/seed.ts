import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
    try {
        const categories = [
            { name: "Plomería", slug: "plomeria", icon: "Droplets" },
            { name: "Electricidad", slug: "electricidad", icon: "Zap" },
            { name: "Limpieza", slug: "limpieza", icon: "Sparkles" },
            { name: "Carpintería", slug: "carpinteria", icon: "Hammer" },
            { name: "Pintura", slug: "pintura", icon: "Paintbrush" },
            { name: "Jardinería", slug: "jardineria", icon: "Leaf" },
            { name: "Cerrajería", slug: "cerrajeria", icon: "Key" },
            { name: "Mudanzas", slug: "mudanzas", icon: "Truck" },
            { name: "Fumigación", slug: "fumigacion", icon: "Bug" },
            { name: "Mecánica", slug: "mecanica", icon: "Wrench" },
            { name: "Albañilería", slug: "albanileria", icon: "BrickWall" },
            { name: "Niñera", slug: "ninera", icon: "Baby" },
        ];

        console.log("Seeding categories...");
        for (const category of categories) {
            await database.serviceCategory.upsert({
                where: { slug: category.slug },
                update: {},
                create: category,
            });
        }

        const providersData = [
            { name: "Juan Pérez", email: "juan@plomero.com", cat: "plomeria", bio: "Experto en fugas y drenajes. 15 años de experiencia.", rate: 350, city: "CDMX" },
            { name: "María García", email: "maria@electrica.com", cat: "electricidad", bio: "Instalaciones eléctricas seguras y profesionales.", rate: 450, city: "Guadalajara" },
            { name: "Roberto Sánchez", email: "roberto@limpieza.com", cat: "limpieza", bio: "Limpieza profunda de alfombras y tapicería.", rate: 200, city: "Monterrey" },
            { name: "Carlos Ruiz", email: "carlos@carpintero.com", cat: "carpinteria", bio: "Diseño y reparación de muebles a medida.", rate: 500, city: "Puebla" },
            { name: "Sofía Torres", email: "sofia@pintora.com", cat: "pintura", bio: "Pintura decorativa e impermeabilización.", rate: 300, city: "Querétaro" },
            { name: "Luis Mendoza", email: "luis@jardinero.com", cat: "jardineria", bio: "Diseño de paisajes y mantenimiento de jardines.", rate: 250, city: "Mérida" },
            { name: "Ana López", email: "ana@cerrajera.com", cat: "cerrajeria", bio: "Apertura de chapas y duplicado de llaves 24/7.", rate: 400, city: "Cancún" },
            { name: "Miguel Ángel", email: "miguel@mudanzas.com", cat: "mudanzas", bio: "Mudanzas locales y nacionales con seguro.", rate: 800, city: "Toluca" },
            { name: "Pedro Ramos", email: "pedro@fumigador.com", cat: "fumigacion", bio: "Control de plagas certificado y sin olor.", rate: 600, city: "Tijuana" },
            { name: "Jorge Herrera", email: "jorge@mecanico.com", cat: "mecanica", bio: "Mecánica general y afinación a domicilio.", rate: 550, city: "Leon" },
            { name: "Elena Vaca", email: "elena@albanil.com", cat: "albanileria", bio: "Construcción y remodelación garantizada.", rate: 700, city: "Veracruz" },
            { name: "Lucía Martínez", email: "lucia@ninera.com", cat: "ninera", bio: "Cuidado infantil con formación en primeros auxilios.", rate: 180, city: "Morelia" },
        ];

        console.log("Seeding comprehensive providers list...");
        for (const p of providersData) {
            const user = await database.user.upsert({
                where: { email: p.email },
                update: {},
                create: {
                    name: p.name,
                    email: p.email,
                    role: "PROVIDER",
                }
            });

            await database.providerProfile.upsert({
                where: { userId: user.id },
                update: {
                    isVerified: true,
                    rating: 4.5 + Math.random() * 0.5,
                    reviewCount: Math.floor(Math.random() * 50) + 5,
                },
                create: {
                    userId: user.id,
                    bio: p.bio,
                    hourlyRate: p.rate,
                    isVerified: true,
                    city: p.city,
                    state: "Estado",
                    latitude: 19.4326 + (Math.random() - 0.5) * 0.1,
                    longitude: -99.1332 + (Math.random() - 0.5) * 0.1,
                    rating: 4.5 + Math.random() * 0.5,
                    reviewCount: Math.floor(Math.random() * 50) + 5,
                    categories: {
                        connect: [{ slug: p.cat }]
                    }
                }
            });
        }

        console.log("Success: Full platform seeded with 12 providers");
    } catch (error) {
        console.error("Error seeding:", error);
    } finally {
        await database.$disconnect();
    }
}

main();
