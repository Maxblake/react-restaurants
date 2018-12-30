import dataSample from "./Sample.json";

//------------------------------------------------------------------------------
// Singleton for "storage" object with Getter and Setter
// Todo: replace with Redux or other state/storage library
let _storage_ = null;
function getStorage() {
  if (!_storage_) {
    _storage_ = {
      title: "Restaurants - React App",
      isSampleData: false,
      isDataExtended: false
    };
  }
  return _storage_;
}

function setStorage(newData) {
  const oldData = getStorage();
  _storage_ = { ...oldData, ...newData };
}

//------------------------------------------------------------------------------
// Loads all requered data from API/Backend
function loadData(useSampleData = false) {
  // Use mock data form JSON file if needed
  if (useSampleData) {
    setStorage({ ...dataSample, isSampleData: true });
    return;
  }

  // Todo: Add API or Backend calls to get real data into the "storage" object
  const newData = {};
  setStorage({ ...newData, isSampleData: false });
}

//------------------------------------------------------------------------------
// Extends loaded from API/Backend data with calcualted values and local identifiers
function extendData() {
  const storage = getStorage();

  // Set ID, isFavorite and topRestaurant for 'restaurants'
  if (Array.isArray(storage.restaurants)) {
    for (let i = 0; i < storage.restaurants.length; i++) {
      let r = storage.restaurants[i];
      if (r) {
        if (!r.id) r.id = i;
        if (!r.isFavorite) r.isFavorite = false;
        r.sortingValues.topRestaurants =
          r.sortingValues.distance * r.sortingValues.popularity +
          r.sortingValues.ratingAverage;
        //				console.log(r);
      }
    }
  }

  setStorage({ ...storage, isDataExtended: true });
}

export { getStorage, setStorage, loadData, extendData };
