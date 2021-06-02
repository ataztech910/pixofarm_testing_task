import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import {realmConnection} from '../model/files.schema';
import {Storage} from 'aws-amplify';
import {DataStore} from '@aws-amplify/datastore';
import {DataForList} from '../src/models';
import {normalizeWeather, weatherService} from '../services/weather.service';
import {dataSave, dataUpdate} from '../services/datalist.service';
import {Alert} from 'react-native';

const LocalImageComponent = ({item}: {item: any}) => {
  const [loadingState, setLoadingState] = useState(false);

  const syncDataWithAPI = (id: string) => {
    setLoadingState(true);
    realmConnection.then(async realm => {
      const currentRow: any = realm.objects('Files').filtered(`_id = ${id}`);
      console.log(currentRow);
      const preparedFileName = currentRow[0].file_name.replace(
        'file:///',
        'file:/',
      );
      console.log('preparedFileName', preparedFileName);
      const photo = await fetch(preparedFileName);
      const photoBlob = await photo.blob();
      console.log('photo', photoBlob);
      await Storage.put(`photo_${currentRow[0]._id}`, photoBlob, {
        level: 'private',
        contentType: 'image/jpg',
      });
      const model = await DataStore.query(DataForList, c =>
        c.image('eq', `photo_${currentRow[0]._id}`),
      );
      console.log('model is', model);

      weatherService(currentRow[0]).then((weatherFromService: any) => {
        const weather = normalizeWeather(weatherFromService);
        if (model.length > 0) {
          dataUpdate(model[0], currentRow[0], weather);
        } else {
          dataSave(weather, currentRow[0]);
        }
      });
      setLoadingState(false);
      Alert.alert('Row synchronized');
    });
  };

  return (
    <Button
      onPress={() => syncDataWithAPI(item._id)}
      type="clear"
      disabled={loadingState}
      icon={{
        name: 'refresh',
        size: 15,
        color: 'gray',
      }}
      title="Sync"
    />
  );
};

export default LocalImageComponent;
