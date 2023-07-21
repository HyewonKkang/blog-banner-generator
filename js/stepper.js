class Stepper {
    constructor() {
        this.currentIndex = 0;
        this.steps = document.querySelectorAll('.step');
        this.nextBtn = document.querySelector('.next-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.submitBtn = document.querySelector('.submit-btn');
        this.contents = document.querySelectorAll('.content');

        this._listen();
    }

    _listen() {
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.prevBtn.addEventListener('click', this.previous.bind(this));
    }

    show(el) {
        el.classList.add('visible');
    }

    hide(el) {
        el.classList.remove('visible');
    }

    _setFinishButton() {
        this.hide(this.nextBtn);
        this.show(this.submitBtn);
    }

    _setNextButton() {
        this.hide(this.submitBtn);
        this.show(this.nextBtn);
    }

    _setNextItem(next) {
        this.steps[next].className = 'step step-item-process';
    }

    _setNextContent(next) {
        this.hide(this.contents[this.currentIndex]);
        this.show(this.contents[next]);
        this._setNextItem(next);
        this.currentIndex = next;
    }

    next() {
        if (this.currentIndex === this.steps.length - 1) {
            this._setFinishButton();
            return;
        }
        const nextIndex =
            this.currentIndex + 1 < this.steps.length
                ? this.currentIndex + 1
                : this.steps.length - 1;
        this.steps[this.currentIndex].className = 'step step-item-finish';
        this._setNextContent(nextIndex);

        if (this.currentIndex === 1) this.show(this.prevBtn);
        else if (this.currentIndex === this.steps.length - 1) this._setFinishButton();
    }

    previous() {
        const prevIndex = this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : 0;
        this.steps[this.currentIndex].className = 'step step-item-wait';
        this._setNextContent(prevIndex);

        if (this.currentIndex === 0) this.hide(this.prevBtn);
        if (this.currentIndex !== this.steps.length - 1) this._setNextButton();
    }
}

const stepper = new Stepper();
