import mongoose from "mongoose";
import reminder from "../models/reminder";
import user from "../models/user";
import { LocalStorage } from "node-localstorage";
import localStorage from "localStorage";
import nodemailer from "nodemailer";
import { request, GraphQLClient, gql } from "graphql-request";

const query = gql`
  query problemsetQuestionList(
    $categorySlug: String
    $limit: Int
    $skip: Int
    $filters: QuestionListFilterInput
  ) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        topicTags {
          name
          id
          slug
        }
        hasSolution
        hasVideoSolution
      }
    }
  }
`;

const getData = async (diff, tag) => {
  const graphQLClient = new GraphQLClient("https://leetcode.com/graphql%27");
  const results = await graphQLClient
    .request(query, {
      categorySlug: "",
      skip: 0,

      filters: {
        difficulty: `${diff}`,
        tags: [`${tag}`],
      },
    })
    .catch((err) => console.log(err));

  return results.problemsetQuestionList.questions.map((question) => {
    return question.titleSlug;
  });
};

var transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "sudocode1234@gmail.com",
    pass: "fjdbltfeowkgpppf",
  },
  tls: { rejectUnauthorized: false },
});
let isRemindedToday = false;
setInterval(() => {
  reminder.find({}, async (err, reminderList) => {
    if (err) {
      console.log(err);
    }
    if (reminderList) {
      const no_of_reminders = reminderList.length;

      reminderList.forEach(async (element) => {
        const id = element.ourUser;
        let currentUser;
        try {
          currentUser = await user.findById(id);
        } catch (err) {
          return console.log(err);
        }
        let arr = element.time.split(":");

        let hr = parseInt(arr[0]);
        let min = parseInt(arr[1]);

        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();

        if (h === 0 && m === 0) {
          try {
            await user.findByIdAndUpdate(id, { isRemindedToday: false });
          } catch (err) {
            console.log(err);
          }
        } else if (
          hr - h == 0 &&
          min - m == 0 &&
          !currentUser.isRemindedToday
        ) {
          const questions = await getData(element.difficulty, element.topic);
          let arr = [];
          for (let i = 0; i < element.noofques; i++) {
            let x = Math.random() * (questions.length - 1);
            let q = questions[Math.floor(x)];

            console.log(q);
            arr.push(`http://leetcode.com/problems/${q}` + "\n");
            console.log(arr.slice(-1));
          }
          console.log(currentUser.isRemindedToday);
          console.log(currentUser);
          var mailOptions = {
            from: "sudocode1234@gmail.com",
            to: `pratham27900@gmail.com`,
            subject: `${element.noofques}`,
            text: `${arr}`,
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          console.log(
            currentUser.email +
              "" +
              element.noofques +
              "" +
              element.difficulty +
              "" +
              element.topic
          );
          try {
            await user.findByIdAndUpdate(id, { isRemindedToday: true });
          } catch (err) {
            console.log(err);
          }

          console.log(currentUser.isRemindedToday);
          console.log("reminder");
        }
      });
    }
  });
}, 2000);

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

  const Reminder = new reminder({
    title,
    noofques,
    difficulty,
    topic,
    time,
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
    console.log(Reminder);
    await Reminder.ourUser.reminders.pull(Reminder);
    await Reminder.ourUser.save();
    console.log(Reminder);
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
