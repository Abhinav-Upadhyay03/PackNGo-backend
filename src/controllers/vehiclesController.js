import { Vehicle } from '../models/vehicle.models.js';

export const getAvailableVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ availability: true }).populate('driver', 'fullName');
    
    res.status(200).json(vehicles); 
  } catch (error) {
    console.error('Error fetching available vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const putVehicleAvailability = async (req, res) => {
  const { vehicleId } = req.query;
  const { availability } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.availability = availability;
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle availability updated successfully' });
  } catch (error) {
    console.error('Error updating vehicle availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

