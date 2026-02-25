import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { TinyUrlMapping } from '../../types/types';
import { UrlListView } from '../UrlListView';

const mockItems: TinyUrlMapping[] = [
  { 
    tinyUrlCode: 'xyz789', 
    tinyUrl: 'http://localhost:5243/xyz789', 
    createdAt: new Date().toISOString() 
  }
];

describe('UrlListView', () => {
  it('calls onDelete with the correct code when delete is clicked', () => {
    const mockDelete = vi.fn();
    render(<UrlListView items={mockItems} onDelete={mockDelete} onViewStats={() => {}} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith('xyz789');
  });
});