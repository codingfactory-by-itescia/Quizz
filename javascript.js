function myFunction() { /* Change le fond en noir */
    let body = document.body;
    body.classList.toggle("dark-mode");
    let head = document.getElementById("nav");
    head.classList.toggle("darkHeader");
 }

 let changeCopyright = document.getElementById("copyrightDate");
 changeCopyright.addEventListener("click", changing)


 function changing(){ /* Change le texte au moment du click */
     if(changeCopyright.innerHTML == "Nous sommes une équipe dévouée de plagieur."){
        changeCopyright.innerHTML = "© Copyright 2020 QuopiQuizz & ClickHere Studios - Tous droits réservés."
    }else{
        changeCopyright.innerHTML = "Nous sommes une équipe dévouée de plagieur."
     }
 }


    


    



