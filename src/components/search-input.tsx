"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import qs from "query-string";

export const SearchInput = ({ defaultValue = "" }: { defaultValue?: string }) => {
    const [value, setValue] = useState(defaultValue);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const query = {
            q: value,
            category: searchParams.get("category"),
        };

        const url = qs.stringifyUrl({
            url: window.location.pathname,
            query: query,
        }, { skipEmptyString: true, skipNull: true });

        const timeout = setTimeout(() => {
            router.push(url);
        }, 500);

        return () => clearTimeout(timeout);
    }, [value, router, searchParams]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Busca plomeros, electricistas, pintores..."
                className="pl-10 h-10 border-slate-200 focus-visible:ring-blue-500"
            />
        </div>
    );
};
