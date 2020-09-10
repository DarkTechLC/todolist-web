const itemName = 'user_info';

export default {
  saveData: (userData) => {
    const dataParsed = JSON.stringify(userData);
    localStorage.setItem(itemName, dataParsed);
    return;
  },
  getData: () => {
    const userData = localStorage.getItem(itemName);
    return JSON.parse(userData);
  },
  removeData: () => {
    localStorage.removeItem(itemName);
    return;
  }
}