class LocationList {
  #locationData = null;
  #selectedLocation = null;
  constructor(locationListPromise) {
    locationListPromise
      .then((res) => {
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

  getLocationData(filterText) {
    if (!this.#locationData) return;
    return this.#locationData
      .filter((data) => data.toLowerCase().includes(filterText.toLowerCase()))
      .slice(0, 5);
  }

  setLocation(location) {
    this.#selectedLocation = location;
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
