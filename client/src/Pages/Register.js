import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box,Typography,TextField,Button } from '@mui/material'
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast'
const Register = () => {
    const [inputs,setInputs] = useState({
        name:'',
        email:'',
        password:''
    });
     
    const navigate = useNavigate();

    const handleChange = (e) => {
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value,
          }));
    };

    const handleSubmit = async(e) => {
          e.preventDefault();
          console.log(inputs);
          try{
             const data = await axios.post('/api/v1/user/register',{
                 username:inputs.name,
                 email:inputs.email,
                 password:inputs.password,
             })
              console.log(data);
             if(data.success)
             {
                toast.success("User Registered Successfully")
                navigate('/login');
             }
          }
          catch(error)
          {
             console.log(error);
          }
    }
  return (
    <form onSubmit={handleSubmit}>

    <Box
    maxWidth={450}
    display="flex"
    flexDirection={"column"}
    alignItems="center"
    justifyContent={"center"}
    margin="auto"
    marginTop={5}
    boxShadow="10px 10px 20px #ccc"
    padding={3}
    borderRadius={5}
    >
    <Typography
          variant="h4"
          sx={{ textTransform: "uppercase" }}
          padding={3}
          textAlign="center"
        >
          Register
        </Typography>
        <TextField
          placeholder="name"
          value = {inputs.name}
          onChange={handleChange}
          name="name"
          margin="normal"
          type={"text"}
          required
        />
        <TextField
          placeholder="email"
          value = {inputs.email}
          onChange={handleChange}
          name="email"
          margin="normal"
          type={"email"}
          required
        />
        <TextField
          placeholder="password"
          value = {inputs.password}
          onChange={handleChange}
          name="password"
          margin="normal"
          type={"password"}
          required
        />
    
    
    <Button
    type="submit"
    sx={{borderRadius:3,marginTop:3}}
    variant='contained'
    color='primary'
    >
    Submit</Button>
    <Button sx={{borderRadius:3,marginTop:3}} onClick={() => navigate('/login')} >
    Already Registered ? Please Login</Button>
    </Box>
    </form>
  )
}

export default Register