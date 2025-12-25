import React, { useState, useEffect } from "react";
import styles from "./LoginPage.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import useAuthStore from "../../store/authStore/AuthStore";
import { authApi } from "../../api/authApi";
import { AxiosError } from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isTokenExpired } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isTokenExpired()) {
      const from = location.state?.from?.pathname || "/users";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isTokenExpired, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authApi.login({ username, password });

      const user = {
        userId: response.userId,
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        isAdmin: response.isAdmin,
      };

      login(user, response.accessToken, response.accessTokenExpiration);

      const from = location.state?.from?.pathname || "/users";
      navigate(from, { replace: true });
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Pogrešno korisničko ime ili lozinka. Samo administratori mogu da se prijave.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <div className={styles["login-header"]}>
          <div className={styles["logo-container"]}>
            <div className={styles["tiac-logo"]}></div>
          </div>
          <h2 className={styles["app-title"]}>Sistem za upravljanje nalozima</h2>
          <p className={styles["app-subtitle"]}>Portal za interni pristup</p>
        </div>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Korisničko ime"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Unesite korisničko ime"
            autoComplete="username"
            disabled={isLoading}
            required
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="password"
            label="Lozinka"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesite lozinku"
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
                Prijavljivanje...
              </>
            ) : (
              "Prijavi se"
            )}
          </Button>
        </form>

        <div className={styles["login-footer"]}>
          <p className={styles["footer-text"]}>Samo za ovlašćeno osoblje</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
