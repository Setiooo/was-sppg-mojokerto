// Titik masuk aplikasi. Memuat React, stylesheet, lalu me-render <App/> ke #root.
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import "./styles/dashboard.css";
import "./styles/forms.css";

const container = document.getElementById("root");
createRoot(container).render(<App />);
