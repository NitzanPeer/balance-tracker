export function generateId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

export function saveToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
}

export function loadFromLocalStorage(key) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return undefined;
  }
}

// a function the sort uses to sort transactions by date (desc order)
export function compareDates(a, b) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB - dateA;
}
