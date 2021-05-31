import Realm from 'realm';

// @ts-ignore
export const FilesSchema = {
  name: 'Files',
  properties: {
    _id: 'int',
    file_name: 'string',
    date: 'string',
    latitude: 'string',
    longitude: 'string',
  },
  primaryKey: '_id',
};

export const realmConnection = Realm.open({
  path: 'DBForFiles',
  schema: [FilesSchema],
});
