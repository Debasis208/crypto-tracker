import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "./CryptoContex";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const useStyles = makeStyles(() => ({
  top: {
    width: "100%",
    color: "black",
  },
}));

function CryptoCards() {
  const [fetchData, setFetchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const[page, setPage]=useState(1)
  const { currency, symbol } = CryptoState();
  const history = useNavigate();
  const classes = useStyles();

  const fetchTable = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setFetchData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching table coins:", error);
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchTable();
  }, [fetchTable]);

  const handleSearch = () => {
    return fetchData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <TextField
          label="Search Coins"
          variant="filled"
          onChange={(e) => setSearchValue(e.target.value)}
          className={classes.top}
          style={{
            margin: "0 auto 20px auto",
          }}
        />

        {loading ? (
          <LinearProgress />
        ) : (
          <TableContainer style={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h change", "Market Cap"].map((data) => (
                    <TableCell
                      key={data}
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        backgroundColor: "lightgray",
                      }}
                      align={data === "Coin" ? "left" : "right"}
                    >
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map((data) => {
                  const profit = data.price_change_percentage_24h >= 0;
                  return (
                    <TableRow
                      key={data.id}
                      onClick={() => history(`/coins/${data.id}`)}
                      style={{ backgroundColor: "rgba(32, 32, 56, 0.856)" }}
                    >
                      <TableCell style={{ display: "flex", gap: 20 }}>
                        <img
                          src={data.image}
                          alt={data.name}
                          style={{ height: 40, width: 40 }}
                        />
                        <div>
                          <div
                            style={{
                              textTransform: "uppercase",
                              fontSize: 20,
                              color: "blue",
                            }}
                          >
                            {data.symbol}
                          </div>
                          <div>{data.name}</div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {data.current_price.toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {data.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {data.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Pagination
            style={{
              width:"100%",
              display:"flex",
              justifyContent:"center",
              background:"rgba(32, 32, 56, 0.856)"
              
            }}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_,value)=>{
              setPage(value);
              window.scroll(0,450)
            }}
            />
          </TableContainer>
          
        )}
      </Container>
    </ThemeProvider>
  );
}

export default CryptoCards;
