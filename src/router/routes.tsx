import App from "../App";
import GroupsPage from "../pages/groups/GroupsPage";
import ProjectsPage from "../pages/projects/ProjectsPage";
import RolesPage from "../pages/roles/RolesPage";
import UserPage from "../pages/users/UserPage";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users",
        index: true,
        element: <UserPage />,
      },
      {
        path: "projects",
        children: [
          {
            index: true, // /projects
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
      {
        path: "permissions",
        element: <UserPage />,
      },
    ],
  },
];
