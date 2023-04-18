'use strict';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

btnScroll.addEventListener('click', () => {
  console.log(document.documentElement.clientWidth); //window viewpoint width
  console.log(document.documentElement.clientHeight); //window viewpoint height
  // console.log(section1.getBoundingClientRect()); //scton1 corrdinates

  // old version for scrolling to section
  // const sec1Corr = section1.getBoundingClientRect();
  //   console.log(scrollX); // same as: console.log(window.pageXOffset); shows howmuch scroll is there from left
  // console.log(scrollY); //same as : console.log(window.pageYOffset);
  // window.scrollTo({
  //   left: sec1Corr.x + scrollX,
  //   top: sec1Corr.y + scrollY,
  //   behavior: 'smooth',
  // });
  //

  //new ES6 version to scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
//nav-links event listener with event deligation
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', e => {
  e.preventDefault();
  if (
    e.target.classList.contains('nav__link') &
    !e.target.classList.contains('nav__link--btn')
  ) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// tab-content
const tabContainer = document.querySelector('.operations__tab-container');
const btnTabs = document.querySelectorAll('.operations__tab');
const operationContents = document.querySelectorAll('.operations__content');

// code written by me: it works but not fully optimized
// function tabFunctionality(ele) {
//   btnTabs.forEach(btn => {
//     btn.classList.remove('operations__tab--active');
//   });
//   ele.classList.add('operations__tab--active');
//   // console.log(e.target.dataset.tab);
//   operationContents.forEach(op => {
//     op.classList.remove('operations__content--active');
//   });
//   document
//     .querySelector(`.operations__content--${ele.dataset.tab}`)
//     .classList.add('operations__content--active');
// }
// tabContainer.addEventListener('click', e => {
//   e.preventDefault();
//   // console.log(e.targest.tagName);
//   if (e.target.classList.contains('btn')) {
//     tabFunctionality(e.target);
//   } else if (e.target.tagName === 'SPAN') {
//     tabFunctionality(e.target.closest('.btn'));
//   }
// });

//code from tutorial
tabContainer.addEventListener('click', e => {
  e.preventDefault();
  const ele = e.target.closest('.btn');
  if (!ele) return;
  //tab movement
  btnTabs.forEach(btn => {
    btn.classList.remove('operations__tab--active');
  });
  ele.classList.add('operations__tab--active');

  // content change on click of relevent tab
  operationContents.forEach(op => {
    op.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${ele.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// nav link hover functionality
const nav = document.querySelector('.nav');
//common function to handle mouse over and out event
const navLinksAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const links = e.target.closest('.nav').querySelectorAll('.nav__link');
    links.forEach(link => {
      if (link !== e.target) {
        link.style.opacity = this;
      }
    });
    nav.querySelector('.nav__logo').style.opacity = this;
    // e.target.style.opacity = 1;
  }
};
//mouse over event: initial code without seperate function
// nav.addEventListener('mouseover', e => {
//   if (e.target.classList.contains('nav__link')) {
//     const links = e.target.closest('.nav').querySelectorAll('.nav__link');
//     links.forEach(link => (link.style.opacity = 0.5));
//     nav.querySelector('.nav__logo').style.opacity = 0.5;
//     e.target.style.opacity = 1;
//   }
// });
//mouse over event: code with seperate function
// function is binded with opacity as this keyword
nav.addEventListener('mouseover', navLinksAnimation.bind(0.5));

//mouse out event: initial code without seperate function
// nav.addEventListener('mouseout', e => {
//   if (e.target.classList.contains('nav__link')) {
//     const links = e.target.closest('.nav').querySelectorAll('.nav__link');
//     links.forEach(link => (link.style.opacity = 1));
//     nav.querySelector('.nav__logo').style.opacity = 1;
//     // e.target.style.opacity = 1;
//   }
// });
nav.addEventListener('mouseout', navLinksAnimation.bind(1));
//
///////////////////////////////////////
//sticky navigation
//1.with window scroll event(not efficient-don't use ever)
// console.log(nav.getBoundingClientRect());
// window.addEventListener('scroll', () => {
//   // console.log(window.scrollY);
//   // console.log(section1.getBoundingClientRect().y);
//   if (section1.getBoundingClientRect().y < nav.getBoundingClientRect().height) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
//2.with intersection observer API
//reference link : https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const options = {
  root: null,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
  threshold: 0,
};
// console.log(nav.getBoundingClientRect());
const callBack = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav.classList.remove('sticky');
    } else {
      nav.classList.add('sticky');
    }
  });
};
const observer = new IntersectionObserver(callBack, options);
observer.observe(document.querySelector('.header'));

//
///////////////////////////////////////
// reveal on scroll feature

const callBackForRevealOnScroll = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry.target);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const optionsForRevealOnScroll = {
  root: null,
  rootMargin: '-100px',
  threshold: 0,
};
const revealOnScrollObserver = new IntersectionObserver(
  callBackForRevealOnScroll,
  optionsForRevealOnScroll
);
document.querySelectorAll('.section').forEach(sec => {
  sec.classList.add('section--hidden');
  revealOnScrollObserver.observe(sec);
});
//
///////////////////////////////////////
//
// lazy loading of images
const lazyLoadingImgCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // replace src with original img by using dataset-src attribute
    entry.target.src = entry.target.dataset.src;
    //when original img is fully loaded by browser then and only then lazy-img class is removed o/w if image is not loaded then it will not be replaced with original one and filter is removed that will show lazy-img on the page which is ugly(bcz small size)
    entry.target.addEventListener('load', e => {
      e.preventDefault();
      entry.target.classList.remove('lazy-img'); // lazy-img class has a filter to blur img
      observer.unobserve(entry.target); // remove observer after original img is loaded
    });
  });
};
const lazyLoadingImgOptions = {
  root: null,
  threshold: 0,
};

const lazyLoadImgObserver = new IntersectionObserver(
  lazyLoadingImgCallback,
  lazyLoadingImgOptions
);
// get all img tags which has data-src class attribute
const lazyImgs = document.querySelectorAll('img[data-src]');
lazyImgs.forEach(img => {
  lazyLoadImgObserver.observe(img);
});

//
///////////////////////////////////////
// Slider functionality
const slider = document.querySelector('.slider');

// visible add the slides
slider.style.overflow = 'visible';

//slides
const slides = document.querySelectorAll('.slide');

// functions
const displaySlide = function () {
  slides.forEach(
    (slide, idx) =>
      (slide.style.transform = `translateX(${(idx - curSlide) * 100}%)`)
  );
  curDot();
};
const slideLeft = function () {
  if (curSlide > 0) curSlide--;
  else curSlide = slides.length - 1;
  displaySlide();
  curDot();
};
const slideRight = function () {
  curSlide < slides.length - 1 ? curSlide++ : (curSlide = 0);
  displaySlide();
  curDot();
};
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  // create dots for each slide
  slides.forEach((_, idx) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${idx}"></button>`
    );
  });
};
const curDot = function () {
  document.querySelectorAll('button[data-slide]').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`button[data-slide='${curSlide}']`)
    .classList.add('dots__dot--active');
};

// inital conditions
let curSlide = 0;
createDots();
displaySlide();

// add event listener on left button
const btnLeft = document.querySelector('.slider__btn--left');
btnLeft.addEventListener('click', slideLeft);

// add event listener on right button
const btnRight = document.querySelector('.slider__btn--right');
btnRight.addEventListener('click', slideRight);

// add event listener on left and right keyboard
window.addEventListener('keydown', e => {
  e.key === 'ArrowLeft' && slideLeft();
  e.key === 'ArrowRight' && slideRight();
});

// add event listener on dot
dotContainer.addEventListener('click', e => {
  if (!e.target.classList.contains('dots__dot')) return;
  curSlide = e.target.dataset.slide;
  displaySlide();

  // displaySlide();
});

//
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
