const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const route = require('./routes/userRoutes') 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// app.use(cors());
app.use(cors({
    origin: "http://localhost:5173", // ✅ Frontend origin allow karein
    credentials: true // ✅ Cookies allow karein
  }));
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());
// Routes
app.get('/' , (req , res)=>{
    res.json({message:'Hello from server!'})
});

app.use('/api', route);
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})