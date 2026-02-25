export interface TinyUrlMapping {
    tinyUrlCode: string,
    tinyUrl: string,
    createdAt: string
}

export interface UrlDetails extends TinyUrlMapping {
    longUrl: string,
    clicks: number
}

export interface CreateUrlRequest {
    longUrl: string,
    customCode?: string
}

