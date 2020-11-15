import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "dmier",
    email: "dmier@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Adr",
    email: "Adr@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users