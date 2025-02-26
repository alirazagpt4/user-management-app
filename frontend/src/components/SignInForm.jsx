import { useNavigate} from 'react-router-dom';
import { TextField , Box , Typography , Button , Container, Paper} from "@mui/material";
import {ToastContainer , toast} from 'react-toastify';
import { useState } from "react";


function SignInForm() {
  const navigate = useNavigate();
  const [data , setData] = useState({
    email:'',
    password:''
  });

  const handleChange = (e)=>{
    setData({...data , [e.target.name]:e.target.value});
  }

  console.log(data);

  const handleClick = async ()=>{
    try{

      setData(data);
    console.log(data);
    // navigate('/home');
    const response = await fetch('http://localhost:4000/api/signin',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json() ;
    console.log(result);
    if(response){
        toast.success('login successfully !')
        localStorage.setItem('token' , result.token);
        setTimeout(()=>{
          navigate('/home');
        },2000)
    }
    else{
       toast.error('Error in login ');
      
    }
    }
    catch(err){
        toast.error(err)
    }
    

  }

   return (
   <>
   <Container sx={{display:'flex', justifyContent:'center' , alignItems:'center'}}>
     <Paper sx={{padding:4 , mt:4}} elevation={4}>
          <Typography variant="h2" >Sign in</Typography>
     <Box sx={{ margin: 8, width: '60%'}}>
          <TextField name="email" label="Email" onChange={handleChange} variant="outlined" sx={{margin:1}}/>
          {data.email}
          <br />
          <TextField name="password" label="password" onChange={handleChange} variant="outlined" sx={{margin:1}} />
           {data.password}
          <br />
          <Button  variant="contained" color="primary" onClick={handleClick} sx={{margin:1}} >
            Sign In
          </Button>
    </Box>
    </Paper>
   </Container>
          <ToastContainer/>
   </>
  )
}

export default SignInForm
