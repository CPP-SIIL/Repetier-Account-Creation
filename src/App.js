import React, { useState } from "react";

const App = () => 
{
  const [broncoId, setBroncoId] = useState(""); // For login
  const [name, setName] = useState(""); // For name
  const [password, setPassword] = useState(""); // For password
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
      name: name || broncoId, // Use Bronco ID as the fallback for name
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>SIIL Account Creator</h1>
      <form onSubmit = {handleSubmit}>
        <div style = {{marginBottom: "20px"}}>
          <input
            type = "number"
            placeholder = "Enter Bronco ID (Login)"
            value = {broncoId}
            onChange = {(e) => setBroncoId(e.target.value)}
            style = {{padding: "10px", fontSize: "16px", width: "300px"}}
            required
          />
        </div>
        <div style = {{marginBottom: "20px"}}>
          <input
            type = "text"
            placeholder = "Enter Name (Optional)"
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            style = {{padding: "10px", fontSize: "16px", width: "300px"}}
          />
        </div>
        <div style = {{marginBottom: "20px"}}>
          <input
            type = "password"
            placeholder = "Enter Password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            style = {{padding: "10px", fontSize: "16px", width: "300px"}}
            required
          />
        </div>
        <button
          type = "submit"
          style = {{padding: "10px 20px", fontSize: "16px", cursor: "pointer",}}
        >
          Create Account
        </button>
      </form>
      <p>{message}</p>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "14px",
          color: "#333",
          textAlign: "left",
          margin: "auto",
          display: "inline-block",
        }}
      >
        <h2 style = {{fontSize: "16px", marginTop: "1px", marginBottom: "4px", marginLeft: "4px", color: "#333"}}>
          Password Instructions:
        </h2>
        <ul style = {{margin: 0, paddingLeft: "20px"}}>
          <li>Password must be at least <strong>8 characters</strong>.</li>
          <li>
            If no password is provided, your Bronco ID will be set as your
            default password.
          </li>
          <li>
            Ensure you remember your password. You can change it later if needed.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;