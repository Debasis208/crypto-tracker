import { Typography } from '@mui/material'
import React from 'react'
import CryptoCards from './CryptoCards'

function Homecontent() {
  return (
    <div>
      <Typography style={{color:"lightgray", fontWeight:"bold", textAlign:"center",fontSize:"2rem",margin:"10px 0px"}}>
        Welcome to Crypto Market
      </Typography>
      <CryptoCards/>
    </div>
  )
}

export default Homecontent
