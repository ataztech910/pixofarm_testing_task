interface ICoordinates {
  latitude: string;
  longitude: string;
}

type MarkerState = {
  coordinates: ICoordinates;
};

type MarkerAction = {
  type: string;
  payload?: ICoordinates;
};

type DispatchType = (args: MarkerAction) => MarkerAction;
