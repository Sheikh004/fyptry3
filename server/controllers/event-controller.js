import e from "express";
import Event from "../modal/Event.js";

export const createEvent = async (req, res) => {
  const sDate = req.body.sDate;
  const eDate = req.body.eDate;
  const eName = req.body.eName;
  try {
    const eventExist = await Event.findOne({ name: eName });
    if (eventExist) {
      const updateEvent = await Event.findOneAndUpdate(
        { name: eName },
        {
          $set: {
            startDate: sDate,
            endDate: eDate,
          },
        }
      );
      res.status(200).json(updateEvent);
    } else {
      const newEvent = new Event({
        name: eName,
        startDate: sDate,
        endDate: eDate,
      });
      await newEvent.save();
      res.status(200).json(newEvent);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
