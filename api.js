let axios;

// Required for the httpClient object
const setAxios = client => {
    axios = client;
    return axios;
};

// Define each api method as such
const getWeather = async({appid, lat, lon, units}) => {

  // Create the axios config object
  const config = {
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/onecall', // maybe this comes from one of your input variables
    headers: { 
      'Content-Type': 'application/json',
      'User-Agent': 'PingOne DaVinci'
    },
    params: {
      'lat': Number(lat),
      'lon': Number(lon),
      'exclude': 'hourly,daily,minutely',
      'appid': appid,
      'units': units
    }
    // data: {} is available for sending the body
  }

  // Send the axios request
  return axios.request(config);
}

module.exports = {
  setAxios,
  getWeather
}