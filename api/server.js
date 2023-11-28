require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const userController = require("./controllers/user.controller");
const checkController = require('./controllers/check.controller');

const authMiddleware = require("./middlewares/auth.middleware");
const userMiddleware = require("./middlewares/user.middleware");

const db = require("./models/mongodb");
console.log(db.url);
db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });


    // Me da un error de corsOptions, por lo que lo comento
// var corsOptions = {
//   origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
// };

app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

app.use(authMiddleware);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to application",
    data: ["NodeJS", "Express", "MongoDB", "Docker"]
  });
});

/*
 * Routes for User
 */
app.post("/user",userMiddleware, userController.createUser);
app.get("/user", userController.readUsers);
app.get("/user/search/nombre/:nombre", userController.getUserByName);
app.get("/user/search/rut/:rut", userController.getUserByRut);
app.put("/user/:rut",userMiddleware, userController.updateUser);
app.delete("/user/:rut", userMiddleware, userController.deleteUser);


/*
 * Routes for Check
 */
app.post("/check", userMiddleware, checkController.createCheck);
app.get("/check/search/rut/:rut", checkController.searchCheckByRut);
app.delete("/check/:rut", userMiddleware, checkController.deleteCheck);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
