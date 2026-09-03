function isCurrentUrl(relativeHref) {
    const targetUrl = new URL(relativeHref, window.location.href);

    return targetUrl.href === window.location.href;
}

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-items');
    const navbar = document.querySelector('.navbar');

    const mobileQuery = window.matchMedia('(max-width: 840px)');

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    navbar.insertAdjacentElement('afterend', overlay);

    const closeMenu = () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle('active');
        overlay.classList.toggle('active', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
    };

    menuBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('click', (event) => {
        const isClickInsideNav = menuBtn.contains(event.target) || navLinks.contains(event.target);

        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    document.querySelectorAll('.sub-nav').forEach((subNav) => {
        const link = subNav.querySelector(':scope > a');
        if (!link) return;

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'dropdown-toggle';
        toggle.setAttribute('aria-label', `Toggle ${link.textContent.trim()} submenu`);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '▼';

        const setExpanded = (expanded) => {
            subNav.classList.toggle('expanded', expanded);
            toggle.setAttribute('aria-expanded', String(expanded));
        };

        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            setExpanded(!subNav.classList.contains('expanded'));
        });

        link.addEventListener('click', (event) => {
            if (!mobileQuery.matches) return;
            event.preventDefault();
            setExpanded(!subNav.classList.contains('expanded'));
        });

        link.insertAdjacentElement('afterend', toggle);
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