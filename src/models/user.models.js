import mongoose, { Schema } from "mongoose";

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
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'driver', 'admin'],
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: function() {
            return this.role === 'driver';
        }
    }
}, { timestamps: true });

// Pre-save hook to ensure vehicle is set only if the role is 'driver'
userSchema.pre('save', function(next) {
    if (this.role === 'driver' && !this.vehicle) {
        return next(new Error('Vehicle is required for drivers.'));
    }
    next();
});

export const User = mongoose.model('User', userSchema);
