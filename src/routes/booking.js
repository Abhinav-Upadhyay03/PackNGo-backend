import express from 'express';
import { getBookingByDriverID, getJobsCompleted, registerBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Route to register a booking and fetch completed jobs
router.route('/booking')
  .post(registerBooking) 
  .get(getJobsCompleted); 

// Route to get bookings by driver ID
router.route('/bookings')
  .get(getBookingByDriverID); // Get bookings by driver ID

export default router;
