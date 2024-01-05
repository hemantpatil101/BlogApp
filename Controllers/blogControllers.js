const mongoose  = require('mongoose');
const blogModel = require('../Models/blogModel');
const userModel = require('../Models/userModel');

exports.getAllBlogsController= async(req,res) => {
    try{
       const blogs = await blogModel.find({}).populate("user");
       if(!blogs)
       {
           return res.status(200).send({
              success:false,
              message:"No Blogs Found",
           })
       }
       //console.log(blogs);
       return res.status(200).send({
         success:true,
         BlogCount:blogs.length,
         message:"All Blogs",
         blogs,
       })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error While Getting All Blogs",
            error,
        })
    }
}

exports.createBlogController = async(req,res) => {
    try{
       const {title,description,image,user} = req.body;
       console.log(title + description + image+  user)
       if(!title || ! description || !image || !user)
       {
          return res.status(400).send({
             success:false,
             message:"Please Provide All Fields",
          })
       }

       const existingUser = await userModel.findById(user);
       
       if(!existingUser)
       {
           return res.status(404).send({
             success:false,
             message:"Unable to find User"
           })
       }
       const newBlog = new blogModel({title,description,image,user});
       const session = await mongoose.startSession();
       session.startTransaction();
       await newBlog.save({session});
       existingUser.blogs.push(newBlog);
       await existingUser.save({session});

       await session.commitTransaction();
       
       await newBlog.save();

       return res.status(201).send({
        success:true,
        message:"Blog Created",
        newBlog,
      })

    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error While Creating Blog",
            error,
        })
    }
}

exports.updateBlogController = async(req,res) => {
    try{
       const {id} = req.params;
       const {title,description,image} = req.body;

       const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});

       return res.status(201).send({
        success:true,
        message:"Blog Updated",
        blog,
      })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error While Updating Blog",
            error,
        })
    }
}

exports.getBlogByIdController = async(req,res) => {
    try{
       const {id} = req.params;
       const blog = await blogModel.findById(id);

       if(!blog)
       {
           return res.status(404).send({
             success:false,
             message:"Blog not Found with given Id"
           })
       }

       return res.status(200).send({
        success:true,
        message:"Blog Fetched by ID",
        blog,
      })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error While Getting Single Blog",
            error,
        })
    }
}

exports.deleteBlogController = async(req,res) => {
    try{
       const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
       console.log("blog" + blog);
       await blog.user.blogs.pull(blog);
       await blog.user.save();

       return res.status(200).send({
         success:true,
         message:"Blog Deleted"
       })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error While Deleting a Blog",
            error,
        })
    }
}

exports.userBlogController = async(req,res ) => {
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog)
        {
            return res.status(404).send({
                success:false,
                message:"Blogs not found with this Id"
            });
        }

        return res.status(200).send({
            success:true,
            message:"User Blogs",
            userBlog
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error in User Blog",
            error,
        })
    }
}

