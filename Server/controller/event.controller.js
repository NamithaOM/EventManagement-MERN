const Event = require("../models/event.model");

// create event
exports.createEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;

    // Validation
    if (!title || !date || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = new Event({ title, date, location, description });
    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all event
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching events", error: error.message });
  }
};

// get a specific event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching events", error: error.message });
  }
};

// event registeration
exports.registerEvent = async (req, res) => {
  try {
    const { registerStatus, name, email } = req.body;

    const updateData = { registerStatus };

    if (registerStatus) {
      updateData.name = name;
      updateData.email = email;
    } else {
      updateData.name = "";
      updateData.email = "";
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({
      message: registerStatus
        ? "Event registration done successfully"
        : "Registration cancelled",
      event,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event registration" });
  }
};
