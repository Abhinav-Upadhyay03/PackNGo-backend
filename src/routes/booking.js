import express from 'express';
import { registerBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.post('/booking', registerBooking);

export default router;