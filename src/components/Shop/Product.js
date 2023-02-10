import React,{ useState, useEffect } from 'react'
import { Box, Button, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material'
import './Product.css'
import { Favorite, ShoppingBag } from '@mui/icons-material';
import { RootState } from '../../Context/Context';
import { v4 as uuid } from 'uuid'
import { useParams } from 'react-router-dom';

function Product({axiosJWT, URL}) {

  const {authState, cartState, cartDispatch, wishlistDispatch} = RootState()
  
  const [size, setSize] = useState('');
  const [successToast, setSuccessToast] = useState(false)
  const [errorToast, setErrorToast] = useState(false)
  const { id } = useParams()
  const matches = useMediaQuery("(min-width: 600px)")

  const getCartItems = async () => {
    try{
      const data = await axiosJWT.get(URL+"/cart/", {
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

  const addToCart = async() => {
    try{
      const cartItemid = uuid()
      const data = await axiosJWT.post(URL+"/cart/", {
        cartItemid: cartItemid,
        email: authState.user.email,
        quantity: 1,
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

  const updateToCart = async (cartItem) =>{
    try{
      const data = await axiosJWT.patch(URL+`/cart/${cartItem.cartItemid}`, {
        quantity: cartItem.quantity,
        email: authState.user.email,
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

  useEffect(() => {
    getCartItems()
  }, [])

  const addToWishList = async () => {
    try{
      const wishlistItemid = uuid()
      const data = await axiosJWT.post(URL+"/wishlist/",
      {
        email: authState?.user.email,
        wishlistItemid: wishlistItemid,
        productid: "1",
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
      },
      {
        headers: {
          'x-access-token': authState?.aToken
        }
      }
      )
      const { message } = await data.data
      if(message === 'success'){
        // setWishSuccessToast(true)
        wishlistDispatch({
          type: "ADD_TO_WISHLIST",
          payload: {
            wishlistItemid: wishlistItemid,
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
        // setWishErrorToast(true)
      }
    }
    catch(err){
      // setWishErrorToast(true)
    }
  }

  return (
    <div className="product-wrapper">
        <Box sx={{display: "flex", width: "70%", padding: "2rem", justifyContent: "center"}}>
            <img src="/images/hero-shoes.png" className='product-pic' alt="product-image" />
            <Box sx={{display: "flex", flexDirection: "column", padding: "2rem", width: "40%"}}>
                <h2 style={{padding: 0, margin: 0}}>Nike Air Max</h2>
                <p style={{padding: 0, margin: 0}}>Nike Men's</p>
                <Box sx={{display: "flex", gap: "20px"}}>
                    <p>$239</p>
                    <p>MRP: $300</p>
                </Box>
                <p style={{padding: 0, margin: 0}}>inclusive of all taxes</p>
                <p style={{padding: 0, margin: 0}}>(Also includes applicable duties)</p>
                <ToggleButtonGroup color="primary" value={size} onChange={(e, nextSize) => setSize(nextSize)} sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginTop: "20px"}}>
                    {
                        [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10, 11, 12, 13, 14].map((s, index) => {
                            return(
                                <ToggleButton key={s} value={s} aria-label={s}>
                                    {s}
                                </ToggleButton>
                            )
                        })
                    }
                </ToggleButtonGroup>
                <Button sx={{mt: "10px"}} color="secondary" variant='contained' onClick={() => {
                    const cartItem = cartState.cart.filter(c => c.product.productid === "1")[0]
                            if(cartItem === undefined){
                              addToCart()
                            }
                            else{
                              updateToCart(cartItem)
                            }
                          }} 
                >Add to cart <ShoppingBag /></Button>
                <Button sx={{mt: "10px"}} color="secondary" variant="outlined" onClick={addToWishList}>Add to favourites <Favorite /></Button>
            </Box>
        </Box>
    </div>
  )
}

export default Product