// Model data (6 models)
const models = [
  {
    id: 'chiron',
    name: 'CHIRON',
    subtitle: 'SUPER SPORT',
    specs: '1600 HP • W16 • 440 km/h',
    desc: 'Legendary engineering paired with extreme luxury. Tuned for top speed and track performance while keeping artisanal leather and bespoke finishes.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/07-ss300p-ehra-lessien-1567611990-1-1567790807.jpg?crop=0.802xw:0.677xh;0.188xw,0.185xh'
  },
  {
    id: 'mistral',
    name: 'MISTRAL',
    subtitle: 'ROADSTER',
    specs: '1600 HP • W16 • Open Top',
    desc: 'A wind-in-your-hair roadster built from pure performance DNA and refined details.',
    image: 'https://www.autocar.co.nz/wp-content/uploads/2024/11/image-0.jpg'
  },
  {
    id: 'bolide',
    name: 'BOLIDE',
    subtitle: 'TRACK HYPERCAR',
    specs: '1850 HP • Lightweight • Focused on lap times',
    desc: 'Purpose-built track machine with radical aerodynamic solutions and extreme power-to-weight.',
    image: 'https://img.incar.tw/2025/01/1736489407-5a8dd34ad75b80fde7a4038fb948695a-1200x774.jpg'
  },
  {
    id: 'divo',
    name: 'DIVO',
    subtitle: 'ART & PERFORMANCE',
    specs: '1500 HP • Aerodynamic • Limited',
    desc: 'A coachbuilt masterpiece focused on handling and exclusivity.',
    image: 'https://billionairetoys.com/wp-content/uploads/bugatti-divo-left-side-profile.jpg'
  },
  {
    id: 'veyron',
    name: 'VEYRON',
    subtitle: 'LEGACY',
    specs: '1001 HP • Iconic • Pioneering hypercar',
    desc: 'The car that put the hypercar on the map—legendary performance and rarity.',
    image: 'https://www.upscalelivingmag.com/wp-content/uploads/2024/06/BUGATTI-World-Premiere-Presskit-Images-01.jpg'
  },
  {
    id: 'centodieci',
    name: 'CENTODIECI',
    subtitle: 'TRIBUTE',
    specs: '1600 HP • Limited • Retro-inspired',
    desc: 'A tribute model combining retro lines with modern engineering excellence.',
    image: 'https://paultan.org/image/2019/08/2019-Bugatti-Centodieci-debut-6-1200x628.jpg'
  },
];

// elements
const slidesEl = document.getElementById('slides');
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const heroDesc = document.getElementById('heroDesc');
const detailTitle = document.getElementById('detailTitle');
const detailSubtitle = document.getElementById('detailSubtitle');
const detailDesc = document.getElementById('detailDesc');
const detailLeft = document.getElementById('detailLeft');
const thumbsEl = document.getElementById('thumbs');
const slideIndex = document.getElementById('slideIndex');
const slideTotal = document.getElementById('slideTotal');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current = 0;
let autoplay = true;
let autoplayDelay = 5000; // ms
let autoplayTimer = null;

// build slides + thumbs
function build() {
  slidesEl.innerHTML = '';
  thumbsEl.innerHTML = '';
  models.forEach((m, i) => {
    const s = document.createElement('div');
    s.classList.add('slide');
    s.style.backgroundImage = `url(${m.image})`;
    s.dataset.index = i;
    if (i === 0) s.classList.add('is-active');
    slidesEl.appendChild(s);

    const t = document.createElement('div');
    t.classList.add('thumb');
    t.style.backgroundImage = `url(${m.image})`;
    t.dataset.index = i;
    thumbsEl.appendChild(t);
    t.addEventListener('click', () => goTo(i));
  });

  slideTotal.textContent = models.length;
}

// update UI for current index with smooth GSAP transitions
function updateUI(index, immediate = false) {
  const m = models[index];

  // slides: fade previous / show current
  const prev = document.querySelector('.slide.is-active');
  const next = slidesEl.querySelector(`.slide[data-index="${index}"]`);
  if (prev && prev !== next) {
    prev.classList.remove('is-active');
    gsap.to(prev, { opacity: 0, scale: 1.03, duration: 0.8, ease: 'power2.out' });
  }
  if (next) {
    next.classList.add('is-active');
    gsap.fromTo(next, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' });
  }

  // overlay text animation
  gsap.fromTo(heroTitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
  gsap.fromTo(heroSubtitle, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.06, ease: 'power3.out' });
  gsap.fromTo(heroDesc, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.12, ease: 'power3.out' });

  // update texts
  heroTitle.textContent = `${m.name} ${m.subtitle ? m.subtitle : ''}`.trim();
  heroSubtitle.textContent = m.specs;
  heroDesc.textContent = m.desc;

  detailTitle.textContent = `${m.name} ${m.subtitle ? m.subtitle : ''}`.trim();
  detailSubtitle.textContent = 'Model Overview';
  detailDesc.textContent = m.desc;

  slideIndex.textContent = index + 1;

  // highlight active thumb
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active-thumb'));
  const activeThumb = document.querySelector(`.thumb[data-index="${index}"]`);
  if (activeThumb) activeThumb.classList.add('active-thumb');
}

// navigation
function next() {
  current = (current + 1) % models.length;
  updateUI(current);
  resetAutoplay();
}
function prev() {
  current = (current - 1 + models.length) % models.length;
  updateUI(current);
  resetAutoplay();
}
function goTo(i) {
  current = i % models.length;
  updateUI(current);
  resetAutoplay();
}

// autoplay control
function resetAutoplay() {
  if (!autoplay) return;
  if (autoplayTimer) clearTimeout(autoplayTimer);
  autoplayTimer = setTimeout(() => {
    next();
  }, autoplayDelay);
}

// init
function initModels() {
  build();
  updateUI(0);
  resetAutoplay();

  // events
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // pause on hover of hero
  const hero = document.getElementById('modelScreen');
  hero.addEventListener('mouseenter', () => {
    autoplay = false;
    if (autoplayTimer) clearTimeout(autoplayTimer);
  });
  hero.addEventListener('mouseleave', () => {
    autoplay = true;
    resetAutoplay();
  });

  // thumbs click already wired in build

  // responsive: adjust some behavior on resize if needed
  window.addEventListener('resize', () => {
    // minor refresh of UI
    gsap.set('.slide', { clearProps: 'all' });
    updateUI(current, true);
  });
}

// wait DOM
document.addEventListener('DOMContentLoaded', initModels);
