const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');

exports.registerController =async (req,res) => {
   
    try
    {
       const {username,email,password} = req.body;
       if(!username || !email || !password)
       {
           res.status(400).send({
             success:false,
             message:"Please Fill all Fields"
           })
       }

       const existingUser = await userModel.findOne({email});
       if(existingUser)
       {
        return res.status(401).send({
            message:"User Already Exist",
            success:false,
        })
       }
    
       const hashedPassword = await bcrypt.hash(password,10);

       const user = new userModel({username,email,password:hashedPassword});
       await user.save();

       return res.status(201).send({
         success:true,
         message:"New user Created",
         user,
       });
    }
    catch(error)
    {
       console.log(error);
       return res.status(500).send({
        message:"Error in Message CallBack",
        success:false,
        error
       })
    }
}

exports.getAllUsers = async(req,res) => {
    try{
       const users = await userModel.find({});

       return res.status(200).send({
         userCount:users.length,
         success:true,
         message:"All Users Data",
         users,
       })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
        message:"Error in Get All Users",
        success:false,
        error
       });
    }

}



exports.loginController = async(req,res) => {
   try{
      const {email,password} = req.body;
      if(!email || !password)
      {
         return res.status(401).send({
            success:false,
            message:"Fill all the Details",
         })
      }

      const user = await userModel.findOne({email});
      console.log(user)
      if(!user)
      {
         return res.status().send({
            success:false,
            message:"Email is not Registered",
         })
      } 

      const isMatch = await bcrypt.compare(password,user.password);
      console.log("isMatch" + isMatch);
      if(!isMatch)
      {
         return res.status(401).send({
            success:false,
            message:"Invalid username or Password"
         })
      }
      
      return res.status(200).send({
        success:true,
        message:"Login Successful",
        user
      })
   }
   catch(error)
   {
       console.log(error);
       return res.status(500).send({ 
       message:"Error in Login Callback",
       success:false,
       error
       });
   }
}
