import { User } from '../models/user.models.js';
import { Vehicle } from '../models/vehicle.models.js';  // Import the Vehicle model

export const registerUser = async (req, res) => {
    const { fullName, email, password, role, vehicleType } = req.body;  // Expect vehicleType in request body for drivers

    try {
        let vehicle = null; // Initialize the vehicle variable

        // Check if the role is 'driver' and a vehicleType is provided
        if (role === 'driver') {
            if (!vehicleType) {
                return res.status(400).json({ success: false, message: 'Vehicle type is required for drivers.' });
            }

            // Create a new vehicle record
            vehicle = new Vehicle({ vehicleType });
            await vehicle.save();  // Save the vehicle to the database
        }

        // Create the user, associating the vehicle if the role is 'driver'
        const user = new User({
            fullName,
            email,
            password,
            role,
            vehicle: vehicle ? vehicle._id : null  // Assign the vehicle ID if the role is driver
        });

        await user.save();
        res.json({ success: true, user: user, message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'An error occurred during registration.', error });
    }
};
