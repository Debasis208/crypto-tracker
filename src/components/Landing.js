import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Tranding from "./Tranding";

const useStyles = makeStyles((theme) => ({
  Landwrapper: {
    backgroundImage: "url(./rm373batch16-56a.jpg)",
    backgroundSize:"cover",
  },
  container: {
    height:400,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    paddingTop:20
  },
  mainbanner:{
    height:"37%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around",
    textAlign:"center"
  },
  heading:{
    color: "lightgray",
    fontWeight:"bolder"
  },
  detail:{
    color:"lightgreen",
  }
}));

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.Landwrapper}>
      <Container className={classes.container}>
        <div className={classes.mainbanner}>
        <Typography 
        variant="h2"
        className={classes.heading}>
            CRYPTO TRACKER
        </Typography>
        <Typography
        variant="subtitle5"
        className={classes.detail}
        >
            Get realtime trade in easy and effective manner from CRYPTO TRACKER.
        </Typography>
        </div>
        <Tranding/>
      </Container>
    </div>
  );
}

export default Landing;
