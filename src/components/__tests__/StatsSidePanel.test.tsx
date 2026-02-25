import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { UrlDetails } from '../../types/types';
import { StatsSidePanel } from '../StatsSidePanel';
import { getUrlDetails } from '../../services/urlService';

vi.mock('../../services/urlService', () => ({
  getUrlDetails: vi.fn()
}));

describe('StatsSidePanel', () => {
  it('renders all details from the UrlDetails interface', async () => {
    const mockDetails: UrlDetails = {
      tinyUrlCode: 'abc123',
      tinyUrl: 'http://localhost:5243/abc123',
      createdAt: new Date().toISOString(),
      longUrl: 'https://www.google.com',
      clicks: 15
    };

    vi.mocked(getUrlDetails).mockResolvedValue(mockDetails);

    render(<StatsSidePanel code="abc123" onClose={() => {}} />);

    // Verification of fields from StatsSidePanel.tsx
    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('https://www.google.com')).toBeInTheDocument();
      expect(screen.getByText('abc123')).toBeInTheDocument();
    });
  });
});