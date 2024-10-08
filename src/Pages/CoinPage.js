import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../components/CryptoContex";
import axios from "axios";
import Coingraph from "../components/Coingraph";
import { makeStyles } from "@mui/styles";
import {  ThemeProvider, createTheme } from "@mui/material/styles";
import parse from 'html-react-parser';
import { LinearProgress, Typography } from "@mui/material";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 23,
    borderRight: "2px solid lightgray",
  },
  content: {
    width: "70%",
    padding: 20,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  coinImage: {
    marginBottom: 20,
    height: "200px",
    width: "200px",
  },
  heading:{
    color:"white",
    fontSize:20,
    fontWeight:"bold",
    width:"100%",
    textAlign:"center"
  },
  coinDescription: {
    textAlign: "justify",
    padding: 25,
    paddingBottom: 15,
  },
  coinMarketData: {
    alignSelf: "start",
    padding: 25,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
  },
  marketDataRow: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    fontSize:20,
    color:"white",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

function CoinPage() {
  const classes = useStyles();
  const { id } = useParams();
  const [coindata, setCoindata] = useState(null);
  const { currency, symbol } = CryptoState();

  const fetchSinglecoin = useCallback(async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoindata(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  }, [currency, id]);

  useEffect(() => {
    fetchSinglecoin();
  }, [fetchSinglecoin]);

  if (!coindata) return <LinearProgress/>;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <div className={classes.sidebar}>
          <h1>{coindata?.name}</h1>
          <img
            src={coindata?.image?.large}
            alt={coindata?.name}
            className={classes.coinImage}
          />
          <Typography className={classes.heading}>{coindata?.name}</Typography>
          <div className={classes.coinDescription}>
            {parse(coindata?.description?.en.split(". ")[0] + ".")}
          </div>
          <div className={classes.coinMarketData}>
            <div className={classes.marketDataRow}>
              <span>Rank:</span>
              &nbsp; &nbsp;
              <span>
                {coindata?.market_cap_rank}
              </span>
            </div>
            <div className={classes.marketDataRow}>
              <span>Crrent Price:</span>
              &nbsp;
              <span>
                {symbol}
                {coindata?.market_data?.current_price[currency.toLowerCase()]}
              </span>
            </div>
          </div>
        </div>
        <div className={classes.content}>
          <Coingraph coindata={coindata} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CoinPage;
