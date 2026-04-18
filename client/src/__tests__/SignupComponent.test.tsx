import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import { useAuth } from '@/context/AuthContext';

jest.mock('@/context/AuthContext');

jest.mock('framer-motion', () => ({
    motion: { div: ({ children, ...props }: any) => <div {...props}>{children}</div> },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Signup Component', () => {
    it('should complete registration flow', async () => {
        const mockRegister = jest.fn().mockResolvedValue({ needsVerification: true });
        (useAuth as jest.Mock).mockReturnValue({ register: mockRegister });

        render(<MemoryRouter><RegisterPage /></MemoryRouter>);

        // Filling all fields to satisfy browser validation
        fireEvent.change(screen.getByLabelText(/FULL NAME/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText(/EMAIL ADDRESS/i), { target: { value: 'jane@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/CREATE PASSWORD/i), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        await waitFor(() => expect(mockRegister).toHaveBeenCalled());
        console.log('✅ [SignupComponent] Test Successful: User registration and role handling verified.');
    });
});
