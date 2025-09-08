document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const l = new Lenis();
    l.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        l.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray('.about-card');
    const about = document.querySelector('.about-grid');
    const totalCards = cards.length;
    const cardWidth = 320;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: about,
            start: "top center",
            end: () => "+=" + (cards.length * window.innerHeight * 0.3),
            scrub: true,
            pin: true,
            anticipatePin: 1,
        }
    });

    tl.addLabel("datang")
        .from(cards, {
            opacity: 0,
            y: 80,
            scale: 0.9,
            duration: 1.2,
            ease: "power3.out",
            stagger: { each: 0.3, from: "center" }
        });

    tl.addLabel("lebar")
        .to(cards, {
            y: 0,
            scale: 1,
            rotationY: 0,
            x: (i) => (i - 1) * cardWidth,
            duration: 1.5,
            ease: "power2.inOut",
            stagger: 0.1
        });

    function updateCardPosition(currentIndex) {
        const maxOffset = 100;
        const targetX = (i) => (i - currentIndex) * cardWidth;
    
        if (currentIndex <= 0) {
            gsap.timeline()
                .to(cards, { x: (i) => targetX(i) + maxOffset, duration: 0.25, ease: "power2.out" })
                .to(cards, { x: targetX, duration: 0.6, ease: "elastic.out(1.2, 0.5)" });
        }
        else if (currentIndex >= totalCards - 1) {
            gsap.timeline()
                .to(cards, { x: (i) => targetX(i) - maxOffset, duration: 0.25, ease: "power2.out" })
                .to(cards, { x: targetX, duration: 0.6, ease: "elastic.out(1.2, 0.5)" });
        }
        // Tengah
        else {
            gsap.to(cards, { x: targetX, duration: 0.8, ease: "power2.inOut" });
        }
    }

    // Contoh manual trigger (misal tombol prev/next)
    let currentIndex = 1;
    document.getElementById("next")?.addEventListener("click", () => {
        currentIndex = Math.min(currentIndex + 1, totalCards - 1);
        updateCardPosition(currentIndex);
    });

    document.getElementById("prev")?.addEventListener("click", () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCardPosition(currentIndex);
    });

    tl.addLabel("tetap")
        .to(cards, {
            y: -20,
            scale: 0.98,
            duration: 2,
            ease: "power1.inOut"
        });

    tl.addLabel("tinggal")
        .to(cards, {
            opacity: 0,
            y: -150,
            scale: 0.8,
            duration: 2.5,
            ease: "power3.inOut",
            stagger: 0.2
        });
});
