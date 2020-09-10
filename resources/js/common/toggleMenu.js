export default () => {
  const btnMenuTrigger = document.querySelector('.js-menu-trigger');
  const menuNav = document.querySelector('.js-menu-nav');

  btnMenuTrigger.addEventListener('click', () => {
    menuNav.classList.toggle('menu-nav--hidden');
  });
};