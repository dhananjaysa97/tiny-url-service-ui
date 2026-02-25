import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shortenUrl, deleteUrl } from '../../services/urlService';
import { useUrlServiceManager } from '../useUrlServiceManager';
import type { TinyUrlMapping } from '../../types/types';


vi.mock('../../services/urlService', () => ({
  shortenUrl: vi.fn(),
  deleteUrl: vi.fn(),
}));

describe('useUrlServiceManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new tiny URL and update the list', async () => {
    
    const mockMapping: TinyUrlMapping = { 
    tinyUrlCode: 'abc12',
    tinyUrl: 'http://localhost:3000/abc12', 
    createdAt: new Date().toISOString()     
  };
    
    vi.mocked(shortenUrl).mockResolvedValue(mockMapping);

    const { result } = renderHook(() => useUrlServiceManager());

    await act(async () => {
      await result.current.handleCreate('https://test.com', 'custom');
    });

    expect(shortenUrl).toHaveBeenCalledWith({ longUrl: 'https://test.com', customCode: 'custom' });
    expect(result.current.tinyUrls).toContainEqual(mockMapping);
  });

  it('should delete a URL and update the list', async () => {
    vi.mocked(deleteUrl).mockResolvedValue(undefined);

    const { result } = renderHook(() => useUrlServiceManager());

    await act(async () => {
      await result.current.handleDelete('abc12');
    });

    expect(deleteUrl).toHaveBeenCalledWith('abc12');
  });
});