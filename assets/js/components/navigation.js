export function genererNav() { 
    let navigation = [ /* tableau d'objets correspondant aux liens de la navigation*/
        {texte: "Accueil", page: "index.html"},
        {texte: "À propos", page: "apropos.html"},
        {texte: "Contactez-nous", page: "contact.html"},
        {texte: "Commande", page: "formulaire.html"}
    ];

    const menuNav = document.querySelector("ul");

    navigation.forEach(function (item) { /*Pour chaque élément du tableau, créer un élément de liste contenant un lien*/
        const pageActive = window.location.href; /*mettre l'url de la page active dans une variable*/
        const element = document.createElement("li");
        const lien = document.createElement("a");

        lien.href = item.page; /*assigner url du lien*/
        lien.textContent = item.texte; /*assigner texte du lien*/

        element.appendChild(lien); /*mettre le lien dans l'élément de liste*/
        menuNav.appendChild(element);/*mettre l'élément de liste dans la liste*/

        if (pageActive.includes(item.page)) { /*Si le nom de la page active correspond au nom du lien, modifier la couleur. https://dev.to/ghostaram/styling-active-navigation-links-using-vanilla-js-and-css-215b*/
            lien.style.color = "#7c2778";
        }
    });
}

export function changerMode() {
    let mode = document.querySelector("#dark-mode");

    mode.addEventListener("click", function(event) {
        let bouton= event.target.closest("[data-mode]");

        if (bouton !== null) {
            document.body.dataset.theme = bouton.dataset.mode;
            localStorage.setItem("theme", bouton.dataset.mode);
        }
    });
}