import jwt from 'jsonwebtoken';
import { Driver } from '../models/driver.models.js';
import { User } from '../models/user.models.js';
import { Vehicle } from '../models/vehicle.models.js';
import bcrypt from 'bcrypt';
const JWT_SECRET = '6a3b2c4d5e6f7g8h9i0j1k2l3m4n5o6p';

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
            password: await bcrypt.hash(password, 10),
            role: 'driver',
            vehicle: vehicle,
            vehicleType,
            availability: true,  // Set driver's availability to true
        });

        await driver.save();

        // Update the vehicle to include the driver's ID
        vehicle.driver = driver._id;
        await vehicle.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: driver._id, role: driver.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, driver: driver, vehicle: vehicle, token, message: 'Driver registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'An error occurred during driver registration.', error });
    }
};
