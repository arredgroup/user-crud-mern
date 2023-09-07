require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

/*
var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));
 */

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to application",
    data: ["NodeJS", "Express", "MongoDB", "Docker"]
  });
});

app.post("/usuario", (req, res) => {
  const { nombre, edad } = req.body;
  res.send(`El nombre es: ${nombre} y la edad es: ${edad}`);
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
