// menu UI elements
const menuBtn = document.getElementById('hambuger-btn');
const mobileLinks = document.getElementById('mobileLinks');
const mobileNavLinks = document.querySelectorAll('.mobile-navLinks a');

// toggle menu js
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('openmenu');
    mobileLinks.classList.toggle('openmenu');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('openmenu');
        mobileLinks.classList.remove('openmenu');
    });
});