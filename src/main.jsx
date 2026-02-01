import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "14px",
            padding: "12px 14px",
            fontWeight: 600,
            background: "#09637E",
            color: "#ffffff",
          },
          success: {
            style: {
              background: "#09637E",
              color: "#ffffff",
            },
          },
          error: {
            style: {
              background: "#B91C1C",
              color: "#ffffff",
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
