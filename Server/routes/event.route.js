// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controller/event.controller");

// API endpoints
router.get("/getAllevents", eventController.getEvents);
router.get("/getEventById/:id", eventController.getEventById);
router.post("/createEvents", eventController.createEvent);
router.patch("/:id/register-event",eventController.registerEvent);
module.exports = router;
