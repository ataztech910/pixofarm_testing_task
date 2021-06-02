export const weatherService = (defaultCoordinates: any) => {
  return fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${defaultCoordinates.latitude}&lon=${defaultCoordinates.longitude}&key=03424544e6eb468fa7af932e0d21e43e`,
  ).then(response => response.json());
};

export const normalizeWeather = (json: any) => {
  return json && !json.error && json.status_code !== 429
    ? json.data[0].weather.description
    : 'Limit exceed';
};
