import apiService from './apiService';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import cardItem from '../templates/cardItem.hbs';

let refs = {
  findRes: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  addPic: document.querySelector('button[data-action="addImg"]'),
  image: document.querySelector('#gallery_image'),
};

refs.gallery.addEventListener('click', handleOriginalImage);

function handleOriginalImage(evt) {
  let modal = basicLightbox.create(`
     <img src="${evt.target.dataset.url}" width="100%">
 `);

  modal.show();
  console.log(evt.target.dataset.url);
}

function fetchImg() {
  apiService
    .fetchImg()
    .then(images => {
      makeList(images);
    })
    .catch(error => console.log(error));
}
refs.findRes.addEventListener('submit', makeSearch);
function makeSearch(e) {
  e.preventDefault();

  let form = e.currentTarget;
  // console.log(form);
  let input = form.elements.query;

  clear();

  apiService.home();
  apiService.searchValue = input.value;
  console.log(apiService);
  fetchImg();

  input.value = '';
  refs.addPic.hidden = false;
}
function makeList(images) {
  let markup = cardItem(images);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clear() {
  refs.gallery.innerHTML = '';
}

function moreImg() {
  if (apiService.page > 1) {
    apiService.fetchImg().then(images => {
      makeList(images);
      window.scrollTo({
        top: window.scrollY + 500,
        behavior: 'smooth',
      });
    });
  }
}
refs.addPic.addEventListener('click', moreImg);
