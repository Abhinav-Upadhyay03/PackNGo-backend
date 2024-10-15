import { Driver } from '../models/driver.models.js';
import { User } from '../models/user.models.js';
import { Vehicle } from '../models/vehicle.models.js';

export const registerDriver = async (req, res) => {
    const { fullName, email, password, vehicleType } = req.body;

    try {
        // Ensure vehicleType is provided for drivers
        if (!vehicleType) {
            return res.status(400).json({ success: false, message: 'Vehicle type is required for drivers.' });
        }

        // Create the vehicle
        const vehicle = new Vehicle({
            vehicleType,
            availability: true,  // Set the availability to true by default
        });

        await vehicle.save();

        // Create the driver as a user with role 'driver'
        const driver = new Driver({
            fullName,
            email,
            password,
            role: 'driver',
            vehicle: vehicle,
            vehicleType,
            availability: true,  // Set driver's availability to true
        });

        await driver.save();

        // Update the vehicle to include the driver's ID
        vehicle.driver = driver._id;
        await vehicle.save();

        res.json({ success: true, driver: driver, vehicle: vehicle, message: 'Driver registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'An error occurred during driver registration.', error });
    }
};
