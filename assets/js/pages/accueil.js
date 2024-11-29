import { genererNav, changerMode } from "../components/navigation.js";

let produits = [
    {   
        id: 1,
        nom: "Sorcière", 
        inclus: "Chapeau, cape et balai", 
        prix: "35$"
    },
    {
        id: 2,
        nom: "Fantôme", 
        inclus: "Drap", 
        prix: "20$"
    },
    {
        id: 3,
        nom: "Zombie", 
        inclus: "Chemise, pantalon et cicatrice",
        prix: "30$"
    },
    {
        id: 4,
        nom: "Épouvantail", 
        inclus: "Chapeau et paille",
        prix: "25$"
    },
    {
        id: 5,
        nom: "Calavera", 
        inclus: "Couronne de fleurs et robe",
        prix: "45$"
    }
];

function init() { /*appeler les fonctions au chargement de la page*/
    let theme = localStorage.getItem("theme");
    if (theme !== null) {
        document.body.dataset.theme = theme;
    }
    
    genererNav();
    changerMode();
    afficherListe();
    trierListeProduits(id);
}

function creerVignetteProduit(item) { /*gabarit pour les vignettes de produit*/
    const costume = document.createElement("div"); /*conteneur*/
    costume.id = item.id; /*assigner l'id de l'objet à l'élément HTML correspondant*/
    costume.classList.add("vignette"); /*ajouter une classe à l'élément créé*/
    
    const photo = document.createElement("img"); /*créer un élément image*/
    let nomPhoto = item.nom.toLowerCase(); /*le nom de l'image est le nom de l'item sans majuscule ni accent et servira à générer le lien de l'image*/
    let nomFormate = nomPhoto.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); /*enlever et remplacer les accents https://www.amitmerchant.com/replace-accented-characters-with-plain-english/*/
    photo.src = `assets/img/${nomFormate}.jpg`; /*générer et assigner le lien de l'image*/

    const nomItem = document.createElement("h3"); /*créer un titre au produit*/
    nomItem.textContent = item.nom;
    /*ajouter image et titre dans le conteneur de la vignette*/
    costume.appendChild(photo); 
    costume.appendChild(nomItem);

    return costume;
}

function afficherListe() { 
    let listeProduits = document.getElementById("liste");/* récupérer le conteneur pour la grille de produits*/

    produits.forEach(function (item) { /*Pour chaque objet du tableau, appeler la fonction pour créer une vignette de produit correspondant*/
       let costume = creerVignetteProduit(item);

        costume.addEventListener("click", function() { /*Au clic d'une vignette, appeler la fonction pour afficher ses informations dans le aside*/
            afficherDetailsProduit(item);
        });

        listeProduits.appendChild(costume); /*Chaque vignette générée est ajoutée au conteneur liste*/
    });
}

function afficherDetailsProduit(item) {
    let detailsAside =  document.getElementById("details"); /* récupérer la section aside et la vider*/
    detailsAside.innerHTML = "";

    let detailsProduit = document.createElement("div"); /*créer un conteneur et lui ajouter une classe*/
    detailsProduit.classList.add("details-produits");

    let costumeProduit = creerVignetteProduit(item);/*appeler la fonction pour utiliser le gabarit de vignette produit et ajouter la vignette dans le conteneur*/
    detailsProduit.appendChild(costumeProduit);

    Object.keys(item).forEach(function(key) { /*Parcourir les propriétés des objets du tableau*/
        if (key === "inclus" || key === "prix") { /*Si la propriété est "inclus" ou "prix", créer un paragraphe*/
            let p = document.createElement("p");
            p.textContent = `${key.charAt(0).toUpperCase()}${key.slice(1)}: ${item[key]}`; /*Le contenu du paragraphe est la propriété avec la première lettre en majuscule suivi de la valeur de cette propriété*/
            detailsProduit.appendChild(p); /*ajouter les paragraphes dans le conteneur*/
        }
    });

    detailsAside.appendChild(detailsProduit); /*ajouter le conteneur dans le aside*/
}

let choixTrier = [];
let options = document.querySelectorAll("li"); /*récupérer tous les éléments li et les mettre dans une variable*/

options.forEach(function (option) {
    choixTrier.push(option); /*ajouter chaque élément li dans le tableau choixTrier*/ 
});

choixTrier.forEach(function(option) { /* Pour chaque élément du tableau, appeler la fonction de liste au clic*/
    option.addEventListener("click", function() {
        trierListeProduits(option.id);
    });
});

function trierListeProduits(id) {
    switch(id) {
        case "alphabetique": /*Si l'id de l'élément li est alphabetique, trier le tableau en ordre alphabétique*/
            produits.sort(function (a,b) {
                return a.nom.localeCompare(b.nom);
            });
            break;
        case "croissant": /*Si l'id de l'élément li est croissant ou decroissant, trier le tableau selon les prix transformés en entiers et comparés*/
            produits.sort(function (a,b) {
                return parseInt(a.prix) - parseInt(b.prix);
            });
            break;
        case "decroissant":
            produits.sort(function (a,b) {
                return parseInt(b.prix) - parseInt(a.prix);
            });
            break;
        default:
            return 0; /*Si l'id ne correspond pas à un de ces choix*/
    }

    let listeProduits = document.getElementById("liste");
    listeProduits.innerHTML = "";
    afficherListe(); /*Vider le conteneur et afficher la liste de produits triés*/
}

init();