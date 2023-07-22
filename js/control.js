const titleField = document.querySelector('#title');
const subTitleField = document.querySelector('#subtitle');
const preview = document.querySelector('.preview');
const previewTitle = document.querySelector('.preview-title');
const previewSubtitle = document.querySelector('.preview-subtitle');
const bgSelectElements = document.querySelector('.bg-select').querySelectorAll('.select-button');
const bgInputContainer = document.querySelector('.bg-input').querySelectorAll('.bg-input-type');
const gradientsContainer = document.querySelector('.gradients');
const randomImageButton = document.querySelector('#random-image-btn');
const urlImageButton = document.querySelector('#url-image-btn');
const urlImageInput = document.querySelector('#img-url');
const paletteContainer = document.querySelector('.palette');

let selectedType = null;
let selectedGradient = null;
let selectedColor = null;

titleField.addEventListener('keyup', debounce(onInputTitle));
subTitleField.addEventListener('keyup', debounce(onInputSubtitle));
bgSelectElements.forEach((item) => item.addEventListener('click', onClickBGSelect));
randomImageButton.addEventListener('click', onChangeBackgroundImage);
urlImageButton.addEventListener('click', loadURLImage);

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

fetch('../assets/colors.json')
    .then((res) => {
        return res.json();
    })
    .then((jsonData) => {
        jsonData.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = `color ${idx === 0 ? ' selected' : ''}`;
            div.style.backgroundColor = item.color;
            paletteContainer.appendChild(div);
            div.addEventListener('click', onChangeSolidColor);
            if (idx === 0) selectedColor = div;
        });
    });

function onInputTitle(e) {
    previewTitle.textContent = e.target.value;
}

function onInputSubtitle(e) {
    previewSubtitle.textContent = e.target.value;
}

function onClickBGSelect() {
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

function onChangeGradient(e) {
    const gradientClass = e.target.classList[1];
    preview.style = '';
    preview.className = `preview ${gradientClass}`;
    e.target.classList.add('selected');
    selectedGradient.classList.remove(`selected`);
    selectedGradient = e.target;
}

function onChangeSolidColor(e) {
    const color = e.target.style.backgroundColor;
    preview.className = 'preview';
    preview.style.backgroundImage = '';
    preview.style.backgroundColor = color;
    e.target.classList.add('selected');
    selectedColor.classList.remove('selected');
    selectedColor = e.target;
}

function debounce(callback, delay = 100) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
}

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
