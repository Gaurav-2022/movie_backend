const City = require('../models/city');

exports.addCity = async (req,res) => {
    try {
        const {name} = req.body;
        const exisiting = await City.findOne({name});
        if(exisiting) return res.status(400).json({message:"City already exists"})

        const city = await City.create(req.body);
        return res.status(201).json({message:"City added successfully",city});

    } catch (error) {
        res.stauts(500).json({message:error.message});
    }
};

exports.getAllCities = async (req,res) => {
    try {
        const cities = await City.find();
        return res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


exports.deleteCity = async (req,res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"City deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}