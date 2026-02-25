import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUrlServiceManager } from '../../hooks/useUrlServiceManager';
import UrlServiceView from '../UrlServiceView';
vi.mock('../../hooks/useUrlServiceManager');

describe('UrlServiceView', () => {
  it('renders the main dashboard title', () => {
    vi.mocked(useUrlServiceManager).mockReturnValue({
      tinyUrls: [],
      handleCreate: vi.fn(),
      handleDelete: vi.fn(),
    });

    render(<UrlServiceView />);
    expect(screen.getByText('Tiny URL Service')).toBeInTheDocument();
  });
});