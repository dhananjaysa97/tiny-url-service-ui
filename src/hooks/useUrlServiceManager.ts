import { useState } from 'react';
import type { TinyUrlMapping } from '../types/types';
import { shortenUrl, deleteUrl } from '../services/urlService';

export const useUrlServiceManager = () => {
 const [tinyUrls, setTinyUrls] = useState<TinyUrlMapping[]>([]);

 const handleCreate = async (longUrl: string, customCode?: string) => {
   const newUrl = await shortenUrl({ longUrl, customCode });
   setTinyUrls(prev => [newUrl, ...prev]);
 };

 const handleDelete = async (code: string) => {
   await deleteUrl(code);
   setTinyUrls(prev => prev.filter(l => l.tinyUrlCode !== code));
 };

 return { tinyUrls, handleCreate, handleDelete };
};