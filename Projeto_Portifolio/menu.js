let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let btnFechar = document.querySelector(".btn-fechar");

// Alternar entre abrir e fechar o menu
btnMenu.addEventListener("click", () => {
    menu.classList.toggle("abrir-menu");
});

// Fechar o menu ao clicar no botão de fechar
btnFechar.addEventListener("click", () => {
    menu.classList.remove("abrir-menu");
});

