# Introduction


L'objectif de ce document est d'évaluer la qualité de l'accessibilité et du référencement SEO du site.

Mesures mises en place pour garantir l'accessibilité :

    Utilisation de balises HTML sémantiques.

    Classe "visually-hiden" pour lecteurs d'écran.

    Travail sur le contraste des couleurs.

    Navigation clavier.


Les outils de mesures utilisés sont :

    Google Search Console pour l'indexation et le référencement.

    PageSpeed Insights pour les performances, l'accessibilité, les bonnes pratiques et le SEO.

    W3C Validator pour la structure HTML.


## Résultats des tests :


### Google Search Console : 


    Pas d'anomalie détectée.
    Une seule page indexée à date, probablement à cause des modifications sur l'arborescence du projet.
    Nouveau test prévu d'ici 48h pour voir si la deuxième page est bien indexée.


### PageSpeed insights :


    Accueil :

        Performances : 94 sur mobile,  97 en format bureau.

            -> Optimisation mobile via images webP et chargement "lazy" dans le carousel.

        Accessiblité : 94, le contraste reste perfectible.

        Bonnes pratiques : 96, un affichage d'image qui ne correspond pas au format naturel en format téléphone.

        SEO : 100

        Bilan : des difficultés liées à l'aspect responsive.
    
    Reservation : 

        Performances : 97 en mobile 100 en format bureau.

            -> Optimisation mobile via image webP.

        Accessibilité : 95, éléments <h> classés non séquentiellement car h2 existe dans le carousel de l'accueil et on souhaite un champ de coordonnées uniforme sur les deux pages.

        Bonnes pratiques : 100

        SEO : 100


### W3C Validator : 


        Aucune erreur sur la page d'accueil.

        <h3> sans <h2> dans la page réservation pour les raisons évoquées au dessus.

    
Au vu des résultats des tests, le site est tout à fait déployable en l'état.

Il reste des optimisations responsives et de contraste possibles.
