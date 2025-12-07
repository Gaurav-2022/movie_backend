const Theatre = require("../models/theatre");

exports.addTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);
    res.status(201).json({ message: "Theatre added", theatre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("cityId");
    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTheatreById = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.theatreId).populate("cityId");
    if (!theatre) return res.status(404).json({ message: "Theatre not found" });

    res.status(200).json(theatre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(req.params.theatreId, req.body, { new: true });
    if (!theatre) return res.status(404).json({ message: "Theatre not found" });

    res.status(200).json({ message: "Theatre updated", theatre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(req.params.theatreId);
    if (!theatre) return res.status(404).json({ message: "Theatre not found" });

    res.status(200).json({ message: "Theatre deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTheatresByCity = async (req, res) => {
  try {
    const theatres = await Theatre.find({ cityId: req.params.cityId });
    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addScreens = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.theatreId);
    if (!theatre) return res.status(404).json({ message: "Theatre not found" });

    const { screenName, totalSeats, rows, columns } = req.body;

    if (!screenName || !totalSeats)
        return res.status(400).json({ message: "Screen details missing" });
  
      const newScreen = { screenName, totalSeats, rows, columns };
      theatre.screens.push(newScreen);
  
      await theatre.save();
  
  
    res.status(200).json({ message: "Screens added", theatre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getScreens = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.theatreId);
    if (!theatre) return res.status(404).json({ message: "Theatre not found" });

    res.status(200).json(theatre.screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteScreen = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.theatreId);
    if (!theatre) return res.status(404).json({ message: "Theatre not found" });

    theatre.screens = theatre.screens.filter(
      (screen) => screen._id.toString() !== req.params.screenId
    );
    await theatre.save();

    res.status(200).json({ message: "Screen removed", theatre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
