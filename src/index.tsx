import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { ScoreProvider } from "./contexts/scoreContext";

ReactDOM.render(
  <React.StrictMode>
        <AuthProvider>
          <ScoreProvider>
            <App />
          </ScoreProvider>
        </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
