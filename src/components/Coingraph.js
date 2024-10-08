import React, { useCallback, useEffect, useState } from "react";
import { CryptoState } from "./CryptoContex";
import { createTheme } from "@mui/material/styles";
import { makeStyles, ThemeProvider } from "@mui/styles";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { CircularProgress, Button } from "@mui/material"; // Import Button component


// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems:"center",
    marginTop: 20,
  },
  button: {
    margin: "0 10px", // Add some margin between buttons
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Coingraph({ coindata }) {
  const classes = useStyles();
  const [graphData, setGraphdata] = useState([]);
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();

  const fetchGraphdata = useCallback(async () => {
    if (!coindata?.id) return;
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coindata.id}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}`
      );
      console.log("Fetched graph data:", data.prices); // Log the fetched prices
      setGraphdata(data.prices);
    } catch (error) {
      console.error("Error fetching graph data:", error.response ? error.response.data : error.message);
    }
  }, [currency, days, coindata?.id]);

  useEffect(() => {
    fetchGraphdata();
  }, [fetchGraphdata]);

  const data = {
    labels: graphData.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: graphData.map((coin) => coin[1]),
        label: `Price (Past ${days} Days) in ${currency}`,
        borderColor: "#EEBC1D",
      },
    ],
  };

  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return symbol + value;
          },
        },
      },
    },
  };

  // Define button configurations directly in the component
  const buttonConfigs = [
    { label: "24 Hours", value: 1 },
    { label: "30 Days", value: 30 },
    { label: "3 Months", value: 90 },
    { label: "1 Year", value: 365 },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {graphData.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <CircularProgress />
        )}
      </div>
      <div className={classes.buttonContainer}>
        {buttonConfigs.map((day) => (
          <Button
            key={day.value}
            className={classes.button}
            variant={day.value === days ? "contained" : "outlined"}
            color="primary"
            onClick={() => setDays(day.value)}
          >
            {day.label}
          </Button>
        ))}
      </div>
    </ThemeProvider>
  );
}

export default Coingraph;
