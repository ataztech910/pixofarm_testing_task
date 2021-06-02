import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class DataForList {
  readonly id: string;
  readonly weather?: string;
  readonly image?: string;
  readonly timestamp?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<DataForList>);
  static copyOf(source: DataForList, mutator: (draft: MutableModel<DataForList>) => MutableModel<DataForList> | void): DataForList;
}