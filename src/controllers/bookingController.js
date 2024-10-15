import { Booking } from '../models/booking.models.js'; 

// Controller to register a booking
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
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required.' 
      });
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
    return res.status(201).json({ 
      success: true, 
      booking: newBooking, 
      message: 'Booking registered successfully.' 
    });
  } catch (error) {
    console.error('Error registering booking:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.', 
      error: error.message || error 
    });
  }
};

// Controller to get all completed jobs
export const getJobsCompleted = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'completed' });

    return res.status(200).json({ 
      success: true, 
      bookings 
    });
  } catch (error) {
    console.error('Error fetching completed bookings:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.', 
      error: error.message || error 
    });
  }
};

// Controller to get bookings by driver ID
export const getBookingByDriverID = async (req, res) => {
  const { driverId } = req.query; // Destructure driverId from req.params

  try {
    
  
    const bookings = await Booking.find({ driverId });

    // Return response
    return res.status(200).json({ 
      success: true, 
      bookings 
    });
  } catch (error) {
    console.error(`Error fetching bookings for driver ID ${driverId}:`, error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.', 
      error: error.message || error 
    });
  }
};
