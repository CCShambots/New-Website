
function isCurrentUrl(relativeHref) {
  const targetUrl = new URL(relativeHref, window.location.href);
  
  return targetUrl.href === window.location.href;
}

const navLinks = document.querySelectorAll('.nav-item a');
const subNavLinks = document.querySelectorAll('.sub-nav-item a');

navLinks.forEach(link => {
    if (isCurrentUrl(link.getAttribute('href'))) {
        link.classList.add('active');
    }
});

subNavLinks.forEach(link => {
    if (isCurrentUrl(link.getAttribute('href'))) {
        link.classList.add('active');
    }
});