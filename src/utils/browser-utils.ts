export const setCookie = function (key: string, value: string, durationInDays: number) {
  const today = new Date();
  const expiry = new Date();
  expiry.setTime(today.getTime() + 3600000 * 24 * durationInDays);
  document.cookie = `${key}=${value};expires=${expiry.toUTCString()}`;
};

export const getCookie = function (key: string) {
  const allCookies = document.cookie.split(';').map(pair => pair.trim());
  const cookie = allCookies.find(pair => pair.startsWith(key));
  if (!cookie) return '';
  const [_, value] = cookie.split('=');
  return value;
};

export const storeInLocalStorage = (key: string, value: object | string) => {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const getLocalStorageValue = (key: string) => localStorage.getItem(key);
