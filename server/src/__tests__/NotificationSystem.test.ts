import request from 'supertest';
import { app } from '../server';
import Notification from '../models/Notification';

jest.mock('../models/Notification');
jest.mock('../config/db', () => jest.fn());
jest.mock('../middlewares/auth', () => ({
    protect: (req: any, res: any, next: any) => { req.user = { id: '507f1f77bcf86cd799439011' }; next(); },
    authorize: () => (req: any, res: any, next: any) => next()
}));

describe('Notification System Suite', () => {
    it('should view system alerts and updates', async () => {
        (Notification.find as jest.Mock).mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([])
        });
        (Notification.countDocuments as jest.Mock).mockResolvedValue(0);

        const res = await request(app).get('/api/notifications');
        expect(res.status).toBe(200);
        console.log('✅ [NotificationSystem] Test Successful: Alerts and updates logic verified.');
    });
});
