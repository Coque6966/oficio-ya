import { Navbar } from "@/components/navbar";
import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { CategoryFilters } from "@/components/category-filters";
import { ProviderCard } from "@/components/provider-card";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        category?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, category } = await searchParams;
    const query = q || "";
    const categorySlug = category || "";

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

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                <div className="flex flex-col md:row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 space-y-8">
                        <CategoryFilters
                            categories={categories}
                            activeCategory={categorySlug}
                        />
                    </aside>

                    {/* Search Results */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <SearchInput defaultValue={query} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {providers.length > 0 ? (
                                providers.map((provider: any) => (
                                    <ProviderCard key={provider.id} provider={provider} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-slate-500 text-lg">No se encontraron profesionales con esos criterios.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
