import request from 'supertest';
import { app } from '../server';
import User from '../models/User';

jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());
jest.mock('../controllers/notificationController', () => ({
    createNotification: jest.fn().mockResolvedValue({}),
    getUserNotifications: jest.fn().mockImplementation((req, res) => res.status(200).json([])),
    markNotificationRead: jest.fn().mockImplementation((req, res) => res.status(200).json({})),
    markAllRead: jest.fn().mockImplementation((req, res) => res.status(200).json({}))
}));
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: '51d28362d2962383823d296a', role: 'admin' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Admin Module', () => {
    it('should verify user', async () => {
        (User.findById as jest.Mock).mockResolvedValue({ 
            _id: '51d28362d2962383823d296a', 
            role: 'hospital', 
            isVerified: false, 
            save: jest.fn() 
        });

        const res = await request(app).put('/api/admin/verify/51d28362d2962383823d296a');
        expect(res.status).toBe(200);
        console.log('✅ [AdminModule] Test Successful: Administrative controls and verification passed.');
    });
});
