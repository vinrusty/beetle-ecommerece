import React, { useState } from 'react'
import { Box, Paper, Breadcrumbs, Button } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { RootState } from '../../Context/Context'
import { useEffect } from 'react'

function OrderList({axiosJWT, URL}) {
  const {authState} = RootState()
  const [orders, setOrders] = useState([])

  const getOrders = async() => {
    try{
      const data = await axiosJWT.get(URL+`/order/${authState?.user.email}`,
      {
        headers: {
          'x-access-token': authState?.aToken
        }
      }
      )
      const fetchedOrders = await data.data
      console.log(fetchedOrders)
      if(fetchedOrders){
        setOrders(fetchedOrders)
      }
      else{

      }
    }
    catch(err){

    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Box sx={{width: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
      {
        orders.length === 0 ?
        <Box>
          <img className='cart-empty' src="/images/empty-cart.jpg" alt="empty-cart" />
          <h2>You haven't ordered anything!</h2>
          <Button LinkComponent={Link} to="/shop/all" color="secondary" variant="outlined">Shop Now</Button>
        </Box>
        :
        <>

        <h1>Your Orders</h1>
        {
          orders && orders.map((order, index) => {
            return(
              <>
              {
                order.cartItems && order.cartItems.map((item, index) => {
                  return(
                  <Paper
                    key={index}
                    variant="outlined"
                    sx={{display: "flex", alignItems: "center", textAlign: "left", margin: "10px"}}>
                      <img style={{width: "15%"}} src='/images/hero-shoes.png' alt='cart-item-pic' />
                      <Box className='item-detail' sx={{display: "flex", flexDirection: "column"}}>
                        <h3>{item.product.product_name}</h3>
                        <p>Category: {item.product.category}</p>
                        <Breadcrumbs className="bread-crumb" separator=" ">
                          <p>Size: {item.product.size}</p>
                          <p>Color: {item.product.color} </p>
                        </Breadcrumbs>
                        <Breadcrumbs className="bread-crumb" separator=" ">
                          <p>Price: ${item.product.price} </p>
                          <p>Type: {item.product.type} </p>
                        </Breadcrumbs>
                      </Box>
                      <Box sx={{display: "flex", marginLeft: "auto", marginRight: "2rem", flexDirection: "column"}}>
                        <h4 style={{margin: "5px", color: "green"}}>Ordered at {order.orderDate}</h4>
                        <h4 style={{margin: "5px"}}>Quantity: {item.quantity}</h4>
                        <h4 style={{margin: "5px"}}>Total: ${order.total}</h4>
                      </Box>
                    </Paper>
                )})
              }
              </>
            )
          })
        }
        <Box sx={{display: "flex", marginLeft: "auto", marginRight: "2rem", flexDirection: "column"}}>
          <Button LinkComponent={Link} to="/shop/all" variant="contained" color="secondary">Continue Shopping</Button>
        </Box>
        </>
      }
    </Box>
  )
}

export default OrderList