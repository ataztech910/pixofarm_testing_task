import {DataStore} from '@aws-amplify/datastore';
import {DataForList} from '../src/models';

export const dataUpdate = (model: any, row: any, weather: any) => {
  DataStore.save(
    DataForList.copyOf(model, item => {
      item.weather = weather;
      item.image = `photo_${row._id}`;
      item.timestamp = Date.now().toString();
    }),
  ).then(e => {
    console.log('save to amazon update', e);
  });
};

export const dataSave = (weather: any, row: any) => {
  DataStore.save(
    new DataForList({
      weather: weather,
      image: `photo_${row._id}`,
      timestamp: Date.now().toString(),
    }),
  )
    .then(e => {
      console.log('save to amazon save', e);
    })
    .catch(e => {
      console.error('save error', e);
    });
};
