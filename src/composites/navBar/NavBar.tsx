import React from "react";
import styles from "./NavBar.module.scss";
import { Tabs } from "../../utils/tabs/Tabs";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["navbar"]}>
        <div className={styles["tiac-logo"]}></div>
      </div>
      <div className={styles["navbar-tabs"]}>
        {Tabs.map((tab, index) => {
          return (
            <div
              key={index}
              className={styles["navbar-tab"]}
              onClick={() => navigate(tab.route)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NavBar;
