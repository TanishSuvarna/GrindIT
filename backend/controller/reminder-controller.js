import mongoose from "mongoose";
import reminder from "../models/reminder";
import user from "../models/user";

export const getAllReminders = async (req, res, next) => {
  let reminders;
  try {
    reminders = await reminder.find();
  } catch (err) {
    return console.log(err);
  }
  if (!reminders) {
    return res.status(404).json({ message: "No Reminders found!" });
  }
  return res.status(200).json(reminders);
};

export const addReminder = async (req, res, next) => {
  const { title, noofques, difficulty, topic, ourUser } = req.body;

  let existingUser;
  try {
    existingUser = await user.findById(ourUser);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this id" });
  }

  const Reminder = new reminder({
    title,
    noofques,
    difficulty,
    topic,
    ourUser,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    Reminder.save(session);
    existingUser.reminders.push(Reminder);
    existingUser.save(session);
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ Reminder });
};

export const updateReminder = async (req, res, next) => {
  const { title, noofques, difficulty, topic } = req.body;
  const reminderId = req.params.id;
  let Reminder;
  try {
    Reminder = await reminder.findByIdAndUpdate(reminderId, {
      title,
      noofques,
      difficulty,
      topic,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!Reminder) {
    return res.status(500).json({ message: "Unable to Update the Reminder" });
  }
  return res.status(200).json({ Reminder });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let Reminder;
  try {
    Reminder = await reminder.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!Reminder) {
    return res.status(404).json({ message: "No Reminders found" });
  }
  return res.status(200).json({ Reminder });
};

export const deleteReminder = async (req, res, next) => {
  const id = req.params.id;

  let Reminder;
  try {
    Reminder = await reminder.findByIdAndRemove(id).populate("ourUser");
    await Reminder.ourUser.reminders.pull(Reminder);
    await Reminder.ourUser.save();
  } catch (err) {
    console.log(err);
  }
  if (!Reminder) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "deleted successfully" });
};

export const getAllReminderByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let allReminders;
  try {
    allReminders = await user.findById(userId).populate("reminders");
  } catch (err) {
    return console.log(err);
  }
  if (!allReminders) {
    return res.status(404).json({ message: "NO Reminders found" });
  }
  return res.status(200).json({ message: allReminders.reminders });
};
