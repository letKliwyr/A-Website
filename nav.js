const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links li');
const navContact = document.querySelector('.nav-contact');
const closeButton = document.querySelector('.close-nav');
const waktu = document.querySelector('.time-display');

let isAnimation = false;

function updateWaktu() {
    const n = new Date();
    const formatJamArea = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    const formatwaktu = n.toLocaleTimeString('id-ID', formatJamArea);

    const zonaOpsi = new Intl.DateTimeFormat('id-ID', { timeZoneName: 'short' }).formatToParts(n);
    const zona = zonaOpsi.find(part => part.type === 'timeZoneName')?.value || '';

    waktu.textContent = `sst, sekarang jam ${formatwaktu} ${zona}`;
}

updateWaktu();
setInterval(updateWaktu, 1000);

const openMenu = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.5,
        ease: 'power3.out'
    }
});

openMenu
    .set(navMenu, { visibility: 'visible' })
    .to(navMenu, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => {
            document.body.style.overflow = 'hidden';
        }
    })
    .to(navLinks, {
        opacity: 1,
        x: 0,
        width: 300,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.2')
    .from(navLinks, {
        scale: 0.9,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power1.out'
    }, '<')
    .to(navContact, {
        opacity: 1,
        y: 0,
        duration: 0.4
    }, '-=0.3');

const closeMenu = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.4,
        ease: 'power2.inOut'
    }
});

closeMenu
    .to(navLinks, {
        width: 0,
        x: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3
    })
    .to(navContact, {
        opacity: 0,
        y: 20,
        duration: 0.3
    }, '<')
    .to(navMenu, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            navMenu.classList.remove('active');
            gsap.set(navMenu, { clearProps: 'all' });
            gsap.set(navLinks, { clearProps: 'all' });
        }
    });


function delayMenu(fn, delay = 400) {
    let waktuTerakhir = 0;
    return function (...args) {
        const now = Date.now();
        if (isAnimation || (now - waktuTerakhir < delay)) {
            if (navToggle.style.pointerEvents !== 'none') {
                navToggle.style.pointerEvents = 'none';
                gsap.to(navToggle, {
                    opacity: 0.5,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        navToggle.style.pointerEvents = 'auto';
                    }
                });
            }
            return;
        }
        waktuTerakhir = now;
        return fn.apply(this, args);
    };
}

function toggleMenu() {
    const isOpen = navMenu.classList.contains('active');
    isAnimation = true;

    if (!isOpen) {
        navMenu.classList.add('active');
        closeMenu.pause(0);
        openMenu.restart().then(() => {
            isAnimation = false;
        });
    } else {
        openMenu.pause();
        closeMenu.restart().then(() => {
            isAnimation = false;
        });
    }
}

const jedaMenu = delayMenu(toggleMenu, 400);

document.addEventListener('click', (e) => {
    const isClickInside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
        jedaMenu();
    }
});

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    jedaMenu();
});

closeButton.addEventListener('click', jedaMenu);
