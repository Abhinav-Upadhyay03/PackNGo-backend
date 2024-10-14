import mongoose, {Schema} from "mongoose";
const vehicleSchema = new Schema({
    vehicleType: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['small sized', 'medium sized', 'large sized'],
    },

})

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)