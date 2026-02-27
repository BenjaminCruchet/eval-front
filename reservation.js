/* variables définies en absolu */

    /* modales */
    const modal = document.getElementById("modal1");
    
    /* tableaux villes */
    const villes = document.querySelectorAll(".ville");
    const tableauVilles = Array.from(villes, function(ville){
        return ville.textContent;
    });
    const tableauVillesUniques = tableauVilles.filter(function(ville,i,tableauVilles){
    return tableauVilles.indexOf(ville)===i;
    });

    /* tableaux dates */

    const dates = document.querySelectorAll(".date");
    const tableauDates = Array.from(dates, function(date){
        return date.textContent;
    });
    const tableauDatesUniques = tableauDates.filter(function(date,i,tableauDates){
    return tableauDates.indexOf(date)===i;
    });

    /* tableaux lieux */
    const lieux = document.querySelectorAll(".lieu");
    const tableauLieux = Array.from(lieux, function(lieu){
        return lieu.textContent;
    });

    /* bouton afficher modale */
    const modalBtn = document.querySelectorAll(".openModal");

    /* DOM : Alerte doublon + suggestions + barre de recherche */
    const warningDiv = document.getElementById("alertDoublon")
    const suggestionContainer = document.getElementById("suggestionContainer");
    const searchBarre = document.getElementById("searchBarre");

    /* Pop-up commande */
    const popUpCommande = document.getElementById("popUpCommande");

    /* pop-up confirmation */
    const popUpConfirmation = document.getElementById("popUpConfirmation")

/* Pool de fonction réutilisables */

        /*fonction d'attribution des valeurs Date/Ville/Lieu*/
        function donneesDateVilleLieu (champ){
            let found = false;
            for(let i=0; i<tableauVilles.length; i++){
                if (tableauVilles[i].toLowerCase() === champ.toLowerCase() && !found) {
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
                warningDiv.style.display = "none";
                }
                else if (tableauVilles[i].toLowerCase() === champ.toLowerCase() && found){  
                    warningDiv.style.display = "inline-block";
                };
            };      
            if (found){
                modal.showModal();
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


/* Evènements */

    /* Clic bouton tableau */
    modalBtn.forEach(function(btn){
        btn.addEventListener("click",function(){
            modal.showModal();
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
            modal.querySelector("input, select, textarea, button").focus();
        }); 
    });

    /* clic loupe */
    const loupeBtn = document.getElementById("loupe");
        loupeBtn.addEventListener("click", function(){
        if (donneesDateVilleLieu(searchBarre.value)===false){
            document.getElementById("villeCherchee").textContent = `"${document.getElementById("searchBarre").value}"`;
            document.getElementById("popUpError").showModal();
            modal.querySelector("input, select, textarea, button").focus();
        };
    });   

    /* recalcul du total quand nbPlace change*/
    document.getElementById("nbPlace").addEventListener("input",calculTotal);
    
    /* fermer les modales sur les X */

    document.querySelectorAll(".closeModal").forEach(function(btn){
        btn.addEventListener("click",function(){
            btn.closest("dialog").close();
        });
    });

    /* Input searchBarre */
    searchBarre.addEventListener("input",function(){
        switch(searchBarre.value){
            case "" : clearSuggestion();  
            break;
            default : clearSuggestion();
                const inputText = searchBarre.value.toLowerCase();
                const match = tableauVillesUniques.filter(function(ville){
                    return ville.toLowerCase().startsWith(inputText);
                });
                match.forEach(function(ville, index){
                    const div = document.createElement("div");
                    div.textContent = ville;
                    div.setAttribute("tabindex",0)
                    div.setAttribute("role","option")
                    div.addEventListener("click",function(){
                        searchBarre.value = ville;
                        clearSuggestion();
                        donneesDateVilleLieu(ville);        
                    });
                    suggestionContainer.appendChild(div);
                });
        };
    });

    /* ouverture PopUpCommande */
    document.getElementById("mainForm").addEventListener("submit", function(event){
        document.getElementById("nbPlacesPopUp").textContent = document.getElementById("nbPlace").value
        document.getElementById("datePopUp").textContent = document.querySelector(".modalDate").textContent
        document.getElementById("villePopUp").textContent =  document.querySelector(".modalVille").textContent
        document.getElementById("totalPopUp").textContent =  document.getElementById("total").textContent
        setTimeout(function(){
            popUpCommande.showModal();
            modal.querySelector("input, select, textarea, button").focus();
        }, 1);
         event.preventDefault();
    });

    /* Clic retour vers modal1 */
    document.getElementById("retour").addEventListener("click",function(){
        popUpCommande.close();
            setTimeout(function(){
        modal.showModal();
        modal.querySelector("input, select, textarea, button").focus();
        }, 1);
    });

    /* message de confirmation de commande */
    
    document.getElementById("validationCommande").addEventListener("click",function(){
        popUpCommande.close();
        document.getElementById("Usermail").textContent = document.getElementById("mail").value;
        setTimeout(function(){
            popUpConfirmation.showModal();
            modal.querySelector("input, select, textarea, button").focus();
        }, 1);
    });
