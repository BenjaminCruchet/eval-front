/* variables définies en absolu */

    /* modales */
    const popUpResa = document.getElementById("popUpResa");
    const popUpError = document.getElementById("popUpError");
    
    /* tableaux villes */
    const villes = document.querySelectorAll(".ville");
    const tableauVilles = Array.from(villes, function(ville){
        return ville.textContent;
    });
    const tableauVillesUniques = tableauVilles.filter(function(ville,i,tableauVilles){
    return tableauVilles.indexOf(ville)===i;
    });

    /* dates et tableaux dates */

    const dates = document.querySelectorAll(".date");
    const tableauDates = Array.from(dates, function(date){
        return date.textContent;
    });
    const tableauDatesUniques = tableauDates.filter(function(date,i,tableauDates){
    return tableauDates.indexOf(date)===i;
    });

    /* lieux et tableaux lieux */
    const lieux = document.querySelectorAll(".lieu");
    const tableauLieux = Array.from(lieux, function(lieu){
        return lieu.textContent;
    });
    const tableauLieuxUniques = tableauLieux.filter(function(lieu,i,tableauLieux){
    return tableauLieux.indexOf(lieu)===i;
    });

    /* boutons du tableau */
    const resaBtn = document.querySelectorAll(".openModal");

    /* Alerte doublon */
    const warningDiv = document.getElementById("alertDoublon");

    /* suggestion containeur */
    const suggestionContainer = document.getElementById("suggestionContainer");

    /* formulaire de recherche */
    const searchForm = document.getElementById("searchForm");
    const loupe = document.getElementById("loupe");

    /*barre de recherche */
    const searchBarre = document.getElementById("searchBarre");

    /* Pop-up commande */
    const popUpCommande = document.getElementById("popUpCommande");

    /* pop-up confirmation */
    const popUpConfirmation = document.getElementById("popUpConfirmation")

/* Pool de fonction réutilisables */

    /* filtre tableau */

    function filtreTableau(){

        document.querySelectorAll(".ligne").forEach(function(ligne){

            recherche = searchBarre.value.toLowerCase();
            ville = ligne.querySelector(".ville").textContent.toLowerCase();
            date = ligne.querySelector(".date").textContent.toLowerCase();
            lieu = ligne.querySelector(".lieu").textContent.toLowerCase();

            if( recherche === ville || recherche === date || recherche === lieu ){
                ligne.style.display = "table-row";
            }
            else{
                ligne.style.display ="none";
            }
        });
    };

    /* fonction erreur searchbarre */
    function errorSearchForm(){
            if (!donneesDateVilleLieu(searchBarre.value)){
                document.getElementById("infoCherchee").textContent = `"${document.getElementById("searchBarre").value}"`;
                popUpError.showModal();
                popUpError.querySelector("input, select, textarea, button").focus();
            };
        };

    /*fonction d'attribution des valeurs Date/Ville/Lieu pour modales*/
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

    /*fonction de calcul de la somme à payer */
    function calculTotal(){
        const nbPlace = Number(document.getElementById("nbPlace").value);
        const PU = Number(document.getElementById("PU").textContent);
        let total = nbPlace * PU;
        document.getElementById("total").textContent = `${total}€`;
    };

    /* supprimer les div de suggestion */
    function clearSuggestion(){
        for(let i=suggestionContainer.children.length-1; i>=0; i--){
                suggestionContainer.removeChild(suggestionContainer.children[i]);
        };
    };

    /* remettre toutes les lignes du tableau */

    function cleanTableau(info){
        info.forEach(function(element){
            element.parentNode.style.display = "table-row";
        });
    };


/* Evènements */

    /* Clic bouton tableau */
    resaBtn.forEach(function(btn){
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
            popUpResa.showModal();
            popUpResa.querySelector("input, select, textarea, button").focus();        
        }); 
    });

    /* recalcul du total quand nbPlace change*/
    document.getElementById("nbPlace").addEventListener("input",calculTotal);
    
    /* fermer les modales sur les X */

    document.querySelectorAll(".closeModal").forEach(function(btn){
        btn.addEventListener("click",function(){
            btn.closest("dialog").close();
        });
    });

    /* fonction creation div */
    function creationDiv(champ){
        const div = document.createElement("div");
        div.textContent = champ;
        suggestionContainer.appendChild(div);
        div.setAttribute("tabindex",0)
        div.setAttribute("role","option")
    };

    /* fonction MEFTableau */
    function MEFTableau(){
        clearSuggestion();
        cleanTableau(villes);
        cleanTableau(dates);
        cleanTableau(lieux);
        filtreTableau();
    };

    /* fonction de match */
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
    
    /* on click suggestion */
    
    suggestionContainer.addEventListener("click",function(){
        searchBarre.value = suggestionContainer.textContent;
        MEFTableau();
        errorSearchForm();
    });
     

    /* Input searchBarre */
    searchBarre.addEventListener("input",function(){
        switch(searchBarre.value){
            case "" : clearSuggestion();
            cleanTableau(villes);
            break;
            default : clearSuggestion();  
            genererSuggestion()
        };
    }); 
    

    /* validation recherche */
    loupe.addEventListener("click",function(){
        MEFTableau();
        errorSearchForm();
    });

    searchForm.addEventListener("submit",function(event){
        event.preventDefault()
        MEFTableau();
        errorSearchForm();
    });


    /* ouverture popUpCommande */
    document.getElementById("mainForm").addEventListener("submit", function(event){
        document.getElementById("nbPlacesPopUp").textContent = document.getElementById("nbPlace").value
        document.getElementById("datePopUp").textContent = document.querySelector(".modalDate").textContent
        document.getElementById("villePopUp").textContent =  document.querySelector(".modalVille").textContent
        document.getElementById("totalPopUp").textContent =  document.getElementById("total").textContent
        setTimeout(function(){
            popUpCommande.showModal();
            popUpCommande.querySelector("input, select, textarea, button").focus();
        }, 1);
         event.preventDefault();
    });


    document.getElementById("mainForm").addEventListener("submit", function(event){
        document.getElementById("nbPlacesPopUp").textContent = document.getElementById("nbPlace").value
        document.getElementById("datePopUp").textContent = document.querySelector(".modalDate").textContent
        document.getElementById("villePopUp").textContent =  document.querySelector(".modalVille").textContent
        document.getElementById("totalPopUp").textContent =  document.getElementById("total").textContent
        setTimeout(function(){
            popUpCommande.showModal();
            popUpCommande.querySelector("input, select, textarea, button").focus();
        }, 1);
         event.preventDefault();
    });

    /* Clic retour vers popUpResa */
    document.getElementById("retour").addEventListener("click",function(){
        popUpCommande.close();
            setTimeout(function(){
        popUpResa.showModal();
        popUpResa.querySelector("input, select, textarea, button").focus();
        }, 1);
    });

    /* message de confirmation de commande */
    
    document.getElementById("validationCommande").addEventListener("click",function(){
        popUpCommande.close();
        document.getElementById("Usermail").textContent = document.getElementById("Mail").value;
        setTimeout(function(){
            popUpConfirmation.showModal();
            popUpConfirmation.querySelector("input, select, textarea, button").focus();
        }, 1);
    });
