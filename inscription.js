/* Permet d'afficher ou de cacher les mots de passe */
function showPassword(){
    let password = document.getElementById('password');
    if(password.type === "password"){
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function showPassword2(){
    let password = document.getElementById('password2');
    if(password.type === "password"){
        password.type = "text";
    } else {
        password.type = "password";
    }
}

    document.getElementById("inscription").addEventListener("submit", function(e){ /* Appel la fonction 'e' de type event */

    let error;

    let errorPassword;

    let email = document.getElementById("emailAddress");

    let capsCount = 0;

    let lowCount = 0;

    let numberCount = 0;

    let pseudo = document.getElementById("pseudo");
    
    let password = document.getElementById("password");

    let passW = password.value;

    let char="";

    let char2="";

    let isNumber = "0123456789";

    let password2 = document.getElementById("password2");

    let logs = [];

    logs = JSON.parse(localStorage.getItem("login")) || []; /* Stocke dans le tableau les strings de l'email, password et pseudo */

    for(let i = 0; i < passW.length; i++){
        char = passW[i];
        for(let k = 0; k < isNumber.length; k++){
            char2 = isNumber[k];
            if(char.toUpperCase() == char & char != char2){
                capsCount++;
            }
        }
         if(char.toLowerCase() == char){
             lowCount++;
         } for(let j = 0; j < isNumber.length; j++){
             char2 = isNumber[j];
             if(char2 == char){
                 numberCount++;
             }
         }   
    }

    if(capsCount > 0 & lowCount > 0 & numberCount > 0){ /* Vérifie si les champs requis sont remplis et correspondent */
        errorPassword = null;
    } else {
        errorPassword = "Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule et 1 chiffre.";
    }

    if(logs.includes(email.value)){
        error = "Cette email est déjà utilisé.";
    }

    if(!pseudo.value){
        error = "Veuillez renseignez un pseudo." 
    }
    
    if(password2.value != password.value){
        error = "Veuillez vérifiez que votre mot de passe est identique.";
    }

    if(!password2.value){
        error = "Veuillez vérifiez votre mot de passe.";
    }

    if(!password.value){
        error = "Veuillez renseigner un mot de passe.";
    }

    if(!email.value){
        error = "Veuillez renseiger un email.";
    }

    if(!email.value & !password.value){
        error = "Veuillez renseigner un email et un mot de passe.";
    }

    if(error){
        e.preventDefault() /* Préviens l'utilisateur que l'évènement n'a pas été pris en compte car tous 
        les champs n'ont pas étés remplies */
        
        document.getElementById("erreur").innerHTML = error;
        return false;
    } else if(!errorPassword){ /* Si il n'y a pas d'erreur lié au mot de passe, alors stocké les valeurs */
        logs.push(email.value);
        logs.push(password.value);
        logs.push(pseudo.value);
        localStorage.setItem("login", JSON.stringify(logs));
    }

    if(errorPassword){
        e.preventDefault()
        document.getElementById("erreurPassword").innerHTML = errorPassword;
        return false;
    }
})
