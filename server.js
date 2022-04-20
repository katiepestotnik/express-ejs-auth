// Import Dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const PORT = process.env.PORT;

// Middleware
// Session Middleware
app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  )
app.use(morgan("tiny")); // dev logging for routes
app.use(express.static("public")); // serve files from public statically
app.use(express.urlencoded({ extended: true })); // parses url encoded bodies



const UserRouter = require("./controllers/user")
app.use("/user", UserRouter)

app.get("/", (req, res) => {
    if (req.session.loggedIn) {
        res.render("dashboard.ejs", {
          currentUser: req.session.username,
        });
      } else {
        res.render("index.ejs");
      }
})


// Listen
app.listen(PORT, () => {
  console.log(`Now listening on port:${PORT}`);
});