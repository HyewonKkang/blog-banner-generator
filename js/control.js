import Preview from './preview.js';

const titleField = document.querySelector('#title');
const subTitleField = document.querySelector('#subtitle');
const bgSelectElements = document.querySelector('.bg-select').querySelectorAll('.select-button');
const bgInputContainer = document.querySelector('.bg-input').querySelectorAll('.bg-input-type');

const preview = new Preview();

titleField.addEventListener('keyup', preview.updateTitle);
subTitleField.addEventListener('keyup', preview.updateSubTitle);
bgSelectElements.forEach((item) => item.addEventListener('click', onClickBackgroundType));

function onClickBackgroundType() {
    const clickedItem = this;

    bgSelectElements.forEach((item, idx) => {
        if (clickedItem === item) {
            if (item.classList.contains('selected')) return;
            item.classList.toggle('selected');
            selectedSize = idx;
            if (bgInputContainer[idx].classList.contains('visible')) return;
            bgInputContainer[idx].classList.toggle('visible');
        } else {
            item.classList.remove('selected');
            bgInputContainer[idx].classList.remove('visible');
        }
    });
}

/**
 * size
 */

const bannerSizeElements = document.querySelectorAll('.banner-size-template');
let selectedSize = 0;

bannerSizeElements.forEach((item) => {
    item.addEventListener('click', toggleBannerSize);
});

function toggleBannerSize() {
    const clickedItem = this;

    bannerSizeElements.forEach((item, idx) => {
        if (clickedItem === item) {
            if (item.classList.contains('banner-size-selected')) return;
            item.classList.toggle('banner-size-selected');
            preview.updateSize(item.getAttribute('aria-button-name'));
        } else {
            item.classList.remove('banner-size-selected');
        }
    });
}

/**
 * gradient background
 */

const gradientsContainer = document.querySelector('.gradients');

fetch('assets/gradients.json')
    .then((res) => {
        return res.json();
    })
    .then((jsonData) => {
        jsonData.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = `gradient-circle ${item.name.toLowerCase().replace(/\s/g, '_')}${
                idx === 0 ? ' selected' : ''
            }`;
            gradientsContainer.appendChild(div);
            div.addEventListener('click', (e) => preview.updateBackgroundGradient(e.target));
            if (idx === 0) preview.setGradient(div);
        });
    });

/**
 * solid color background
 */

const paletteContainer = document.querySelector('.palette');

fetch('assets/colors.json')
    .then((res) => {
        return res.json();
    })
    .then((jsonData) => {
        jsonData.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = `color${idx === 0 ? ' selected' : ''}`;
            div.style.backgroundColor = item.color;
            paletteContainer.appendChild(div);
            div.addEventListener('click', (e) =>
                preview.updateBackgroundColor(e.target.style.backgroundColor, e.target),
            );
            if (idx === 0) preview.setColor(div);
        });
        const input = document.createElement('input');
        input.type = 'color';
        input.id = 'bg-color-picker';
        input.className = 'hidden-bg-color-picker';
        paletteContainer.appendChild(input);
        input.addEventListener('input', (e) =>
            preview.updateBackgroundColor(e.target.value, e.target),
        );
    });

/**
 * image background
 */

const randomImageButton = document.querySelector('#random-image-btn');
const urlImageButton = document.querySelector('#url-image-btn');
const urlImageInput = document.querySelector('#img-url');

randomImageButton.addEventListener('click', onChangeBackgroundImage);
urlImageButton.addEventListener('click', loadURLImage);

function onChangeBackgroundImage() {
    fetch(`https://source.unsplash.com/random/${preview.size}`).then((res) => {
        preview.updateBackgroundImage(res.url);
    });
}

function loadURLImage() {
    const url = urlImageInput.value;
    if (!isValidURL(url)) {
        alert('올바르지 않은 URL 입니다.');
        return;
    }
    preview.updateBackgroundImage(url);
}

function isValidURL(url) {
    try {
        const urlObject = new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * text align
 */

const alignSelectElements = document
    .querySelector('.text-align-select')
    .querySelectorAll('.select-button');

alignSelectElements.forEach((item) => item.addEventListener('click', onClickAlignSelect));

function onChangeTextAlign(idx) {
    let align = 'center';
    if (idx === 0) align = 'preview-text-left';
    else if (idx === 1) align = 'preview-text-center';
    else align = 'preview-text-right';
    preview.updateTextAlign(align);
}

function onClickAlignSelect() {
    const clickedItem = this;

    alignSelectElements.forEach((item, idx) => {
        if (clickedItem === item) {
            if (item.classList.contains('selected')) return;
            item.classList.toggle('selected');
            onChangeTextAlign(idx);
        } else {
            item.classList.remove('selected');
        }
    });
}

/**
 * font style
 */
const fontColorPicker = document.querySelector('#font-color-picker');
const fontPicker = document.querySelector('.font-picker');
const fontSizeButton = document.querySelector('.font-size');

fontColorPicker.addEventListener('input', (e) => preview.updateFontColor(e.target.value));
fontPicker.addEventListener('change', (e) => preview.updateFont(e.target.value));
fontSizeButton.addEventListener('click', onClickFontSizeButton);

function onClickFontSizeButton(e) {
    preview.updateFontSize();
    fontSizeButton.classList.toggle('selected');
}
