// 🎯 Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = cursor.querySelector('.cursor-dot');
let cursorActive = false;

gsap.set(cursor, { opacity: 0, scale: 0.8 });

document.addEventListener('mousemove', e => {
  const { clientX: x, clientY: y } = e;

  if (!cursorActive) {
    cursorActive = true;
    gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
  }

  gsap.to(cursor, { x: x - 10, y: y - 10, duration: 0.1, ease: "none" });

  const atEdge = x < 30 || x > window.innerWidth - 30 || y < 30 || y > window.innerHeight - 30;
  gsap.to(cursor, { opacity: atEdge ? 0 : 1, duration: 0.3, ease: "power2.out" });
});

document.addEventListener('mousedown', () =>
  gsap.to(cursorDot, { scale: 1.5, duration: 0.2, ease: "power2.out" })
);
document.addEventListener('mouseup', () =>
  gsap.to(cursorDot, { scale: 1, duration: 0.2, ease: "power2.out" })
);

const hoverTargets = document.querySelectorAll('a, button, .highlight, .about-card, .card-list li');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    gsap.to(cursor, { scale: 1.2, duration: 0.3, ease: "power2.out" });
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
});

const mencoba = document.querySelector('.dosjaodjosajdosajods');
mencoba.innerHTML = 'mencoba'.split('').map(ch => `<span>${ch}</span>`).join('');
const cards = mencoba.querySelectorAll('span');
const sequence = [1, 3, 5, 2, 4, 0, 6];

let attempts = [];
let lastClick = 0;
const hoverTimeouts = new Map();

function previewAnimation(card) {
  if (hoverTimeouts.has(card)) clearTimeout(hoverTimeouts.get(card));

  gsap.set(card, { willChange: "transform, backgroundColor, color" });

  const tl = gsap.timeline()
    .to(card, { backgroundColor: 'var(--accent-color)', color: '#fff', scale: 1.02, duration: 1, ease: "power4.out" })
    .to(card, { backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)', scale: 1, duration: 1.2, ease: "power4.inOut" }, "+=0.4");

  const timeout = setTimeout(() => {
    gsap.to(card, {
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--text-color)',
      scale: 1,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => gsap.set(card, { willChange: "auto" })
    });
    hoverTimeouts.delete(card);
  }, 3000);

  hoverTimeouts.set(card, timeout);
}

cards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    if (!card.classList.contains('clicked')) {
      gsap.to(card, { y: -2, duration: 0.2, ease: "power1.out" });
      previewAnimation(card);
    }
  });

  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('clicked')) {
      gsap.to(card, { y: 0, duration: 0.2, ease: "power1.out" });
    }
  });

  card.addEventListener('click', () => {
    const now = Date.now();

    if (now - lastClick > 5000) {
      attempts = [];
      cards.forEach(c => {
        gsap.to(c, { backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)', scale: 1, duration: 0.3, ease: "sine.out" });
        c.classList.remove('clicked');
      });
    }

    lastClick = now;
    attempts.push(index);

    gsap.timeline()
      .to(card, { scale: 0.95, duration: 0.15, ease: "sine.out" })
      .to(card, { scale: 1, duration: 0.15, ease: "sine.out", onComplete: () => card.classList.add('clicked') });

    gsap.to(card, { backgroundColor: 'var(--accent-color)', color: '#fff', duration: 0.3, ease: "sine.out" });

    if (attempts.length === sequence.length) {
      const isCorrect = attempts.every((val, i) => val === sequence[i]);

      if (isCorrect) {
        const tl = gsap.timeline();
        gsap.set(cards, { willChange: "transform, backgroundColor, color" });

        tl.to(cards, { backgroundColor: 'var(--accent-color)', color: '#fff', stagger: { each: 0.03 }, duration: 0.4 })
          .to(cards, { backgroundColor: '#2ecc71', stagger: { each: 0.03 }, duration: 0.5 }, "+=0.1")
          .to(cards, {
            backgroundColor: 'var(--secondary-color)',
            color: 'var(--text-color)',
            stagger: { each: 0.02 },
            duration: 0.4,
            onComplete: () => gsap.set(cards, { willChange: "auto" })
          }, "+=0.1");

        cards.forEach((c, i) => {
          tl.to(c, { scale: 1.02, duration: 0.2, ease: "sine.inOut" }, 0.03 * i)
            .to(c, { scale: 1, duration: 0.3, ease: "sine.inOut" }, 0.03 * i + tl.duration() - 0.3);
        });
      } else {
        gsap.to(cards, {
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--text-color)',
          scale: 1,
          duration: 0.3,
          stagger: 0.02,
          ease: "sine.out",
          onComplete: () => cards.forEach(c => c.classList.remove('clicked'))
        });
      }
      attempts = [];
    }
  });
});

const kliwyr = {
  el: document.querySelector('.yekliwyr'),
  text: document.querySelector('.yekliwyr').dataset.text,
  chars: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ",
  state: { frame: 0, lastTime: 0, isAnimating: false, lastClick: 0 },
  config: { fps: 60, duration: 3000, framesPerChar: 12, cooldown: 3500 }
};

kliwyr.animate = time => {
  if (!kliwyr.state.lastTime) kliwyr.state.lastTime = time;
  const delta = time - kliwyr.state.lastTime;
  const frameDuration = 1000 / kliwyr.config.fps;

  if (delta >= frameDuration) {
    kliwyr.state.frame++;
    kliwyr.state.lastTime = time;

    const progress = Math.min(kliwyr.state.frame / (kliwyr.config.fps * (kliwyr.config.duration / 1000)), 1);
    const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;

    kliwyr.el.textContent = [...kliwyr.text].map((ch, i) => {
      const charProgress = Math.max(0, Math.min(1, (eased * kliwyr.text.length - i) * kliwyr.config.framesPerChar));
      return charProgress === 1 ? ch : charProgress > 0 ? kliwyr.chars[Math.floor(Math.random() * kliwyr.chars.length)] : ' ';
    }).join('');
  }

  if (kliwyr.state.frame < kliwyr.config.fps * (kliwyr.config.duration / 1000)) {
    requestAnimationFrame(kliwyr.animate);
  } else {
    kliwyr.el.textContent = kliwyr.text;
    kliwyr.state.isAnimating = false;
  }
};

kliwyr.start = () => {
  if (kliwyr.state.isAnimating) return;

  const now = Date.now();
  if (now - kliwyr.state.lastClick < kliwyr.config.cooldown) {
    gsap.to(kliwyr.el, { opacity: 0.5, duration: 0.2, yoyo: true, repeat: 1 });
    return;
  }

  kliwyr.state.isAnimating = true;
  kliwyr.state.lastClick = now;
  kliwyr.state.frame = 0;
  kliwyr.state.lastTime = 0;
  requestAnimationFrame(kliwyr.animate);
};

setTimeout(kliwyr.start, 500);
