export default (formElement) => {
  const [...formDataRaw] = new FormData(formElement);
  const formData = {};

  formDataRaw
    .forEach(item => {
      formData[item[0]] = item[1];
    });

  return formData;
}