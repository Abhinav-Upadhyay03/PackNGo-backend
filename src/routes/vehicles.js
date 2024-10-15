import express from 'express';
 
import { getAvailableVehicles } from '../controllers/vehiclesController.js';

const router = express.Router();

// Get all vehicles
router.route('/vehicles').get(getAvailableVehicles);

export default router;
