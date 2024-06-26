export function generateId(length = 6) {
  var txt = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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

// A function that is made to handle both string and timestamp type dates
// and converts them into one type that's compareable and ready for sorting
function getDateObject(date) {
  if (typeof date === 'string') {
    return new Date(date);
  } else if (date instanceof Date) {
    return date;
  } else {
    return date.toDate(); // Convert Firebase Timestamp to Date
  }
}

// A function the sort uses to sort transactions by date (desc order)
export function compareDates(a, b) {
  const dateA = getDateObject(a.date);
  const dateB = getDateObject(b.date);

  if (dateA.getTime() > dateB.getTime()) return -1;
  if (dateA.getTime() < dateB.getTime()) return 1;
  return 0;
}

export function getLastMonthProperties() {
  const currentDate = new Date();
  let lastMonth = currentDate.getMonth(); // Zero-based index which means 0 is Jan, 1 is Feb etc

  // Adjust the month if the current month is January
  if (lastMonth === 0) {
    lastMonth = 11; // December of the previous year
  } else {
    lastMonth -= 1; // Get the previous month
  }

  // If last month was Dec of last year then we reduce 1 from current year in order to get last year
  const lastMonthsYear = lastMonth === 11 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();

  // Add 1 to lastMonth to convert zero-based index to one-based index
  lastMonth += 1;

  return { lastMonthsYear, lastMonth };
}

export function getCurrentMonth() {
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth = (currDate.getMonth() + 1).toString().padStart(2, "0");
  return `${currYear}-${currMonth}`;
}