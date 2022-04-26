const User = require("../models/user")
const jwt = require("jsonwebtoken")
require('dotenv').config()



const singup = async (req, res) => {
     const { username, email, password } = req.body
     if(!username, !email, !password) return res.status(400).send('error al registrarse proporcione informacion correcta');
     const newuser = await new User({ username, email, password });
     newuser.password = await newuser.encrypPassword(password)
     newuser.save()
     //const payload = {_id : newuser._id} damos la info con la que queremos firmar el token
     const token = jwt.sign({ _id: newuser._id }, process.env.SECRET_TOKEN)
     res.header('auth-token', token).json(token)
}


const singin = async (req, res) => {
     const { email, password } = req.body
     const newuser = await User.findOne({ email });
     if (!newuser) return res.status(400).send('Email or Password is wrong');
     const correctPassword = await newuser.validatePassword(password);
     if (!correctPassword) return res.status(400).json('Email or Password is wrong');
     //const payload = {_id : newuser._id}
     const token = jwt.sign({ _id: newuser._id }, process.env.SECRET_TOKEN)
     res.header('auth-token', token).json(token)
}

module.exports = {
     singup, singin
}