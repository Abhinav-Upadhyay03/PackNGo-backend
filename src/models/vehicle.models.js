import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    vehicleType: { 
        type: String, 
        required: true 
    },
    driver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Driver' 

    }, 
    availability: { 
        type: Boolean, 
        default: true 
    },  
});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
