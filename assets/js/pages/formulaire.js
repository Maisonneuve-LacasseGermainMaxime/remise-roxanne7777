import { genererNav } from "../components/navigation.js";

// Variables
let sectionActuelle = 0;
let estValide = false;

// Éléments HTML
// - Formulaire
const formulaire = document.querySelector("form");
const sections = formulaire.querySelectorAll("section");
const sectionResume = document.querySelector(".resume");
const champs = document.querySelectorAll("input, textarea, select");

// - Boutons
const boutonsAvancer = formulaire.querySelectorAll("[data-direction='1']");
const boutonsReculer = formulaire.querySelectorAll("[data-direction='-1']");

// - Fonctions
function initForm() {
    genererNav();
   
   formulaire.addEventListener("submit", onSubmit);

   champs.forEach(function (champ) {
      champ.addEventListener("change", onChangementChamp);
   });

   boutonsAvancer.forEach(function(bouton) {
      bouton.addEventListener("click", avancerSection);
   });

   boutonsReculer.forEach(function(bouton) {
      bouton.addEventListener("click", reculerSection);
   });

   afficherSection();
};

function onSubmit(evenement) {
   evenement.preventDefault();

   if (estValide == true) {
       formulaire.submit();
   }
};

//Valider une section si tous les champs sont validés
function validerSection() {
   var sectionCourante = sections[sectionActuelle];
   var champsSection = sectionCourante.querySelectorAll("[required]");
   var sectionValide = true;

   champsSection.forEach(function(champ) {
       if (!champ.checkValidity()) {
           sectionValide = false;
           champ.reportValidity(); 
       }
   });

   return sectionValide;
}

function onChangementChamp(event) {
   const declencheur = event.currentTarget;
   const nom = declencheur.name;
   const valeur = declencheur.value;
   const type = declencheur.type;
   const checked = declencheur.checked;

   // activer/désactiver les options de taille selon la valeur du champ produit
   const choixProduit = document.getElementById("choix");
   const choixTaille = document.querySelectorAll('[name="taille"]');

   if (choixProduit.value === "Fantôme" || choixProduit.value === "Épouvantail") {
       choixTaille.forEach(function(taille) {
           taille.disabled = true;
           taille.checked = false;
           taille.classList.add("disabled");
       });
   } else {
       choixTaille.forEach(function(taille) {
           taille.disabled = false;
           taille.classList.remove("disabled");
       });
   }

   // Vérifier la validité du champ déclencheur
   const estValide = declencheur.checkValidity();
   const messageErreur = declencheur.nextElementSibling; // Le span juste après le champ

    if (estValide) {
        declencheur.classList.remove("invalid");
        declencheur.classList.add("valid");
        messageErreur.textContent = ""; // Efface le message d'erreur s'il existe
    } else {
        declencheur.classList.remove("valid");
        declencheur.classList.add("invalid");
        messageErreur.textContent = "Ce champ n'est pas valide"; 
    }
   
    // validation personnalisée du champ quantité
    const champQuantite = document.querySelector("input[type='number']");
    champQuantite.setCustomValidity("Doit être un chiffre entre 1 et 10");

    champQuantite.addEventListener("change", function() {
        champQuantite.setCustomValidity(""); // rendre le champ valide
    })

    // Vérifier la validité de la section
    const sectionValide = validerSection();
   
   // activer/désactiver le bouton suivant
   const boutonSuivant = sections[sectionActuelle].querySelector(".bouton[data-direction='1']");
   if (sectionValide) {
       boutonSuivant.disabled = false;
       boutonSuivant.classList.remove("disabled");
   } else {
       boutonSuivant.disabled = true;
       boutonSuivant.classList.add("disabled");
   }

   // Mettre à jour le résumé
   if (type === "checkbox") {
       afficherResumeCheckbox(nom, checked);
   } else {
       afficherResume(nom, valeur);
   }
}

// afficher dans le résumé si la case est cochée ou non
function afficherResumeCheckbox(nomChamp, estCoche) {
   const champResume = sectionResume.querySelector(`[data-name="${nomChamp}"]`);
  
   if (champResume !== null) {
       let texte = estCoche ? "OUI" : "NON";
       champResume.textContent = texte;
   }
};

function afficherResume(nomChamp, valeur) {
   const champResume = sectionResume.querySelector(`[data-name="${nomChamp}"]`);
   
   if (champResume !== null) {
       champResume.textContent = valeur;
   }
};

function afficherSection() {
   toutCacher();
   sections[sectionActuelle].classList.remove("invisible");
};

function toutCacher() {
   sections.forEach(function (element) {
       element.classList.add("invisible");
   });
};

function avancerSection() {
   if (validerSection()) {
      sectionActuelle++;

      if (sectionActuelle < sections.length) {
         afficherSection();
      }
   }
};

function reculerSection() {
   sectionActuelle--;

   if (sectionActuelle >= 0) {
      afficherSection();
   }
};

initForm();



