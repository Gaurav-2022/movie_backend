const Movie = require('../models/movie');
const { findById } = require('../models/user');

exports.getAllMoviews = async (req,res)=>{
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.addMovie = async (req,res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({message:err.message});
    }

}

exports.getMovieById = async (req,res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).json({message:"Movie not found"});
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message:err.message});
        
    }
};

exports.updateMovie = async (req,res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message:err.message});
    }
};

exports.deleteMovie = async (req,res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Movie deleted"});
    } catch (error) {
        res.status(500).json({message:err.message})
    }
};

