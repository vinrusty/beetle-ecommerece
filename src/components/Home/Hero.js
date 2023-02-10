import { Box, Button, Container, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { RootState } from '../../Context/Context'
import './Hero.css'

function Hero() {
  const {authState} = RootState()
  const matches = useMediaQuery('(min-width: 600px)')
  return (
    <div>
        <Container maxWidth='lg' sx={{height: "90vh", marginTop: `${matches ? '50px':'100px'}`, display: "flex", alignItems: "center", justifyContent:"center"}}>
            <Grid container spacing={2} sx={{display: "flex", flexDirection:`${matches ? '':'column'}`}}>
            <Grid display="flex" alignItems="center" justifyContent="center" sx={{flexDirection: "column"}}>
                <Box className="headings" sx={{textAlign: `${matches ? 'left':'center'}`, fontSize: `${matches ? '1.6rem':'1.2rem'}`}}>
                    <h1 className='hero-heading'>Welcome to BEETLES</h1>
                    <h2 className='hero-heading'>Choose the way you walk!</h2>
                    <p className='hero-heading'>Grab amazing deals with flat 50% off</p>
                </Box>
                <Box sx={{display:"flex", justifyContent: `${matches ? '':'center'}`, width: "100%", p:"2rem"}}>
                    {
                        !authState.isAuth ?
                        <Button color='secondary' LinkComponent={Link} to="/login" variant="outlined" sx={{borderRadius:'30px', width: "50%", padding: "1rem", m:"5px"}}>Sign in</Button>
                        :
                        <></>
                    }
                    <Button color='secondary' LinkComponent={Link} to="/shop/all" variant="contained" sx={{borderRadius:'30px', width: "50%", padding: "1rem", m:"5px"}}>Get Started</Button>
                </Box>
            </Grid>
            <Grid xs display="flex" alignItems="center" justifyContent={matches ? 'end':'center'}>
                <img src='/images/hero-shoes.png' alt='hero-shoes' className='hero-img' />
            </Grid>
            </Grid>
        </Container>
    </div>
  )
}

export default Hero