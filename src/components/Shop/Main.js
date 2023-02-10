import React, { useEffect, useState } from 'react'
import {AddCircle, Favorite, Search, ShoppingBag } from '@mui/icons-material'
import { Box, Grid, Rating, IconButton, Paper, 
         InputBase, Snackbar, Alert, useMediaQuery, Drawer } from '@mui/material'
import Sidebar from './Sidebar'
import { RootState } from '../../Context/Context'
import { v4 as uuid } from 'uuid'
import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import DrawerComponent from './DrawerComponent'
import Loading from '../util/Loading'

function Main({axiosJWT, URL}) {
  const {authState, cartState, cartDispatch, wishlistDispatch, productState, productDispatch} = RootState()
  const [filter, setFilter] = useState(false)
  const [successToast, setSuccessToast] = useState(false)
  const [wishsuccessToast, setWishSuccessToast] = useState(false)
  const [errorToast, setErrorToast] = useState(false)
  const [wisherrorToast, setWishErrorToast] = useState(false)
  const matches = useMediaQuery("(min-width: 600px)")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const getCartItems = async () => {
    try{
      const data = await axiosJWT.get(URL+`/cart/${authState?.user.email}`, {
        headers: {
          "x-access-token": authState.aToken
        }
      })
      const cartItems = await data.data
      cartDispatch({
        type: "GET_CART_ITEMS",
        payload: {
          cart: cartItems
        }
      })
    }
    catch(err){
      console.log(err)
    }
  }

  const getWishlistItems = async () => {
    try{
      const data = await axiosJWT.get(URL+`/wishlist/${authState?.user.email}`, {
        headers: {
          "x-access-token": authState.aToken
        }
      })
      const wishlistItems = await data.data
      cartDispatch({
        type: "GET_WISHLIST_ITEMS",
        payload: {
          wishlist: wishlistItems
        }
      })
    }
    catch(err){
      console.log(err)
    }
  }

  const addToCart = async(cartItem) => {
    if(!authState.isAuth){
      navigate(process.env.PUBLIC_URL+"/login")
    }
    else{
      try{
        setLoading(true)
        const cartItemid = uuid()
        const data = await axiosJWT.post(URL+"/cart/", {
          email: authState?.user.email,
          cartItemid: cartItemid,
          quantity: 1,
          product: {
            productid: cartItem.productid,
            product_name: cartItem.product_name,
            price: cartItem.price,
            rating: cartItem.rating,
            category: cartItem.category,
            type: cartItem.type,
            size: cartItem.size,
            color: cartItem.color
          }
        },
        {
          headers: {
            'x-access-token': authState.aToken
          }
        }
        )
        const item = await data.data
        if(item.message === "success"){
          setSuccessToast(true)
          setLoading(false)
          cartDispatch({
            type: "ADD_TO_CART",
            payload: {
              product: {
                productid: cartItem.productid,
                product_name: cartItem.product_name,
                price: cartItem.price,
                rating: cartItem.rating,
                category: cartItem.category,
                type: cartItem.type,
                size: cartItem.size,
                color: cartItem.color
              }
            }
          })
        }
        else{
          setErrorToast(true)
          setLoading(false)
        }
      }
      catch(err){
        setErrorToast(true)
        setLoading(false)
      }
    }
  }

  const updateToCart = async (cartItem, incrementor) =>{
    setLoading(true)
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
        setLoading(false)
        cartDispatch({
          type: "ADD_TO_CART",
          payload: {
            product: {
              productid: cartItem.productid,
              product_name: cartItem.product_name,
              price: cartItem.price,
              rating: cartItem.rating,
              category: cartItem.category,
              type: cartItem.type,
              size: cartItem.size,
              color: cartItem.color
            }
          }
        })
        setSuccessToast(true)
      }
      else{
        setErrorToast(true)
        setLoading(false)
      }
    }
    catch(err){
      setErrorToast(true)
      setLoading(false)
    }
  }

  const addToWishList = async (wishlistItem) => {
    setLoading(true)
    if(!authState.isAuth){
      navigate(process.env.PUBLIC_URL+"/login")
    }
    else{
      try{
        const wishlistItemid = uuid()
        const data = await axiosJWT.post(URL+"/wishlist/",
        {
          email: authState?.user.email,
          wishlistItemid: wishlistItemid,
          productid: "1",
          product: {
            productid: wishlistItem.productid,
            product_name: wishlistItem.product_name,
            price: wishlistItem.price,
            rating: wishlistItem.rating,
            category: wishlistItem.category,
            type: wishlistItem.type,
            size: wishlistItem.size,
            color: wishlistItem.color
          }
        },
        {
          headers: {
            'x-access-token': authState?.aToken
          }
        }
        )
        const { message } = await data.data
        if(message === 'success'){
          setWishSuccessToast(true)
          setLoading(false)
          wishlistDispatch({
            type: "ADD_TO_WISHLIST",
            payload: {
              wishlistItemid: wishlistItemid,
              product: {
                productid: wishlistItem.productid,
                product_name: wishlistItem.product_name,
                price: wishlistItem.price,
                rating: wishlistItem.rating,
                category: wishlistItem.category,
                type: wishlistItem.type,
                size: wishlistItem.size,
                color: wishlistItem.color
              }
            }
          })
          
        }
        else{
          setWishErrorToast(true)
          setLoading(false)
        }
      }
      catch(err){
        setWishErrorToast(true)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if(authState.auth){
      getCartItems()
      getWishlistItems()
    }
  }, [])

  const filteredProducts = productState.products.filter((product) => 
  (productState.category.includes(product.category) || productState.category.length === 0)
  && (productState.color.includes(product.color.toLowerCase()) || productState.color.length === 0)
  && (productState.size.includes(product.size) || productState.size.length === 0)
  && (productState.brand.includes(product.brand) || productState.brand.length === 0)
  && (product.product_name.toLowerCase().includes(productState.searchQuery))
  )
  
  return (
    <div className='sidebar-wrapper'>
    {
      loading ?
      <Loading />
      :
      <></>
    }
    {
      matches ?
      <Sidebar />
      :
      <Drawer
      anchor="bottom"
      open={filter}
      onClose={() => setFilter(false)}
    >
      <DrawerComponent setFilter={setFilter} />
    </Drawer>
    }
        <Box sx={{ flexGrow: 0, width:"100%", padding: "2rem", mt: "80px", ml: `${matches ? "260px": "0px"}` }}>
        <Box sx={{ display: "flex", width:"100%", flexDirection: `${matches ? '':'column'}`, alignItems:"center", justifyContent: "center"}}>
          <Paper variant='outlined' sx={{display: "flex", alignItems:"center", justifyContent: "center", width: `${matches ? '50%':'100%'}`, p:"5px 10px"}}>
            <IconButton>
              <Search />
            </IconButton>
            <InputBase sx={{width: "100%"}} variant='outlined' type='text' placeholder='Search...'
            onChange = {(e) => productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: {
                  searchQuery: e.target.value
                }
              })} />
          </Paper>
          {
            matches ?
            <></>
            :
            <Box sx={{display: "flex"}}>
            <IconButton sx={{marginLeft: "auto", mt: "10px"}}>
              <AddCircle onClick={() => setFilter(true)} />
            </IconButton>
            </Box>
          }
        </Box>
        <Grid container columns={{ xs: 6, sm: 8, md: 12}} sx={{padding: `${matches ? "2rem": "0"}`}}>
            {
              filteredProducts && filteredProducts.map((item, index) => {
                return(
                  <Grid item={true} xs={6} sm={4} md={4} p={2}>
                    <Box key={index} className='highlight-cards' sx={{ display: "flex", flexDirection: "column", padding:"0 1.6rem", borderRadius: "10px", position: "relative"}}>
                      {/* <div className="card-circle"></div> */}
                      <Link to={`/shop/men/${index}`}>
                        <img className='card-img' src='/images/hero-shoes.png' alt='card-pics' />
                      </Link>
                      <Box sx={{display: "flex", alignItems:"center"}}>
                        <h4>{item.product_name}</h4>
                        <Box sx={{display: "flex", marginLeft: "auto"}}>
                          <IconButton onClick={() => addToWishList(item)}>
                            <Favorite color='secondary' w={8} />
                          </IconButton>
                          <IconButton
                          onClick={() => {
                            const cartItem = cartState.cart.filter(c => c.product.productid === item.productid)[0]
                            if(cartItem === undefined){
                              addToCart(cartItem)
                            }
                            else{
                              updateToCart(cartItem, 1)
                            }
                          }} 
                          >
                            <ShoppingBag color='secondary' w={8} />
                          </IconButton>
                        </Box>
                      </Box>
                      <Rating defaultValue={item.rating} />
                      <h4 className='price'>$ {item.price}</h4>
                    </Box>
                  </Grid>
                )
              })
            }
          </Grid>
          <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={successToast} onClose={() => setSuccessToast(false)} autoHideDuration={2000}>
            <Alert onClose={() => setSuccessToast(false)} severity='success' sx={{ width: '100%' }}>Shoes added to the cart successfully!</Alert>
          </Snackbar>
          <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={errorToast} onClose={() => setErrorToast(false)} autoHideDuration={2000}>
            <Alert onClose={() => setErrorToast(false)} severity='error' sx={{ width: '100%' }}>Unable to add shoes into the cart :(</Alert>
          </Snackbar>
          <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={wishsuccessToast} onClose={() => setWishSuccessToast(false)} autoHideDuration={2000}>
            <Alert onClose={() => setWishSuccessToast(false)} severity='success' sx={{ width: '100%' }}>Shoes added to the wish list successfully!</Alert>
          </Snackbar>
          <Snackbar anchorOrigin={{vertical:"bottom", horizontal:"center"}} open={wisherrorToast} onClose={() => setWishErrorToast(false)} autoHideDuration={2000}>
            <Alert onClose={() => setWishErrorToast(false)} severity='error' sx={{ width: '100%' }}>Unable to add shoes into the wish list :(</Alert>
          </Snackbar>
        </Box>
    </div>
  )
}

export default Main