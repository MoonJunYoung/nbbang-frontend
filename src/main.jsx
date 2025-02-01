import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { clearServiceWorker } from "./utils/clearServiceWorker";

clearServiceWorker(); 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
