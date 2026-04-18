import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { useAuth } from '@/context/AuthContext';

jest.mock('@/context/AuthContext');

jest.mock('framer-motion', () => ({
    motion: { div: ({ children, ...props }: any) => <div {...props}>{children}</div> },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Login Component', () => {
    it('should login with valid credentials', async () => {
        const mockLogin = jest.fn();
        (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

        render(<MemoryRouter><LoginPage /></MemoryRouter>);

        fireEvent.change(screen.getByLabelText(/EMAIL ADDRESS/i), { target: { value: 'user@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/PASSWORD/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('user@gmail.com', 'password123'));
        console.log('✅ [LoginComponent] Test Successful: User authentication UI verified.');
    });
});
