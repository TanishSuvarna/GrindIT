import user from "../models/user";
import emailValidator from "deep-email-validator";
import { request, GraphQLClient, gql } from "graphql-request";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await user.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users found" });
  } else {
    return res.status(200).json({ users });
  }
};
export const signup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    leetcodeId,
    phoneNumber,
    hackerRankId,
    codeNinjaId,
  } = req.body;
  let userExists;
  try {
    userExists = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (userExists) {
    return res.status(400).json({ message: "User Already Exists" });
  } else {
    async function isEmailValid(email) {
      return emailValidator.validate(email);
    }

    const { valid, reason, validators } = await isEmailValid(email);

    if (valid) {
      const newUser = new user({
        name,
        email,
        password,
        leetcodeId,
        phoneNumber,
        hackerRankId,
        codeNinjaId,
        reminders: [],
        userBlog: [],
      });

      try {
        await newUser.save();
      } catch (err) {
        return console.log(err);
      }
    } else {
      return res.status(400).send({
        message: "Please provide a valid email address.",
        reason: validators[reason].reason,
      });
    }

    return res.status(201).send({ message: "User Created" });
  }
};

export const login = async (req, res, next) => {
  const { email, password, leetcodeId } = req.body;
  let newUser;
  try {
    newUser = await user.findOne({ email }).populate("userBlog");
    if (!newUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    if (newUser && newUser.password === password) {
      return res.status(201).json({ newUser });
    } else {
      return res.status(400).json({ message: "Wrong Password" });
    }
  } catch (err) {
    return console.log(err);
  }
};

export const deleteUser = async (req, res, next) => {
  let userid = req.params.id;

  let currentUser;
  try {
    currentUser = await user.findByIdAndDelete(userid);
    if (!currentUser) {
      return res.status(400).json({ message: "user not found" });
    } else {
      return res.status(201).json({ message: "user Deleted" });
    }
  } catch (err) {
    return console.log(err);
  }
};

export const updateUserReminder = async (req, res, next) => {
  let userId = req.params.id;
  try {
    await user.findByIdAndUpdate(userId, { isRemindedToday: false });
    if (!userId) {
      return res.status(400).json({ message: "user not found" });
    } else {
      return res.status(201).json({ message: "user Reminded today changed" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getQuestionsByid = async (req, res, next) => {
  let userId = req.params.id;
  let currentUser;
  try {
    currentUser = await user.findById(userId);
    if (!currentUser) {
      return res.status(400).json({ message: "user not found" });
    } else {
      return res.status(201).json({ message: currentUser.todayQuestions });
    }
  } catch (err) {
    console.log(err);
  }
};
