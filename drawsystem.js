const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

const lines = [
  "Halo! Saya Panji Kusuma (Kliwyr).",
  "Saya mulai belajar coding sejak tahun 2020,",
  "awal pandemi jadi titik awal perjalanan saya.",
  "Bahasa pertama yang saya pelajari adalah JavaScript,",
  "lalu sedikit demi sedikit mencoba languange lainnya.",
  "hingga akhirnya tertarik membuat project, yang ada di pikiran saya - seperti website ini.",
  "",

];


const cfg = {
  slow: 2.5,
  size: { m: 28, t: 42, d: 60 },
  margin: {
    m: { x: 20, y: 60 },
    t: { x: 40, y: 80 },
    d: { x: 80, y: 100 }
  }
};

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5
});

gsap.registerPlugin(ScrollTrigger);

(function loop(t) {
  lenis.raf(t);
  requestAnimationFrame(loop);
})(0);

function responsive() {
  const w = innerWidth;
  if (w < 768) return { size: cfg.size.m, margin: cfg.margin.m, line: 1 };
  if (w < 1024) return { size: cfg.size.t, margin: cfg.margin.t, line: 1.2 };
  return { size: cfg.size.d, margin: cfg.margin.d, line: 1.5 };
}

new FontFace("Days", "url('./fonts/Days.otf')").load().then(f => {
  document.fonts.add(f);
  run();
});

function run() {
  let prog = 0;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw(prog);
  }

  function write(text, x, y, t, r) {
    ctx.font = `${r.size}px Days`;
    ctx.lineWidth = r.line;
    ctx.strokeStyle = "#000";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const w = ctx.measureText(text).width;
    ctx.save();
    ctx.setLineDash([w]);
    ctx.lineDashOffset = w * (1 - t);
    ctx.strokeText(text, x, y);
    ctx.restore();
  }

  function draw(p) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const r = responsive();
    const h = r.size * 1.4;

    ctx.font = `${r.size}px Days`;
    ctx.textBaseline = "middle";

    const visible = lines.filter(Boolean);
    const total = visible.length * h;
    const startY = total > canvas.height ? r.margin.y : (canvas.height - total) / 2;

    lines.forEach((text, i) => {
      if (!text) return;
      const x = r.margin.x;
      const y = startY + i * h;

      const start = (i / lines.length) * cfg.slow;
      const end = ((i + 1) / lines.length) * cfg.slow;

      let t = (p - start) / (end - start);
      t = Math.max(0, Math.min(1, t));

      if (t > 0 && y > 0 && y < canvas.height + h) write(text, x, y, t, r);
    });
  }

  addEventListener("resize", resize);
  resize();

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(v) {
      return arguments.length ? lenis.scrollTo(v, 0, 0) : lenis.animatedScroll;
    },
    getBoundingClientRect: () => ({
      top: 0, left: 0, width: innerWidth, height: innerHeight
    }),
    pinType: document.body.style.transform ? "transform" : "fixed"
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".frame",
      start: "top top",
      end: "250% top",
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      refreshPriority: -1,
      onUpdate: s => {
        prog = s.progress * cfg.slow;
        draw(prog);
      }
    }
  });

  lenis.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", resize);
}
