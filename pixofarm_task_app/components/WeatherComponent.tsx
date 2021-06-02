import React, {useEffect, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {normalizeWeather, weatherService} from '../services/weather.service';

const WeatherComponent = ({defaultCoordinates}: {defaultCoordinates: any}) => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    // console.log('defaultCoordinates', defaultCoordinates);
    weatherService(defaultCoordinates)
      .then(json => {
        console.log('weather', json);
        setWeather(normalizeWeather(json));
      })
      .catch(error => console.error('error', error));
  }, [defaultCoordinates]);

  return <ListItem.Subtitle>Weather: {weather}</ListItem.Subtitle>;
};

export default WeatherComponent;
