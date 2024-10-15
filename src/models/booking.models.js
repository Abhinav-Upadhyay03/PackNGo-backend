import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    pickupLocation: {
        type: String,
        required: true  
    },
    dropOffLocation: {
        type: String,
        required: true  
    },
    vehicleType: {
        type: String,
        required: true  
    },
    status: {
        type: String,
        enum: ['On the way to pickup', 'goods collected', 'delivered', 'cancelled'],
        default: 'On the way to pickup'
    },
    price: {
        type: Number,
        required: true
    },
    


})

export const Booking = mongoose.model('Booking', bookingSchema);