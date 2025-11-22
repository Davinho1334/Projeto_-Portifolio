const btnMenu = document.getElementById("btn-menu");
const menuMobile = document.getElementById("menu-mobile");
const btnFechar = document.querySelector(".btn-fechar");
const overlayMenu = document.querySelector(".overlay-menu");
const linksMenu = document.querySelectorAll("#menu-mobile nav a");

// FUNÇÕES MENU MOBILE
function abrirMenu() {
    if (!menuMobile) return;
    menuMobile.classList.add("abrir-menu");
    document.body.classList.add("menu-aberto");
    if (overlayMenu) overlayMenu.classList.add("ativo");
}

function fecharMenu() {
    if (!menuMobile) return;
    menuMobile.classList.remove("abrir-menu");
    document.body.classList.remove("menu-aberto");
    if (overlayMenu) overlayMenu.classList.remove("ativo");
}

if (btnMenu) {
    btnMenu.addEventListener("click", abrirMenu);
}

if (btnFechar) {
    btnFechar.addEventListener("click", fecharMenu);
}

if (overlayMenu) {
    overlayMenu.addEventListener("click", fecharMenu);
}

linksMenu.forEach(link => {
    link.addEventListener("click", fecharMenu);
});

// PARALLAX HERO
const parallaxImg = document.querySelector('.parallax-hero');

window.addEventListener('scroll', () => {
    if (!parallaxImg) return;
    const scrollY = window.scrollY;
    const translate = scrollY * 0.08; // intensidade do parallax
    parallaxImg.style.transform = `translateY(${translate}px)`;
});

// SCROLL REVEAL DAS SEÇÕES
const sectionsAnimadas = document.querySelectorAll('.section-animada');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

sectionsAnimadas.forEach(sec => observer.observe(sec));

// MENU ATIVO POR SCROLL
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.menu-desktop a');

window.addEventListener('scroll', () => {
    let currentId = "";

    sections.forEach(sec => {
        const sectionTop = sec.offsetTop - 130;
        if (window.scrollY >= sectionTop) {
            currentId = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentId) {
            link.classList.add('active');
        }
    });
});

// TILT NAS ESPECIALIDADES (efeito 3D leve)
const cards = document.querySelectorAll('.especialidades-box');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// ===== FUNDO DINÂMICO: PRETO -> VERDE CONFORME O SCROLL =====
const root = document.documentElement;

function atualizarFundoDinamico() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = docHeight > 0 ? scrollTop / docHeight : 0;

    // limita entre 0 e 1
    const p = Math.min(Math.max(progresso, 0), 1);

    // controla a intensidade do verde (0 no topo, ~0.7 no final)
    const alpha = 0.7 * p;

    // atualiza a variável CSS que o body::before usa
    root.style.setProperty('--bg-tint', `rgba(0, 255, 8, ${alpha})`);
}

// chama uma vez no carregamento
atualizarFundoDinamico();

// atualiza sempre que rolar
window.addEventListener('scroll', atualizarFundoDinamico);
window.addEventListener('resize', atualizarFundoDinamico);
