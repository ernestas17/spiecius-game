// Variables
const footerElement = document.querySelector('footer');
const currentYearElement = document.querySelector('#current-year');
// Functions
addFooterBackgorund = () => {
  // ------- changing header background color based on page
  if (location.href.includes('index')) {
    footerElement.style.backgroundColor = `var(--extra-1-color)`;
  }

  if (location.href.includes('viktorina.html')) {
    footerElement.style.backgroundColor = `var(--extra-1-color)`;
  }

  if (location.href.includes('rask-vienoda.html')) {
    footerElement.style.backgroundColor = `var(--extra-1-color)`;
  }

  if (location.href.includes('delione.html')) {
    footerElement.style.backgroundColor = `var(--extra-1-color)`;
  }
};

const addFooterDate = () => {
  currentYearElement.innerText = new Date().getFullYear();
};

// Events
document.addEventListener('DOMContentLoaded', () => {
  addFooterBackgorund();
  addFooterDate();
});
