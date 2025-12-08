const Booking = require('../models/booking');
const Show = require('../models/show');

exports.createBooking = async (req,res) => {
    try {
        const { show, seats } = req.body;
        console.log(req.body);
        
        const user = req.user.id;
        
        const showDoc = await Show.findById(show);
      
        
        if(!showDoc) return res.status(404).json({message:"show not found"});
        const existingBookings = await Booking.find({
            show,bookingStatus:{$in:["confirmed","pending"]}
        });
        console.log(existingBookings);
        
        const alreadBookedSeats = existingBookings.flatMap(b => b.seats);
        console.log(alreadBookedSeats);
        
        const conflict = seats.some(seat => alreadBookedSeats.includes(seat));
        console.log(conflict);
        
        if(conflict){
            return res.status(400).json({
                message:"One or more seats are already booked",
                alreadBookedSeats
            })
        }
        const price = showDoc.price || 200;
        const total = price *seats.length;

        const booking = new Booking({
            user,
            show,
            seats,
            theatre: showDoc.theatreId,
            movie: showDoc.movieId,
            screenId: showDoc.screenId,
            totalPrice: total,
            paymentStatus: "success", // before payment
            bookingStatus: "confirmed"
        })
        await Show.findByIdAndUpdate(show, {
            $addToSet: { bookedSeats: { $each: seats } }
        });
    
        await booking.save();
        return res.status(201).json({
            message:"Seats locked - complete payment to confirm booking",
            booking
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getBookingByUser = async (req,res) => {
    try {
        console.log(req.user.id);
        
        const bookings = await Booking.find({user:req.user.id})

        console.log(bookings);
        // .populate("movie")
        // .populate("theatre")
        // .populate("show")
        console.log(bookings);
        res.status(200).json(bookings);
     
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

exports.cancelBooking = async (req, res) => {
    try {
    console.log(req.user.id);
    
      const bookingId = req.params.bookingId;
      const userId = req.user.id; 
    
        
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      // Make sure user can cancel only their own booking
      if (booking.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not allowed to cancel this booking" });
      }
  
      // If already cancelled
      if (booking.bookingStatus === "cancelled") {
        return res.status(400).json({ message: "Booking already cancelled" });
      }
  
      booking.bookingStatus = "cancelled";
      booking.paymentStatus = "failed"; // optional
      await booking.save();
  
      // 🔄 Also release seats from Show.bookedSeats
      await Show.findByIdAndUpdate(booking.show, {
        $pullAll: { bookedSeats: booking.seats }
      });
  
      return res.status(200).json({
        message: "Booking cancelled successfully",
        booking
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };
  
  