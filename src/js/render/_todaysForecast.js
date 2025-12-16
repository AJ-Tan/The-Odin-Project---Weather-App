import { nodeTodaysForecastList } from "../common";
import { pubsub } from "../PubSub";

const renderTodaysForecast = (forecastData) => {
  const fragment = document.createDocumentFragment();
  forecastData.forEach(({ timeText, icon, temp }) => {
    fragment.appendChild(todaysForcastItem(timeText, icon, temp));
  });

  nodeTodaysForecastList.replaceChildren(fragment);
};

pubsub.subscribe("weather", ({ todaysForecast }) => {
  if (!todaysForecast) return;

  renderTodaysForecast(todaysForecast);
});

const todaysForcastItem = (timeText, weatherIcon, temp) => {
  const listItem = document.createElement("li");

  const timeNode = document.createElement("span");
  timeNode.classList.add("text-sub-md-bold");
  timeNode.textContent = timeText;
  listItem.appendChild(timeNode);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("todays-forecast__image");
  listItem.appendChild(imgContainer);

  import(`../../assets/weather-icons-svg/${weatherIcon}.svg`).then((res) => {
    const icon = new DOMParser().parseFromString(
      res.default,
      "image/svg+xml"
    ).documentElement;

    const title = document.createElement("title");
    title.textContent = weatherIcon;
    icon.prepend(title);

    imgContainer.appendChild(icon);
  });

  const tempNode = document.createElement("span");
  tempNode.classList.add("text-main-lg-bold");
  tempNode.textContent = `${temp}°`;
  listItem.appendChild(tempNode);

  return listItem;
};
