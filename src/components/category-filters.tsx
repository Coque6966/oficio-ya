"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import * as Icons from "lucide-react";

interface CategoryFiltersProps {
    categories: any[];
    activeCategory?: string;
}

export const CategoryFilters = ({ categories, activeCategory }: CategoryFiltersProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClick = (slug: string | null) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            category: current.category === slug ? undefined : slug,
        };

        const url = qs.stringifyUrl({
            url: "/search",
            query,
        }, { skipNull: true });

        router.push(url);
    };

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Categorías</h3>
            <div className="flex flex-col gap-1">
                <Button
                    variant={!activeCategory ? "secondary" : "ghost"}
                    className="justify-start font-medium"
                    onClick={() => onClick(null)}
                >
                    Todos los servicios
                </Button>
                {categories.map((category) => {
                    // @ts-ignore
                    const Icon = Icons[category.icon || "Wrench"];
                    return (
                        <Button
                            key={category.id}
                            variant={activeCategory === category.slug ? "secondary" : "ghost"}
                            className="justify-start font-medium"
                            onClick={() => onClick(category.slug)}
                        >
                            <span className="mr-2 opacity-70">
                                {Icon && <Icon className="w-4 h-4" />}
                            </span>
                            {category.name}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};
