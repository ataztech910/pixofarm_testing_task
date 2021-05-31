import {ADD_COORDINATES, GET_COORDINATES} from './actionTypes';

const initialState: MarkerState = {
  coordinates: {
    latitude: '',
    longitude: '',
  },
};

const reducer = (
  state: MarkerState = initialState,
  action: MarkerAction,
): MarkerState => {
  switch (action.type) {
    case ADD_COORDINATES:
      const newCoordinates: ICoordinates = {
        latitude: action.payload ? action.payload.latitude : '',
        longitude: action.payload ? action.payload.longitude : '',
      };
      console.log({
        ...state,
        coordinates: newCoordinates,
      });
      return {
        ...state,
        coordinates: newCoordinates,
      };
    // case GET_COORDINATES:
    //   return {
    //     coordinates: {
    //       latitude: state.coordinates.latitude,
    //       longitude: state.coordinates.longitude,
    //     },
    //   };
  }
  return state;
};

export default reducer;
