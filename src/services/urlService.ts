import { CONFIG } from "../config/config";
import type { CreateUrlRequest, TinyUrlMapping, UrlDetails } from "../types/types";

const API_BASE = CONFIG.API_BASE_URL;

export const shortenUrl = async (data: CreateUrlRequest): Promise<TinyUrlMapping> => {
    const resp = await fetch(`${API_BASE}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!resp.ok) {
        const err = await resp.json().catch(() => ({ message: "Server error" }));
        throw new Error(err.message || "Failed to shorten URL");
    }

    return resp.json();
}

export const getUrlDetails = async (code: string): Promise<UrlDetails> => {
    const resp = await fetch(`${API_BASE}/${code}/details`);
    
    if (!resp.ok) {
        throw new Error("Failed to get details");
    }

    return resp.json();
}

export const deleteUrl = async (code: string): Promise<void> => {
    const resp = await fetch(`${API_BASE}/${code}`, {
        method: 'DELETE'
    });

    if (!resp.ok) {
        throw new Error("Failed to delete link");
    }

    return; 
}