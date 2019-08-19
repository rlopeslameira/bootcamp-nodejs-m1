const express = require("express");

const app = express();

app.use(express.json());

const users = ["Rodrigo", "Francisco", "Alex", "Yan"];

// CRUD = create, read, update, delete

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required." });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const { index } = req.params;

  if (!users[index]) {
    return res.status(400).json({ error: "User not found." });
  }

  return next();
}

app.use("/", (req, res, next) => {
  console.time("Request");

  //console.log(`Method: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

app.get("/", checkUserInArray, (req, res) => {
  res.json(users);
});

app.get("/:index", (req, res) => {
  const { index } = req.params;

  res.json(users[index]);
});

app.post("/", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  res.json(users);
});

app.put("/:index", checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  res.json(users);
});

app.delete("/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  res.json(users);
});

/*
// Query Params: ?nome=Rodrigo
app.get("/", (req, res) => {
  const { nome } = req.query;

  res.json({ message: `Hello ${nome}` });
});

// Route Params: /users/1
app.get("/users/:index", (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});

// Body Params: { "email": "rlopeslameira@mail.com", "nome" : "Rodrigo Lopes"}
app.get("/users/:index", (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});
*/
app.listen(3333);
