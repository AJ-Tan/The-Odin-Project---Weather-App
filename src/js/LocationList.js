import { pubsub } from "./PubSub";

class LocationList {
  #locationRawData = {};
  #locationData = [];
  #selectedLocation = null;
  constructor(locationListPromise) {
    locationListPromise
      .then((res) => {
        this.#locationRawData = res.data;
        this.setUserLocation();
        this.#locationData = res.data.reduce((overall, data) => {
          const expandCities = data.cities.map((city) => {
            return `${city}, ${data.country}`;
          });
          overall = [...overall, data.country, ...expandCities];
          return overall;
        }, []);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserLocation() {
    fetch("https://ipinfo.io/json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        locationListData.setLocationISO2(res.country);
      });
  }

  getLocationData(filterText) {
    if (!this.#locationData) return;
    return this.#locationData
      .filter((data) => data.toLowerCase().includes(filterText.toLowerCase()))
      .slice(0, 5);
  }

  setLocation(location) {
    this.#selectedLocation = location;
    pubsub.publish("location", this.#selectedLocation);
  }

  setLocationISO2(iso2) {
    const location = this.#locationRawData.find((data) => data.iso2 === iso2);
    pubsub.publish("location", location.country);
  }
}

async function fetchLocation(locationAPI) {
  const locationJSON = await fetch(locationAPI);
  const locationData = await locationJSON.json();

  if (locationData.error !== false) {
    throw new Error(locationData);
  }
  return locationData;
}

export const locationListData = new LocationList(
  fetchLocation("https://countriesnow.space/api/v0.1/countries")
);
