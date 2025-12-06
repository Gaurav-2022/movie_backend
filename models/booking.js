const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',require:true},
    moview:{type:mongoose.Schema.Types.ObjectId,ref:'Movie',require:true},
    seatsBooked:{type:Number,required:true},
    stautus:{type:String,enum:['confirmed','cancelled'],default:'confirmed'}
})

module.exports = mongoose.model('Booking',bookingSchema)