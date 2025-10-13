import { UserInterface } from "../models/users/User";

export const users: UserInterface[] = [
  {
    id: 2,
    isDeleted: true,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    username: "bobsmith",
  },
  {
    id: 1,
    isDeleted: false,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    username: "alicejohnson",
  },
  {
    id: 3,
    isDeleted: false,
    firstName: "Carol",
    lastName: "Williams",
    email: "carol.williams@example.com",
    username: "carolwilliams",
  },
  {
    id: 4,
    isDeleted: false,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    username: "davidbrown",
  },
  {
    id: 5,
    isDeleted: false,
    firstName: "Eva",
    lastName: "Davis",
    email: "eva.davis@example.com",
    username: "evadavis",
  },
];
