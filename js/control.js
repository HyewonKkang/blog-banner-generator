import Preview from './preview.js';

const titleField = document.querySelector('#title');
const subTitleField = document.querySelector('#subtitle');
const bgSelectElements = document.querySelector('.bg-select').querySelectorAll('.select-button');
const bgInputContainer = document.querySelector('.bg-input').querySelectorAll('.bg-input-type');

const preview = new Preview();

titleField.addEventListener('keyup', preview.updateTitle);
subTitleField.addEventListener('keyup', preview.updateSubTitle);
bgSelectElements.forEach((item) => item.addEventListener('click', onClickBackgroundType));

function onClickBackgroundType(e) {
    const clickedItem = e.currentTarget;
    const selectedClass = 'selected';
    const visibleClass = 'visible';

    if (clickedItem.classList.contains(selectedClass)) return;

    bgSelectElements.forEach((item, idx) => {
        const isClickedItem = item === clickedItem;
        item.classList.toggle(selectedClass, isClickedItem);

        bgInputContainer[idx].classList.toggle(
            visibleClass,
            isClickedItem && !item.classList.contains(visibleClass),
        );
    });
}

/**
 * size
 */

const bannerSizeWrapper = document.querySelector('.banner-size-select-section');
const bannerSizeElements = bannerSizeWrapper.querySelectorAll('.banner-size-template');
bannerSizeWrapper.addEventListener('click', onChangeBannerSize);

function onChangeBannerSize(e) {
    const clickedItem = e.target;
    const selectedClass = 'banner-size-selected';
    const sizeAttributeName = 'aria-button-name';

    if (clickedItem.classList.contains(selectedClass)) return;

    bannerSizeElements.forEach((item) => {
        const isClickedItem = clickedItem === item;
        item.classList.toggle(selectedClass, isClickedItem);

        if (isClickedItem) preview.updateSize(item.getAttribute(sizeAttributeName));
    });
}

/**
 * gradient background
 */

const gradientsContainer = document.querySelector('.gradients');

async function fetchAndRenderData(endpoint, itemClass, updateFunc, setFunc) {
    const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
        method: 'GET',
    });

    const jsonData = await res.json();

    const fragment = document.createDocumentFragment();

    jsonData.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = `${itemClass} ${item.name.toLowerCase().replace(/\s/g, '_')}${
            idx === 0 ? ' selected' : ''
        }`;
        div.addEventListener('click', updateFunc);
        fragment.appendChild(div);
        if (idx === 0) setFunc(div);
    });

    return fragment;
}

async function fetchAndRenderGradients() {
    const elements = await fetchAndRenderData(
        'assets/gradients.json',
        'gradient-circle',
        (e) => preview.updateBackgroundGradient(e.target),
        (div) => preview.setGradient(div),
    );
    gradientsContainer.appendChild(elements);
}

fetchAndRenderGradients();

/**
 * solid color background
 */

const paletteContainer = document.querySelector('.palette');
const backgroundColorPicker = document.querySelector('#bg-color-picker');

backgroundColorPicker.addEventListener('input', (e) =>
    preview.updateBackgroundColor(e.target, e.target.value),
);

async function fetchAndRenderColors() {
    const elements = await fetchAndRenderData(
        'assets/colors.json',
        'color',
        (e) => preview.updateBackgroundColor(e.target),
        (div) => preview.setColor(div),
    );
    paletteContainer.insertBefore(elements, backgroundColorPicker);
}

fetchAndRenderColors();

/**
 * image background
 */

const randomImageButton = document.querySelector('#random-image-btn');
const urlImageButton = document.querySelector('#url-image-btn');
const urlImageInput = document.querySelector('#img-url');

randomImageButton.addEventListener('click', onChangeBackgroundImage);
urlImageButton.addEventListener('click', loadURLImage);

async function onChangeBackgroundImage() {
    try {
        const res = await fetch(`https://source.unsplash.com/random/${preview.size}`, {
            headers: { Accept: 'application/json' },
            method: 'GET',
        });

        preview.updateBackgroundImage(res.url);
    } catch (err) {
        console.error('Failed to fetch image:', err);
    }
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
    const alignOptions = ['preview-text-left', 'preview-text-center', 'preview-text-right'];
    const align = alignOptions[idx] || 'preview-text-center';
    preview.updateTextAlign(align);
}

function onClickAlignSelect(e) {
    const clickedItem = e.currentTarget;
    const selectedClass = 'selected';

    if (clickedItem.classList.contains(selectedClass)) return;

    alignSelectElements.forEach((item, idx) => {
        const isClickedItem = item === clickedItem;
        item.classList.toggle(selectedClass, isClickedItem);

        if (isClickedItem) onChangeTextAlign(idx);
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

function onClickFontSizeButton() {
    preview.updateFontSize();
    fontSizeButton.classList.toggle('selected');
}
