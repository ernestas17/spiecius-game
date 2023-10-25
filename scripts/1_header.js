// Variables
const headerElement = document.querySelector('header');

// Functions
const createHeaderElements = () => {
  /**
   * creating navigation tags for this structure:
   * - nav
   * -- ul
   * --- li
   * ---- a
   * --- li
   * ---- a
   * --- li
   * ---- a
   */
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  const li1 = document.createElement('li');
  const li2 = document.createElement('li');
  const li3 = document.createElement('li');
  const li4 = document.createElement('li');
  const a1 = document.createElement('a'); // to Home page
  const a2 = document.createElement('a'); // to Viktorina page
  const a3 = document.createElement('a'); // to Rask vienodą page
  const a4 = document.createElement('a'); // to Dėlionė page

  // ---- adding links to menu items

  a1.href = location.href.includes('index') ? './index.html' : '../index.html';
  a2.href = location.href.includes('index')
    ? './pages/viktorina.html'
    : './viktorina.html';
  a3.href = location.href.includes('index')
    ? './pages/rask-vienoda.html'
    : './rask-vienoda.html';
  a4.href = location.href.includes('index')
    ? './pages/delione.html'
    : './delione.html';

  // ----- adding texts to menu items
  a1.innerHTML = `<i class="fa-solid fa-house"></i>`;
  a2.innerText = 'Viktorina';
  a3.innerText = 'Rask vienodą';
  a4.innerText = 'Dėlionė';

  // ------ appending elements
  li1.appendChild(a1);
  li2.appendChild(a2);
  li3.appendChild(a3);
  li4.appendChild(a4);

  ul.append(li1, li2, li3, li4);

  nav.appendChild(ul);

  headerElement.appendChild(nav);

  // ------- changing header background color based on page
  if (location.href.includes('index')) {
    headerElement.style.backgroundColor = `var(--extra-1-color)`;
  }

  if (location.href.includes('viktorina.html')) {
    headerElement.style.backgroundColor = `var(--extra-1-color)`;
  }

  if (location.href.includes('rask-vienoda.html')) {
    headerElement.style.backgroundColor = `var(--extra-1-color)`;
  }

  if (location.href.includes('delione.html')) {
    headerElement.style.backgroundColor = `var(--extra-1-color)`;
  }
};

// Events
document.addEventListener('DOMContentLoaded', createHeaderElements);
