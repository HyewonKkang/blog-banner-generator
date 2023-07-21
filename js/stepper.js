class Stepper {
    constructor() {
        this.currentIndex = 0;
        this.steps = document.querySelectorAll('.step');
        this.nextBtn = document.querySelector('.next-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.contents = document.querySelectorAll('.content');

        this._listen();
    }

    _listen() {
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.prevBtn.addEventListener('click', this.previous.bind(this));
    }

    _showPrevButton() {
        this.prevBtn.classList.add('visible');
    }

    _hidePrevButton() {
        this.prevBtn.classList.remove('visible');
    }

    _setFinishButton() {
        this.nextBtn.textContent = 'Finish';
    }

    _setNextButton() {
        this.nextBtn.textContent = 'Next';
    }

    _setNextItem(next) {
        this.steps[next].className = 'step step-item-process';
    }

    _setNextContent(next) {
        this.contents[this.currentIndex].classList.remove('visible');
        this.contents[next].classList.add('visible');
        this._setNextItem(next);
        this.currentIndex = next;
    }

    next() {
        if (this.currentIndex === this.steps.length - 1) {
            this.submit();
            return;
        }
        const nextIndex =
            this.currentIndex + 1 < this.steps.length
                ? this.currentIndex + 1
                : this.steps.length - 1;
        this.steps[this.currentIndex].className = 'step step-item-finish';
        this._setNextContent(nextIndex);

        if (this.currentIndex === 1) this._showPrevButton();
        else if (this.currentIndex === this.steps.length - 1) this._setFinishButton();
    }

    previous() {
        const prevIndex = this.currentIndex - 1 >= 0 ? this.currentIndex - 1 : 0;
        this.steps[this.currentIndex].className = 'step step-item-wait';
        this._setNextContent(prevIndex);

        if (this.currentIndex === 0) this._hidePrevButton();
        if (this.currentIndex !== this.steps.length - 1) this._setNextButton();
    }

    submit() {}
}

const stepper = new Stepper();
