import { Email, GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import React from 'react'

function Footer() {
    const matches = useMediaQuery('(min-width: 600px)')
  return (
    <div>
        <Box sx={{background: "#0D1821", display: "flex", flexDirection: `${matches ? '':'column'}`, gap: `${matches ? '50px':''}`, padding: "3rem", alignItems:"center", justifyContent: "center"}}>
            <Box sx={{textAlign: "left", padding: "2rem"}}>
                <h4 style={{color: "#fff", margin: "0px"}}>About Us</h4>
                <ul className='footer-lists' style={{color: "grey", paddingLeft: "0"}}>
                    <li>News</li>
                    <li>Career</li>
                    <li>Support</li>
                    <li>Investments</li>
                </ul>
            </Box>
            <Box sx={{textAlign: "left", padding: "2rem"}}>
                <h4 style={{color: "#fff", margin: "0px"}}>Get Help</h4>
                <ul className='footer-lists' style={{color: "grey", paddingLeft: "0"}}>
                    <li>Cart</li>
                    <li>Orders</li>
                    <li>Products</li>
                    <li>Contact</li>
                </ul>
            </Box>
            <Box sx={{textAlign: "left", padding: "2rem"}}>
                <h4 style={{color: "#fff", margin: "0px"}}>Quick Links</h4>
                <ul className='footer-lists' style={{color: "grey", paddingLeft: "0"}}>
                    <li>Account</li>
                    <li>Men</li>
                    <li>Women</li>
                    <li>Kids</li>
                </ul>
            </Box>
            <Box sx={{color: "#fff", textAlign: "center"}}>
                <h4>Connect with us!</h4>
                <Box sx={{display: "flex"}}>
                    <IconButton size="large" sx={{color: "#fff"}}>
                        <Instagram fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" sx={{color: "#fff"}}>
                        <Twitter fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" sx={{color: "#fff"}}>
                        <GitHub fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" sx={{color: "#fff"}}>
                        <LinkedIn fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" sx={{color: "#fff"}}>
                        <Email fontSize="inherit" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    </div>
  )
}

export default Footer