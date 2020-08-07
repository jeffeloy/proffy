import express, { request } from "express";

const app = express();

app.get("/users", (request, response) => {
  const users = [{ name: "Jefferson", age: 21 }];

  return response.json(users);
});

app.listen(3333);
