import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';

const JWT_SECRET = '6a3b2c4d5e6f7g8h9i0j1k2l3m4n5o6p';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // You might want to hash passwords for security
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, user, token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred during login.', error });
    }
};
