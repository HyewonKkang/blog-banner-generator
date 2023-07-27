export default class Preview {
    constructor() {
        this.size = '1x1';
        this.title = '';
        this.subtitle = '';
        this.textAlign = 'preview-text-left';

        this.gradient = null;
        this.selectedColor = null;

        this.preview = document.querySelector('.preview');
        this.previewTitle = document.querySelector('.preview-title');
        this.previewSubtitle = document.querySelector('.preview-subtitle');

        this.updateTitle = _.debounce(this.updateTitle.bind(this), 100);
        this.updateSubTitle = _.debounce(this.updateSubTitle.bind(this), 100);
    }

    setGradient(gradient) {
        this.gradient = gradient;
    }

    setColor(color) {
        this.selectedColor = color;
    }

    updateTitle(e) {
        this.previewTitle.textContent = e.target.value;
    }

    updateSubTitle(e) {
        this.previewSubtitle.textContent = e.target.value;
    }

    updateBackgroundGradient(target) {
        const gradientClass = target.classList[1];
        this.preview.style = '';
        this.preview.className = `preview ${gradientClass} ${this.textAlign}`;
        target.classList.add('selected');
        this.gradient?.classList.remove(`selected`);
        this.gradient = target;
    }

    updateBackgroundColor(color, target) {
        this.preview.className = `preview ${this.textAlign}`;
        this.preview.style.backgroundImage = '';
        this.preview.style.backgroundColor = color;
        this.selectedColor?.classList.remove('selected');
        if (target) {
            target.classList.add('selected');
            this.selectedColor = target;
        }
    }

    updateBackgroundImage(url) {
        this.preview.style = '';
        this.preview.style.backgroundImage = `url(${url})`;
    }

    updateTextAlign(className) {
        this.preview.classList.remove(
            'preview-text-left',
            'preview-text-center',
            'preview-text-right',
        );
        this.preview.classList.add(className);
        this.textAlign = className;
    }

    updateFontColor(color) {
        this.preview.style.color = color;
    }
}
