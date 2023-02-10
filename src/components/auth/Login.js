import React, { useState } from 'react'
import { Button, Paper, TextField, Snackbar, Alert } from '@mui/material';
import {Link} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import './Login.css';
import axios from 'axios';
import { RootState } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loading from '../util/Loading';

function Login({URL}) {

  const { authDispatch } = RootState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [error2Toast, setError2Toast] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogin = async () => {
    try{
      setLoading(true)
      const data = await axios.post(URL+'/api/customers/login', {
        email: email,
        password: password
      })
      const response = await data.data
      if(response.user){
        authDispatch({
          type: "LOGIN",
          payload: {
            user: response.user,
            aToken: response.aToken,
            rToken: response.rToken,
          }
        })
        setLoading(false)
        cookies.set("user", response.user)
        cookies.set("aToken", response.aToken)
        cookies.set("rToken", response.rToken)
        navigate(process.env.PUBLIC_URL+'/')
      }
      else{
        setLoading(false)
        setError2Toast(true)
        console.log('error')
      }
    }
    catch(err){
      setLoading(false)
      setErrorToast(true)
      console.error(err);
    }
  }

  const handleLoginWithGoogle = () => {
    window.open(URL+"/auth/google/callback", "_self");
  }

  
  
  return (
    <div className='login-wrap'>
        {
          loading ?
          <Loading />
          :
          <></>
        }
        <Paper elevation={12} sx={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "400px", borderRadius: "10px"}} >
            <h1>Login</h1>
            <TextField sx={{marginTop:"30px"}} fullWidth label="Email" type="email" placeholder='xyz@example.com' required onChange={(e) => setEmail(e.target.value)} />
            <TextField sx={{marginTop:"20px"}} fullWidth label="Password" type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
            <Button sx={{marginTop:"20px", py: "10px"}} disabled={loading} variant="contained" color='secondary' onClick={handleLogin} fullWidth>Login</Button>
            <p>or</p>
            <Button sx={{py: "10px"}} variant="outlined" color='secondary' fullWidth onClick={handleLoginWithGoogle}><GoogleIcon sx={{mx: 2}} /> Signin with Google</Button>
            <p>Are you new here? <Link href="/register" underline='hover'>Register</Link> </p>
        </Paper>
        <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={error2Toast} onClose={() => setError2Toast(false)} autoHideDuration={2000}>
          <Alert onClose={() => setError2Toast(false)} severity='error' sx={{ width: '100%' }}>Enter valid Email and Password</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={errorToast} onClose={() => setErrorToast(false)} autoHideDuration={2000}>
          <Alert onClose={() => setErrorToast(false)} severity='error' sx={{ width: '100%' }}>Could'nt Login! Try Again</Alert>
        </Snackbar>
    </div>
  )
}

export default Login