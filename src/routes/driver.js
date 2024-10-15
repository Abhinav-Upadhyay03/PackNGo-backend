import express from 'express';
import { getDriverLatLngByDriverId, registerDriver, updateDriverLatLng } from '../controllers/signupDriverController.js';

const router = express.Router();


router.route('/driver').post(registerDriver).put(updateDriverLatLng).get(getDriverLatLngByDriverId);

export default router;