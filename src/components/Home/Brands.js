import { Box, Grid } from '@mui/material'
import React from 'react'
import './Brands.css'

function Brands() {
  return (
    <div className='brands-wrapper'>
        <h1 style={{fontFamily: "Poppins"}}>Get your deals from popular Brands</h1>
        <Grid sx={{ height: "50vh"}}>
            <img className='brand-images' src='/images/nike.png' alt='nike' />
            <img className='brand-images' src='/images/adidas.png' alt='nike' />
            <img className='brand-images' src='/images/puma.png' alt='nike' />
            <img className='brand-images' src='/images/new-balance.png' alt='nike' />
        </Grid>
    </div>
  )
}

export default Brands