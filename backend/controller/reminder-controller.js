import mongoose from "mongoose";
import reminder from "../models/reminder";
import user from "../models/user";
import { handler } from "../aws/reminderScheduler";
import {
  EventBridgeClient,
  DeleteRuleCommand,
  ListTargetsByRuleCommand,
  RemoveTargetsCommand,
} from "@aws-sdk/client-eventbridge"; // ES Modules import

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
  const { title, noofques, difficulty, topic, time, ourUser } = req.body;

  let existingUser;
  try {
    existingUser = await user.findById(ourUser);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this id" });
  }

  try {
    const rem = await handler({
      title,
      noofques,
      difficulty,
      topic,
      time,
      ourUser,
    });
    const Reminder = new reminder(rem);
    await Reminder.save();
    existingUser.reminders.push(Reminder);
    await existingUser.save();
    return res.status(200).json({ Reminder });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

export const updateReminder = async (req, res, next) => {
  const { title, noofques, difficulty, time, topic } = req.body;
  const reminderId = req.params.id;
  let Reminder;
  try {
    Reminder = await reminder.findByIdAndUpdate(reminderId, {
      title,
      noofques,
      difficulty,

      topic,
      time,
    });
    handler({title,
      noofques,
      difficulty,
      ourUser : Reminder.ourUser,
      topic,
      time,
      ruleName : Reminder.ruleName
    })
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
    const config = {
      apiVersion: "2015-10-07",
      region: process.env.region,
      credentials: {
        accessKeyId: process.env.accessKey,
        secretAccessKey: process.env.secretKey,
      },
    };
    const client = new EventBridgeClient(config);
    const command1 = new ListTargetsByRuleCommand({ Rule: Reminder.ruleName });

    const allDetails = await client.send(command1);
    const targets = [...allDetails.Targets];
    const Ids = targets.map((id) => id.Id);
    const removeTargetsParams = {
      Ids: Ids,
      Rule: Reminder.ruleName,
    };
    const removeTargetsCommand = new RemoveTargetsCommand(removeTargetsParams);
    const removeTargetsResult = await client.send(removeTargetsCommand);
    console.log(removeTargetsResult);
    const input = {
      // DeleteRuleRequest
      Name: Reminder.ruleName, // required
      Force: true || false,
    };
    const command2 = new DeleteRuleCommand(input);
    const response = await client.send(command2);
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
