// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DataForList } = initSchema(schema);

export {
  DataForList
};