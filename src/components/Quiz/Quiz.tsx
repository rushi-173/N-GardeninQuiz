import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useParams } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Result from "./Result";
import { useScore, Scores, Score } from "../../contexts/scoreContext";
import { useAuth } from "../../contexts/authContext";
import { shuffleArray } from "./utils";
import axios from "axios";
import Loader from "react-loader-spinner";

export type Question = {
	_id: string;
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	topic: string;
	explanation: string;
};

export type QuestionsState = Question & { answers: string[]; id: number };

function Quiz() {
	const { id } = useParams();
	const { auth } = useAuth();
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionsState[]>([]);
	const [questionNumber, setQuestionNumber] = useState(1);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [response, setResponse] = useState<string[]>([]);
	const { scores, setScores } = useScore();
  const [ansColor, setAnsColor] = useState<string>("#fff")
  let ansClicked = 0;

	const quizData = async (
		id: string | undefined
	): Promise<QuestionsState[]> => {
		const endpoint = `https://gardeninquiz.rushi173.repl.co/quizzes/${id}`;
		const res = await axios.get(endpoint);
		console.log(res.data);
		return res.data.questions.map((question: Question, index: number) => ({
			...question,
			answers: shuffleArray([
				...question.incorrect_answers,
				question.correct_answer,
			]),
			id: index + 1,
		}));
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			setGameOver(false);
			const newQuestions = await quizData(id);
			console.log(newQuestions);
			setQuestions(newQuestions);
			setScore(0);
			setQuestionNumber(1);
			setLoading(false);
		})();
	}, []);

	const startQuiz = async () => {
		setLoading(true);
		setGameOver(false);
		const newQuestions = await quizData(id);
		setQuestions(newQuestions);
		setScore(0);
		setQuestionNumber(1);
		setLoading(false);
		setResponse([]);
	};

	const nextQuestion = (opt: string) => {
		const nextQ = questionNumber + 1;
		setResponse((prev) => prev.concat(opt));
		if (nextQ === TOTAL_QUESTIONS + 1) {
			setGameOver(true);
			updateHighScore();
		} else {
			setQuestionNumber(nextQ);
		}
	};

	const submitAnswer = (option: string, answer: string) => {
    if(!ansClicked){
		if(option === answer){
        setScore((prev) => prev + 1) 
        setAnsColor("#CCFF90");
    }else{
      setAnsColor("#FFCDD2");
    }
    setTimeout(()=>{
      setAnsColor("#fff")
      nextQuestion(option);
    },1000)
    ansClicked = 1;
  }

	};

	function getGameScores() {
		return scores.find((item) => item.topic === name);
	}

	const updateHighScore = () => {
		const gameScores = getGameScores();
		if (gameScores === undefined) {
			let newUserScore: Score = {
				user: auth?.user._id,
				highscore: score,
				globalHighscore: score,
			};
			let newScores: Scores[];
			newScores = scores.concat({ topic: name, scores: [newUserScore] });
			setScores(newScores);
		}
	};

	let TOTAL_QUESTIONS: number = questions.length;
	let name: string = "";
	if (questions.length) {
		name = questions[0].topic;
	}

	return (
		<div className="quiz--body light--headers">
			<h1 className="quiz--title">{name !== "" && name}</h1>
			{loading && (
				<div className="container-center" style={{ width: "100%" }}>
					{/* <Loader type="TailSpin" color="#51c84d" height={100} width={100} /> */}
          <Loader type="Hearts" color="#51c84d" height={150} width={150} />
				</div>
			)}
			{!loading &&
				!gameOver &&
				questions &&
				questions.map((item) => (
					<div
						style={{ display: questionNumber === item.id ? "" : "none" , backgroundColor: ansColor}}
						className="question--body"
            
					>
						<div className="question--header">
							<div className="question--number">
								<span style={{ color: "#51C84D" }}>{`${questionNumber}`}</span>
								{`/${TOTAL_QUESTIONS}`}
							</div>
							<div className="time--left">
								<CountdownCircleTimer
									key={questionNumber}
									size={50}
									strokeWidth={3}
									isPlaying
									duration={30}
									colors={[
										["#10B981", 0.33],
										["#F7B801", 0.33],
										["#A30000", 0.33],
									]}
									onComplete={() => {
										nextQuestion("");
										return [true, 0];
									}}
								>
									{({ remainingTime }) => remainingTime}
								</CountdownCircleTimer>
							</div>
						</div>
						<hr style={{ margin: "2rem 0" }} />
						<p className="question">{item.question}</p>
						<div className="options">
							{item.answers.map((opt, index) => (
								<div
									onClick={ () => {
										submitAnswer(opt, item.correct_answer);
									}}
								>
									<p>{index + 1}.</p>
									<p>{opt}</p>
								</div>
							))}
						</div>
            {!gameOver && !loading && questionNumber !== TOTAL_QUESTIONS ? (
				<button className="btn btn-primary next" onClick={() => nextQuestion("")}>
					Next Question
				</button>
			) : <></>}
					</div>
				))}
			
			{gameOver && (
				<Result
					questions={questions}
					responses={response}
					score={score / TOTAL_QUESTIONS}
					startQuiz={startQuiz}
				/>
			)}
		</div>
	);
}

export default Quiz;
