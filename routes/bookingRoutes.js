const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')


const {createBooking,cancelBooking,getBookingByUser} = require('../controllers/bookingController');

router.post("/",auth,createBooking);
router.get("/user",auth, getBookingByUser);
router.put("/cancel/:bookingId", auth,cancelBooking);

module.exports = router;