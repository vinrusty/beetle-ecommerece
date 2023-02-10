import React from 'react'
import Main from '../components/Shop/Main'

function Shop({axiosJWT, URL}) {
  return (
    <div>
        <Main axiosJWT={axiosJWT} URL={URL} />
    </div>
  )
}

export default Shop