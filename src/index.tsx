import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { ScoreProvider } from "./contexts/scoreContext";


ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
        <AuthProvider>
          <ScoreProvider>
            <App />
          </ScoreProvider>
        </AuthProvider>
        </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
