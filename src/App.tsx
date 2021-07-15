import React, {useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import Login from "./components/Login/SignIn";
import Join from "./components/Login/SignUp";
import { Profile } from "./components/Profile/Profile";
import { useAuth } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route,  useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/PageNotFound/PageNotFound";

type Pvtroute = {
  path: String,
  children: any
}

const App: React.FC = () => {
  const { auth } = useAuth();
  const [topic, setTopic] = useState<string>("")

  
  const PrivateRoute = ({ path, children }:Pvtroute) => {
		if (auth) {
			return  children;
		} else {
			return <Navigate to="/login" state={{ from: path }} />;
		}
	};

  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route  path="/">
            <Header />
          </Route>
          <PrivateRoute path="/quizzes">
          <Home />
            
          </PrivateRoute>
          <PrivateRoute path="/quizzes/:id">
            <Quiz />
          </PrivateRoute>
          <Route path="/login">
            {auth ? <Navigate to="/" /> : <Login />}
            </Route>
          <Route path="/signup">
            {auth ? <Navigate to="/" /> : <Join />}
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          
        <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>
      <ToastContainer
        style={{ position: "fixed", bottom: "0", right: "1rem" }}
      />
    </div>
  );
};

export default App;
