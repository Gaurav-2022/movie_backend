const Show = require('../models/show');

exports.addShow = async (req,res) => {
    try {
        const show = new Show(req.body);
        await show.save();
        res.status(201).json({message:"Show added",show});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.getShow = async (req,res) => {
    try {
        const show = await Show.findById(req.params.showId).populate("movieId").populate("theatreId");
        if(!show) return res.status(404).json({message:"show not found"})
        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

exports.getShowsByMovie = async (req,res) => {
    try {
        const shows = await Show.find({movieId:req.params.movieId})
        .populate("theatreId");
        res.status(200).json(shows)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getShowsBytheatre = async (req,res) => {
    try {
        const shows = await Show.find({theatreId:req.params.theatreId}).populate("movieId");
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}