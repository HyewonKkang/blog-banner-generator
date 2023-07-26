const titleField = document.querySelector('#title');
const subTitleField = document.querySelector('#subtitle');
const preview = document.querySelector('.preview');
const previewTitle = document.querySelector('.preview-title');
const previewSubtitle = document.querySelector('.preview-subtitle');
const bgSelectElements = document.querySelector('.bg-select').querySelectorAll('.select-button');
const bgInputContainer = document.querySelector('.bg-input').querySelectorAll('.bg-input-type');

titleField.addEventListener('keyup', debounce(onInputTitle));
subTitleField.addEventListener('keyup', debounce(onInputSubtitle));
bgSelectElements.forEach((item) => item.addEventListener('click', onClickBackgroundType));

let selectedType = null;
let selectedGradient = null;
let selectedColor = null;
let textAlignClass = 'preview-text-left';

function debounce(callback, delay = 100) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
}

function onInputTitle(e) {
    previewTitle.textContent = e.target.value;
}

function onInputSubtitle(e) {
    previewSubtitle.textContent = e.target.value;
}

function onClickBackgroundType() {
    const clickedItem = this;

    bgSelectElements.forEach((item, idx) => {
        if (clickedItem === item) {
            if (item.classList.contains('selected')) return;
            item.classList.toggle('selected');
            selectedSize = idx;
            selectedType = item.id;
            if (bgInputContainer[idx].classList.contains('visible')) return;
            bgInputContainer[idx].classList.toggle('visible');
        } else {
            item.classList.remove('selected');
            bgInputContainer[idx].classList.remove('visible');
        }
    });
}

/**
 * gradient background
 */

const gradientsContainer = document.querySelector('.gradients');

fetch('../assets/gradients.json')
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
            div.addEventListener('click', onChangeGradient);
            if (idx === 0) selectedGradient = div;
        });
    });

function onChangeGradient(e) {
    const gradientClass = e.target.classList[1];
    preview.style = '';
    preview.className = `preview ${gradientClass} ${textAlignClass}`;
    e.target.classList.add('selected');
    selectedGradient.classList.remove(`selected`);
    selectedGradient = e.target;
}

/**
 * solid color background
 */

const paletteContainer = document.querySelector('.palette');
const solidColorPicker = document.querySelector('#bg-color-picker');

solidColorPicker.addEventListener('input', (e) => onChangeSolidColor(e.target.value));

fetch('../assets/colors.json')
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
                onChangeSolidColor(e.target.style.backgroundColor, e.target),
            );
            if (idx === 0) selectedColor = div;
        });
    });

function onChangeSolidColor(color, target) {
    preview.className = `preview ${textAlignClass}`;
    preview.style.backgroundImage = '';
    preview.style.backgroundColor = color;
    selectedColor.classList.remove('selected');
    if (target) {
        target.classList.add('selected');
        selectedColor = target;
    }
}

/**
 * image background
 */

const randomImageButton = document.querySelector('#random-image-btn');
const urlImageButton = document.querySelector('#url-image-btn');
const urlImageInput = document.querySelector('#img-url');

randomImageButton.addEventListener('click', onChangeBackgroundImage);
urlImageButton.addEventListener('click', loadURLImage);

function onChangeBackgroundImage() {
    fetch(`https://source.unsplash.com/random/1600x900`).then((res) => {
        preview.style = '';
        preview.style.backgroundImage = `url(${res.url})`;
    });
}

function loadURLImage() {
    const url = urlImageInput.value;
    if (!isValidURL(url)) {
        alert('올바르지 않은 URL 입니다.');
        return;
    }
    setBackgroundImage(url);
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

function addClassToPreviewText(className) {
    preview.classList.remove('preview-text-left', 'preview-text-center', 'preview-text-right');
    preview.classList.add(className);
    textAlignClass = className;
}

function onChangeTextAlign(idx) {
    let align = 'center';
    if (idx === 0) align = 'preview-text-left';
    else if (idx === 1) align = 'preview-text-center';
    else align = 'preview-text-right';
    addClassToPreviewText(align);
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
 * font color
 */
const fontColorPicker = document.querySelector('#font-color-picker');

fontColorPicker.addEventListener('input', onChangeFontColor);

function onChangeFontColor() {
    const selectedColor = fontColorPicker.value;
    preview.style.color = selectedColor;
}
