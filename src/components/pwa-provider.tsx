"use client";

import { useEffect } from "react";

export const PWAProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        if ("serviceWorker" in navigator && window.location.protocol === "https:") {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js").then(
                    (registration) => {
                        console.log("ServiceWorker registration successful with scope: ", registration.scope);
                    },
                    (err) => {
                        console.log("ServiceWorker registration failed: ", err);
                    }
                );
            });
        }
    }, []);

    return <>{children}</>;
};
