const bannerSizeElements = document.querySelectorAll('.banner-size-template');
const submitBtn = document.querySelector('.submit-btn');
let selectedSize = 0;

bannerSizeElements.forEach((item) => {
    item.addEventListener('click', toggleBannerSize);
});

submitBtn.addEventListener('click', captureExport);

function toggleBannerSize() {
    const clickedItem = this;

    bannerSizeElements.forEach((item, idx) => {
        if (clickedItem === item) {
            if (item.classList.contains('banner-size-selected')) return;
            item.classList.toggle('banner-size-selected');
            selectedSize = idx;
        } else {
            item.classList.remove('banner-size-selected');
        }
    });
}

function captureExport() {
    html2canvas(document.querySelector('.preview'), {
        allowTaint: true,
        useCORS: true,
    }).then((canvas) => {
        saveAs(canvas.toDataURL(), 'bloggyBanners');
    });
}

function saveAs(uri, filename) {
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.download = filename;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}
