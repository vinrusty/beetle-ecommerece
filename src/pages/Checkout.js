import React from 'react'
import CartDetails from '../components/Checkout/CartDetails'
import CustomerDetails from '../components/Checkout/CustomerDetails'
import Footer from '../components/Footer/Footer'
import { Box } from '@mui/material'

function Checkout({axiosJWT}) {
  return (
    <div className='checkout-wrapper'>
        <h1>CHECKOUT</h1>
        <Box sx={{display: "flex", padding: "2rem"}}>
            <CustomerDetails axiosJWT={axiosJWT} URL={URL} />
            <CartDetails URL={URL} />
        </Box>
        <Footer />
    </div>
  )
}

export default Checkout