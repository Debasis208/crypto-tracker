import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "./CryptoContex";

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: "lightgrey",
    flex: "1",
    cursor: "pointer",
  },
  select:{
    height: 35,
    width: 100,
    outline: "lightgrey"
  }
}));
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
  const classes = useStyles();
  const history = useNavigate();
  const {currency, setCurrency} = CryptoState()
  
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className={classes.appbar} onClick={() => history("/")}>
              CRYPTO TRACKER
            </Typography>
            <Select variant="outlined" defaultValue={"INR"} className={classes.select} 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)} >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
