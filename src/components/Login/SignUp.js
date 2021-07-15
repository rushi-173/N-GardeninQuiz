import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Loader from "react-loader-spinner";

function SignUp() {
  const [error, setError] = useState("");
  // const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  
  useEffect(() => {
    if(auth){
      navigate("/")
    }
  }, [auth])

  useEffect(() => {
    if (password !== repassword) {
      setPassErr("password do not match");
    } else if (password === repassword && repassword) {
      setPassErr("password matches");
    }
  }, [repassword]);

  async function handleSignUp(e) {
    e.preventDefault();
    if (passErr === "password matches") {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "https://gardeninquiz.rushi173.repl.co/auth/register",
          {
            name: name,
            email: email,
            password: password
          }
        );
        console.log(res);
        setIsLoading(false);
        if (!res.data.user) {
          setError(res.data);
        } else {
          setEmail("");
          setName("");
          setError("");
          setPassword("");
          setRepassword("");
		      navigate("/login");
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  }

  return (
    <div className="Signup container-center">
      <div className="container-center container-column Signup-form-container">
        <h2>Sign Up</h2>
        <form className="basic-form-container container-column">
          <div className="basic-input-group">
            <label for="name">
              Name: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              className="input-area"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="basic-input-group">
            <label for="email">
              Email: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="email"
              type="text"
              className="input-area"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="basic-input-group">
            <label for="password">
              Password: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="password"
              type="password"
              className="input-area"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="basic-input-group">
            <label for="repassword">
              Re-enter Password: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="repassword"
              type="password"
              className="input-area"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <small className="err-msg">{passErr}</small>
          </div>
          <small style={{ color: "red" }} className="err-msg">
            {error}
          </small>
          <button className="btn btn-primary btn-Signup" onClick={handleSignUp}>
            {isLoading ? (
              
        <Loader type="TailSpin" color="#fff" height={20} width={20} />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="container-space-between btn-Signup">
            <Link to="/signin">
              <p>Already Registered? Login🚀</p>
            </Link>
            <p></p>
          </div>
          <hr color="white" width="100%" className="btn-Signup" />
          <br />
          
        </form>
      </div>
    </div>
  );
}

export default SignUp;
