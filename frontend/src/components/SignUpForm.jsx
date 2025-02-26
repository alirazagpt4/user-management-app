import { useNavigate } from 'react-router-dom'
import { TextField, Box, Typography, Button, Container, Paper } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify'
import { useState } from "react";


function SignUpForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  }
  const handleclick = async () => {
    setData(data);
    console.log(data);

    const res = fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res
    console.log(result);

    if (res) {

      toast.success("data save successfully ");
      setTimeout(() => {

        navigate('/');
      }, 2000)
    }
    else {

      toast.error("Error in saving data ");

    }



  }

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Paper elevation={12} sx={{ m: 2, p: 3 }} >


          <Typography variant="h2">Sign Up</Typography>
          <Box sx={{ margin: 8, width: '60%' }}>
            <TextField label="Name" name="name" variant="outlined" onChange={handleChange} />
            <br />
            {data.name}
            <br />
            <TextField label="Email" name="email" variant="outlined" onChange={handleChange} />
            <br />
            {data.email}
            <br />

            <TextField label="password" name="password" variant="outlined" onChange={handleChange} />
            <br />
            {data.password}
            <br />
            <Button variant="contained" color="primary" onClick={handleclick}>
              Sign Up
            </Button>

          </Box>
        </Paper>
      </Container>
      <ToastContainer />

    </>
  )
}

export default SignUpForm
