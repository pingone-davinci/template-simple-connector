/* eslint-disable no-unused-expressions */
/* eslint-disable global-require */
/* globals describe, expect, it, before, afterEach */

/**
 * PingOne DaVinci Unit Tests
 */

 const {expect} = require("chai");
 const axios = require("axios");
 const sinon = require("sinon");

 const api = require("../api");

describe('API Unit Tests', () => {
  before(() => {
    api.setAxios(axios);
  });

  afterEach(() => {
    sinon.restore();
  });

  const appid = 'eaa16507a7d5779d6b428b0780962120';
  
  it('getWeather success', async () => {
    const lat = 20.6534;
    const lon = -105.2253;
    const units = 'metric'

    const data = {
        "lat": 20.6534,
        "lon": -105.2253,
        "timezone": "America/Mexico_City",
        "timezone_offset": -18000,
        "current": {
            "dt": 1651096429,
            "sunrise": 1651062796,
            "sunset": 1651109009,
            "temp": 32.68,
            "feels_like": 33.49,
            "pressure": 1010,
            "humidity": 41,
            "dew_point": 17.71,
            "uvi": 0,
            "clouds": 2,
            "visibility": 10000,
            "wind_speed": 3,
            "wind_deg": 265,
            "wind_gust": 2.87,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ]
        }
    }

    const axiosResult = {
        data,
        status: 200,
    };

    sinon.stub(axios, 'request')
        .withArgs(sinon.match({
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
          }))
        .resolves(axiosResult);

    return api.getWeather({appid, lat, lon, units})
        .then((result) => {
            expect(result).to.be.not.undefined;
            expect(result.data).to.be.not.undefined;
        });
  })
 
});