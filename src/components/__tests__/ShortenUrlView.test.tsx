import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ShortenUrlView } from '../ShortenUrlView';

describe('ShortenUrlView', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updates input values on change', async () => {
    const user = userEvent.setup();
    render(<ShortenUrlView onCreate={vi.fn()} />);
    
    const urlInput = screen.getByPlaceholderText('https://example.com');
    
    await user.type(urlInput, 'https://test.com');
    
    expect(urlInput).toHaveValue('https://test.com');
  });

  it('marks input as invalid for URLs missing protocol', () => {
  render(<ShortenUrlView onCreate={vi.fn()} />);
  
  const urlInput = screen.getByPlaceholderText('https://example.com') as HTMLInputElement;
  
  fireEvent.change(urlInput, { target: { value: 'google.com' } });

  expect(urlInput.checkValidity()).toBe(false);
  
  expect(urlInput.validity.typeMismatch).toBe(true);
});

it('marks input as valid for correct URLs', () => {
  render(<ShortenUrlView onCreate={vi.fn()} />);
  
  const urlInput = screen.getByPlaceholderText('https://example.com') as HTMLInputElement;
  
  fireEvent.change(urlInput, { target: { value: 'https://google.com' } });

  expect(urlInput.checkValidity()).toBe(true);
});

 
});