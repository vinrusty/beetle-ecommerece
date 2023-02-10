import { Star } from '@mui/icons-material'
import { Box, Paper } from '@mui/material'
import React from 'react'
import { RootState } from '../../Context/Context'

function CartDetails() {

  const {cartState} = RootState()

  const totalPrice = () => {
    let sum = 0
    cartState && cartState.cart.forEach(item => {
      sum += Number(item.quantity)*Number(item.product.price)
    })
    return sum
  }

  return (
    <Box sx={{width: "50%", textAlign: "left"}}>
    <Paper variant='outlined' sx={{padding: "1.6rem"}}>
      <h2>Your Cart</h2>
      <Box sx={{width: "100%", marginTop: "10px"}}>
          {
              cartState && cartState.cart.map((item, index) => {
                  return (
                    <Box sx={{display: "flex", gap: "20px"}}>
                      <img style={{width: "100px"}} src='/images/hero-shoes.png' />
                      <Box>
                        <h3 style={{margin: "0"}}>{item.product.product_name}</h3>
                        <Box sx={{display: "flex", gap: "20px"}}>
                          <p style={{margin: "0"}}>Price: ${item.product.price}</p>
                          <p style={{margin: "0"}}>Quantity: {item.quantity}</p>
                        </Box>
                        <Box sx={{display: "flex"}}>
                          <p style={{margin: "0"}}>Rating: {item.product.rating}</p>
                          <Star />
                        </Box>
                      </Box>
                    </Box>
                  )
              })
          }
          <Box sx={{display: "flex"}}>
            <p>Total</p>
            <p style={{marginLeft: "auto"}}>${totalPrice()}</p>
          </Box>
      </Box>
    </Paper>
    </Box>
  )
}

export default CartDetails