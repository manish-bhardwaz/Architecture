const slider = document.querySelector('#app-slider');

function viewChanged() {
    var w = window.innerWidth;
    if (w < 700) {
        document.querySelector('#header').style['font-size'] = "14px";
    } else {
        document.querySelector('#header').style['font-size'] = "23px";
    }
}

if (slider) {
    let sliderSlides = slider.querySelectorAll('.slider-item');
    let sliderSwitcher = slider.querySelector('.switch');
    const sliderCount = sliderSlides.length;
    let imageSlideShow;
    let i = 0;
    while (sliderSwitcher.querySelectorAll('i').length != sliderCount) {
        let i = document.createElement('i');
        sliderSwitcher.appendChild(i);
    }
    sliderSwitcher = sliderSwitcher.querySelectorAll('i');
    const forwardSliderImage = i => {
        if (i == 0) {
            sliderSlides[sliderCount - 1].classList.remove('show');
            sliderSlides[sliderCount - 1].classList.add('close');
            sliderSwitcher[sliderCount - 1].classList.remove('active');
        } else {
            sliderSlides[i - 1].classList.remove('show');
            sliderSlides[i - 1].classList.add('close');
            sliderSwitcher[i - 1].classList.remove('active');
        }
        if (i == (sliderCount - 1)) {
            sliderSlides[0].classList.remove('close');
        } else {
            sliderSlides[i + 1].classList.remove('close');
        }
        sliderSwitcher[i].classList.add('active');
        sliderSlides[i].classList.add('show');
    }

    const backwardSliderImage = i => {

        if (i == 0) {
            sliderSlides[sliderCount - 1].classList.remove('show');
            sliderSlides[sliderCount - 1].classList.add('close');
            sliderSwitcher[sliderCount - 1].classList.remove('active');
        } else {
            sliderSlides[i - 1].classList.remove('show');
            sliderSlides[i - 1].classList.add('close');
            sliderSwitcher[i - 1].classList.remove('active');
        }
        if (i == (sliderCount - 1)) {
            sliderSlides[0].classList.remove('close');
        } else {
            sliderSlides[i + 1].classList.remove('close');
        }

        if (i < sliderCount - 1) {
            sliderSlides[i + 1].classList.remove('show');
            sliderSwitcher[i + 1].classList.remove('active');
        } else {
            sliderSlides[0].classList.remove('show');
            sliderSwitcher[0].classList.remove('active');
        }
        sliderSwitcher[i].classList.add('active');
        sliderSlides[i].classList.add('show');
    }

    function startSlideShow() {
        imageSlideShow = setInterval(() => {
            nextSliderImage();
        }, 5000);
    }

    function nextSliderImage() {
        i++;
        if (i == sliderCount) {
            i = 0;
        }
        forwardSliderImage(i);
        clearInterval(imageSlideShow);
        startSlideShow();
    }

    function previousSliderImage() {
        i--;
        if (i == -1) {
            i = sliderCount - 1;
        }
        backwardSliderImage(i);
        clearInterval(imageSlideShow);
        startSlideShow();
    }

    // initializing slider buttons
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    // adding event listener to next and prev buttons
    nextBtn.addEventListener('click', nextSliderImage);
    prevBtn.addEventListener('click', previousSliderImage)

    // showing 1st slide
    forwardSliderImage(i);
    startSlideShow();
}