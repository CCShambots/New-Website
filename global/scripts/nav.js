
function isCurrentUrl(relativeHref) {
    const targetUrl = new URL(relativeHref, window.location.href);

    return targetUrl.href === window.location.href;
}

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-items');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideNav = menuBtn.contains(event.target) || navLinks.contains(event.target);

        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    const navItems = document.querySelectorAll('.nav-item a');
    const subNavItems = document.querySelectorAll('.sub-nav-item a');

    navItems.forEach(link => {
        if (isCurrentUrl(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    subNavItems.forEach(link => {
        if (isCurrentUrl(link.getAttribute('href'))) {
            link.classList.add('active');
            link.closest('.sub-nav').classList.add('active');
        }
    });
});

