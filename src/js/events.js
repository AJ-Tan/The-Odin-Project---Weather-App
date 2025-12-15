import { locationListData } from "./LocationList";

const inputSearch = document.getElementById("input-search");
const searchAutoComplete = document.querySelector(".search-auto-complete");

const displayAutocomplete = () => {
  if (searchAutoComplete.classList.contains("active")) return;

  searchAutoComplete.classList.add("fade-in", "active");

  searchAutoComplete.addEventListener("animationend", () => {
    searchAutoComplete.classList.remove("fade-in");
  });

  inputSearch.addEventListener("focusout", closeAutocomplete, { once: true });
};

const closeAutocomplete = () => {
  searchAutoComplete.classList.add("fade-out");

  searchAutoComplete.addEventListener(
    "animationend",
    () => {
      searchAutoComplete.classList.remove("fade-out", "active");
    },
    { once: true }
  );
};

inputSearch.addEventListener("focus", (e) => {
  if (!e.currentTarget.value) return;
  displayAutocomplete();
});

const autoCompleteButton = (text) => {
  const listItem = document.createElement("li");
  const buttonNode = document.createElement("button");
  buttonNode.setAttribute("type", "button");
  buttonNode.textContent = text;
  buttonNode.addEventListener("click", () => {
    locationListData.setLocation(text);
    inputSearch.value = text;
  });
  listItem.appendChild(buttonNode);

  return listItem;
};

inputSearch.addEventListener("input", (e) => {
  displayAutocomplete();
  if (e.currentTarget.value === "") {
    closeAutocomplete();
    searchAutoComplete.replaceChildren();
    return;
  }
  const getCurrentLocation = locationListData.getLocationData(
    e.currentTarget.value
  );

  const documentFragment = document.createDocumentFragment();
  getCurrentLocation.forEach((data) => {
    documentFragment.appendChild(autoCompleteButton(data));
  });

  searchAutoComplete.replaceChildren(documentFragment);
});
