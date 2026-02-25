import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shortenUrl, getUrlDetails, deleteUrl } from '../urlService';
import { CONFIG } from '../../config/config';

describe('urlService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('shortenUrl', () => {
    it('returns a TinyUrlMapping on successful POST', async () => {
      const mockMapping = { 
        tinyUrlCode: 'abc123', 
        tinyUrl: 'http://loc/abc123', 
        createdAt: new Date().toISOString() 
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockMapping,
      } as Response);

      const result = await shortenUrl({ longUrl: 'https://google.com' });

      expect(fetch).toHaveBeenCalledWith(
        `${CONFIG.API_BASE_URL}/shorten`,
        expect.objectContaining({ method: 'POST' })
      );
      expect(result).toEqual(mockMapping);
    });

    it('throws a specific error message if the backend returns an error', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Short code exists!" }),
      } as Response);

      await expect(shortenUrl({ longUrl: '...', customCode: 'taken' }))
        .rejects.toThrow("Short code exists!");
    });
  });

  describe('getUrlDetails', () => {
    it('calls the correct details endpoint', async () => {
      const mockDetails = {
        tinyUrlCode: 'abc123',
        tinyUrl: '...',
        longUrl: 'https://apple.com',
        clicks: 5,
        createdAt: new Date().toISOString()
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockDetails,
      } as Response);

      const result = await getUrlDetails('abc123');

      expect(fetch).toHaveBeenCalledWith(`${CONFIG.API_BASE_URL}/abc123/details`);
      expect(result.clicks).toBe(5);
    });
  });

  describe('deleteUrl', () => {
    it('resolves on successful 200/204 response', async () => {
      vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);

      await expect(deleteUrl('abc123')).resolves.toBeUndefined();
      expect(fetch).toHaveBeenCalledWith(
        `${CONFIG.API_BASE_URL}/abc123`,
        expect.objectContaining({ method: 'DELETE' })
      );
    });

    it('throws error when delete fails', async () => {
      vi.mocked(fetch).mockResolvedValue({ ok: false } as Response);

      await expect(deleteUrl('abc123')).rejects.toThrow("Failed to delete link");
    });
  });
});