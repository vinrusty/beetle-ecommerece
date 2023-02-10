import React, { useEffect, useState } from 'react'
import { Box, Breadcrumbs, Button, IconButton, Paper, Snackbar, Alert, Dialog, DialogActions, 
         DialogContent, DialogContentText, DialogTitle, useMediaQuery, } from '@mui/material'
import { Add, Delete, Remove } from '@mui/icons-material'
import { RootState } from '../../Context/Context'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie/cjs/Cookies';
import axios from 'axios'
import './CartList.css'

function CartList({axiosJWT, URL}) {
  const {authState, cartState, cartDispatch} = RootState()
  const [successToast, setSuccessToast] = useState(false)
  const [successDeleteToast, setDeleteSuccessToast] = useState(false)
  const [errorToast, setErrorToast] = useState(false)
  const [open, setOpen] = useState(false)
  const matches = useMediaQuery('(min-width: 600px)')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAll = async () => {
    try{
      const data = await axiosJWT.delete(URL+"/cart/all", {
        headers: {
          'x-access-token': authState?.aToken
        },
        data: {
          email: authState?.user.email,
        }
      })
      const message = await data.data
      if(message.message === 'success'){
        cartDispatch({
          type: "DELETE_ALL_FROM_CART",
          payload: {
            product: {}
          }
        })
      }
      else{

      }
    }
    catch(err){
      console.log(err)
    }
    handleClose()
  }
  
  const updateToCart = async (cartItem, incrementor) =>{
    try{
      const data = await axiosJWT.patch(URL+`/cart/${cartItem.cartItemid}`, {
        email: authState?.user.email,
        quantity: cartItem.quantity,
        incrementor: incrementor
      },
      {
        headers: {
          'x-access-token': authState.aToken
        }
      }
      )
      const item = await data.data
      if(item.message === "success") {
        setSuccessToast(true)
        cartDispatch({
          type: "ADD_TO_CART",
          payload: {
            product: {
              productid: "1",
              product_name: "NikeFlykint",
              price: 239,
              rating: 4,
              category: "Men",
              type: "Lifestyle",
              size: 8.5,
              color: "Blue"
            }
          }
        })
      }
      else{
        setErrorToast(true)
      }
    }
    catch(err){
      setErrorToast(true)
    }
  }


  const decreaseCartItem = async (cartItem, incrementor) => {
    try{
      const data = await axiosJWT.patch(URL+`/cart/${cartItem.cartItemid}`, {
        email: authState?.user.email,
        quantity: cartItem.quantity,
        incrementor: incrementor
      },
      {
        headers: {
          'x-access-token': authState?.aToken
        }
      }
      )
      const item = await data.data
      if(item.message === "success") {
        setDeleteSuccessToast(true)
        cartDispatch({
          type: "DECREASE_CART_ITEM_QUANTITY",
          payload: {
            product: {
              productid: cartItem.product.productid
            }
        }})
      }
      else{
        setErrorToast(true)
      }
    }
    catch(err){
      setErrorToast(true)
    }
  }

  const deleteCartItem = async (cartItem) => {
    try{
      const data = await axiosJWT.delete(URL+`/cart/${cartItem.cartItemid}`,
      {
        headers: {
          'x-access-token': authState?.aToken
        },
        data:{
          email: authState?.user.email,
        }
      }
      )
      const item = await data.data
      if(item.message === "success") {
        setDeleteSuccessToast(true)
        cartDispatch({
          type: "DELETE_CART_ITEM",
          payload: {
            product: {
              productid: cartItem.product.productid
            }
        }})
      }
      else{
        setErrorToast(true)
      }
    }
    catch(err){
      setErrorToast(true)
    }
  }


  return (
    <div>
    {
      cartState.cart.length === 0 ?
      <div className="cart-list-wrapper">
        <Box sx={{width: "50%"}}>
          <img className='cart-empty' src="/images/empty-cart.jpg" alt="empty-cart" />
          <h2>Cart is empty!</h2>
          <Button LinkComponent={Link} to="/shop/all" color="secondary" variant="outlined">Shop Now</Button>
        </Box>
      </div>
      :
      <div className='cart-list-wrapper'>
      {
      cartState.cart && cartState.cart.map((item, index) => (
        <Paper
        key={index}
        variant="outlined"
        sx={{width: `${matches ? "75%": "90%"}`, display: "flex", alignItems: "center", flexDirection: `${matches ? '':'column'}`, textAlign: "left", margin: "10px"}}>
          <img style={{width: `${matches ? '15%':'50%'}`}} src='/images/hero-shoes.png' alt='cart-item-pic' />
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
          <Box sx={{display: "flex",  padding: "1.5rem", marginLeft: `${matches ? 'auto':''}`}}>
            <Box sx={{display: "flex", marginRight: "2rem"}}>
              <IconButton
                onClick={() => updateToCart(item, 1)}
              >
                <Add />
              </IconButton>
              <Button variant="outlined">{item.quantity}</Button>
              <IconButton
                onClick={() => {
                    item.quantity > 1 ?
                    decreaseCartItem(item, -1)
                    :
                    deleteCartItem(item)
                  }
                }
              >
                <Remove />
              </IconButton>
            </Box>
            <Box sx={{ marginRight: "2rem", flexGrow: 0}}>
              <IconButton
                onClick={() => deleteCartItem(item)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))
      }
      <Box sx={{display: "flex", flexDirection: `${matches ? '':'column'}`, gap: "10px", alignItems: "center", justifyContent: "center", padding: "2rem"}}>
        <Button LinkComponent={Link} to='/checkout' color='secondary' variant='contained' sx={{width: "250px"}}>proceed to checkout</Button>
        <Button color='secondary' variant='contained' sx={{width: "250px"}} onClick={handleClickOpen}>Clear all</Button>
      </Box>
      </div>
    }
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Clear Cart"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure about deleting  all the items from the cart? 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleDeleteAll} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={successToast} onClose={() => setSuccessToast(false)} autoHideDuration={2000}>
      <Alert onClose={() => setSuccessToast(false)} severity='success' sx={{ width: '100%' }}>Shoes added to the cart successfully!</Alert>
    </Snackbar>
    <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={successDeleteToast} onClose={() => setDeleteSuccessToast(false)} autoHideDuration={2000}>
      <Alert onClose={() => setDeleteSuccessToast(false)} severity='success' sx={{ width: '100%' }}>Shoes removed from the cart successfully!</Alert>
    </Snackbar>
    <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={errorToast} onClose={() => setErrorToast(false)} autoHideDuration={2000}>
      <Alert onClose={() => setSuccessToast(false)} severity='error' sx={{ width: '100%' }}>Unable remove shoes from the cart :(</Alert>
    </Snackbar>
    </div>
  )
}

export default CartList