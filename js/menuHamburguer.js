export function iniciarMenuHamburguer() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('#nav-menu a'); // todos os links do menu

    if (hamburger && navMenu) {
        // Abre/fecha o menu ao clicar no ícone
        hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            });
        });
    } 
}
