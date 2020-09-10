export default () => {
  const btnPasswordViewTrigger = document.querySelector('.js-password-preview-trigger');
  const passwordInput = document.querySelector('.js-password-input');

  btnPasswordViewTrigger.addEventListener('click', () => {
    const inputType = passwordInput.getAttribute('type');

    if (inputType === 'password') {
      passwordInput.setAttribute('type', 'text');
    } else {
      passwordInput.setAttribute('type', 'password');
    }
  });
}