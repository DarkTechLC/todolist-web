import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js';

export default () => {
  try {
    const { auth, token } = handleDataInLocalStorage.getData();

    if (auth === true && token)
      return true;
    return false;
  } catch (error) {
    return false;
  }
}