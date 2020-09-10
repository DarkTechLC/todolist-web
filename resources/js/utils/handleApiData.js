import config from '../config/config.js';

export default async (resource, method, formData = {}, headers = {}) => {
  const url = `${config.API_BASE_URL}${resource}`;

  const options = {
    method,
    body: JSON.stringify(formData),
    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers
    })
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}