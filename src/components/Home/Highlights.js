import { Favorite, ShoppingBag } from '@mui/icons-material'
import { Box, Grid, Rating, IconButton, useMediaQuery } from '@mui/material'
import React from 'react'
import './Highlights.css'

function Highlights() {
  const matches = useMediaQuery('(min-width: 600px)')
  return (
    <>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", padding: `${matches} ? '2rem':''`, flexDirection: "column"}}>
          <h1 style={{ fontFamily: "Poppins"}}>Explore the latest trends</h1>
          <Grid container columns={{ xs: 6, sm: 8, md: 12}} sx={{padding: `${matches} ? '2rem':''`}}>
            {
              [...Array(4)].map((item, index) => {
                return(
                  <Grid item={true} xs={6} sm={4} md={3} p={2}>
                    <Box key={index} className='highlight-cards' sx={{ display: "flex", flexDirection: "column", padding:"0 1.6rem", borderRadius: "30px", position: "relative"}}>
                      {/* <div className="card-circle"></div> */}
                      <img className='card-img' src='/images/hero-shoes.png' alt='card-pics' />
                      <Box sx={{display: "flex", alignItems:"center"}}>
                        <h4>Nike Flyknit</h4>
                        <Box sx={{display: "flex", marginLeft: "auto"}}>
                          <IconButton>
                            <Favorite color='secondary' w={8} />
                          </IconButton>
                          <IconButton>
                            <ShoppingBag color='secondary' w={8} />
                          </IconButton>
                        </Box>
                      </Box>
                      <Rating defaultValue={4.5} />
                      <h4 className='price'>$ 239</h4>
                    </Box>
                  </Grid>
                )
              })
            }
          </Grid>
      </div>

    </>
  )
}

export default Highlights