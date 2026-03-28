import { NextResponse } from "next/server";

// Simple in-memory rate limiter (for production, use Redis/Upstash)
const rateLimitMap = new Map();

export function rateLimit(ip: string, limit: number = 20, windowMs: number = 60000) {
    const now = Date.now();
    const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userData.lastReset > windowMs) {
        userData.count = 1;
        userData.lastReset = now;
    } else {
        userData.count++;
    }

    rateLimitMap.set(ip, userData);

    if (userData.count > limit) {
        return false;
    }
    return true;
}
