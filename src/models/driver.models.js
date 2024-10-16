import mongoose, {Schema} from "mongoose";
const driverSchema = new Schema({
    
        fullName: {
            type: String,
            required: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        vehicle: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Vehicle' 
        },
        vehicleType: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['small sized', 'medium sized', 'large sized'],
        },
        available: {
            type: Boolean,
            default: true,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    
})

export const Driver = mongoose.model('Driver', driverSchema);

