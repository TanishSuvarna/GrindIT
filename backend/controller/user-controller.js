import user from "../models/user";
import emailValidator from "deep-email-validator";
import axios from 'axios';
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
  let newUser;
  try {
    userExists = await user.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (userExists) {
    return res.status(400).json({ message: "User Already Exists" });
  } else {
    async function isEmailValid(email) {
      return emailValidator.validate({
        email: email,
        sender: "stanish.mi@gmail.com",
      });
    }
    if (true) {
      newUser = new user({
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

    return res.status(201).json({ newUser, message: "User Created" });
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
  const ranking = gql`  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      profile {
        ranking
      }
    }
  }`
 export const leetcodeData =async(req,res,next) =>{
  const username = req.params.leetcodeId;
  let allLeet;
    let ranking1;
  try {
    const graphQLClient = new GraphQLClient("https://leetcode.com/graphql");
    await graphQLClient
      .request(getData, { username: username })
      .then(async (results) => {
        allLeet = results.matchedUser.submitStatsGlobal.acSubmissionNum;
        await graphQLClient
        .request(ranking ,{username:username})
        .then(data => {
           ranking1 = data.matchedUser.profile.ranking});
      });
  } catch (e) {
    return res.status(400).json({ message: "Enter Correct Leetcode Id" });
  }

  return res.status(200).json({ allLeet , ranking1 });
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
  }}
export const hackerrankData = async (req,res) => {
  let res1;
  let cursor="";
  let allQues = [];
  let bool= false;
  const username = req.params.hackerrankId;
  do{
  try{
      res1 = await axios.get(`https://www.hackerrank.com/rest/hackers/${username}/recent_challenges?limit=100?&cursor=${cursor}` ,{ headers:{
         'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
      }
     });
     }catch(err){
           res.status(400).json({err : "Enter Valid ID"})
           bool = true;
           break;
     }
     cursor = res1.data.cursor;
    //  res1.data.models.forEach(ques => {
    //   const {name,url} = ques; 
    //   allQues = [...allQues ,{name,url}];
    //  })
    allQues = [...allQues,...res1.data.models];
  }while(!res1.data.last_page);
  if(!bool)return res.status(200).json({allQues, totalQues : allQues.length});
} 
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
export const getUserByid = async (req, res, next) => {
  let userId = req.params.id;
  let currentUser;
  try {
    currentUser = await user.findById(userId);
    if (!currentUser) {
      return res.status(400).json({ message: "user not found" });
    } else {
      return res.status(201).json({ message: currentUser });
    }
  } catch (err) {
    console.log(err);
  }
};
export const codeforcesData = async(req,res)=>{
  const handle = req.params.codeforcesId;
  let easy =[] , medium =[] , hard  = [];
  const data = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`)
  .catch(err => {
    return false;
  });
  if(data === false|| data.data.status === "FAILED") return res.status(400).json({message:"Please Enter Valid Handle"});
  else{
    data.data.result.map(ques => {
      if(ques.verdict == "OK")
      {if(parseInt(ques.problem.rating) <= 1000){
         easy.push(ques.id);
      }
      else if(parseInt(ques.problem.rating) > 1000 && parseInt(ques.problem.rating) <= 2000){
        medium.push(ques.id);
      }
      else{
        hard.push(ques.id);
      }}
      return ques;
    })
    easy = [...new Set(easy)];
    medium = [...new Set(medium)];
    hard = [...new Set(hard)];
    const info = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    res.status(200).json({easy:easy.length , medium:medium.length , hard:hard.length,rating : info.data.result[0].rating , rank: info.data.result[0].rank})
  }
}
