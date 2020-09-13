export default (path, time = 100) => {
  setTimeout(() => {
    return location.replace(path);
  }, time);
}