import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder which are missing in JSDOM
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock SocketContext to avoid import.meta errors
jest.mock('@/context/SocketContext', () => ({
  useSocket: () => ({
    socket: null,
    connected: false,
    notifications: [],
    markAsRead: jest.fn(),
  }),
  SocketProvider: ({ children }: any) => children,
}));

// Mock Import Meta for Vite
(global as any).import = {
  meta: {
    env: {
      VITE_API_URL: 'http://localhost:5000/api'
    }
  }
};
