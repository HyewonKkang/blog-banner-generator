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
            selectedSize = idx;
        } else {
            item.classList.remove('banner-size-selected');
        }
    });
}
