import express from 'express';
import { getAllBookings, getBookingByDriverID, getBookingByUserId, getJobsCompleted, putBookingStatus, registerBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.route('/booking')
  .post(registerBooking) 
  .get(getJobsCompleted)
  .put(putBookingStatus); 

router.route('/bookings')
  .get(getBookingByDriverID);

router.route('/allBookings').get(getAllBookings);

router.route('/bookingUser').get(getBookingByUserId);
  

export default router;
