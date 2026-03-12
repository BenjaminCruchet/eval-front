/* variables */

    /* classes DOM tableau */
    const villes = document.querySelectorAll(".ville");
    const dates = document.querySelectorAll(".date");
    const lieux = document.querySelectorAll(".lieu");
    const boutonsReserver = document.querySelectorAll(".openModal");

    /* DOM champ de recherche */
    const suggestionContainer = document.getElementById("suggestionContainer");
    const searchForm = document.getElementById("searchForm");
    const loupe = document.getElementById("loupe");
    const searchBarre = document.getElementById("searchBarre");

    /* modales */
    const popUpReservation = document.getElementById("popUpReservation");
    const popUpError = document.getElementById("popUpError");
    const popUpCommande = document.getElementById("popUpCommande");
    const popUpConfirmation = document.getElementById("popUpConfirmation");

    /* Tableaux dates/villes/lieux*/
    const tableauDates = Array.from(dates, function(date){
        return date.textContent;
    });

    const tableauVilles = Array.from(villes, function(ville){
        return ville.textContent;
    });

    const tableauLieux = Array.from(lieux, function(lieu){
        return lieu.textContent;
    });

    /* Tableaux dates/villes/lieux uniques */
    const tableauDatesUniques = tableauDates.filter(function(date,i,tableauDates){
        return tableauDates.indexOf(date)===i;
    });

    const tableauVillesUniques = tableauVilles.filter(function(ville,i,tableauVilles){
        return tableauVilles.indexOf(ville)===i;
    });

    const tableauLieuxUniques = tableauLieux.filter(function(lieu,i,tableauLieux){
        return tableauLieux.indexOf(lieu)===i;
    });
    

    /* Alerte doublon */
    const warningDiv = document.getElementById("alertDoublon");
  

/* Fonctions réutilisables */

    /* Créer les divs de suggestions */
    function creationDiv(champ){
        const div = document.createElement("div");
        div.textContent = champ;
        suggestionContainer.appendChild(div);
        div.setAttribute("tabindex",0);
        div.setAttribute("role","option");
    };

    /* Remplir les divs de suggestion */
    function genererSuggestion(){
        const inputText = searchBarre.value.toLowerCase();
        const matchDates = tableauDatesUniques.filter(function(date){
            return date.toLowerCase().startsWith(inputText);
        });
        const matchVilles = tableauVillesUniques.filter(function(ville){
            return ville.toLowerCase().startsWith(inputText);
        });
        const matchLieux = tableauLieuxUniques.filter(function(lieu){
            return lieu.toLowerCase().startsWith(inputText);
        });
        matchVilles.forEach(function(ville){
            creationDiv(ville);
        });
        matchDates.forEach(function(date){
            creationDiv(date);
        });
        matchLieux.forEach(function(lieu){
            creationDiv(lieu);
        });
    };

    /* Saisie incorrecte champ de recherche */
    function errorSearchForm(){
            if (!donneesDateVilleLieu(searchBarre.value)){
                document.getElementById("infoCherchee").textContent = `"${document.getElementById("searchBarre").value}"`;
                popUpError.showModal();
                popUpError.querySelector("input, select, textarea, button").focus();
            };
        };

    /* Cacher les lignes qui ne correspondent pas à la recherche */

    function filtreTableau(){

        document.querySelectorAll(".ligne").forEach(function(ligne){

            const recherche = searchBarre.value.toLowerCase();
            const ville = ligne.querySelector(".ville").textContent.toLowerCase();
            const date = ligne.querySelector(".date").textContent.toLowerCase();
            const lieu = ligne.querySelector(".lieu").textContent.toLowerCase();

            if( recherche === ville || recherche === date || recherche === lieu ){
                ligne.style.display = "table-row";
            }
            else{
                ligne.style.display ="none";
            }
        });
    };

    /* Effacer les suggestions */
    function clearSuggestion(){
        for(let i=suggestionContainer.children.length-1; i>=0; i--){
            suggestionContainer.removeChild(suggestionContainer.children[i]);
        };
    };

    /* Rendre toutes les lignes du tableaux visibles */

    function cleanTableau(info){
        info.forEach(function(element){
            element.parentNode.style.display = "table-row";
        });
    };

    /* Filtrer le tableau */
    function MEFTableau(){
        clearSuggestion();
        cleanTableau(villes);
        cleanTableau(dates);
        cleanTableau(lieux);
        filtreTableau();
    };

    /* Attribution des valeurs Date/Ville/Lieu pour modales */
    function donneesDateVilleLieu(champ){
        let found = false;
        for(let i=0; i<tableauVilles.length; i++){
            if (tableauVilles[i].toLowerCase() === champ.toLowerCase()) {
                document.querySelectorAll(".modalVille").forEach(function(element){
                    element.textContent = tableauVilles[i];
                })
                document.querySelectorAll(".modalDate").forEach(function(element){
                    element.textContent = tableauDates[i];
                })
                document.querySelectorAll(".modalLieu").forEach(function(element){
                    element.textContent = tableauLieux[i];
                })
                found = true;
            };
        };
        return found;
    };

    /* Calcul de la somme à payer */
    function calculTotal(){
        const nbPlace = Number(document.getElementById("nbPlace").value);
        const PU = Number(document.getElementById("PU").textContent);
        let total = nbPlace * PU;
        document.getElementById("total").textContent = `${total}€`;
    };

    /* Compter occurrences villes */

    function nbVilles(champ){
        let found = 0
        for(let i=0; i<tableauVilles.length; i++){
            if(tableauVilles[i].toLowerCase() === champ.toLowerCase()){
                found += 1;
            }
        };
        return found;
    };

    
/* Evènements */

    /* Clic bouton tableau */
    boutonsReserver.forEach(function(btn){
        btn.addEventListener("click",function(){
            calculTotal();
            const date = btn.closest("tr").querySelector(".date").textContent;
                document.querySelectorAll(".modalDate").forEach(function(element){
                    element.textContent = `${date}`;
                });
            const ville = btn.closest("tr").querySelector(".ville").textContent;
                document.querySelectorAll(".modalVille").forEach(function(element){
                element.textContent = `${ville}`;
                });
            const lieu = btn.closest("tr").querySelector(".lieu").textContent;
                document.querySelectorAll(".modalLieu").forEach(function(element){
                element.textContent = `${lieu}`;
                });
            warningDiv.style.display = "none"; 
            if(nbVilles (ville)> 1){
                warningDiv.style.display = "inline-block";
            }
            popUpReservation.showModal();
            popUpReservation.querySelector("input, select, textarea, button").focus();        
        }); 
    });

    /* Changer total quand le nombre de places change dans popUpReservation*/
    document.getElementById("nbPlace").addEventListener("input",calculTotal);
    
    /* Fermeture des modales (boutons "X" et "OK") */
    document.querySelectorAll(".closeModal").forEach(function(btn){
        btn.addEventListener("click", function(){
            document.querySelectorAll("dialog[open]").forEach(function(dialog){
                dialog.close();
            });
        });
    });

    document.getElementById("confirmationOK").addEventListener("click",function(){
        document.querySelectorAll("dialog[open]").forEach(function(dialog){
            dialog.close();
        });
    });

    popUpError.addEventListener("close",function(){
        clearSuggestion();
        cleanTableau(villes);
        cleanTableau(dates);
        cleanTableau(lieux);
    });
    
    /* Au clic d'une suggestion mettre en forme le tableau, générer popUpError au besoin */
    
    suggestionContainer.addEventListener("click",function(){
        searchBarre.value = suggestionContainer.textContent;
        MEFTableau();
        errorSearchForm();
    });
     
    /* Générer les suggestions a chaque input dans le champ de recherche */
    searchBarre.addEventListener("input",function(){
        switch(searchBarre.value){
            case "" : clearSuggestion();
            cleanTableau(villes);
            break;
            default : clearSuggestion();  
            genererSuggestion()
        };
    }); 
    
    /* validation recherche ("loupe" et submit) */
    loupe.addEventListener("click",function(){
        MEFTableau();
        errorSearchForm();
    });

    searchForm.addEventListener("submit",function(event){
        event.preventDefault()
        MEFTableau();
        errorSearchForm();
    });

    /* Remplir et ouvrir popUpCommande */
    document.getElementById("formPopUpReservation").addEventListener("submit", function(event){
        document.getElementById("nbPlacesPopUp").textContent = document.getElementById("nbPlace").value;
        document.getElementById("datePopUp").textContent = document.querySelector(".modalDate").textContent;
        document.getElementById("villePopUp").textContent =  document.querySelector(".modalVille").textContent;
        document.getElementById("totalPopUp").textContent =  document.getElementById("total").textContent;
        popUpCommande.showModal();
        popUpCommande.querySelector("input, select, textarea, button").focus();
        event.preventDefault();
    });


    /* Clic retour vers popUpReservation */
    document.getElementById("retour").addEventListener("click",function(){
        popUpCommande.close();
        popUpReservation.showModal();
        popUpReservation.querySelector("input, select, textarea, button").focus();
    });

    /* Ouvrir popUp confirmation de commande */
    document.getElementById("validationCommande").addEventListener("click",function(){
        popUpCommande.close();
        document.getElementById("Usermail").textContent = document.getElementById("Mail").value;
        popUpConfirmation.showModal();
        popUpConfirmation.querySelector("input, select, textarea, button").focus();
    });
