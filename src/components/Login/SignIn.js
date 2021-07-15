import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import { useHistory, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const params = useLocation();

  useEffect(() => {
    if(auth){
      navigate("/")
    }
  }, [auth])

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://gardeninquiz.rushi173.repl.co/auth/login",
        {
          email: email,
          password: password
        }
      );
      console.log(res);
      setIsLoading(false);
      if (!res.data.token) {
        setError(res.data);
      } else {
        setAuth(res.data);
        setAuth((prev) => {
          localStorage.setItem("gquiz-auth", JSON.stringify(prev));
          return prev;
        });
        setEmail("");
        setPassword("");
		if (params.state) {
            navigate(params.state.from);
        }else{
			navigate("/")
		}
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <div className="Login container-center">
      <div className="container-center container-column login-form-container">
        <h2>Login</h2>
        <form className="basic-form-container container-column">
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
            <small className="err-msg"></small>
          </div>
          <button className="btn btn-primary btn-login" onClick={handleSignIn}>
            {isLoading ? (
               
        <Loader type="TailSpin" color="#fff" height={20} width={20} />
            ) : (
              "Login"
            )}
          </button>
          <small className="err-msg">{error}</small>
          <div className="container-space-between btn-login">
            <Link to="/signup">
              <p>Register Now 🚀</p>
            </Link>
            <p>🤔 Forgot Password?</p>
          </div>
          <hr color="white" width="100%" className="btn-login" />
          <br />
        </form>
      </div>
    </div>
  );
}

export default SignIn;
