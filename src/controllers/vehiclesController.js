import { Vehicle } from '../models/vehicle.models.js';

export const getAvailableVehicles = async (req, res) => {
  try {
    // Fetch available vehicles and populate the driver field with the user information
    const vehicles = await Vehicle.find({ availability: true }).populate('driver', 'fullName');
    
    res.status(200).json(vehicles); // Send the vehicles with driver details as JSON
  } catch (error) {
    console.error('Error fetching available vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
