import jwt from 'jsonwebtoken';
import { Driver } from '../models/driver.models.js';
import { User } from '../models/user.models.js';
import { Vehicle } from '../models/vehicle.models.js';
import bcrypt from 'bcrypt';
const JWT_SECRET = '6a3b2c4d5e6f7g8h9i0j1k2l3m4n5o6p';

export const registerDriver = async (req, res) => {
    const { fullName, email, password, vehicleType } = req.body;

    try {

        if (!vehicleType) {
            return res.status(400).json({ success: false, message: 'Vehicle type is required for drivers.' });
        }
        const vehicle = new Vehicle({
            vehicleType,
            availability: true,  
        });
        await vehicle.save();        
        const driver = new Driver({
            fullName,
            email,
            password: await bcrypt.hash(password, 10),
            role: 'driver',
            vehicle: vehicle,
            vehicleType,
            availability: true,  
        });

        await driver.save();

        
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
export const updateDriverLatLng = async (req, res) => {
    const { driverId } = req.query;
    const { latitude, longitude } = req.body;

    try {
        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: 'Latitude, and longitude are required.' });
        }
        const driver = await Driver.findById(driverId);
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found.' });
        }

        driver.latitude = latitude;
        driver.longitude = longitude;
        await driver.save();

        res.json({ success: true, driver, message: 'Driver location updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'An error occurred updating driver location.', error });
    }
}

export const getDriverLatLngByDriverId = async (req, res) => {
    const { driverId } = req.query;

    try {
        const driver = await Driver.findById(driverId);
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found.' });
        }

        res.json({ success: true, driver });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'An error occurred fetching driver location.', error });
    }
}
