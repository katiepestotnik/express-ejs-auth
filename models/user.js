const mongoose = require('./connection')
//use to build model from mongoose
//mongoose.Schema
//mongoose.model

const {Schema, model} = mongoose

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true}
})

const User = model("User", userSchema)

module.exports = User