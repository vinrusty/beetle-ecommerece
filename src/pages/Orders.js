import React from 'react'
import Footer from '../components/Footer/Footer'
import OrderList from '../components/Orders/OrderList'

function Orders({axiosJWT, URL}) {
  return (
    <>
      <div className='orders-wrapper'>
          <OrderList axiosJWT={axiosJWT} URL={URL} />
      </div>
      <Footer />
    </>
  )
}

export default Orders