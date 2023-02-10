import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './TriSection.css'

function TriSection() {
    const matches = useMediaQuery('(min-width: 600px)')
  return (
    <div>
        <h1 style={{fontFamily: "Poppins"}}>Who are you Shopping for?</h1>
        <Box sx={{display: "flex", flexDirection: `${matches ? '':'column'}`, alignItems: "center", justifyContent: "center"}}>
            <Link to='/shop/men'>
                <Box className='tri-card' m={2}>
                    <div className='tri-mask'>
                        <h4>Men</h4>
                    </div>
                    <div className='tri-mask-2'></div>
                    <img className='trisection-image' src="/images/men.jpg" alt="men" />
                </Box>
            </Link>
            <Link to='/shop/women'>
                <Box className='tri-card' m={2}>
                    <div className='tri-mask'>
                        <h4>Women</h4>
                    </div>
                    <div className='tri-mask-2'></div>
                    <img className='trisection-image' src="/images/women.jpg" alt="women" />
                </Box>
            </Link>
            <Link to='/kids'>
                <Box className='tri-card' m={2}>
                    <div className='tri-mask'>
                        <h4>Kids</h4>
                    </div>
                    <div className='tri-mask-2'></div>
                    <img className='trisection-image' src="/images/kids.jpg" alt="kids" />
                </Box>
            </Link>
        </Box>
    </div>
  )
}

export default TriSection