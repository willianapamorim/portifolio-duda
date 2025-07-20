import { iniciarMenuHamburguer } from './menuHamburguer.js';
import { rolagem } from './rolagem.js';

iniciarMenuHamburguer();
rolagem();

const projetosImagens = {
    "mundo-park-campo-grande": [
        "img/mundopark/MundoPark-1.jpg",
        "img/mundopark/MundoPark-2.jpg",
        "img/mundopark/MundoPark-3.jpg",
        "img/mundopark/MundoPark-4.jpg",
        "img/mundopark/MundoPark-5.jpg"
    ],
    "vila-andrade-mais": [
        "img/maisvilaandrade/maisvilaandrade-1.png", 
        "img/maisvilaandrade/maisvilaandrade-2.png",
        "img/maisvilaandrade/maisvilaandrade-3.png",
        "img/maisvilaandrade/maisvilaandrade-4.png",
        "img/maisvilaandrade/maisvilaandrade-5.png"
        
    ],
    "viz-santo-amaro": [
        "img/santoamaro/santoamaro-1.jpg",
        "img/santoamaro/santoamaro-2.jpg",
        "img/santoamaro/santoamaro-3.jpg",
        "img/santoamaro/santoamaro-4.jpg",
        "img/santoamaro/santoamaro-5.jpg"
    ],
    "meuplano-interlagos": [
        "img/interlagos/interlagos-1.jpg",
        "img/interlagos/interlagos-2.jpg",
        "img/interlagos/interlagos-3.jpg",
        "img/interlagos/interlagos-4.jpg",
        "img/interlagos/interlagos-5.jpg"
    ],
    "sphera-panamby": [
        "img/sphera/sphera-1.jpg",
        "img/sphera/sphera-2.jpg",
        "img/sphera/sphera-3.jpg",
        "img/sphera/sphera-4.jpg",
        "img/sphera/sphera-5.jpg"
    ],
    "pq-nabuco": [
        "img/pqnabuco/nabuco-1.jpg",
        "img/pqnabuco/nabuco-2.jpg",
        "img/pqnabuco/nabuco-3.jpg",
        "img/pqnabuco/nabuco-4.jpg",
        "img/pqnabuco/nabuco-5.jpg"
    ],
    "mista": [
        "img/mista/mista1.jpg",
        "img/mista/mista2.jpg",
        "img/mista/mista3.jpg",
        "img/mista/mista4.jpg",
        "img/mista/mista5.jpg"
    ],
    "nova-espraiada": [
        "img/novaespraiada/espraiada1.png",
        "img/novaespraiada/espraiada2.png",
        "img/novaespraiada/espraiada3.png",
        "img/novaespraiada/espraiada4.png",
        "img/novaespraiada/espraiada5.png"
    ],
    "oriz": [
        "img/oriz/oriz1.jpg",
        "img/oriz/oriz2.jpg",
        "img/oriz/oriz3.jpg",
        "img/oriz/oriz4.jpg",
        "img/oriz/oriz5.jpg"
    ],
    "rio-bonito": [
        "img/vilariobonito/riobonito1.jpg",
        "img/vilariobonito/riobonito2.jpg",
        "img/vilariobonito/riobonito3.jpg",
        "img/vilariobonito/riobonito4.jpg",
        "img/vilariobonito/riobonito5.jpg"
    ]
    // Adicione mais projetos e suas respectivas imagens aqui
};

let currentProjectImages = [];
let slideIndex = 0;

// Obtenha os elementos da modal
const galeriaModal = document.getElementById("galeriaModal");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const miniaturasContainer = document.getElementById("miniaturasContainer");
const fecharBtn = document.querySelector(".fechar"); // Seleciona o botão de fechar
const prevBtn = document.querySelector(".prev");     // Seleciona o botão anterior
const nextBtn = document.querySelector(".next");     // Seleciona o botão próximo

// --- Funções da Modal ---

function abrirModal(projetoId) {
    currentProjectImages = projetosImagens[projetoId] || [];
    if (currentProjectImages.length === 0) {
        console.warn(`Nenhuma imagem encontrada para o projeto: ${projetoId}`);
        return;
    }

    miniaturasContainer.innerHTML = ''; // Limpa miniaturas anteriores

    currentProjectImages.forEach((imageSrc, index) => {
        const miniatura = document.createElement('img');
        miniatura.className = 'miniatura';
        miniatura.src = imageSrc;
        miniatura.alt = `Miniatura ${index + 1}`;
        // Adiciona o event listener para a miniatura aqui
        miniatura.addEventListener('click', () => imagemAtual(index + 1));
        miniaturasContainer.appendChild(miniatura);
    });

    slideIndex = 0;
    mostrarSlides(slideIndex);
    galeriaModal.style.display = "block";
}

function fecharModal() {
    galeriaModal.style.display = "none";
}

function mudarSlide(n) {
    mostrarSlides(slideIndex += n);
}

function imagemAtual(n) {
    mostrarSlides(slideIndex = n - 1);
}

function mostrarSlides(n) {
    if (currentProjectImages.length === 0) return;

    if (n >= currentProjectImages.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = currentProjectImages.length - 1;
    }

    imagemAmpliada.src = currentProjectImages[slideIndex];

    const miniaturas = miniaturasContainer.getElementsByClassName("miniatura");
    for (let i = 0; i < miniaturas.length; i++) {
        miniaturas[i].classList.remove("active");
    }
    if (miniaturas[slideIndex]) {
        miniaturas[slideIndex].classList.add("active");
    }
}

// --- Adição de Event Listeners (TUDO via JS) ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Event listener para os blocos de imóveis
    const imoveisDivs = document.querySelectorAll('.imoveis-img');
    imoveisDivs.forEach(div => {
        div.addEventListener('click', () => {
            const projetoId = div.dataset.projeto;
            abrirModal(projetoId);
        });
    });

    // 2. Event listener para o botão de fechar (o 'X')
    if (fecharBtn) {
        fecharBtn.addEventListener('click', fecharModal);
    } else {
        console.warn("Botão de fechar (class='fechar') não encontrado no HTML.");
    }

    // 3. Event listeners para os botões de navegação (setas)
    if (prevBtn) {
        prevBtn.addEventListener('click', () => mudarSlide(-1));
    } else {
        console.warn("Botão 'anterior' (class='prev') não encontrado no HTML.");
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => mudarSlide(1));
    } else {
        console.warn("Botão 'próximo' (class='next') não encontrado no HTML.");
    }
});

// 4. Fechar a modal clicando fora dela (este já estava ok, mas mantemos)
window.addEventListener('click', (event) => {
    if (event.target === galeriaModal) {
        fecharModal();
    }
});