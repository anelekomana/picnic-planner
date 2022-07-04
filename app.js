const WeatherService = require("./service/weather-service");
const PicnicPlannerService = require("./service/picnic-planner-service");

const args = process.argv.slice(2).join(" ");

runApp(args[0]);

async function runApp(city) {
  if (!city) {
    return console.log("No city entered, please enter city name.");
  }

  let weatherService = new WeatherService();
  let weather = await weatherService.fetch(city);

  let picnicPlannerService = new PicnicPlannerService();
  let suggestion = picnicPlannerService.getSuggestion(weather);

  console.log(suggestion);
}
