import Header from "./Components/Header";
import {Route,Routes} from 'react-router-dom';
import Blogs from "./Pages/Blogs";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import MyBlogs from "./Pages/MyBlogs";
import CreateBlog from "./Pages/CreateBlog";
import BlogDetails from "./Pages/BlogDetails";
import toast,{Toaster} from 'react-hot-toast'
function App() {
  return (
    <div>
      <Header/>
      <Toaster/>
      <Routes>
        
        <Route path="/" element={<Blogs/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/my-blogs" element={<MyBlogs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/blog-details/:id" element={<BlogDetails/>}/>
        <Route path="/create-blog" element={<CreateBlog />}/>
      </Routes>
    </div>
  );
}

export default App;
