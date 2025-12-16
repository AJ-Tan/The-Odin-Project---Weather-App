import { node7DaysForecastList } from "../common";
import { pubsub } from "../PubSub";

const render7DaysForecast = (forecastData) => {
  const fragment = document.createDocumentFragment();
  forecastData.forEach(({ datetime, icon, iconText, temp }) => {
    fragment.appendChild(forecastItem(datetime, icon, iconText, temp));
  });

  node7DaysForecastList.replaceChildren(fragment);
};

pubsub.subscribe("weather", ({ daysForecast }) => {
  if (!daysForecast) return;
  render7DaysForecast(daysForecast);
});

const forecastItem = (dateText, iconName, iconText, temp) => {
  const listItem = document.createElement("li");

  const dateNode = document.createElement("span");
  dateNode.classList.add("text-sub-md");
  dateNode.textContent = dateText;
  listItem.appendChild(dateNode);

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("forecast-wrapper");
  listItem.appendChild(imgWrapper);

  const forecastWeather = document.createElement("div");
  forecastWeather.classList.add("forecast-weather");
  imgWrapper.appendChild(forecastWeather);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("weather-img-container");
  forecastWeather.appendChild(imgContainer);

  import(`../../assets/weather-icons-svg/${iconName}.svg`).then((res) => {
    const icon = new DOMParser().parseFromString(
      res.default,
      "image/svg+xml"
    ).documentElement;

    imgContainer.appendChild(icon);
  });

  const weatherTextNode = document.createElement("span");
  weatherTextNode.classList.add("text-main-md-bold");
  weatherTextNode.textContent = iconText;
  forecastWeather.appendChild(weatherTextNode);

  const tempNode = document.createElement("span");
  tempNode.classList.add("text-main-md-bold");
  tempNode.textContent = `${temp}°`;
  listItem.appendChild(tempNode);

  return listItem;
};
