import { Vehicle } from '../models/vehicle.models.js';
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find(); // Query to fetch all vehicles from the database
    res.status(200).json(vehicles); // Send the vehicles as JSON
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
}