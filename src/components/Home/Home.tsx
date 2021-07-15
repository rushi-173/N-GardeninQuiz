import React, {useState} from "react";
import "./Home.css";
import { categories, Topic } from "./quiz.categories";
import { Link } from "react-router-dom";
import { useScore } from "../../contexts/scoreContext";
import Loader from "react-loader-spinner";
import { useToasts } from 'react-toast-notifications';



type QuizProps = {
  name: string;
  link: string;
};

const QuizItem: React.FC<{name: string, link: string}> = ({ name, link }: QuizProps) => {
  return (
    <div className="txt-card pointer mb">
					<p className="title">QUIZ: {name}</p>
					<p className="subtitle">Note-</p>
					<p className="txt-content">
						The quiz will start immediatly and you will get only 30 seconds to answer each question.
					</p>
          
          <Link className="link " to={link}>
					<button className="btn btn-primary">Play Now!</button></Link>
				</div>
  );
};

function Home() {
  const [ category, setCategory ] = useState<Topic[]>([]);
  const [ loading, setLoading ] = useState(false);
	const [searchText, setSearchText] = useState<string>("");
  const { scores } = useScore();

  console.log(scores, "context ka score", category)

  React.useEffect(()=>{
    categories(setCategory, setLoading);
  },[])

  return (
    <div
    className={" home--body light--headers"
    }>
      	<div
					className="container search-container"
					style={{ flexWrap: "nowrap" }}
					id="search"
				>
					<div className="input-group" style={{ width: "100%", margin: "0" }}>
						<input
							id="name"
							type="search"
							value={searchText}
							className="input-area"
							style={{ borderRadius: "0px" }}
							onChange={(e) => {
								setSearchText(e.target.value);
							}}
							// ref={searchInput}
						/>
						<label style={{visibility: searchText===""?"visible":"hidden",}}>Search</label>
					</div>
          <button
						className="btn btn-primary"
						style={{ width: "20%", margin: "0", borderRadius: "0px" }}
					>
						<i className="fa fa-search" aria-hidden="true"></i>
					</button>
          </div>
      {loading && (
        <Loader type="TailSpin" color="#51c84d" height={100} width={100} />
      )}
      <div className="home--grid">
        {category.length && category.map((item: Topic) => (
            <h1>
              <QuizItem name={item.topic} link={`/quizzes/${item._id}`} />
            </h1>
        ))}
      </div>
    </div>
  );
}

export default Home;
