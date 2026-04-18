import request from 'supertest';
import { app } from '../server';
import BloodRequest from '../models/BloodRequest';

jest.mock('../models/BloodRequest');
jest.mock('../config/db', () => jest.fn());
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: 'user123', role: 'receiver' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Blood Request Suite', () => {
    it('should create a new blood request successfully', async () => {
        (BloodRequest.create as jest.Mock).mockResolvedValue({ _id: 'req1', bloodType: 'AB+', status: 'Open' });

        const res = await request(app)
            .post('/api/requests')
            .send({ 
                bloodType: 'AB+', 
                urgency: 'High', 
                units: 2,
                hospitalName: 'Test Hospital',
                patientName: 'John Doe',
                description: 'Emergency blood transfusion needed for surgery.',
                location: { type: 'Point', coordinates: [85.324, 27.717] }
            });

        expect(res.status).toBe(201);
        console.log('✅ [BloodRequest] Test Successful: Emergency blood request created and broadcasted.');
    });
});
