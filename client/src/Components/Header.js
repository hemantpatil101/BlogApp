import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Button,Typography,Tabs,Tab} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../Redux/Store';
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast'
const Header = () => {
    const [value,setValue] = useState(0);
    let isLogin = useSelector(state => state.isLogin);

    isLogin = isLogin || localStorage.getItem('userId');
     
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try{
           dispatch(authActions.logout());
           toast.success("Logged out Successfully");
           navigate('/login');
           localStorage.clear();
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <>
    <AppBar position='sticky' sx={{ backgroundColor: '#2071E0' }}>
    <Toolbar>
        <Typography variant='h4'>
            My Blog App
        </Typography>
        {isLogin && 
        (
            <Box display={'flex'} marginLeft='auto' marginRight='auto'>
            <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)}>
               <Tab label="Blogs" LinkComponent={Link} to="/blogs"></Tab>
               <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"></Tab>
               <Tab label="Create Blog" LinkComponent={Link} to="/create-blog "></Tab>
            </Tabs> 
            </Box>
        )
        }
        
        <Box display={'flex'} marginLeft="auto">
            {!isLogin &&
            (
                <>
                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/login">Login</Button>
                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/register">Register</Button>
                </>
            )
            }
            {isLogin &&
             (<Button onClick={handleLogout} sx={{margin:1,color:'white'}}>LogOut</Button>)
            }
        </Box>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Header