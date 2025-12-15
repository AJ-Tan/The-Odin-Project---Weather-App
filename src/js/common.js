// SVG Icons
import rawFeelSVG from "../assets/card-icons-svg/real-feel.svg";
import rawWindSVG from "../assets/card-icons-svg/wind.svg";
import rawRainSVG from "../assets/card-icons-svg/rain-chance.svg";
import rawUvSVG from "../assets/card-icons-svg/uv-index.svg";

export const feelSVG = new DOMParser().parseFromString(
  rawFeelSVG,
  "image/svg+xml"
).documentElement;

export const windSVG = new DOMParser().parseFromString(
  rawWindSVG,
  "image/svg+xml"
).documentElement;

export const rainSVG = new DOMParser().parseFromString(
  rawRainSVG,
  "image/svg+xml"
).documentElement;

export const uvSVG = new DOMParser().parseFromString(
  rawUvSVG,
  "image/svg+xml"
).documentElement;

// Nodes;
export const nodeLocationName = document.getElementById("location-name");
export const nodeLocationChanceRain = document.getElementById(
  "location-chance-rain"
);
export const nodeLocationTemp = document.getElementById("location-temp");
export const nodeTempIcon = document.querySelector(".temp-icon");
export const nodeWindIcon = document.querySelector(".wind-icon");
export const nodeRainIcon = document.querySelector(".rain-icon");
export const nodeUVIcon = document.querySelector(".uv-icon");
