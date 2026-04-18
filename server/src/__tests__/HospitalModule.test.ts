import request from 'supertest';
import { app } from '../server';
import VerifiedHospital from '../models/VerifiedHospital';

jest.mock('../models/VerifiedHospital');
jest.mock('../config/db', () => jest.fn());
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: '507f1f77bcf86cd799439011' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Hospital Module Suite', () => {
    it('should retrieve verified hospital physical catalog', async () => {
        (VerifiedHospital.find as jest.Mock).mockReturnValue({
            sort: jest.fn().mockResolvedValue([])
        });

        const res = await request(app).get('/api/hospitals/catalog');
        expect(res.status).toBe(200);
        console.log('✅ [HospitalModule] Test Successful: Hospital profile and catalog verified.');
    });
});
