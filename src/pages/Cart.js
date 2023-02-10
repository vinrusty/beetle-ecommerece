import React, { useEffect } from 'react'
import CartList from '../components/Cart/CartList'
import { RootState } from '../Context/Context'
import Cookies from 'universal-cookie'
import Footer from '../components/Footer/Footer'

function Cart({axiosJWT, URL}) {

  const {authState, cartState, cartDispatch} = RootState()
  const cookies = new Cookies()

  const getCartItems = async () => {
    try{
      const data = await axiosJWT.get(URL+`/cart/${authState.user.email}`, {
        headers: {
          "x-access-token": authState?.aToken
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

  useEffect(() => {
    getCartItems()
  }, [])

  return (
    <div>
        <CartList axiosJWT={axiosJWT} URL={URL} />
        <Footer />
    </div>
  )
}

export default Cart