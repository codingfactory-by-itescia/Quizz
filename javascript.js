function myFunction() {
    let element = document.body;
    element.classList.toggle("dark-mode");
 }

 let changeCopyright = document.getElementById("copyrightDate");
 changeCopyright.addEventListener("click", changing)

 function changing(){
     if(changeCopyright.innerHTML == "Nous sommes une équipe dévouée de plagieur."){
        changeCopyright.innerHTML = "© Copyright 2020 QuopiQuizz & ClickHere Studios - Tous droits réservés."
    }else{
        changeCopyright.innerHTML = "Nous sommes une équipe dévouée de plagieur."
     }
 }