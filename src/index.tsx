import { createRoot } from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme/muiTheme";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={muiTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
