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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
                // @ts-ignore
                const Icon = Icons[category.icon || "Wrench"];
                return (
                    <Card
                        key={category.id}
                        className="group cursor-pointer border-blue-500/10 bg-white shadow-xl shadow-blue-500/5 hover:bg-blue-600 hover:border-blue-500 hover:-translate-y-2 transition-all duration-500 rounded-[2rem] overflow-hidden relative"
                        onClick={() => onClick(category.slug)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-500" />
                        <CardContent className="p-10 flex flex-col items-center justify-center text-center space-y-4 relative z-10">
                            <div className="p-5 rounded-3xl bg-blue-50 group-hover:bg-white/20 transition-all duration-500 shadow-inner">
                                {Icon && <Icon className="w-10 h-10 text-blue-600 group-hover:text-white transition-all duration-500" />}
                            </div>
                            <span className="font-black text-slate-800 group-hover:text-white text-xs uppercase tracking-widest transition-colors duration-500">
                                {category.name}
                            </span>
                        </CardContent>
                        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-blue-500/5 group-hover:bg-white/10 rounded-full blur-2xl transition-all" />
                    </Card>
                );
            })}
        </div>
    );
};
