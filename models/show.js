const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movieId:{type:mongoose.Schema.Types.ObjectId,ref:"Movie",required:true},
    theatreId:{type:mongoose.Schema.Types.ObjectId,ref:"Theatre",required:true},
    screenId:{type:mongoose.Schema.Types.ObjectId,required:true},
    showDate:{type:String,required:true},
    showTime:{type:String,required:true},
    price:{type:Number,required:true}
});

module.exports = mongoose.model("Show",showSchema)