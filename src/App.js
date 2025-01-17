import React, { useState } from "react";
import "./App.css";
import flagImage from "./assets/index.png";
import headerIcon from "./assets/icon.jpeg";

const App = () => 
{
  const [broncoId, setBroncoId] = useState(""); // For login
  const [userName, setUserName] = useState(""); // For name
  const [password, setPassword] = useState(""); // For password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages
  
  const handleSubmit = async (e) => 
  {
    e.preventDefault(); // Prevent page reload
    setMessage("Processing...");

    // Password validation
    if (password && password.length < 8) 
    {
      setMessage("Error: Password must be at least 8 characters long.");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) 
    {
      setMessage("Passwords do not match!");
      return;
    }

    // If password is not provided, set it to the Bronco ID
    const defaultPassword = password || broncoId;

    // API endpoint and API key
    const apiUrl = "http://10.110.205.225:3344/printer/api/adminprinter";
    const apiKey = "1d6928dd-59f9-4b30-a538-fd83236adf1e";

    // Data for the API request
    const requestData = 
    {
      login: broncoId,
      password: defaultPassword, // Use user-provided password or default password as Bronco ID
      permissions: 3, // User permissions (adjust as needed)
      name: userName || broncoId, // Use Bronco ID as the fallback for name
    };

    try 
    {
      // Make the API request
      const response = await fetch(`${apiUrl}?a=createUser&data=${encodeURIComponent(JSON.stringify(requestData))}&apikey=${apiKey}`,
        {
          method: "POST",
        }
      );

      if (response.ok)
      {
        const data = await response.json();
        setMessage(`Account created successfully: ${JSON.stringify(data)}`);
        console.log("Success:", data);
      } 
      else 
      {
        setMessage("Error: Unable to create account.");
        console.error("Error:", response.statusText);
      }
    } 
    catch (error) 
    {
      setMessage("Error: Something went wrong.");
      console.error("API Call Error:", error);
    }
  };

  return (

    // Form for creating an account
    <div className = "App">
      {/* Header Section */}
      <header className="app-header">
        <div className="header-left">
          <img
            src = {headerIcon}
            alt = "Logo"
            className = "header-logo"
          />
          <span className = "header-title">Repetier-Server Pro 1.4.15</span>
        </div>
        <div className = "header-right">
          <i className = "fas fa-expand-arrows-alt"></i>
          <img
            src = {flagImage}
            alt = "Language"
            className = "header-flag"
          />
        </div>
      </header>

      {/* Form Section */}
      <div className = "form-container">
        <div className = "form-header">
          <i className = "fas fa-user form-header-icon"></i>
          <span className = "form-header-title">Please create account</span>
        </div>
        <form onSubmit = {handleSubmit}>
          <div className = "form-group">
            <label htmlFor = "login">Login:</label>
            <input
              type = "number"
              id = "login"
              placeholder = "Login"
              value = {broncoId}
              onChange = {(e) => setBroncoId(e.target.value)}
              className = "form-input"
              required
            />
          </div>
          <div className = "form-group">
            <label htmlFor = "userName">User Name (Optional):</label>
            <input
              type = "text"
              id = "userName"
              placeholder = "User Name"
              value = {userName}
              onChange = {(e) => setUserName(e.target.value)}
              className = "form-input"
            />
          </div>
          <div className = "form-group">
            <label htmlFor = "password">Password:</label>
            <input
              type = "password"
              id = "password"
              placeholder = "Password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              className = {`form-input`}
              required
            />
          </div>
          <div className = "form-group">
            <label htmlFor = "confirmPassword">Confirm Password:</label>
            <input
              type = "password"
              id = "confirmPassword"
              placeholder = "Confirm Password"
              value = {confirmPassword}
              onChange = {(e) => setConfirmPassword(e.target.value)}
              className = {`form-input`}
              required
            />
          </div>
          <div className = "form-checkbox">
            <label>
              <input type = "checkbox" /> Remember me
            </label>
          </div>
          <button type = "submit" className = "form-button"> Create Account</button>
        </form>
        {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
};

export default App;