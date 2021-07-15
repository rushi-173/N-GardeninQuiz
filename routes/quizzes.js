const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Topic = require("../models/Topic");




router.get("/",async (req, res) => {
  console.log("is in all");
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.json({ message: err });
  }
});
 

router.get("/topics",async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.json({ message: err });
  }
});


router.get("/:quizId", async (req, res) => {
  console.log("req is in quiz")
  try {
    const quizTopic = await Topic.findOne({ _id: req.params.quizId });
    console.log(quizTopic, req.params.quizId)
    const questions = await Quiz.find({ topic: quizTopic.topic });
    res.json({questions, quizTopic});
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
    const quiz = new Quiz({
      topic:req.body.topic,
      question:req.body.question,
      correct_answer:req.body.correct_answer,
      incorrect_answers:req.body.incorrect_answers,
      explanation:req.body.explanation
    });
    try {
      const savedQuiz = await quiz.save();
      res.json(savedQuiz);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  router.post("/topics", async (req, res) => {
    const topic = new Topic({
      topic:req.body.topic
    });
    try {
      const savedTopic = await topic.save();
      res.json(savedTopic);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });
  
//   const {topics} = require("./data")
//   for(let i = 0; i<topics.length; i++)
// {
//   (async ()=>{
//   const topic = new Topic({
//       topic:topics[i]
//     });
//     try {
//       const savedTopic = await topic.save();
//       console.log("saved",topics[i])
//     } catch (err) {
//       console.log(err, "rejected",topics[i])
//     }
//   })()
// } 
  
//   const {quizzes} = require("./data")
//   for(let i = 0; i<quizzes.length; i++)
// {
//   (async ()=>{
//      const quiz = new Quiz({
//       topic:quizzes[i].topic,
//       question:quizzes[i].question,
//       correct_answer:quizzes[i].correct_answer,
//       incorrect_answers:quizzes[i].incorrect_answers,
//       explanation:quizzes[i].explanation
//     });
//     try {
//       const savedQuiz = await quiz.save();
//       console.log("saved",quizzes[i])
//     } catch (err) {
//       console.log(err, "rejected",quizzes[i]);
//     }
//   })()
  
// }  

module.exports = router;
