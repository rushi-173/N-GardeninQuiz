import React from "react";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const Navbar: React.FC = () => {
  const { auth } = useAuth();

  const [hamburgerStyles, setHamburgerStyles] = useState(
		"hamburger-menu pointer"
	);
	const [menuStyles, setMenuStyles] = useState("menu hide-menu");
	


	const hamburgerClickHandler = () => {
		if (hamburgerStyles.includes("click")) {
			setHamburgerStyles("hamburger-menu pointer");
			setMenuStyles("menu hide-menu");
		} else {
			setHamburgerStyles("hamburger-menu pointer click");
			setMenuStyles("menu show-menu");
		}
	};

	const menuHandler = () => {
		setHamburgerStyles("hamburger-menu pointer");
		setMenuStyles("menu hide-menu");
	};

	return (
		<nav className="navbar">
			<div className="container-center">
				<div
					className={hamburgerStyles}
					onClick={hamburgerClickHandler}
					id="menu-open-button"
					role="button"
				>
					<span className="hamburger-menu-line"></span>
					<span className="hamburger-menu-line"></span>
					<span className="hamburger-menu-line"></span>
				</div>

				<Link to="/" className="container-center brand-logo">
					<p className="brand-name">
						GARDENIN<span>QUIZ</span>
					</p>
				</Link> 
			</div>
		
			<ul className={menuStyles} onClick={menuHandler} id="menu">
				<li className="menu-item">
					<b>
						<Link to="/">Home</Link> 
					</b>
				</li>
				
				<li className="menu-item">
					<b>
						<Link to="/quizzes">Quizzes</Link> 
					</b>
				</li>
		{
			auth ?
				(<li className="menu-item">
					<b>
						<Link to="/profile">Account</Link> 
					</b>
				</li>) :
				(<li className="menu-item">
				<b>
					<Link to="/login">SignIn/SignUp</Link> 
				</b>
			</li>) }

				
			</ul>
		</nav>
	);
};

export default Navbar;
