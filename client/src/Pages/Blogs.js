import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import BlogCards from '../Components/BlogCards'
const Blogs = () => {
    const [blogs,setBlogs] = useState([]);

    const getAllBlogs = async() =>{
        try{
           const {data} = await axios.get('/api/v1/blog/all-blog');
           console.log(data.blogs);
           if(data?.success)
           {
              setBlogs(data?.blogs);
              console.log(blogs);
           }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
    getAllBlogs();
    },[])
    
    return (
        <div>
          {  
            //console.log(blogs)
            blogs && blogs.map((blog) => (
              <BlogCards
                key={blog?._id}  // Add a key prop for each mapped component
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog.createdAt}
              />
            ))
          }
        </div>
      );
      
}

export default Blogs