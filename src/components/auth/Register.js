import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { RootState } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

function Register({URL}) {

  const {authState, authDispatch} = RootState();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try{
        const data = await axios.post(URL+'/api/customers/register', {
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            city,
            state
        })
        const response = await data.data
        if(response.email){
            authDispatch({
                type: "REGISTER",
                payload: {
                    user: response
                }
            })
            navigate(process.env.PUBLIC_URL + '/login')
        }
        else{
            console.log('could not register');
        }
    }
    catch(err){
        console.error(err);
    }
  }

  return (
    <div className='login-wrap'>
        <Box sx={{padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "60%"}}>
            <h1>Register</h1>
            <Box sx={{display: "flex", gap: "5px", width:"100%"}}>
                <TextField fullWidth variant='outlined' label='First name' onChange={(e) => setFirstName(e.target.value)} required />
                <TextField fullWidth variant='outlined' label='Last name' onChange={(e) => setLastName(e.target.value)} />
            </Box>
            <Box sx={{display: "flex", gap: "5px", width:"100%", marginTop:"10px"}}>
                <TextField fullWidth variant='outlined' label='Email' type="email" required onChange={(e) => setEmail(e.target.value)} />
                <TextField fullWidth variant='outlined' label='Password' type="password" required onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <TextField fullWidth sx={{mt:"10px"}} variant="outlined" label="Phone" type="tel" required onChange={(e) => setPhone(e.target.value)} />
            <TextField fullWidth sx={{mt:"10px"}} variant="outlined" label="Address" required onChange={(e) => setAddress(e.target.value)} />
            <Box sx={{display: "flex", gap: "5px", width:"100%", marginTop:"10px"}}>
                <TextField fullWidth variant='outlined' label='City' required onChange={(e) => setCity(e.target.value)} />
                <TextField fullWidth variant='outlined' label='State' required onChange={(e) => setState(e.target.value)}  />
            </Box>
            <Box sx={{display: "flex", gap: "5px", width:"100%", marginTop:"10px"}}>
                <Button sx={{py: "10px"}} variant="contained" color='secondary' onClick={handleRegister} fullWidth>Register</Button>
                <Button sx={{py: "10px"}} variant="outlined" color='secondary' fullWidth><GoogleIcon sx={{mx: 2}} /> Signup with Google</Button>
            </Box>
        </Box>
    </div>
  )
}

export default Register