const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const UserRoutes = require('./routes/userRoutes'); 
const BlogRoutes = require('./routes/blogRoutes');
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/user",UserRoutes);
app.use("/api/v1/blog",BlogRoutes);


const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,() => {
    console.log(`Server Running on Port 8080`);
})
