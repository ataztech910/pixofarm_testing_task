import React, {useEffect, useState} from 'react';
// @ts-ignore
import styled from 'styled-components/native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

const StyledView = styled.View`
  background-color: red;
  flex: 1;
`;

// @ts-ignore
const MapScreen = ({navigation}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const dispatch = useDispatch();
  const setCurrentPosition = (position: any) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    dispatch({
      type: 'ADD_COORDINATES',
      payload: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
  };

  const initGeoLocation = () => {
    console.log('init geolocation');
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        setCurrentPosition(position);
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
      },
    );
    Geolocation.watchPosition(
      position => {
        console.log('position WATCH', position);
        setCurrentPosition(position);
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        enableHighAccuracy: true,
      },
    );
  };
  const onPress = (coordinates: any) => {
    dispatch({type: 'ADD_COORDINATES', payload: coordinates});
    console.log(coordinates);
    setLatitude(coordinates.latitude);
    setLongitude(coordinates.longitude);
    // Alert.alert('Map clicked');
    navigation.navigate('Camera');
  };

  useEffect(() => {
    console.log('Map activated');
    try {
      Geolocation.requestAuthorization('whenInUse').then(result => {
        console.log(latitude);
        console.log(longitude);
        console.log(result);
        result && initGeoLocation();
      });
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <StyledView>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        onPress={e => {
          onPress(e.nativeEvent.coordinate);
        }}
        mapType="standard">
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </StyledView>
  );
};

export default MapScreen;
