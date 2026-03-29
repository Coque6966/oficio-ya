import { Navbar } from "@/components/navbar";
import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { CategoryFilters } from "@/components/category-filters";
import { ProviderCard } from "@/components/provider-card";
import { CategoryGrid } from "@/components/category-grid";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        category?: string;
        lat?: string;
        lng?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, category, lat, lng } = await searchParams;
    const query = q || "";
    const categorySlug = category || "";
    const userLat = lat ? parseFloat(lat) : undefined;
    const userLng = lng ? parseFloat(lng) : undefined;

    // Fetch providers with filters
    const providers = await db.providerProfile.findMany({
        where: {
            isVerified: true,
            ...(categorySlug && {
                categories: {
                    some: {
                        slug: categorySlug,
                    },
                },
            }),
            ...(query && {
                OR: [
                    {
                        user: {
                            name: {
                                contains: query,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        bio: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        },
        include: {
            user: true,
            categories: true,
        },
    });

    const categories = await db.serviceCategory.findMany();

    // Advanced Ranking Algorithm: Priority 1 (Premium Tier), Priority 2 (Distance), Priority 3 (Stars)
    // Formula Haversine implementation
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const p = 0.017453292519943295;
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    };

    const tierPriority: Record<string, number> = { PRO: 3, BASIC: 2, NONE: 1 };

    providers.sort((a: any, b: any) => {
        // Priority 1: Subscription Tier (PRO > BASIC > NONE) // Los VIP van primero
        const tierDiff = (tierPriority[b.subscriptionTier] || 1) - (tierPriority[a.subscriptionTier] || 1);
        if (tierDiff !== 0) return tierDiff;

        // Priority 2: Geographic Proximity (if location provided) // Los mas cerca
        if (userLat !== undefined && userLng !== undefined && a.latitude && a.longitude && b.latitude && b.longitude) {
            const distA = getDistance(userLat, userLng, a.latitude, a.longitude);
            const distB = getDistance(userLat, userLng, b.latitude, b.longitude);
            // If the difference in distance is significant (e.g., > 15 km), prioritize distance over stars
            if (Math.abs(distA - distB) > 15) {
                return distA - distB;
            }
        }

        // Priority 3: Ratings // Los mejor calificados
        return b.rating - a.rating;
    });

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                <div className="flex flex-col md:row gap-8">
                    {/* Sidebar Filters - Hidden in 'Explore' mode for a cleaner look */}
                    {(categorySlug || query) && (
                        <aside className="w-full md:w-64 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                            <CategoryFilters
                                categories={categories}
                                activeCategory={categorySlug}
                            />
                        </aside>
                    )}

                    {/* Search Results */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-card p-4 rounded-xl shadow-sm border border-border">
                            <SearchInput defaultValue={query} />
                        </div>

                        {!categorySlug && !query && (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2 text-center mb-10">
                                    <h2 className="text-4xl md:text-5xl font-black text-foreground italic tracking-tighter uppercase leading-none">
                                        Explora nuestros <span className="text-blue-600">Servicios</span>
                                    </h2>
                                    <p className="text-muted-foreground text-lg">Encuentra al profesional perfecto para tu hogar con un solo clic.</p>
                                </div>
                                <div className="max-w-5xl mx-auto">
                                    <CategoryGrid categories={categories} />
                                </div>
                            </div>
                        )}

                        {(categorySlug || query) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {providers.length > 0 ? (
                                    providers.map((provider: any) => (
                                        <ProviderCard key={provider.id} provider={provider} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center bg-card rounded-3xl border border-dashed border-border">
                                        <p className="text-muted-foreground text-lg">No se encontraron profesionales con esos criterios.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
