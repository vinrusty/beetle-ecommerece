import React from 'react'
import WishistItems from '../components/Wishlist/WishistItems'

function Wishlist({axiosJWT, URL}) {
  return (
    <div>
        <WishistItems axiosJWT={axiosJWT} URL={URL} />
    </div>
  )
}

export default Wishlist