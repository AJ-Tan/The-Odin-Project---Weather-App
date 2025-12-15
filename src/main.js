import "./style.css";
import "./js/events";
import "./js/subscribe";
import "./js/render/index";

import { locationListData } from "./js/LocationList";

fetch("https://ipinfo.io/json")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    locationListData.setLocationISO2(res.country);
  });
