import React, { useEffect } from "react";

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapScreen from './screens/MapScreen';

// @ts-ignore
import styled from 'styled-components/native';
import CameraScreen from './screens/CameraScreen';
import reducer from './store/reducer';
import {applyMiddleware, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from "react-redux";
import PhotosScreen from './screens/PhotosScreen';
// @ts-ignore
import {withAuthenticator} from 'aws-amplify-react-native';
import Amplify, {Auth} from 'aws-amplify';
import config from './src/aws-exports';
import Geolocation from "react-native-geolocation-service";
import { Alert } from "react-native";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const store: Store<MarkerState, MarkerAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const CameraView = styled.View``;

const LogoutView = styled.View``;

const Tab = createBottomTabNavigator();
const App = () => {
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName: string = 'spinner';
              if (route.name === 'Map') {
                iconName = 'map-pin';
              } else if (route.name === 'Photos') {
                iconName = 'photo';
              }
              return <Icon name={iconName} color={color} size={size} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel: false,
          }}>
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen
            name="Camera"
            options={{
              tabBarIcon: ({color, size}) => {
                let iconName;
                iconName = 'camera-retro';
                return (
                  <CameraView>
                    <Icon name={iconName} color={color} size={size} />
                  </CameraView>
                );
              },
            }}
            component={CameraScreen}
          />

          <Tab.Screen name="Photos" component={PhotosScreen} />

          <Tab.Screen
            name="Logout"
            listeners={() => ({
              tabPress: e => {
                e.preventDefault();
                signOut();
              },
            })}
            options={{
              tabBarIcon: ({color, size}) => {
                let iconName;
                iconName = 'sign-out';
                return (
                  <LogoutView>
                    <Icon name={iconName} color={color} size={size} />
                  </LogoutView>
                );
              },
            }}
            component={PhotosScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default withAuthenticator(App);
