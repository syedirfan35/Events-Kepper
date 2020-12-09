const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  eventName: {
    type: String,
    required: true
  },
  eventTime: {
    type: String
  },
  eventVenue: {
    type: String
  },
  eventDetails: {
    type: String
  },
  eventOrganiser: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("events", EventSchema);
