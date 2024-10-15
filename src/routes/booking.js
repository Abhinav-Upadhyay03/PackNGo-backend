import express from 'express';
import { getBookingByDriverID, getJobsCompleted, putBookingStatus, registerBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.route('/booking')
  .post(registerBooking) 
  .get(getJobsCompleted)
  .put(putBookingStatus); 

router.route('/bookings')
  .get(getBookingByDriverID);

export default router;
