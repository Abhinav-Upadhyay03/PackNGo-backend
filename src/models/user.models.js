import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'driver', 'admin'],
    }
    // refreshToken: {
    //     type: String,
    //     default: ''
    // }

},{timestamps: true})

export const User = mongoose.model('User', userSchema)