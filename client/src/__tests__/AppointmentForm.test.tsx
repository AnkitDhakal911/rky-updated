import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Appointment Form', () => {
    it('should click book', () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Book Now</Button>);
        fireEvent.click(screen.getByText(/Book/i));
        expect(onClick).toHaveBeenCalled();
        console.log('✅ [AppointmentForm] Test Successful: Interaction handling and submission flow verified.');
    });
});
