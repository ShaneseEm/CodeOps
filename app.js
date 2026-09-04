import * as THREE from "three";

/* ══════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════ */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px; width: 0%;
  background: linear-gradient(90deg, #b78052, #f1ddc4);
  z-index: 9999; transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(183,128,82,0.6);
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrolled / total) * 100}%`;
});


/* ══════════════════════════════════════
   THEME TOGGLE
══════════════════════════════════════ */
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.dataset.theme = savedTheme;

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  themeToggle.querySelector('span').textContent = nextTheme === 'dark' ? '☾' : '☀';
});


/* ══════════════════════════════════════
   ACTIVE NAV ON SCROLL
══════════════════════════════════════ */
const navLinks = [...document.querySelectorAll(".nav-pill a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-44% 0px -48% 0px", threshold: 0 }
);
sections.forEach((s) => navObserver.observe(s));


/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }
`;
document.head.appendChild(revealStyle);

document.querySelectorAll('.project-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
});
document.querySelectorAll('.skill-grid span').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.05}s`;
});
document.querySelectorAll('.service-grid article').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll('.timeline article').forEach((el, i) => {
  el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
  el.style.transitionDelay = `${i * 0.15}s`;
});
document.querySelectorAll('.about-copy, .about-visual').forEach((el, i) => {
  el.classList.add(i === 0 ? 'reveal-left' : 'reveal-right');
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
  revealObserver.observe(el);
});


/* ══════════════════════════════════════
   TYPING ANIMATION — hero role
══════════════════════════════════════ */
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const phrases = [
    'Software Developer',
    'AI Enthusiast',
    'Full-Stack Developer',
    'ML Explorer',
    'Women in Tech Advocate',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  roleEl.textContent = '';
  roleEl.style.borderRight = '2px solid var(--brand)';
  roleEl.style.paddingRight = '2px';

  function type() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      roleEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      roleEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  setTimeout(type, 600);
}


/* ══════════════════════════════════════
   SKILL TAG RIPPLE ON CLICK
══════════════════════════════════════ */
document.querySelectorAll('.skill-grid span').forEach((tag) => {
  tag.style.cursor = 'pointer';
  tag.style.position = 'relative';
  tag.style.overflow = 'hidden';

  tag.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = tag.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background: rgba(183,128,82,0.35);
      transform: scale(0); animation: ripple-out 0.5s ease forwards;
      pointer-events:none;
    `;
    tag.appendChild(ripple);
    setTimeout(() => ripple.remove(), 520);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-out {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);


/* ══════════════════════════════════════
   CONTACT FORM — validation + feedback
══════════════════════════════════════ */
const form = document.querySelector(".contact-form-new") || document.querySelector(".contact-form");

if (form) {
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      const valid = field.checkValidity() && field.value.trim().length > 0;
      field.classList.toggle('valid', valid);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending…';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      form.reset();
      form.querySelectorAll('input, textarea').forEach((f) => f.classList.remove('valid'));
      btn.textContent = '✓ Sent!';
      btn.style.opacity = '1';
      btn.style.background = '#4ade80';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 2500);
    }, 1200);
  });
}


/* ══════════════════════════════════════
   THREE.JS — 3D SCENE (About section)
══════════════════════════════════════ */
const canvas = document.querySelector("#hero-scene");
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.2, 7.2);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const world = new THREE.Group();
  scene.add(world);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xb9936c, roughness: 0.15, metalness: 0.12,
    transmission: 0.2, thickness: 0.7, clearcoat: 1, clearcoatRoughness: 0.18,
  });

  const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.35, 1), glassMaterial);
  core.rotation.set(0.5, 0.2, 0.15);
  world.add(core);

  const wire = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.72, 1),
    new THREE.MeshBasicMaterial({ color: 0xffb57f, wireframe: true, transparent: true, opacity: 0.5 })
  );
  world.add(wire);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x7b5b42, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1 + i * 0.2, 0.012, 10, 180), ringMaterial);
    ring.rotation.x = Math.PI / 2.7 + i * 0.23;
    ring.rotation.y = i * 0.55;
    ring.rotation.z = i * 0.16;
    world.add(ring);
  }

  const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0xefc79c, roughness: 0.38, metalness: 0.22 });
  const nodes = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2;
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 20), nodeMaterial);
    node.position.set(Math.cos(angle) * 2.52, Math.sin(angle * 1.7) * 0.78, Math.sin(angle) * 2.52);
    nodes.add(node);
  }
  world.add(nodes);

  const count = 420;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i*3]   = (Math.random() - 0.5) * 7;
    positions[i*3+1] = (Math.random() - 0.5) * 7;
    positions[i*3+2] = (Math.random() - 0.5) * 5;
  }
  const particles = new THREE.BufferGeometry();
  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleField = new THREE.Points(particles,
    new THREE.PointsMaterial({ color: 0xf4dcc2, size: 0.018, transparent: true, opacity: 0.76 })
  );
  scene.add(particleField);

  scene.add(new THREE.AmbientLight(0xffffff, 1.9));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
  keyLight.position.set(3.2, 3.8, 5);
  scene.add(keyLight);
  const tealLight = new THREE.PointLight(0xc59b72, 8, 7);
  tealLight.position.set(-2.5, 2.3, 2.8);
  scene.add(tealLight);
  const rustLight = new THREE.PointLight(0x7d5d43, 5, 7);
  rustLight.position.set(2.8, -2, 3);
  scene.add(rustLight);

  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function resizeScene() {
    const size = canvas.parentElement.getBoundingClientRect();
    const w = Math.max(size.width, 1);
    const h = Math.max(size.height, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resizeScene);
  resizeScene();

  function animate() {
    const t = performance.now() * 0.001;
    world.rotation.x = 0.18 + Math.sin(t * 0.52) * 0.08 + pointer.y * 0.08;
    world.rotation.y = t * 0.34 + pointer.x * 0.12;
    core.rotation.y  = t * 0.52;
    wire.rotation.y  = -t * 0.22;
    nodes.rotation.y = t * 0.55;
    particleField.rotation.y = t * 0.025;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
