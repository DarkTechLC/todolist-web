import config from '../config/config.js';

export default (path, time = 100) => {
  const url = `${config.WEB_BASE_URL}${path}`;

  setTimeout(() => {
    return location.replace(url);
  }, time);
}