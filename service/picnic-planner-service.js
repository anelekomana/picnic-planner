const codes = require("../data/weather-condition-codes");

module.exports = class PicnicPlannerService {
  isDayDryAndWarm(dayWeather) {
    if (codes.dryCodes.includes(dayWeather.conditions) && dayWeather.temp > 10)
      return true;

    return false;
  }

  isDayRainyAndCold(dayWeather) {
    const isDayCold = codes.coldCodes.includes(dayWeather.conditions);
    const isDayRainy = codes.rainyCodes.includes(dayWeather.conditions);

    if ((isDayCold || isDayRainy) && dayWeather.temp < 10) return true;

    return false;
  }

  calcTempDifference(low, high) {
    const difference = high - low;
    return Math.round(difference * 10) / 10;
  }

  getSuggestion(weather) {
    if (!weather || !weather.days || weather.days.length !== 2) {
      return "Could not retrieve weather, please try again.";
    }

    let nextSaturdayWeather = weather.days[0];
    let nextSundayWeather = weather.days[1];

    if (
      this.isDayRainyAndCold(nextSaturdayWeather) &&
      this.isDayRainyAndCold(nextSundayWeather)
    ) {
      return "The weather isn`t looking very good this weekend, maybe stay indoors.";
    }

    let isSaturdayDryOrWarn = this.isDayDryAndWarm(nextSaturdayWeather);
    let isSundayDryOrWarn = this.isDayDryAndWarm(nextSundayWeather);

    if (isSaturdayDryOrWarn && !isSundayDryOrWarn) {
      return "You should have your picnic on Saturday.";
    }
    if (isSundayDryOrWarn && !isSaturdayDryOrWarn) {
      return "You should have your picnic on Sunday.";
    }

    if (isSaturdayDryOrWarn && isSundayDryOrWarn) {
      let saturdayTemp = nextSaturdayWeather.temp;
      let sundayTemp = nextSundayWeather.temp;

      if (saturdayTemp > sundayTemp) {
        let tempDifference = this.calcTempDifference(sundayTemp, saturdayTemp);
        return `This weekend looks nice for a picnic, Saturday is best because it's temperature will be ${tempDifference} deg C warmmer.`;
      }
      if (sundayTemp > saturdayTemp) {
        let tempDifference = this.calcTempDifference(saturdayTemp, sundayTemp);
        return `This weekend looks nice for a picnic, Sunday is best because it's temperature will be ${tempDifference} deg C warmmer.`;
      }
    }
  }
};
