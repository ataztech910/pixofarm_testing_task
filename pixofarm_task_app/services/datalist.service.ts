import {DataStore} from '@aws-amplify/datastore';
import {DataForList} from '../src/models';

export const dataUpdate = (model: any, row: any, weather: any) => {
  return DataStore.save(
    DataForList.copyOf(model, item => {
      item.weather = weather;
      item.image = `photo_${row._id}`;
      item.timestamp = Date.now().toString();
    }),
  );
};

export const dataSave = (weather: any, row: any) => {
  return DataStore.save(
    new DataForList({
      weather: weather,
      image: `photo_${row._id}`,
      timestamp: Date.now().toString(),
    }),
  );
};
