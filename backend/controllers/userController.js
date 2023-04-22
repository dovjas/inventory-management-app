const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const userRegister = asyncHandler(
    async(req,res)=>{
        const {name, email, password} = req.body;

        if(!name||!email||!password){
            res.status(400)
            throw new Error("Please fill in all fields")
        };
        if(password.lenght < 7){
            res.status(400)
            throw new Error("Password can't be shorte than 7 chars")
        };

    //Check if user already exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error("This user already exists")
    };
    //Encrypt password before saving to DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

    //Create a new user
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })
    if(user){
        const {_id, name, email, password, phone, bio} = user
        res.status(201).json({
            _id, name, email, password, phone, bio
        })  
    }else {
        res.status(400);
        throw new Error("Invalid user data");
    }});



module.exports= {
   userRegister,
};