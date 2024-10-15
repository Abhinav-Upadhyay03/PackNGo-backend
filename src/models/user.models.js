import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['user', 'driver','admin'], 
        default: 'user' 
    },
    vehicle: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle' 
    },  
    availability: { 
        type: Boolean, 
        default: false 
    }, 
});

export const User = mongoose.model('User', userSchema);
