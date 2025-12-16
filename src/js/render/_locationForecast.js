import {
  nodeLocationChanceRain,
  nodeLocationImage,
  nodeLocationName,
  nodeLocationTemp,
} from "../common";
import { pubsub } from "../PubSub";

const renderLocationForecast = (address, { precipprob, temp, icon }) => {
  nodeLocationName.textContent = address;
  nodeLocationChanceRain.textContent = precipprob;
  nodeLocationTemp.textContent = temp;

  import(`../../assets/weather-icons-svg/${icon}.svg`).then((res) => {
    const iconSVG = new DOMParser().parseFromString(
      res.default,
      "image/svg+xml"
    ).documentElement;
    nodeLocationImage.replaceChildren(iconSVG);
  });
};

pubsub.subscribe("weather", ({ address, daysForecast }) => {
  console.log(daysForecast);
  renderLocationForecast(address, daysForecast[0]);
});
