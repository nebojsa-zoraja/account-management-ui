import { ITabDefinition } from "./ITabDefinition";

export const tabs: ITabDefinition[] = [
  {
    label: "Korisnici",
    route: "/users",
  },
  {
    label: "Projekti",
    route: "/projects",
  },
  {
    label: "Uloge",
    route: "/roles",
  },
  {
    label: "Grupe",
    route: "/groups",
  },
  { label: "Admin opcije", route: "/admin" },
];
