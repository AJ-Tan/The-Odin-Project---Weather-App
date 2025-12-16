import { pubsub } from "./PubSub";
import { format, isAfter, subHours } from "date-fns";

async function fetchWeatherData(location) {
  const queryLocation = location.replaceAll(" ", "%20").replaceAll(",", "%2C");
  const fetchData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${queryLocation}?unitGroup=metric&key=HTCXSQZ5PT4AZJMDK8X5FATAC&contentType=json`
  );
  return fetchData.json();
}

pubsub.subscribe("location", async (location) => {
  try {
    const now = subHours(new Date(), 1);
    const fetchData = await fetchWeatherData(location);
    const weatherData = {
      address: fetchData?.resolvedAddress,
      daysForecast: fetchData?.days
        .slice(0, 7)
        .map(({ datetime, temp, icon, precipprob }, index) => {
          const dateNow =
            index === 0 ? "Today" : format(new Date(datetime), "EEE");
          const iconText = {
            "clear-day": "Clear Day",
            "clear-night": "Clear Night",
            cloudy: "Cloudy",
            fog: "Fog",
            "partly-cloudy-day": "Cloudy Day",
            "partly-cloudy-night": "Cloudy Night",
            rain: "Rainy",
            snow: "Snowy",
            wind: "Windy",
          };
          return {
            datetime: dateNow,
            temp: Math.round(temp),
            precipprob,
            icon,
            iconText: iconText[icon],
          };
        }),
      todaysForecast: fetchData?.days[0].hours
        .map(
          ({
            datetime,
            feelslike,
            windspeed,
            precipprob,
            uvindex,
            temp,
            icon,
          }) => {
            const dataDate = new Date(
              `${format(now, "MMM dd, yyyy")} ${datetime}`
            );
            return {
              datetime: dataDate,
              timeText: format(dataDate, "hh:mm a"),
              feelslike,
              windspeed,
              precipprob,
              uvindex,
              temp: Math.round(temp),
              icon,
            };
          }
        )
        .filter(({ datetime }) => {
          return isAfter(datetime, now);
        })
        .slice(0, 6),
    };

    console.log(weatherData);

    pubsub.publish("weather", weatherData);
  } catch (err) {
    throw new Error(err);
  }
});
