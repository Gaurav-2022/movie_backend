const express = require('express');
const router = express.Router();
const {
    addTheatre,
    getAllTheatres,
    getTheatreById,
    updateTheatre,
    deleteTheatre,
    getTheatresByCity,
    addScreens,
    getScreens,
    deleteScreen
  } = require("../controllers/theatreController");

  // Theatre CRUD
router.post("/", addTheatre);
router.get("/", getAllTheatres);

// 👉 City route should be BEFORE theatreId
router.get("/city/:cityId", getTheatresByCity);

router.get("/:theatreId", getTheatreById);
router.put("/:theatreId", updateTheatre);
router.delete("/:theatreId", deleteTheatre);

// Screens
router.post("/:theatreId/screens", addScreens);
router.get("/:theatreId/screens", getScreens);
router.delete("/:theatreId/screens/:screenId", deleteScreen);

module.exports = router;