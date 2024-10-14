import {User} from '../models/user.models.js';

export const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email});
    console.log(user);
    
    if (!user) {
        return res.status(404).json({success: false, message: 'User not found'});
    }
    if(user.password !== password) {
        return res.status(401).json({success: false, message: `${password}-${user.password}`});
    }
    
    res.json({success: true, user: user, message: 'Login route'});
}