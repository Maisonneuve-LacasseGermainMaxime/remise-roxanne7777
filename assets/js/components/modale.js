//Variables et sélections HTML
const modale = document.querySelector(".modale-conteneur");
const bouton = document.querySelector(".fermer-modale");

// Fonctions
export function initModale() {
    bouton.addEventListener("click", cacherModale);
    setTimeout(afficherModale, 5000);
}

//Fonction accessible à l'extérieur de ce fichier
function afficherModale() {
    modale.classList.remove("invisible");
}

//Fonction accessible à l'extérieur de ce fichier
function cacherModale() {
    modale.classList.add("invisible");
}

// Exécution
initModale();