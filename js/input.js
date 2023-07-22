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

let selectedGradient = null;

titleField.addEventListener('keyup', debounce(onInputTitle));
subTitleField.addEventListener('keyup', debounce(onInputSubtitle));
bgSelectElements.forEach((item) => item.addEventListener('click', onClickBGSelect));
randomImageButton.addEventListener('click', generateRandomImage);
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

function debounce(callback, delay = 100) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
}

function setBackgroundImage(url) {
    preview.style.backgroundImage = `url(${url})`;
}

function generateRandomImage() {
    fetch(`https://source.unsplash.com/random/1600x900`).then((res) => {
        setBackgroundImage(res.url);
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

function setFontColor(bgColor) {
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128 ? 'black' : 'white';
}
