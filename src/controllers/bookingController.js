import { Booking } from '../models/booking.models.js'; 

export const registerBooking = async (req, res) => {
  const {
    userId,
    driverId,
    pickupLocation,
    dropOffLocation,
    vehicleType,
    price
  } = req.body;

  try {
    // Validate required fields
    if (!userId || !driverId || !pickupLocation || !dropOffLocation || !vehicleType || !price) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Create a new booking instance
    const newBooking = new Booking({
      userId,
      driverId,
      pickupLocation,
      dropOffLocation,
      vehicleType,
      price
    });

    // Save the booking to the database
    await newBooking.save();

    // Respond with the newly created booking
    res.status(201).json({ success: true, booking: newBooking, message: 'Booking registered successfully.' });
  } catch (error) {
    console.error('Error registering booking:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.', error });
  }
};
