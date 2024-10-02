/**
 * Classe Carrousel
 * Servant à gérer un carrousel d'images
 */
class Carrousel {
    constructor(conteneurHTML, tableauImages) {
        //Variables
        this.position = 0;
        let contexteClasse = this;

        //Liste images a afficher
        this.tableauImages = tableauImages;

        //Sélection HTML
        this.conteneurHTML = conteneurHTML;
        this.imageConteneur = this.conteneurHTML.querySelector(".image-principale");

        this.template = this.conteneurHTML.querySelector("template#conteneur-image-navigation");
        this.listeImages = this.conteneurHTML.querySelector(".carrousel-liste-images");

        //Événements
        this.conteneurHTML.addEventListener("click", this.onClicCarrousel.bind(contexteClasse));
        window.setInterval(
            function () {
                this.avancer();
            }.bind(contexteClasse),
            3000
        );

        //Exécution lors de l'instanciation
        this.afficherImage(this.tableauImages[this.position]);
    }

    /**
     * Fonction servant à gérer les clics sur le carrousel
     * @param {*} evenement
     */
    onClicCarrousel(evenement) {
        //On récupère le bouton cliqué avec closest et on vérifie s'il y a un attribut data-direction
        let bouton = evenement.target.closest("[data-direction]");

        //Si on a trouvé un bouton
        if (bouton != null) {
            let direction = Number(bouton.dataset.direction);
            console.log(this);

            if (direction == 1) {
                this.avancer();
            } else if (direction == -1) {
                this.reculer();
            }
        }
    }

    //Fonction qui affiche une image
    afficherImage(source) {
        this.imageConteneur.src = source;
    }

    /**
     * Fonction qui permet de faire avancer le carrousel d'une image
     */
    avancer() {
        //On incrémente la position
        this.position++;

        //Si on dépasse la fin du tableau, on revient au début
        if (this.position >= this.tableauImages.length) {
            this.position = 0;
        }

        //On récupère l'image à afficher
        let image = this.tableauImages[this.position];
        //On l'affiche
        this.afficherImage(image);
    }

    reculer() {
        this.position--;

        if (this.position < 0) {
            this.position = this.tableauImages.length -1;
        }

        let image = this.tableauImages[this.position];
        this.afficherImage(image);
    }
}

export default Carrousel;