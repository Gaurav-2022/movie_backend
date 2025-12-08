const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    show:{type:mongoose.Schema.Types.ObjectId,ref:"Show",required:true},
    theatre:{type:mongoose.Schema.Types.ObjectId,ref:"Theatre",required:true},
    movie:{type:mongoose.Schema.Types.ObjectId,ref:'Movie',required:true},
    seats: {
        type: [String],     // ← Array of seat numbers like ["A1", "A2"]
        required: true
      },
    screenId: {
        type: String,  
        required: true
      },
      totalPrice:{type:Number,required:true},
      paymentStatus:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
      },
      bookingStatus:{
        type:String,
        enum:["confirmed","cancelled"],
        default:"confirmed"
      }
})

module.exports = mongoose.model('Booking',bookingSchema);