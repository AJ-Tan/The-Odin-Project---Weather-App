import {
  feelSVG,
  nodeRainIcon,
  nodeTempIcon,
  nodeUVIcon,
  nodeWindIcon,
  rainSVG,
  uvSVG,
  windSVG,
} from "../common";

nodeTempIcon.replaceChildren(feelSVG);
nodeWindIcon.replaceChildren(windSVG);
nodeRainIcon.replaceChildren(rainSVG);
nodeUVIcon.replaceChildren(uvSVG);
