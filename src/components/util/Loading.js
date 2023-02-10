import { Box, LinearProgress } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <Box sx={{width: "100%", m:"2rem"}}>
        <LinearProgress />
    </Box>
  )
}

export default Loading