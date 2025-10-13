import { RoleInterface } from "../models/roles/Role";

export const roles: RoleInterface[] = [
  {
    id: 1,
    name: "Administrator",
    description: "Ima potpuni pristup sistemu i može upravljati svim resursima",
    isDeleted: false,
  },
  {
    id: 2,
    name: "Menadžer projekta",
    description: "Može kreirati i upravljati projektima",
    isDeleted: false,
  },
  {
    id: 3,
    name: "Developer",
    description: "Ima pristup razvojnim resursima i aplikacijama",
    isDeleted: false,
  },
  {
    id: 4,
    name: "Korisnik",
    description: "Osnovni pristup sistemu",
    isDeleted: false,
  },
  {
    id: 5,
    name: "Gost",
    description: "Ograničeni pristup samo za pregled",
    isDeleted: false,
  },
];
