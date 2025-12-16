import {
  feelSVG,
  nodeAirConditionsFeel,
  nodeAirConditionsRain,
  nodeAirConditionsUV,
  nodeAirConditionsWind,
  nodeRainIcon,
  nodeTempIcon,
  nodeUVIcon,
  nodeWindIcon,
  rainSVG,
  uvSVG,
  windSVG,
} from "../common";
import { pubsub } from "../PubSub";

nodeTempIcon.replaceChildren(feelSVG);
nodeWindIcon.replaceChildren(windSVG);
nodeRainIcon.replaceChildren(rainSVG);
nodeUVIcon.replaceChildren(uvSVG);

const renderAirconditions = ({ feelslike, windspeed, precipprob, uvindex }) => {
  nodeAirConditionsFeel.textContent = feelslike;
  nodeAirConditionsWind.textContent = windspeed;
  nodeAirConditionsRain.textContent = precipprob;
  nodeAirConditionsUV.textContent = uvindex;
};

pubsub.subscribe("weather", ({ todaysForecast }) => {
  renderAirconditions(todaysForecast[0]);
});
