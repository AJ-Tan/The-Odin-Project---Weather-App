import { nodeLocationName } from "./common";
import { pubsub } from "./PubSub";

pubsub.subscribe("location", (data) => {
  nodeLocationName.textContent = data;
});
