import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Breadcrumbs, IconButton, Snackbar, Alert, useMediaQuery } from '@mui/material'
import { Delete, ShoppingBag } from '@mui/icons-material'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { RootState } from '../../Context/Context'
import './WishList.css'

function WishistItems({axiosJWT, URL}) {

  const {authState, wishlistState, wishlistDispatch, cartState, cartDispatch} = RootState()
  const [deletesucessToast, setDeleteSuccessToast] = useState(false)
  const [cartsuccessToast, setCartSuccessToast] = useState(false)
  const [deleteErrorToast, setDeleteErrorToast] = useState(false)
  const [cartErrorToast, setCartErrorToast] = useState(false)
  const matches = useMediaQuery('(min-width: 600px)')

  
  const deleteFromWishlist = async (wishlistItem) => {
    console.log(wishlistItem)
    try{
        const data = await axiosJWT.delete(URL+`/wishlist/${wishlistItem.wishlistItemid}`,
        {
            headers: {
                'x-access-token': authState?.aToken
            }
        }
        )
        const { message } = await data.data
        if(message === "success"){
            setDeleteSuccessToast(true)
            wishlistDispatch({
                type: "DELETE_FROM_WISHLIST",
                payload: {
                    product: {
                    productid: wishlistItem.product.productid
                }
            }})
        }
        else{
          setDeleteErrorToast(true)
        }
    }
    catch(err){
      setDeleteErrorToast(true)
    }
  }

  const moveToCart = async (item) => {
    try{
        const cartItemid = uuid()
        const data = await axiosJWT.post(URL+"/cart/", {
          email: authState?.user.email,
          cartItemid: cartItemid,
          quantity: 1,
          product: item.product
        },
        {
          headers: {
            'x-access-token': authState.aToken
          }
        }
        )
        const fetchedItem = await data.data
        if(fetchedItem.message === "success"){
          setCartSuccessToast(true)
          deleteFromWishlist(item)
          cartDispatch({
            type: "ADD_TO_CART",
            payload: {
              product: item.product
            }
          })
        }
        else{
          setCartErrorToast(true)
        }
      }
      catch(err){
        setCartErrorToast(true)
      }
  }

  const getWishListItems = async () => {
    try{
        const data = await axiosJWT.get(URL+`/wishlist/${authState?.user.email}`,
        {
            headers: {
                'x-access-token': authState?.aToken
            }
        }
        )
        const fetchedWishlist = await data.data
        if(fetchedWishlist){
            wishlistDispatch({
                type: "GET_WISHLIST_ITEMS",
                payload: {
                  wishlist: fetchedWishlist,
                }
            })
        }
    }
    catch(err){
        console.error(err)
    }
  }

  useEffect(() => {
    getWishListItems()
  }, [])

  return (
    <div>
        {
            wishlistState.wishlist.length === 0 ?
            <div className="wish-list-wrapper">
                <Box sx={{width: "50%"}}>
                    <img className='cart-empty' src="/images/empty-cart.jpg" alt="empty-cart" />
                    <h2>Wish List is empty!</h2>
                    <Button LinkComponent={Link} to="/shop/all" color="secondary" variant="outlined">Shop Now</Button>
                </Box>
            </div>
            :
            wishlistState.wishlist && wishlistState.wishlist.map((item, index) => (
                <div className="cart-list-wrapper">
                    <Paper
                    key={index}
                    variant="outlined"
                    sx={{width: `${matches ? "75%": "90%"}`, flexDirection: `${matches ? '':'column'}`, display: "flex", alignItems: "center", textAlign: "left", margin: "10px"}}>
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
                    <Box sx={{ marginLeft: `${matches ? 'auto':''}`, padding: "1.5rem", marginRight: "2rem", flexGrow: 0}}>
                        <IconButton
                        onClick={() => moveToCart(item)}
                        >
                            <ShoppingBag />
                        </IconButton>
                        <IconButton
                        onClick={() => deleteFromWishlist(item)}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                    </Paper>
                    <Box sx={{display: "flex", gap: "10px"}}>
                    <Button LinkComponent={Link} to='/shop/all' color='secondary' variant='contained' sx={{width: "250px"}}>Continue shopping</Button>
                    </Box>
                </div>
            ))
        }
        <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={cartsuccessToast} onClose={() => setCartSuccessToast(false)} autoHideDuration={2000}>
          <Alert onClose={() => setCartSuccessToast(false)} severity='success' sx={{ width: '100%' }}>Shoes added to the cart successfully!</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={deletesucessToast} onClose={() => setDeleteSuccessToast(false)} autoHideDuration={2000}>
          <Alert onClose={() => setDeleteSuccessToast(false)} severity='success' sx={{ width: '100%' }}>Shoes removed from the wishlist successfully!</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={cartErrorToast} onClose={() => setCartErrorToast(false)} autoHideDuration={2000}>
          <Alert onClose={() => setCartErrorToast(false)} severity='error' sx={{ width: '100%' }}>Unable to add shoes into the cart :(</Alert>
        </Snackbar>
    </div>
  )
}

export default WishistItems