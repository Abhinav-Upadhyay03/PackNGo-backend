import { User } from '../models/user.models.js';

export const registerUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        // Ensure the role is 'user'
        if (role !== 'user') {
            return res.status(400).json({ success: false, message: 'Use the /driver route for drivers.' });
        }

        const user = new User({
            fullName,
            email,
            password,
            role,  // This will always be 'user'
        });

        await user.save();
        res.json({ success: true, user: user, message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'An error occurred during registration.', error });
    }
};
