import galleryArr from './gallery-items.js';
let i = -1;
let k = 0;
const createGalleryItem = ({preview, original, description}) => {
    i+=1
    return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img 
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    index="${i}"/>
    </a>
    </li>`;
};

const makeGallery = galleryArr.map(par => createGalleryItem(par)).join('');
const galleryList = document.querySelector('.js-gallery');
galleryList.insertAdjacentHTML('beforeend',makeGallery);

const popap = document.querySelector('.js-lightbox')
const previewImg = document.querySelectorAll('.gallery__image')
const originImgInModal = document.querySelector('.lightbox__image');
const backdropDiv = document.querySelector('.lightbox__overlay')
const closeBtn = document.querySelector('[data-action="close-lightbox"]')
let newOriginImgInModal = ''
galleryList.addEventListener('click', onOpenModal);

function onOpenModal(e) {
    k = Number(e.target.getAttribute('index'));
    e.preventDefault();
    window.addEventListener('keydown', onEscKeyPress)

    if(e.target.nodeName !== 'IMG') { 
        return
    }
    popap.classList.add('is-open');

    originImgInModal.src=`${e.target.dataset.source}`;
    originImgInModal.alt=`${e.target.alt}`; 
}
// смена изображения нажатием клавиш "влево" или "вправо"
document.addEventListener('keydown', onLeftOrRightKeyPress)
function onLeftOrRightKeyPress (ev) {
    // Right
if(ev.key === 'ArrowRight') {
    if(Number(previewImg[k].getAttribute('index')) === previewImg.length-1){
        newOriginImgInModal = previewImg[0];
        originImgInModal.src=`${newOriginImgInModal.dataset.source}`;
        originImgInModal.alt=`${newOriginImgInModal.alt}`;
         k = Number(newOriginImgInModal.getAttribute("index"))
         return 
    }

    newOriginImgInModal = previewImg[k+1]
    originImgInModal.src=`${newOriginImgInModal.dataset.source}`;
    originImgInModal.alt=`${newOriginImgInModal.alt}`;
    k = Number(newOriginImgInModal.getAttribute("index"))
}
// left
if(ev.key === 'ArrowLeft') {
    if(Number(previewImg[k].getAttribute('index')) === 0){
        newOriginImgInModal = previewImg[8];
        originImgInModal.src=`${newOriginImgInModal.dataset.source}`;
        originImgInModal.alt=`${newOriginImgInModal.alt}`;
         k = Number(newOriginImgInModal.getAttribute("index"))
        return
    }
    newOriginImgInModal = previewImg[k-1]
    originImgInModal.src=`${newOriginImgInModal.dataset.source}`;
    originImgInModal.alt=`${newOriginImgInModal.alt}`;
    k = Number(newOriginImgInModal.getAttribute("index"))
}

    // закртыие модалки по клику кнопке "закрыть"
closeBtn.addEventListener('click', onCloseBtnClick);
function onCloseBtnClick() {
    closeModal()
}

// зыкрытие модалки по клику backdrop
backdropDiv.addEventListener('click', onBackdropClick)
function onBackdropClick(ev) {
    if(ev.currentTarget === ev.target) {
        closeModal()
    }
}
}

function closeModal() {
    popap.classList.remove('is-open')
    originImgInModal.src=''
    originImgInModal.alt=''
    window.removeEventListener('keydown', onEscKeyPress)
    k = 0;
}

// зыкрытие модалки по клавише Esc
function onEscKeyPress (event) {
    if(event.code === 'Escape') {
        closeModal() 
    }
}



   