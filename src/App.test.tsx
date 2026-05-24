import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import App from './App';

describe('App', () => {
  it('renders the BetterYourAds workflow shell', () => {
    render(<App />);
    expect(screen.getByText('BetterYourAds')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze business context/i })).toBeInTheDocument();
  });

  it('runs the sample flow through export', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /use sample saas input/i }));
    await user.click(screen.getByRole('button', { name: /analyze business context/i }));
    expect(screen.getByText(/Northstar Ops helps/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /generate concepts/i }));
    expect(screen.getAllByRole('button', { name: /select concept/i })).toHaveLength(6);
    await user.click(screen.getAllByRole('button', { name: /select concept/i })[0]);
    await user.click(screen.getAllByRole('button', { name: /select concept/i })[0]);
    await user.click(screen.getAllByRole('button', { name: /select concept/i })[0]);
    await user.click(screen.getByRole('button', { name: /create static ads/i }));
    expect(screen.getByText(/Static Meta ad directions/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /prepare export/i }));
    expect(screen.getByText(/Copy the brief, concepts, and creative specs/i)).toBeInTheDocument();
  });
});
