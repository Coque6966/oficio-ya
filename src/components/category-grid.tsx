"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
    categories: any[];
}

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onClick = (slug: string) => {
        const current = qs.parse(searchParams.toString());
        const query = {
            ...current,
            category: slug,
        };
        const url = qs.stringifyUrl({
            url: "/search",
            query,
        }, { skipNull: true });
        router.push(url);
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
                // @ts-ignore
                const Icon = Icons[category.icon || "Wrench"];
                return (
                    <Card
                        key={category.id}
                        className="group cursor-pointer hover:border-blue-500 hover:shadow-md transition-all border-border bg-card"
                        onClick={() => onClick(category.slug)}
                    >
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                            <div className="p-3 rounded-2xl bg-blue-500/10 group-hover:bg-blue-600 transition-colors">
                                {Icon && <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />}
                            </div>
                            <span className="font-bold text-foreground text-sm">{category.name}</span>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
