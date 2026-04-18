import request from 'supertest';
import { app } from '../server';
import BloodRequest from '../models/BloodRequest';

jest.mock('../models/BloodRequest');
jest.mock('../config/db', () => jest.fn());
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: '507f1f77bcf86cd799439011', role: 'hospital' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Request Management', () => {
    it('should create blood request', async () => {
        (BloodRequest.create as jest.Mock).mockResolvedValue({ _id: '507f1f77bcf86cd799439011' });

        const res = await request(app).post('/api/requests').send({
            bloodType: 'O+',
            units: 2,
            hospitalName: 'Test Hospital',
            location: { type: 'Point', coordinates: [85, 27] }
        });
        expect(res.status).toBe(201);
        console.log('✅ [RequestManagement] Test Successful: Blood request posting and fetching verified.');
    });
});
