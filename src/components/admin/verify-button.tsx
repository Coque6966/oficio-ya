"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCheck, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface VerifyButtonProps {
    providerId: string;
    isVerified: boolean;
}

export const VerifyButton = ({ providerId, isVerified }: VerifyButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onVerify = async () => {
        try {
            setLoading(true);
            await axios.patch("/api/admin/verify-provider", {
                providerId,
                isVerified: !isVerified
            });
            toast.success(isVerified ? "Verificación removida" : "Experto aprobado exitosamente");
            router.refresh();
        } catch (error) {
            toast.error("Algo salió mal");
        } finally {
            setLoading(false);
        }
    };

    if (isVerified) return null;

    return (
        <Button
            disabled={loading}
            onClick={onVerify}
            size="sm"
            className="bg-blue-600 hover:bg-blue-800 h-8 text-[10px] font-bold rounded-lg px-4 transition-all"
        >
            {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
                <>
                    <UserCheck className="w-3.5 h-3.5 mr-2" /> Aprobar
                </>
            )}
        </Button>
    );
};
