import { makeStyles } from '@mui/styles'
import React, { useEffect, useState, useCallback } from 'react'
import { TrendingCoins } from '../config/api';
import axios from 'axios';
import { CryptoState } from './CryptoContex';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  tranding:{
    display:"flex",
    alignItems:"center",
    height:"55%"
  },
  symbol: {
    textTransform:"uppercase",
    color:"lightgray",
    fontWeight:"bold"
  },
  spans:{
    dispaly: "flex",
    alignItems:"center",
    gap:15
  },
  price:{
    fontSize:20,
    fontWeight: "bold",
    color:"yellow",
    textAlign:'center'
  }
}));

function Tranding() {
    const classes = useStyles();
    const [trending, setTrending] = useState([]);
    const {currency, symbol} = CryptoState();
    
    const fetchTrendingCoins = useCallback(async () => {
        try {
          const { data } = await axios.get(TrendingCoins(currency));
          setTrending(data);
        } catch (error) {
          console.error("Error fetching trending coins:", error);
        }
      }, [currency]);
    console.log(trending);
    
    useEffect(() => {
        fetchTrendingCoins();
      }, [fetchTrendingCoins]);

      const items = trending.map((coin)=>{
        let profit = coin?.price_change_percentage_24h >= 0;
        return(
            <Link to={`/coins/${coin.id}`} key={coin.id}
            style={{display:"flex",
                flexDirection:"column",
                alignItems:"center"
                
            }}>
                <img src={coin?.image}
                alt={coin.name}
                height="90"/>
                <div className={classes.spans}>
                    <span className={classes.symbol}>{coin.symbol}</span>
                    <span style={{ color: profit ? 'green' : 'red'  , marginLeft:"5px"}}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2) + "%"} 
                    </span>
                </div>
                <div className={classes.price}>
                    {symbol}{coin?.current_price.toFixed(2)}
                </div>
            </Link>
        );
      });

      const responsive = {
        0: {
            items: 2
        },
        300:{
            items:3
        },
        600: {
            items:4
        },
        900:{
            items:5
        }
      };

  return (
    <div className={classes.tranding}>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        />
    </div>
  )
}

export default Tranding
