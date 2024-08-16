const bcrypt = require('bcrypt');

const users = [
  {
    id:1,
    email: "joaosilva@gmail.com",
    password: bcrypt.hashSync("password123", 10), 
  },
  {
    id:2,
    email: "mariaoliveira@gmail.com",
    password: bcrypt.hashSync("password456", 10), 
  },
  {
    id:3,
    email: "pedrosouza@gmail.com",
    password: bcrypt.hashSync("password123", 10), 
  },
  {
    id:4,
    email: "juliomendonca@gmail.com",
    password: bcrypt.hashSync("password123", 10), 
  },
  {
    id:5,
    email: "augustoneves@gmail.com",
    password: bcrypt.hashSync("password123", 10), 
  },
];

module.exports = users;
