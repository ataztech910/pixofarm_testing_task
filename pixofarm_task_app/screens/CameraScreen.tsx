import React, {useEffect} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {Alert, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import {realmConnection} from '../model/files.schema';
import {useStore} from 'react-redux';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: black;
`;

console.disableYellowBox = true;

// @ts-ignore
const CameraScreen = ({navigation}) => {
  let camera: RNCamera;
  const store = useStore();
  let currentMarker: any;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currentMarker = store.getState();
    console.log('currentMarker', currentMarker);
  });
  const takePicture = async (cameraVar: any) => {
    if (cameraVar) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraVar.takePictureAsync(options);
      await CameraRoll.save(data.uri);
      console.log(data.uri);
      realmConnection.then(realm => {
        realm.write(() => {
          realm.create('Files', {
            _id: realm.objects('Files').length + 1,
            file_name: data.uri,
            date: Date.now().toString(),
            latitude: currentMarker.coordinates.latitude.toString(),
            longitude: currentMarker.coordinates.longitude.toString(),
          });
          console.log(realm.objects('Files'));
          Alert.alert('File saved');
          navigation.navigate('Map');
        });
      });
    }
  };

  return (
    <Container>
      <RNCamera
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        ref={ref => {
          // @ts-ignore
          camera = ref;
        }}
      />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => takePicture(camera)}
          style={{
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 50,
            alignSelf: 'center',
            opacity: 50,
            width: 80,
            height: 80,
          }}
        />
      </View>
    </Container>
  );
};

export default CameraScreen;
