
const userRegister = (req,res) =>{
    if(!req.body.email){
        res.status(400)
        throw new Error("Please add an email")
    }

    res.send("User register page");
};

module.exports={
    userRegister,
};