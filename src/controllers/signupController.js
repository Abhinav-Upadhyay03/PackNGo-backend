import {User} from '../models/user.models.js';
export const registerUser =  async (req, res) => {
    const { fullName, email, password, role } = req.body;
    try {
        const user = new User({ fullName, email, password, role });
        await user.save();
        res.send('User Created');
    } catch (error) {
        res.status(400).send(error);
    }
}