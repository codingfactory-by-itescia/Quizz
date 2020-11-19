function showPassword(){
    let password = document.getElementById('password');
    if(password.type === "password"){
        password.type = "text";
    } else {
        password.type = "password";
    }
}

document.getElementById("connect").addEventListener("submit", function(e){

    let error;

    let email = document.getElementById("emailAddress");

    let password = document.getElementById("password");

    let pseudo = document.getElementById("pseudo");
    
    let logsCheck = JSON.parse(localStorage.getItem("login"));

    let passwordIndex = logsCheck.indexOf(email.value) + 1;

    let passwordCheck = logsCheck[passwordIndex];

    /* Vérifie si les identifiants correspondent à ceux enregistrées */
    if(logsCheck.includes(email.value) & (passwordCheck != password.value)){ 
        error = "Veuillez vérifier votre mot de passe.";
    } else if(!logsCheck.includes(email.value)){
        error = "Email inconnu."
    }

    if(!password.value){
        error = "Veuillez renseigner votre mot de passe.";
    }

    if(!email.value){
        error = "Veuillez renseigner votre email.";
    }

    if(!email.value & !password.value){
        error = "Veuillez renseigner un email et un mot de passe.";
    }

    if(error){
        e.preventDefault()
        document.getElementById("erreur").innerHTML = error;
        return false;
    }
})




 