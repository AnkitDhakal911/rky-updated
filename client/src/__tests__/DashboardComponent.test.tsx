import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import { useAuth } from '@/context/AuthContext';
import api from '@/config/api';
import { useSocket } from '@/context/SocketContext';

jest.mock('@/context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@/config/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

jest.mock('@/context/SocketContext', () => ({
    useSocket: jest.fn(),
}));

// Simple mock that avoids complex object literals in the mock factory
jest.mock('framer-motion', () => {
  const React = require('react');
  const Component = ({ children }: any) => React.createElement('div', {}, children);
  return {
    motion: {
      div: Component,
      main: Component,
      section: Component,
      h1: Component,
      span: Component,
    },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, {}, children),
  };
});

describe('Dashboard Component', () => {
    it('should display the user greeting', async () => {
        // Mock Auth State
        (useAuth as jest.Mock).mockReturnValue({
            user: { _id: 'user123', name: 'John Doe', role: 'donor', location: { address: 'KTM' }, bloodType: 'A+' },
            loading: false
        });

        // Mock Socket
        (useSocket as jest.Mock).mockReturnValue({ socket: null });

        // Mock API Responses for all endpoints hit by DonorDashboard
        (api.get as jest.Mock).mockImplementation((url) => {
            if (url === '/requests/nearby') return Promise.resolve({ data: { success: true, data: [] } });
            if (url === '/requests/history') return Promise.resolve({ data: { success: true, data: [] } });
            if (url === '/connections/pending') return Promise.resolve({ data: { success: true, data: [] } });
            return Promise.resolve({ data: { success: true, data: [] } });
        });

        render(
            <MemoryRouter>
                <DashboardPage />
            </MemoryRouter>
        );

        // waitFor ensures that the async useEffect hooks finish and state updates
        // are processed inside the testing 'act' boundary.
        await waitFor(() => {
            const elements = screen.getAllByText(/John Doe/i);
            expect(elements.length).toBeGreaterThan(0);
        });

        console.log('✅ [DashboardComponent] Test Successful: User widgets and personalized dashboard mounted.');
    });
});
