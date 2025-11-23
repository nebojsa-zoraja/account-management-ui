import styles from "./NavBar.module.scss";
import { Tabs } from "../../utils/tabs/Tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Tooltip, Avatar, Box } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import useAuthStore from "../../store/authStore/AuthStore";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, logout } = useAuthStore();

  const isActiveTab = (route: string) => {
    return location.pathname === route;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const LogoutIcon = FiLogOut as any;

  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-header"]}>
        <div className={styles["navbar-brand"]}>
          <div className={styles["tiac-logo"]}></div>
          <div className={styles["brand-text"]}>
            <div className={styles["brand-title"]}>Account Management</div>
          </div>
        </div>
        <div className={styles["navbar-user"]}>
          <Box className={styles["user-container"]}>
            <Box className={styles["avatar-container"]}>
              <Avatar className={styles["avatar"]}>
                {username?.charAt(0).toUpperCase()}
              </Avatar>
              <span className={styles["username-text"]}>{username}</span>
            </Box>
            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                className={styles["logout-button"]}
              >
                <LogoutIcon size={20} />
              </IconButton>
            </Tooltip>
          </Box>
        </div>
      </div>
      <nav
        className={styles["navbar-tabs"]}
        role="navigation"
        aria-label="Main navigation"
      >
        {Tabs.map((tab, index) => {
          const isActive = isActiveTab(tab.route);
          return (
            <button
              key={index}
              className={`${styles["navbar-tab"]} ${
                isActive ? styles["navbar-tab--active"] : ""
              }`}
              onClick={() => navigate(tab.route)}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
