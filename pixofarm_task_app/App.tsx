import React from 'react';

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
import {Provider} from 'react-redux';
import PhotosScreen from './screens/PhotosScreen';

const store: Store<MarkerState, MarkerAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const CameraView = styled.View`
  position: absolute;
  bottom: 0px;
  height: 68px;
  width: 68px;
  border-radius: 50px;
  border: 4px solid rgba(54, 54, 54, 0.14);
  background-color: #ebebeb;
  justify-content: center;
  align-items: center;
`;

const Tab = createBottomTabNavigator();
const App = () => {
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
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
