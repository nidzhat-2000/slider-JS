'use strict';

const imgs = document.querySelectorAll('.slide');
const leftBut = document.querySelector('.slider__btn--left');
const rightBut = document.querySelector('.slider__btn--right');
const pointTab = document.querySelector('.points');

/*
// Fake app
const slider2 = document.querySelector('.slider');
slider2.style.transform = 'scale(0.4) translateX(-2400px)';
slider2.style.overflow = 'visible';
*/

const slider1 = slide => {
  imgs.forEach(
    (img, i) => (img.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

let currentSlide = 0;
const maxSlide = imgs.length;

const nextSlide = () => {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  imgs.forEach(
    (img, i) =>
      (img.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
  );
  activePoint(currentSlide);
};
rightBut.addEventListener('click', nextSlide);

document.addEventListener(
  'keydown',
  e => e.key === 'ArrowRight' && nextSlide()
);

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  imgs.forEach(
    (img, i) =>
      (img.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
  );
  activePoint(currentSlide);
};

leftBut.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => e.key === 'ArrowLeft' && prevSlide());

const createPoints = () => {
  imgs.forEach((_, i) =>
    pointTab.insertAdjacentHTML(
      'beforeend',
      `<button class="points__point" data-slider="${i}"></button>`
    )
  );
};

pointTab.addEventListener('click', e => {
  if (e.target.classList.contains('points__point')) {
    console.log(e.target);
    const { slider } = e.target.dataset;
    slider1(slider);
    activePoint(slider);
  }
});

const activePoint = slide => {
  document
    .querySelectorAll('.points__point')
    .forEach(point => point.classList.remove('points__point--active'));
  document
    .querySelector(`.points__point[data-slider="${slide}"]`)
    .classList.add('points__point--active');
};

const init = () => {
  slider1(0);
  createPoints();
  activePoint(0);
};
init();
