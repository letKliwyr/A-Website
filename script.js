// script.js
// cursor dot white and text style
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});


const dslajdozxjaodjsoaj = document.querySelector('.dosjaodjosajdosajods');
const kata = 'mencoba';
dslajdozxjaodjsoaj.innerHTML = kata.split('').map(char => 
    `<span>${char}</span>`
).join('');

const dozjaodjsao = dslajdozxjaodjsoaj.querySelectorAll('span');
dozjaodjsao.forEach(dozjaodjsao => {
    dozjaodjsao.addEventListener('mouseenter', () => {
        gsap.to(dozjaodjsao, {
            y: -5,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    dozjaodjsao.addEventListener('mouseleave', () => {
        gsap.to(dozjaodjsao, {
            y: 0,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});
