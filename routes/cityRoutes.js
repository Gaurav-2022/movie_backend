const express = require('express');
const router = express.Router();

const {deleteCity,addCity,getAllCities} = require('../controllers/cityController')

router.get('/',getAllCities);
router.delete('/:id',deleteCity);
router.post('/',addCity);

module.exports = router;
