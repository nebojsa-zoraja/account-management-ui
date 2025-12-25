import styles from "./NavBar.module.scss";
import { tabs } from "../../utils/tabs/Tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Tooltip, Avatar, Box } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import useAuthStore from "../../store/authStore/AuthStore";
import { authApi } from "../../api/authApi";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, accessToken, logout } = useAuthStore();

  const isActiveTab = (route: string) => {
    return (
      location.pathname === route || location.pathname.startsWith(route + "/")
    );
  };

  const handleLogout = async () => {
    try {
      if (accessToken) {
        await authApi.logout(accessToken);
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      logout();
      navigate("/login");
    }
  };

  // Add admin tab if user is admin
  const LogoutIcon = FiLogOut as any;

  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-header"]}>
        <div className={styles["navbar-brand"]}>
          <div className={styles["tiac-logo"]}></div>
          <div className={styles["brand-text"]}>
            <div className={styles["brand-title"]}>Upravljanje nalozima</div>
          </div>
        </div>
        <div className={styles["navbar-user"]}>
          <Box className={styles["user-container"]}>
            <Box className={styles["avatar-container"]}>
              <Avatar className={styles["avatar"]}>
                {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
              </Avatar>
              <span
                className={styles["username-text"]}
              >{`${user?.firstName} ${user?.lastName}`}</span>
            </Box>
            <Tooltip title="Odjava">
              <IconButton
                onClick={handleLogout}
                className={styles["logout-button"]}
              >
                <LogoutIcon className={styles["logout-icon"]} size={20} />
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
        {tabs.map((tab, index) => {
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
