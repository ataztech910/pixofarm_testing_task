import { ADD_COORDINATES, GET_COORDINATES } from "./actionTypes";

export function addCoordinates(payload: ICoordinates) {
  const action: MarkerAction = {
    type: ADD_COORDINATES,
    payload,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}

export function getCoordinates() {
  const action: MarkerAction = {
    type: GET_COORDINATES,
  };

  return (dispatch: DispatchType) => {
    dispatch(action);
  };
}
