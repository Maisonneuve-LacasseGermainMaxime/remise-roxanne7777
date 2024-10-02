/**
 * Cette classe permet d'afficher des éléments au défilement de la page
 */
class ScrollAnimator {
    constructor(zone, targets) {
        this.zone = zone; // La zone d'intersection
        this.targets = targets; // Les éléments cibles à observer

        this.options = {
            root: this.zone,
            rootMargin: "0px",
            threshold: 0.3,
        };

        this.observer = new IntersectionObserver(this.onIntersection.bind(this), this.options);

        //On observe les éléments cibles
        targets.forEach(
            function (target) {
                //On observe chaque élément cible
                this.observer.observe(target);
            }.bind(this)
        );
    }

    /**
     * Fonction de rappel appelée lorsqu'un élément cible entre ou sort de la zone d'intersection
     * @param {*} entries
     */
    onIntersection(entries) {
        entries.forEach(
            function (entry) {
                let element = entry.target; 
                let intersecte = entry.isIntersecting; //Si l'élément cible est dans la zone d'intersection

                //Action à effectuer lorsque l'élément cible entre ou sort de la zone d'intersection
                //Ajouter classe anime
                if (intersecte == true) {
                    element.classList.remove("anime");
                } else {
                    element.classList.add("anime");
                }
            }.bind(this)
        );
    }
}
export default ScrollAnimator;