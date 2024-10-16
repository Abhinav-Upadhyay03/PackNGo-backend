import express from 'express';
 
import { getAvailableVehicles, putVehicleAvailability } from '../controllers/vehiclesController.js';

const router = express.Router();

router.route('/vehicles').get(getAvailableVehicles).put(putVehicleAvailability);

export default router;
