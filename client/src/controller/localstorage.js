export const saveArrayToLS = (key, data) => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export const readArrayFromLS = (key) => {
  const arr = localStorage.getItem(key);
  let result = [];

  if (arr) {
    result = JSON.parse(arr);
  }

  return result;
}

export const clearLS = (key) => {
  localStorage.removeItem(key);
}

