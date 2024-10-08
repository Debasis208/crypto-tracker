import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles} from "@mui/styles";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#1c1d2cde",
    height: "100vh",
  },
}));

function App() {
  const styleClass = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <div className={styleClass.App}>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
