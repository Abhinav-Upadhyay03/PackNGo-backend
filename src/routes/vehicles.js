import express from 'express';
 
import { getVehicles } from '../controllers/vehiclesController.js';

const router = express.Router();

// Get all vehicles
router.route('/vehicles').get(getVehicles);

export default router;
