document.addEventListener("DOMContentLoaded", () => {
    const letters = document.querySelectorAll(".preloader-text span");
    const preloader = document.querySelector(".preloader");
    const hero = document.querySelector(".hero");
  
    let tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloader, {
          y: "-100%",
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => preloader.remove()
        });
  
        gsap.from(hero, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        });
      }
    });
  
    tl.fromTo(letters, {
      y: 100,
      opacity: 0,
      scale: 1.3
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });
  
    tl.to(".trigger-i", {
      color: "var(--accent-color)",
      scale: 1.2,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut"
    }, "-=0.3");
  
    tl.to(letters, {
      y: -10,
      duration: 0.3,
      stagger: 0.05,
      yoyo: true,
      repeat: 1
    });
  });
  