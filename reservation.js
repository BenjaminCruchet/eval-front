/* définir la modale + définir les boutons + ouvrir la modale on click 
        + donner les valeurs a date/ville/lieu*/

    const modal = document.getElementById("modal1");
    const modalBtn = document.querySelectorAll(".openModal");
    modalBtn.forEach(function(btn){
        btn.addEventListener("click",function(){
        modal.showModal();
        calculTotal();
        const date = btn.closest("tr").querySelector(".date").textContent;
            document.getElementById("modalDate").textContent = `${date}`;
            document.getElementById("datePopUp").textContent = `${date}`;
        const ville = btn.closest("tr").querySelector(".ville").textContent;
            document.getElementById("modalVille").textContent = `${ville}`;
            document.getElementById("villePopUp").textContent = `${ville}`;
        const lieu = btn.closest("tr").querySelector(".lieu").textContent;
            document.getElementById("modalLieu").textContent = `${lieu}`;
        warningDiv.style.display = "none";
        }); 
    });

/*calculer total (une partie est dans l'event.Listener des boutons*/

    function calculTotal(){
        const nbPlace = Number(document.getElementById("nbPlace").value);
        const PU = Number(document.getElementById("PU").textContent);
        let total = nbPlace * PU;
        document.getElementById("total").textContent = `${total}€`;
        document.getElementById("totalPopUp").textContent = `${total}€`;
    };

    document.getElementById("nbPlace").addEventListener("input",calculTotal);
    document.getElementById("nbPlacesPopUp").textContent = document.getElementById("nbPlace").value;

/* fermer la fenètre */

    document.querySelectorAll(".closeModal").forEach(function(btn){
        btn.addEventListener("click",function(){
        btn.closest("dialog").close();
        });
    });


/*récupérer les éléments dans un tableau*/

    /*villes*/
    const villes = document.querySelectorAll(".ville");
    const tableauVilles = Array.from(villes, function(ville){
        return ville.textContent;
    });
    const tableauVillesUniques = tableauVilles.filter(function(ville,i,tableauVilles){
    return tableauVilles.indexOf(ville)===i;
    });

    /*dates*/
    const dates = document.querySelectorAll(".date");
    const tableauDates = Array.from(dates, function(date){
        return date.textContent;
    });
    const tableauDatesUniques = tableauDates.filter(function(date,i,tableauDates){
    return tableauDates.indexOf(date)===i;
    });

    /*lieux*/
    const lieux = document.querySelectorAll(".lieu");
    const tableauLieux = Array.from(lieux, function(lieu){
        return lieu.textContent;
    });

/*Autocompléter la barre*/
    const warningDiv = document.getElementById("alertDoublon")
    const suggestionContainer = document.getElementById("suggestion");
    const searchBarre = document.getElementById("searchBarre");
    function clearSuggestion(){
            for(let i=suggestionContainer.children.length-1; i>=0; i--){
                    suggestionContainer.removeChild(suggestionContainer.children[i]);
            };
        };
    searchBarre.addEventListener("input",function(){
        switch(searchBarre.value){
            case "" : clearSuggestion();  
            break;
            default : clearSuggestion();
                const inputText = searchBarre.value.toLowerCase();
                const match = tableauVillesUniques.filter(function(ville){
                    return ville.toLowerCase().startsWith(inputText);
                });
                match.forEach(function(ville){
                    const div = document.createElement("div");
                    div.textContent = ville;
                    suggestionContainer.appendChild(div); 
                    div.addEventListener("click",function(){
                        searchBarre.value = ville;
                        clearSuggestion();
                        let found = false;
                        for(let i=0; i<tableauVilles.length; i++){
                            if (tableauVilles[i].toLowerCase() === ville.toLowerCase() && !found){
                                document.getElementById("modalDate").textContent = tableauDates[i];
                                document.getElementById("modalVille").textContent = tableauVilles[i];
                                document.getElementById("modalLieu").textContent = tableauLieux[i];
                                found = true;
                                warningDiv.style.display = "none";
                            }
                            else if (tableauVilles[i].toLowerCase() === ville.toLowerCase() && found){  
                                warningDiv.style.display = "inline-block";
                            };
                        };
                        modal.showModal(); 
                    });   
                });
        };
    });

/* pop-up confirmation de commande */
    const popUpCommande = document.getElementById("popUpCommande");
    document.querySelector(".submitForm").addEventListener("submit", function(event){
        setTimeout(function(){
        popUpCommande.showModal();
        }, 5);
         event.preventDefault();
    });

/* Go back to first modale */
    document.getElementById("retour").addEventListener("click",function(){
        popUpCommande.close();
            setTimeout(function(){
        modal.showModal();
        }, 1);
    });

/* message de confirmation de commande */
    const popUpConfirmation = document.getElementById("popUpConfirmation")
    document.getElementById("validationCommande").addEventListener("click",function(){
        popUpCommande.close();
        document.getElementById("Usermail").textContent = document.getElementById("mail").value;
        setTimeout(function(){
            popUpConfirmation.showModal();
        }, 1);
    });

/* clic sur loupe*/
    const loupeBtn = document.getElementById("loupe");
    loupeBtn.addEventListener("click",function(){

        const inputText = searchBarre.value.toLowerCase();
        let found = false;
        for(let i=0; i<tableauVilles.length; i++){
        if (tableauVilles[i].toLowerCase() === inputText && !found) {
            document.getElementById("modalVille").textContent = tableauVilles[i];
            document.getElementById("modalDate").textContent = tableauDates[i];
            document.getElementById("modalLieu").textContent = tableauLieux[i];
            found = true;
            warningDiv.style.display = "none";
        }
        else if (tableauVilles[i].toLowerCase() === inputText && found){  
            warningDiv.style.display = "inline-block";
        };
        };
        modal.showModal();
    });
   
    