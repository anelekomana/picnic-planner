const HttpService = require("./http-service");
const env = require("../config/env");

const httpService = new HttpService();

module.exports = class WeatherService {
  async fetch(city) {
    return await httpService
      .get(`${env.baseUrl}/${city}/nextweekend?key=${env.apiKey}&lang=id`)
      .then((weather) => weather)
      .catch((error) => {
        console.error("Could not fetch weather: ", error);
        return;
      });
  }
};
