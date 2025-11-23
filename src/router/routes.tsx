import App from "../App";
import GroupsPage from "../pages/groups/GroupsPage";
import ProjectsPage from "../pages/projects/ProjectsPage";
import RolesPage from "../pages/roles/RolesPage";
import UserPage from "../pages/users/UserPage";
import LoginPage from "../pages/login/LoginPage";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <ProjectsPage />,
          },
        ],
      },
      {
        path: "roles",
        element: <RolesPage />,
      },
      {
        path: "groups",
        element: <GroupsPage />,
      },
    ],
  },
];
