import express from "express";
import models from "./models/index.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  }
  next();
});

app.get("/", (req, res) => res.send("GET request!"));
app.post("/", (req, res) => res.send("POST request!"));
app.put("/", (req, res) => res.send("PUT request!"));
app.delete("/", (req, res) => res.send("DELETE request!"));

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Running on port ${PORT}`)
})

/* 
Test Scripts

curl -X GET http://localhost:3000/users/2
curl -X GET http://localhost:3000/session

curl -X GET localhost:3000/messages/1
curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Original message here!"}'
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/messages/1 -d '{"text":"New message here!"}'
curl -X DELETE http://localhost:3000/messages/1
*/