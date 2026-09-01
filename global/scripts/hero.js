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
            images = Array.from(carousel.querySelectorAll('.hero-carousel-image'));
            bindImageClickEvents();
            if (isMobile()) {
                updatePositions();
            } else {
                centerActiveElement();
            }
        });
}

const carouselMask = document.querySelector('.carousel-mask');
const carousel = document.getElementById('hero-carousel');
let images = Array.from(carousel.querySelectorAll('.hero-carousel-image'));
let isHovered = false;
let isTransitioning = false;
let activeIndex = 0;

function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
}

/* ---------- Mobile: index-offset based positioning ----------
   No DOM reordering, no sibling selectors. Each image's visual
   position is purely a function of (its data index - activeIndex),
   so JS state and CSS state can never disagree. */

function updatePositions() {
    const total = images.length;
    images.forEach((img, i) => {
        let offset = i - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        img.style.setProperty('--offset', offset);
        img.style.setProperty('--abs-offset', Math.abs(offset));
        img.classList.toggle('active', i === activeIndex);
    });
}

function goToIndex(newIndex) {
    if (isTransitioning) return;
    isTransitioning = true;
    activeIndex = (newIndex + images.length) % images.length;
    updatePositions();
    setTimeout(() => { isTransitioning = false; }, 750);
}

/* ---------- Desktop: original DOM-reorder + class based system ---------- */

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

function centerActiveElement() {
    const items = Array.from(carousel.children);
    const totalItems = items.length;

    items.forEach(item => item.classList.remove('slide-up', 'slide-down'));

    const activeIdx = items.findIndex(item => item.classList.contains('active'));
    if (activeIdx === -1) return;

    const middleIndex = Math.floor(totalItems / 2);
    let shiftCount = activeIdx - middleIndex;

    if (shiftCount !== 0) {
        const rearrangedItems = [
            ...items.slice(shiftCount),
            ...items.slice(0, shiftCount)
        ];
        rearrangedItems.forEach(item => carousel.appendChild(item));
    }
}

/* ---------- Shared navigation entry points ---------- */

function nextImage() {
    if (isMobile()) {
        goToIndex(activeIndex + 1);
        return;
    }
    const currentActive = carousel.querySelector('.active');
    const currentIndex = images.indexOf(currentActive);
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(images[nextIndex], 'up');
}

function prevImage() {
    if (isMobile()) {
        goToIndex(activeIndex - 1);
        return;
    }
    const currentActive = carousel.querySelector('.active');
    const currentIndex = images.indexOf(currentActive);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(images[prevIndex], 'down');
}

function bindImageClickEvents() {
    images.forEach((img, index) => {
        img.onclick = () => {
            if (isMobile()) {
                goToIndex(index);
                return;
            }
            const currentIndex = images.findIndex(item => item.classList.contains('active'));
            if (index !== currentIndex) {
                const dir = index > currentIndex ? 'up' : 'down';
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