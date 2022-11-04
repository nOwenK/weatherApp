import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import useFetchWeather from "../../Hooks/useFetchWeather";
import {Box, Button, Container, Snackbar, TextField} from "@mui/material";
import CityCardList from "./components/CityCardList";
import {validateIfCityExist} from "./helper/ValidateIfCityExist";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import IconButton from '@mui/material/IconButton';
// import { Redirect } from "react-router-dom";


const View = ()=>{
  const navigate = useNavigate();
  const [citiesArray, setCitiesArray] = useState(
    [
     
    ]);

  // Hooks call
  const [ fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();

  const [cityInput, setCityInput] = useState("");
  const [shouldSnackbarOpen, setShouldSnackbarOpen] = useState(false);

  // For snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShouldSnackbarOpen(false);
  };

  useEffect(()=>{
    var localSearches = JSON.parse(localStorage.getItem('searches'))
    if(localSearches == null){
      return;
    } else{
      for (let index = (localSearches.length - 1); index >= 0; --index) {
        const element = localSearches[index];
        // console.log(element)
        setCitiesArray(citiesArray => [...citiesArray, {cityName: element}]);
      }
    }
  }, [])


  return (
    <div className="container">
      <div className="form">
        <p className="mt-8 decoration-wavy">Enter City Name</p>
        <br/>
        <TextField variant="outlined" onChange={(event)=>{
          setCityInput(event.target.value)
        }} />
        <br/>
        <span className="error_message">{(error!==null) && error.message}</span>
        <br/>
        <Container maxWidth="sm">
          &nbsp;
          <Button variant="contained" onClick={async()=>{
            try {
              const validationResult = await validateIfCityExist(cityInput)
              if (validationResult === true){
                var searches = JSON.parse(localStorage.getItem("searches"));
                if(searches == null) searches = [];
                
                var cek = true;
                for (let index = 0; index < searches.length; ++index) {
                    const element = searches[index];
                    // console.log(element)
                    if(element == cityInput){
                        delete searches[index]
                        searches.shift();
                        cek = false;
                    } else {
                        cek = true
                    }
                }
                if(cek == true){
                  searches.push(cityInput);
                  localStorage.setItem("searches", JSON.stringify(searches));
                } 
    
                localStorage.setItem('city', cityInput);
                navigate('/detail')
              }else{
                setShouldSnackbarOpen( true);
              }
            }catch(e){
              console.error(e)
              setShouldSnackbarOpen(true);
            }
          }}>
            Search
          </Button>
          &nbsp;
          <Button variant="contained" onClick={()=>{
            // fetchWeatherDataCallback(cityInput)
            // localStorage.setItem('city', cityInput);
            navigate('/cities')
          }}>
            Saved Cities
          </Button>
        </Container>
      </div>
      <br/>
      Recent Search
        
      <IconButton color="primary" onClick={() => { 
          localStorage.clear();
          window.location.reload(false);
          }}>
          <ClearAllIcon/>
      </IconButton>

      &nbsp;
        <CityCardList
          cityArray={citiesArray}
        />
      <Snackbar
        open={shouldSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="City not found"
      />

    </div>
    
  );
}

export default View;
