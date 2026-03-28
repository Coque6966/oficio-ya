"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Logo Animation */}
                        <div className="text-6xl font-black text-white italic tracking-tighter mb-4 flex items-center">
                            Oficio<span className="text-blue-600">Ya</span>
                        </div>

                        {/* Loading Bar */}
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden absolute -bottom-8 left-1/2 -translate-x-1/2">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full bg-blue-600"
                            />
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="absolute bottom-12 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold"
                    >
                        Servicios para tu hogar al instante
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
