export default class Preview {
    constructor() {
        this.size = '1600x900'; // 1600x900 | 800x800
        this.title = '';
        this.subtitle = '';
        this.textAlign = 'preview-text-center';
        this.font = 'font-noto-sans';
        this.fontLarge = true;

        this.gradient = null;
        this.selectedColor = null;
        this.template = '0';

        this.preview = document.querySelector('.preview');
        this.previewTitle = document.querySelector('.preview-title');
        this.previewSubtitle = document.querySelector('.preview-subtitle').querySelector('span');

        this.updateTitle = _.debounce(this.updateTitle.bind(this), 100);
        this.updateSubTitle = _.debounce(this.updateSubTitle.bind(this), 100);
    }

    setGradient(gradient) {
        this.gradient = gradient;
    }

    setColor(color) {
        this.selectedColor = color;
    }

    updateTemplate(val) {
        this.preview.classList.replace(`template-${this.template}`, `template-${val}`);
        this.template = val;
    }

    updateSize(size) {
        this.size = size;
        this.preview.classList.toggle('preview-size-1600x900', size === '1600x900');
        this.preview.classList.toggle('preview-size-800x800', size === '800x800');
    }

    updateTitle(e) {
        this.previewTitle.innerHTML = e.target.value;
    }

    updateSubTitle(e) {
        this.previewSubtitle.innerHTML = e.target.value;
    }

    updateBackgroundGradient(target) {
        const gradientClass = target.classList[1];
        this.preview.style = '';
        this.preview.className = `preview preview-size-${this.size} ${gradientClass} ${this.textAlign} template-${this.template} ${this.font}`;
        target.classList.add('selected');
        this.gradient?.classList.remove(`selected`);
        this.gradient = target;
    }

    updateBackgroundColor(target, bgColor) {
        this.preview.className = `preview preview-size-${this.size} ${this.textAlign} template-${this.template} ${this.font}`;
        if (bgColor) {
            this.preview.style.backgroundColor = bgColor;
        } else {
            const colorClass = target.classList[1];
            this.preview.classList.add(colorClass);
            this.preview.style.backgroundColor = '';
        }
        this.preview.style.backgroundImage = '';
        this.selectedColor?.classList.remove('selected');
        target.classList.add('selected');
        this.selectedColor = target;
    }

    updateBackgroundImage(url) {
        this.preview.style = '';
        this.preview.style.backgroundImage = `url(${url})`;
    }

    updateTextAlign(className) {
        this.preview.classList.replace(this.textAlign, className);
        this.textAlign = className;
    }

    updateFontColor(color) {
        this.preview.style.color = color;
    }

    updateFont(value) {
        this.preview.classList.replace(this.font, value);
        this.font = value;
    }

    updateFontSize() {
        this.fontLarge = !this.fontLarge;
        this.preview.classList.toggle('text-large', this.fontLarge);
        this.preview.classList.toggle('text-medium', !this.fontLarge);
    }
}
