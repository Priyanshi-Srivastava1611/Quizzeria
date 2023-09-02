import React from "react";
import { useState } from "react";
import "./HomePage.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
export const HomePage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("Email is invalid");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      localStorage.setItem("email", event.target.value);
      setError(null);
    }
    setEmail(event.target.value);
  };

  return (
    <div className="Home-container">
      <div className="Home-parent">
        <div className="home-text">
          <Typography className="home-text-h2">Welcome to Quizeeria</Typography>
        </div>
        <div className="home-text">
          <Typography className="home-text-h1">ENTER YOUR EMAIL</Typography>
        </div>
        <div className="email-box-container">
          <input
            className="email-input-box"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <h2 style={{ color: "red" }}>{error}</h2>
        ) : (
          <Link
            className="btn-redirect"
            to="/Quizzeria/main"
            style={{ textDecoration: "none" }}
          >
            <button className="submit-btn">SUBMIT</button>
          </Link>
        )}
      </div>
    </div>
  );
};
