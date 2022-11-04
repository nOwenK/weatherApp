import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import useFetchWeather from "../../Hooks/useFetchWeather";
import {Box, Button, Container, Snackbar, TextField} from "@mui/material";
import {validateIfCityExist} from "./helper/ValidateIfCityExist";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Detail = () => {
    const navigate = useNavigate();
    const city = localStorage.getItem('city')

    const [ fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();
    const [shouldSnackbarOpen, setShouldSnackbarOpen] = useState(false);
    const [shouldSnackbarOpen2, setShouldSnackbarOpen2] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShouldSnackbarOpen(false);
      };

    useEffect(()=>{
        fetchWeatherDataCallback(city);
      }, [fetchWeatherDataCallback])

return (
    
	<div className="container">
      <div className="form">
      <p className="mt-8 decoration-wavy">Info</p>
      <br/>
      <br/>
      <br/>
        <Typography sx={{ fontWeight: 'bold' , fontSize: 30}}>
            {city}
        </Typography>
        <Typography sx={{ fontSize: 15 }}>
            {weatherData?.code}
        </Typography>
        <br/>
        <br/>
        <Typography sx={{ fontSize: 40 }}>
            {weatherData?.temp}&deg;C
        </Typography>
        <Container maxWidth="sm">
          &nbsp;
            <Box 
            width="100%">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Card sx={{  width: '100%'  }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            High
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {weatherData?.high}&deg;C
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                <Card sx={{  width: '100%'  }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            Low
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {weatherData?.low}&deg;C
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                <Card sx={{  width: '100%'  }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            Humidity
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {weatherData?.humidity}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                <Card sx={{  width: '100%'  }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                            Atmospheric pressure
                            </Typography>
                            <Typography sx={{ mb: 1.5}} color="text.secondary">
                            {weatherData?.pressure}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                </Grid>
            </Box>
            
        </Container>
      </div>
      <br/>
      <br/>
      <Button variant="contained" onClick={()=>{
                navigate('/')
            }}>
                Back
            </Button>
            &nbsp;
            <Button variant="contained" onClick={()=>{
                var savedCities = JSON.parse(localStorage.getItem("savedCities"));
                if(savedCities == null) savedCities = [];

                var cek = true;
                for (let index = 0; index < savedCities.length; ++index) {
                    const element = savedCities[index];
                    // console.log(element)
                    if(element == city){
                        cek = false;
                    } else {
                        cek = true
                    }
                }
                if(cek == true){
                    savedCities.push(city);
                    localStorage.setItem("savedCities", JSON.stringify(savedCities));
                    setShouldSnackbarOpen( true);
                } else {
                    setShouldSnackbarOpen2( true);
                }
            }}>
                Save
            </Button>
      <Snackbar
        open={shouldSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="City saved"
      />
      <Snackbar
        open={shouldSnackbarOpen2}
        autoHideDuration={6000}
        onClose={handleClose}
        message="City already in saved list"
      />

    </div>
);
};

export default Detail;