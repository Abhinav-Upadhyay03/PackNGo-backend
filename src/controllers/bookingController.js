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
    
    if (!userId || !driverId || !pickupLocation || !dropOffLocation || !vehicleType || !price) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required.' 
      });
    }

    const newBooking = new Booking({
      userId,
      driverId,
      pickupLocation,
      dropOffLocation,
      vehicleType,
      price
    });

    await newBooking.save();

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

export const getBookingByDriverID = async (req, res) => {
  const { driverId } = req.query; 
  try {
    const bookings = await Booking.find({ 
      driverId, 
      status: { $nin: ['Delivered', 'Cancelled'] }
    });

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

export const putBookingStatus = async (req, res) => {
  const { bookingId } = req.query;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found.' 
      });
    }
    booking.status = status;
    await booking.save();

    return res.status(200).json({ 
      success: true, 
      booking, 
      message: 'Booking status updated successfully.' 
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.', 
      error: error.message || error 
    });
  }
}