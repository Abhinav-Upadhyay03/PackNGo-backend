import express from 'express';
import { getDriverLatLngByDriverId, getDriverList, registerDriver, updateDriverAvailability, updateDriverLatLng } from '../controllers/signupDriverController.js';

const router = express.Router();


router.route('/driver').post(registerDriver).put(updateDriverLatLng).get(getDriverLatLngByDriverId);
router.route('/drivers').get(getDriverList).put(updateDriverAvailability);
export default router;