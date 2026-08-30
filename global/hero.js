
function buildInitialCarousel() {
    fetch('media/hero-gallery/gallery.json')
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('hero-carousel');
            data['images'].forEach((image, index) => {
                const imgElement = document.createElement('img');
                const imgContainer = document.createElement('div');
                imgElement.src = image['src'];
                imgElement.alt = image['alt'];
                imgContainer.classList.add('hero-carousel-image');
                if (index === 0) {
                    imgContainer.classList.add('active');
                }
                imgContainer.appendChild(imgElement);
                carousel.appendChild(imgContainer);
            });
        });
}

const carouselMask = document.querySelector('.carousel-mask');
const carousel = document.getElementById('hero-carousel');
let images = Array.from(carousel.querySelectorAll('.hero-carousel-image'));
let isHovered = false;
let isTransitioning = false;

function showImage(targetElement, direction = 'up') {
    if (!targetElement || isTransitioning) return;
    isTransitioning = true;

    const animationClass = direction === 'down' ? 'slide-down' : 'slide-up';

    images.forEach((img) => {
        img.classList.toggle('active', img === targetElement);
        img.classList.add(animationClass);
    });

    setTimeout(() => {
        centerActiveElement();
        images = Array.from(carousel.querySelectorAll('.hero-carousel-image'));
        bindImageClickEvents();
        isTransitioning = false;
    }, 750);
}

function nextImage() {
    const currentActive = carousel.querySelector('.active');
    const currentIndex = images.indexOf(currentActive);
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(images[nextIndex], 'up');
}

function prevImage() {
    const currentActive = carousel.querySelector('.active');
    const currentIndex = images.indexOf(currentActive);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(images[prevIndex], 'down');
}

function centerActiveElement() {
    const items = Array.from(carousel.children);
    const totalItems = items.length;

    items.forEach(item => item.classList.remove('slide-up', 'slide-down'));

    const activeIndex = items.findIndex(item => item.classList.contains('active'));
    if (activeIndex === -1) return;

    const middleIndex = Math.floor(totalItems / 2);
    let shiftCount = activeIndex - middleIndex;

    if (shiftCount !== 0) {
        const rearrangedItems = [
            ...items.slice(shiftCount),
            ...items.slice(0, shiftCount)
        ];
        rearrangedItems.forEach(item => carousel.appendChild(item));
    }
}

function bindImageClickEvents() {
    images.forEach((img, index) => {
        img.onclick = () => {
            const activeIndex = images.findIndex(item => item.classList.contains('active'));
            if (index !== activeIndex) {
                const dir = index > activeIndex ? 'up' : 'down';
                showImage(img, dir);
            }
        };
    });
}

setInterval(() => {
    if (!isHovered) {
        nextImage();
    }
}, 10000);

carouselMask.addEventListener('mouseenter', () => { isHovered = true; });
carouselMask.addEventListener('mouseleave', () => { isHovered = false; });

carouselMask.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isTransitioning) return;

    if (e.deltaY > 3) {
        nextImage();
    } else if (e.deltaY < -3) {
        prevImage();
    }
}, { passive: false });

buildInitialCarousel();
centerActiveElement();
images = Array.from(carousel.querySelectorAll('.hero-carousel-image'));
bindImageClickEvents();