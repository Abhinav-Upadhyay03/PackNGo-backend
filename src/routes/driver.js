import express from 'express';
import { registerDriver } from '../controllers/signupDriverController.js';

const router = express.Router();

router.post('/driver', registerDriver);

export default router;