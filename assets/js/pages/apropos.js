import { genererNav, changerMode } from "../components/navigation.js";
import { initModale } from "../components/modale.js";
import Carrousel from "../classes/carrousel.js";
import ScrollAnimator from "../classes/ScrollAnimator.js";


function init() { /*appeler les fonctions au chargement de la page*/
    let theme = localStorage.getItem("theme");
    if (theme !== null) {
        document.body.dataset.theme = theme;
    }
    genererNav();
    changerMode();

    let zone = null;
    let cibles = document.querySelectorAll(".section");
    new ScrollAnimator(zone, cibles);

    genererCarrousel();
    initModale();
}

function genererCarrousel() {
    let carrouselConteneur = document.querySelector("[data-carrousel]");
    let tableauImages = ["assets/img/bibelot.jpg", "assets/img/citrouille.jpg", "assets/img/clown.jpg", "assets/img/crane.jpg", "assets/img/miroir.jpg", "assets/img/trickortreat.jpg"];

    let carrousel = new Carrousel(carrouselConteneur, tableauImages);

    carrouselConteneur.appendChild(carrousel);
}

init();