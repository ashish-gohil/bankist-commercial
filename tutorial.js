'use stict';
// tutorials of section 13 Advanced DOM
////////////////////////////
//////////////////////////////////////////////////////
// event handler
const btnScroll = document.querySelector('.btn--scroll-to');
const btnHover = e => {
  //   console.log(e);
  alert('Mouse is over btn.');
  btnScroll.removeEventListener('mouseover', btnHover);
};
btnScroll.addEventListener('mouseover', btnHover);

//////////////////////////////////////////////////////
// event propogation: bubbling and capturing
const navLinks = document.querySelector('.nav__links');
const navItems = document.querySelectorAll('.nav__item');
const navLogo = document.querySelector('.nav__logo');
// // console.log(navItems);
// navItems.forEach(itm => {
//   itm.addEventListener('click', e => {
//     e.preventDefault();
//     // console.log('link clicked');
//     itm.style.backgroundColor = 'yellow';
//   });
// });
// navLinks.addEventListener('click', e => {
//   e.preventDefault();
//   navLinks.style.backgroundColor = 'red';
// });
// // navLogo.style.backgroundColor = 'pink';
// navLogo.addEventListener('click', e => {
//   e.preventDefault();
//   navLogo.style.backgroundColor = 'red';
// });
//

//////////////////////////////////////////////////////
//event delegation
// steps1: add eventlistener to common perent element
//step2: determine which element originated event and handle event for that element
// console.log(navItems);
navLinks.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);
  // console.log(e.currentTarget);

  //matching strategy
  if (
    e.target.classList.contains('nav__link') &
    !e.target.classList.contains('nav__link--btn')
  ) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////
//DOM traversing

//going downwars: child-elements
const h1 = document.querySelector('h1');
console.log(h1.childNodes); // gives nodelist(include text comments and all there is)
console.log(h1.children); // gives html elements list( not include text comments)
console.log(h1.firstChild); //give first child node
console.log(h1.hasChildNodes()); // true if h1 has child node
console.log(h1.lastChild === h1.childNodes[8]); //h1.lastChild give last child node

// going upwards: parent-elements
console.log(h1.parentElement);
console.log(h1.parentNode);
console.log(h1.closest('.header')); // work same as queryselector but in upward direction from current element:- find closest(in upward direction) element which contain header class
console.log(h1.offsetParent); //dn't know what it does

//going sideways: sibling-elements
console.log(h1.previousElementSibling); // immediate previous sibling element
console.log(h1.nextElementSibling); //immediate next sibling element
console.log(h1.parentElement.children); // all siblings including h1 itselef
