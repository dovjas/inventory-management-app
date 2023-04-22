const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name']
    },
    email:{
        type:String,
        required:[true, 'Please add your email'],
        trim:true,
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid password"
        ]
    },
    password:{
        type:String,
        required:[true,'The password is required'],
        minLenght:[7,'The minimum amount of characters is 7'],
        maxLenght:[24,'The maximum amount of characters is 24']
    },
    photo:{
        type:String,
        required:[true,'Please add your photo'],
        default:'https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1682011143~exp=1682011743~hmac=1560001dcfdc542bbd3f3446c7ae3d7a72a830be4f9baafceb0a17835c491605'
    },
    phone:{
        type:String,
        default:'+370'
    },
    bio:{
        type:String,
        maxLenght:[200,'Bio cannot be longer than 200 character'],
        default:'bio',
    },
},{
    timestamps:true,
})
//Ecnrypt password before saving to DB
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
//Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(this.password, salt);
this.password = hashedPassword;
next();
})
//Encrypy password before saving to DB


const User = mongoose.model('User',userSchema);
module.exports = User;