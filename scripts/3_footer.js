// Variables
const footerElement = document.querySelector('footer');
const currentYearElement = document.querySelector('#current-year');
// Functions

const addFooterDate = () => {
  currentYearElement.innerText = new Date().getFullYear();
};

// Events
document.addEventListener('DOMContentLoaded', () => {
  addFooterDate();
});
