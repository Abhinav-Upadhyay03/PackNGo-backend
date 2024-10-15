import express from 'express';
import { autocomplete } from '../controllers/autocompleteController.js';

const router = express.Router();

router.get('/autocomplete', autocomplete);

export default router