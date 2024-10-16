import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';
import bcrypt from 'bcrypt';
const JWT_SECRET = '6a3b2c4d5e6f7g8h9i0j1k2l3m4n5o6p'; 

export const registerUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        if (role !== 'user') {
            return res.status(400).json({ success: false, message: 'Use the /driver route for drivers.' });
        }
        const user = new User({
            email,
            password: await bcrypt.hash(password, 10),
            fullName,
            role, 
        });

        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, user: user, token, message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'An error occurred during registration.', error });
    }
};
