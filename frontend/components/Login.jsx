import { useState, useEffect } from "react";
import { login } from "../api/authApi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [loginError, setLoginError] = useState(null);

  // Use useEffect to save the user data to localStorage when userData changes
  useEffect(() => {
    if (userData) {
      // Save user data to localStorage
      localStorage.setItem(
        "userToken",
        JSON.stringify({
          userToken: userData.token,
          userRole: userData.role,
          userId: userData._id,
          username: userData.username,
        })
      );
      localStorage.setItem("user", 'ksihan'); // Or save other values here
      console.log("User data saved to localStorage:", userData);
    }
  }, [userData]); // This effect runs when userData changes

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      const loggedInUserData = { ...response.data.user, token: response.data.token };
      setUserData(loggedInUserData); // Update userData to trigger useEffect
      console.log(response);
      console.log(loggedInUserData);
    } catch (error) {
      setLoginError(error.response?.data || "Login failed"); // Set error message
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
