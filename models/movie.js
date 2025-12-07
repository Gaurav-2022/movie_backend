const mongoose = require('mongoose');
const moviewSchema = new mongoose.Schema({
    title:{type:String,required:true},
    desctiption:{type:String},
    genre:{type:String},
    language:{type:String},
    duration:{type:Number},
    releaseDate:{type:Date},
    availableSeates:{type:Number,default:100}
})

module.exports = mongoose.model('Movie',moviewSchema);