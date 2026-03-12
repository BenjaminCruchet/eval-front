# Présentation du projet


Création d'une interface web permettant de réserver des billets pour les concerts d'un youtuber nommé ABGYhuDJ.

Le projet comprend deux pages web, une page de présentation de l'artiste et de son univers, une page avec un calendrier annonçant les différents concerts et la possibilité de réserver.


## Stack technique :


HTML5 pour la structure des pages.

Bootstrap pour la gestion du carousel sur la page d'accueil.

CSS3 pour la mise en forme et pour rendre le site responsive.

Javascript pour les interactions dynamiques, gestion du champ de recherche et des modales de réservation.

Git et Github pour le versionning du projet.

GitHub pour l'hébergement du site via GitHub Pages.


## Structure du projet :

├── CSS
│   ├── global.css
│   ├── index.css
│   └── reservation.css
│
├── HTML
│   └── reservation.html
│
├── Images
│   ├── carousel3.webp
│   ├── concert.webp
│   ├── image2.webp
│   ├── logo.webp
│   └── resume.webp
│
├── JavaScript
│   └── reservation.js
│
├── index.html
├── Rapport-accessibilite-SEO.md
├── README.md
├── robots.txt
└── sitemap.xml


## Maquettage :


Maquettage réalisé via Figma.

La page "composants" comprend certains des éléments utilisés dans la page "visuels".

Elle a pour but de supporter la page "visuels" uniquement.

Lancer la présentation pour naviguer via la page visuels

Certaines fonctionnalités (suggestions automatique, ouverture de la modale d'erreur, filtre sur le tableau) ne sont pas implémentées sur la maquette mais sont bien présentes sur le site.

Lien vers le document : https://www.figma.com/design/jjYCoRUgrAf85bR2tM0Hde/Eval-front?node-id=0-1&t=gTOvdeBhrsuUhNdP-1


## Fonctionnement du site :


La page d'accueil contient un carousel composé de trois cartes permettant de présenter brièvement l’univers de l’artiste ainsi que ses réseaux sociaux. Elle comporte également une bannière ainsi que trois boutons, un par carte, permettant d’accéder à la page principale du site : la page de réservation.

La page de réservation contient un tableau listant l’ensemble des dates de concerts de l’artiste ABGYhuDJ. Chaque ligne du tableau comporte un bouton « Réserver » permettant d’ouvrir une fenêtre modale contenant les éléments nécessaires à la réservation des places.

Après sélection du concert et du nombre de places souhaitées, une seconde modale s’ouvre afin de permettre à l’utilisateur de vérifier les informations de la commande, notamment le concert choisi, le nombre de places et le montant total. Après validation, une dernière modale s’affiche afin de confirmer l’envoi des billets à l’adresse e-mail renseignée par l’utilisateur.

Un champ de recherche est également présent afin de faciliter la sélection d’un concert par date ou par lieu. Des suggestions automatiques sont proposées à partir des premiers caractères saisis par l’utilisateur. Lorsqu’une suggestion est sélectionnée ou lorsque le champ de recherche est validé, un filtre est appliqué au tableau afin d’afficher uniquement les concerts correspondants. Si aucune correspondance n’est trouvée, une modale s’ouvre afin d’en informer l’utilisateur.

Enfin, les deux pages du site contiennent un encadré regroupant les informations nécessaires pour contacter les organisateurs en cas de besoin.

Les différentes interactions de l’interface (ouverture des modales, filtrage du tableau et génération des suggestions) sont gérées en JavaScript.


## Accessibilité :


L'accessibilité du site est assurée par les mesures suivantes :

Utilisation de balises HTML sémantiques.

Navigation au clavier, natif sur certains éléments, assurée par javaScript pour les suggestions.

Focus renvoyé sur les boutons à l'ouverture des modales.

Utilisation d'une classe "visually-hiden" pour les éléments destinés aux lecteurs d'écran.

Contraste de couleur rendu satisfaisant en respectant les contraintes du client (couleur rouge dominante).


## Référencement :


Le projet comporte un fichier sitemap.xml et un fichier robots.txt pour optimiser le SEO.

Le site a été déclaré dans Google Search Console et les balises HTML sont structurées ce qui facilite l'indexation sur site par les moteurs de recherche.


## Améliorations possibles :


Site non intégralement responsive à date.

Ajout d'un backend et d'une gestion réelle des paiements.