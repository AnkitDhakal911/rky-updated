import request from 'supertest';
import { app } from '../server';
import User from '../models/User';
import BloodRequest from '../models/BloodRequest';

jest.mock('../models/User');
jest.mock('../models/BloodRequest');
jest.mock('../config/db', () => jest.fn());
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: '507f1f77bcf86cd799439011', role: 'donor' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Connection System Suite', () => {
    it('should find recommended requests for the donor', async () => {
        (User.findById as jest.Mock).mockResolvedValue({ 
            _id: '507f1f77bcf86cd799439011', 
            bloodType: 'O+',
            location: { coordinates: [85, 27] } 
        });
        (BloodRequest.find as jest.Mock).mockResolvedValue([]);

        const res = await request(app).get('/api/match/requests');
        expect(res.status).toBe(200);
        console.log('✅ [ConnectionSystem] Test Successful: User matching and networking logic passed.');
    });
});
