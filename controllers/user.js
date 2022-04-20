const express = require('express')
const User = require('../models/user')
const userRouter = express.Router()
const bcrypt = require('bcrypt')


//signup - GET/POST
userRouter.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

userRouter.post('/signup', async (req, res) => {
    //capture pw and hash 
    //async returns promise
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    //console.log(password)
    // store user data in db
    User.create(req.body, (err, user) => {
        if (err) console.log(err)
        //redirect user to login
        res.redirect('/user/login')
    })

})

//login - GET/POST
userRouter.get('/login', (req, res) => {
    res.render('login.ejs')
})

// login - POST: user data to server for login
userRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, async (err, user) => {
      // if user doesnt exist send error message
      if (err || !user) return res.send("user does not exist")
      // compare password hashes
      const passwordMatches = await bcrypt.compare(password, user.password)
      // handle incorrect password
      if (!passwordMatches) return res.send("Incorrect password")
      // save login status in session
      req.session.loggedIn = true
      req.session.username = username
      // redirect to home - home will check for login
      res.redirect("/")
    }) 
  })




//logout - destroy session
// logout
userRouter.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

module.exports = userRouter