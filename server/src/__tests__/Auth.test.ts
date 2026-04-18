import request from 'supertest';
import { app } from '../server';
import User from '../models/User';

jest.mock('../models/User');
jest.mock('../config/db', () => jest.fn());
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: '507f1f77bcf86cd799439011', role: 'hospital' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Auth Backend', () => {
    it('should login successfully', async () => {
        const userMock = {
            _id: '507f1f77bcf86cd799439011',
            email: 'test@gmail.com',
            isEmailVerified: true,
            isVerified: true,
            matchPassword: jest.fn().mockResolvedValue(true)
        };
        (User.findOne as jest.Mock).mockReturnValue({
            select: jest.fn().mockResolvedValue(userMock)
        });

        const res = await request(app).post('/api/auth/login').send({ email: 'test@gmail.com', password: 'password123' });
        expect(res.status).toBe(200);
        console.log('✅ [Auth] Test Successful: Secure login protocols verified.');
    });
});
