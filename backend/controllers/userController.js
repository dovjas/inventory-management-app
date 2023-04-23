const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

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

    //Create a new user
    const user = await User.create({
        name,
        email,
        password,
    })
    //Generate Token
    const token = generateToken(user._id);
    
    //Send HTTP only cookie
    res.cookie("token",token,{
        path:'/',
        sameSite:'none',
        httpOnly:true,
        expires: new Date(Date.now() + 1000 * 86400),
        secure:true,
    })

    if(user){
        const {_id, name, email, password, phone, bio} = user
        res.status(201).json({
            _id, 
            name, 
            email, 
            password, 
            phone, 
            bio,
            token
        })  
    }else {
        res.status(400);
        throw new Error("Invalid user data");
    }});

module.exports= {
   userRegister,
};