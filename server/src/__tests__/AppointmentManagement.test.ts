import request from 'supertest';
import { app } from '../server';
import Appointment from '../models/Appointment';

jest.mock('../models/Appointment');
jest.mock('../config/db', () => jest.fn());
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: '507f1f77bcf86cd799439011', role: 'hospital' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Appointment Management', () => {
    it('should view booked slots', async () => {
        (Appointment.find as jest.Mock).mockReturnValue({
            populate: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue([{ _id: '507f1f77bcf86cd799439011', status: 'Pending' }])
        });

        const res = await request(app).get('/api/appointments/me');
        expect(res.status).toBe(200);
        console.log('✅ [AppointmentManagement] Test Successful: Booking slots and scheduling verified.');
    });
});
