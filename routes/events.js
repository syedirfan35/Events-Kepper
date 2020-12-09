const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const authMiddleware = require("../middleware/auth");

const User = require("../models/Users");
const Event = require("../models/events");

//@route: GET api/events
//@desc: get all  events
//@access: public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route: POST api/events
//@desc: add new events
//@access: private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("eventName", "Please enter event name.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      eventName,
      eventTime,
      eventVenue,
      eventDetails,
      eventOrganiser
    } = req.body;

    try {
      let newEvent = new Event({
        eventName,
        eventTime,
        eventVenue,
        eventDetails,
        eventOrganiser,
        user: req.user.id
      });
      let event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      re.status(500).send("Server Error");
    }
  }
);

//@route: PUT api/events/:id
//@desc: update event
//@access: private
router.put("/:id", authMiddleware, async (req, res) => {
  const { eventName, eventTime, eventDetails, eventOrganiser } = req.body;

  const eventField = {};
  if (eventName) eventField.eventName = eventName;
  if (eventTime) eventField.eventTime = eventTime;
  if (eventDetails) eventField.eventDetails = eventDetails;
  if (eventOrganiser) eventField.eventOrganiser = eventOrganiser;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(400).json({ msg: "No events found." });
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised." });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventField },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route: DELETE api/events/:id
//@desc: delete event
//@access: private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(400).json({ msg: "No events found." });
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised." });
    }

    await Event.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact Removed..." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
