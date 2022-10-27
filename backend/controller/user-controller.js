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

    return res.status(201).json({ message: "User Created" });
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

const getData= gql`
query userProblemSolved($username:String!){
     matchedUser(username:$username) {
           problemsSolvedBeatsStats
           {

               difficulty
                   percentage
                         }
                         submitStatsGlobal {
                               acSubmissionNum {
                                   difficulty 
                                   count
                                       }
                                      }
                                    }
                                 }`;
 export const getUserData =async(req,res,next) =>{
  const username = req.params.leetcodeId;
  let allLeet;
  try{
  const graphQLClient = new GraphQLClient('https://leetcode.com/graphql') 
  await graphQLClient.request(getData,{username : username}).then((results) => {
  allLeet =results.matchedUser.submitStatsGlobal.acSubmissionNum;
})}
catch(e){
  return res.status(400).json({message:"Enter Correct Leetcode Id"})
}
 return res.status(200).json({allLeet});
 }




