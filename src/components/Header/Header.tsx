import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Newone from "./Newone.png"

const Header: React.FC = () => {

  return (
		<div className="Home">
			<div className="main">
				<h1>
					GARDENINQUIZ - QUIZ APPLICATION FOR GARDENING LOVERS
				</h1>
				
        <span>
        Quiz is the perfect quiz game for having fun and learning new things at the same time! No matter if you’re alone, with friends or family, you’ll get so much FUN that you won’t stop playing this trivia game! :D
				</span>
				<div style={{marginTop: "2rem"}}>
  
					<Link to="/quizzes"><button className="btn btn-primary" style={{fontSize: "1.5rem"}} ><b>Get Started</b></button></Link> &nbsp; &nbsp;
       
					<button className="btn btn-outline-primary" style={{fontSize: "1.5rem"}} ><b>Download Guide</b></button>
				</div>
				<p style={{paddingLeft: "0.5rem", marginTop: "1rem"}}>Currently <b>v0.1.0</b></p>
			</div>
			<div className="brand">
				<img src={Newone} alt="notes"/>
				<h1 className="brand-name mainhead" style={{ marginTop: "1rem"}}>GARDENIN<span className="mainhead">QUIZ</span></h1>
			</div>			
		</div>
	);
  
};

export default Header;
