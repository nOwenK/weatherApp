import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import useFetchWeather from "../../Hooks/useFetchWeather";
import {Box, Button, Container, Snackbar, TextField} from "@mui/material";
import CityCardList from "./components/CityCardList";
import {validateIfCityExist} from "./helper/ValidateIfCityExist";

// import { Redirect } from "react-router-dom";


const View = ()=>{
  const navigate = useNavigate();
  const [citiesArray, setCitiesArray] = useState(
    [
     
    ]);

  // Hooks call

  const [cityInput, setCityInput] = useState("");

  useEffect(()=>{
    var citiesSaved = JSON.parse(localStorage.getItem('savedCities'))
    if(citiesSaved == null){
        return;
    } else {
        for (let index = (citiesSaved.length - 1); index >= 0; --index) {
          const element = citiesSaved[index];
          // console.log(element)
          setCitiesArray(citiesArray => [...citiesArray, {cityName: element}]);
        }
    }
  }, [])

  return (
    <div className="container">
      <div className="form">
        <p className="mt-8 decoration-wavy">Saved Cities</p>
        <br/>
        <Container maxWidth="sm">
          &nbsp;
        </Container>
      </div>
        <CityCardList
          cityArray={citiesArray}
        />
        <br/>
        <Button variant="contained" onClick={()=>{
                navigate('/')
            }}>
                Back
        </Button>
    </div>
    
  );
}

export default View;
