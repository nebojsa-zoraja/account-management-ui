import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import useAuthStore from "../../store/authStore/AuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // TODO: Implement actual authentication logic
    setTimeout(() => {
      if (username && password) {
        // Simulate successful login
        const mockToken = "mock-jwt-token-" + Date.now();
        const mockUserId = 1;
        login(username, mockToken, mockUserId);
        console.log("Login successful");
        navigate("/users");
      } else {
        setError("Please enter both username and password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <div className={styles["login-header"]}>
          <div className={styles["logo-container"]}>
            <div className={styles["tiac-logo"]}></div>
          </div>
          <h2 className={styles["app-title"]}>Account Management System</h2>
          <p className={styles["app-subtitle"]}>Internal Access Portal</p>
        </div>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            autoComplete="username"
            disabled={isLoading}
            required
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={isLoading}
            required
            margin="normal"
            variant="outlined"
          />

          {error && (
            <Alert severity="error" className={styles["error-alert"]}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            className={styles["login-button"]}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} color="inherit" className={styles["progress-spinner"]} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className={styles["login-footer"]}>
          <p className={styles["footer-text"]}>For authorized personnel only</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
