let queryString = window.location.search;

let urlParams = new URLSearchParams(queryString);

let numQuizz = urlParams.get('sujet');




fetch("Assets/quizz/quizz" + numQuizz + ".json")
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    let bonneReponse;
    let indexTableau;
    let nummeroQuestionActuel; 
    let nombreDeQuestionMax = 10;
    let affichageDivQuizz = document.getElementById('quizz');
    let affichageDivReponseAnecdote = document.getElementById("reponseAnecdote");
    let affichageDivDifficulté = document.getElementById('difficulté');
    let question = document.getElementById("question"); // Je récupère l'emplacement de ma balise <p>
    let questionActuel = document.getElementById("numeroQuestion");
    let questionReponse = document.getElementById('questionReponse');
    let affichageReponse = document.getElementById("reponse");
    let affichageAnecdote = document.getElementById("anecdote");
    let btnSuivant = document.getElementById("suivant");
    let divScoreFinal = document.getElementById('scoreFinal');
    let votreScore = document.getElementById('votreScore');
    let difficulté;
    let tempsCompteur = 45;
    let compteur = tempsCompteur;
    let x ;

   
    let questionArray = [0,1,2,3,4,5,6,7,8,9]

function decompte(s){

    if(compteur>=0)
    {
        if(compteur>1)
        {
            var sec = " secondes";
        } else {
            var sec = " seconde";
        }
        document.getElementById("crono").innerHTML = "Temps restant : " + compteur + sec ;
        compteur-- ;
       x = setTimeout(decompte,1000) ;
    }
    else
    {
    clearTimeout(x) ;
    FonctionMauvaiseReponse();
    let mauvaiseReponse = document.getElementById('rouge');
    mauvaiseReponse.innerHTML = 'Temps écoulé !';
    }
}
function stopDecompte(){
    clearTimeout(x);
    document.getElementById("crono").innerHTML = "";
    compteur = tempsCompteur;
}

function affichageDifficulté(){
    affichageDivDifficulté.style.display = "block";
    affichageDivQuizz.style.display = "none";
    affichageDivReponseAnecdote.style.display = "none";
    btnDébutant.addEventListener('click',btn1);
    btnConfirmé.addEventListener('click',btn2);
    btnExpert.addEventListener('click',btn3);
    function btn1() {
        difficulté = "débutant";
        affichage();
    }
    function btn2() {
        difficulté = "confirmé";
        affichage();
    }
    function btn3() {
        difficulté = "expert";
        affichage();
    }
}
    
  function affichage(){ // fonction pour afficher la première question
    
      decompte(); 
      nummeroQuestionActuel = 1;
      affichageDivQuizz.style.display = "block";
      affichageDivReponseAnecdote.style.display = "none";
      affichageDivDifficulté.style.display = "none";
      bonneReponse = 0; // variable pour récuperer les bonnes réponses 
      var num = Math.floor(Math.random() * Math.floor(questionArray.length));
      var roll = questionArray.splice(num, 1);
      indexTableau = roll[ 0 ];
      questionActuel.innerHTML = "Question " + nummeroQuestionActuel + " / " + nombreDeQuestionMax;
      question.innerHTML = data.quizz.fr[difficulté][indexTableau].question// Je mets dans cette balise p la question qui est dans mon tableau
      // Boucle For qui va boucler le nombre de fois que j'ai de truc dans mon tableau des réponses donc 4
      for(let y = 0; y < data.quizz.fr[difficulté][indexTableau].propositions.length; y++){ 
          document.getElementById("reponse"+ y).value =  data.quizz.fr[difficulté][indexTableau].propositions[y]; // a chaque tour de boucle j'affiche une réponse dans mes imputs
      }
  }

function affichageSuivant(){ // function pour afficher la prochaine question
    decompte();
    nummeroQuestionActuel++;
    affichageDivQuizz.style.display = "block"; // Affiche la Div Quizz
    affichageDivReponseAnecdote.style.display = "none"; // Cache la Div Réponse
    var num = Math.floor(Math.random() * Math.floor(questionArray.length));
    var roll = questionArray.splice(num, 1);
    indexTableau = roll[ 0 ];
    if(nummeroQuestionActuel <= nombreDeQuestionMax){
        questionActuel.innerHTML = "Question " + nummeroQuestionActuel + " / " + nombreDeQuestionMax;
        question.innerHTML = data.quizz.fr[difficulté][indexTableau].question // Je mets dans cette balise p la question qui est dans mon tableau
        // Boucle For qui va boucler le nombre de fois que j'ai de truc dans mon tableau des réponses donc 4
        for(let y = 0; y < data.quizz.fr[difficulté][indexTableau].propositions.length; y++){ 
            document.getElementById("reponse"+ y).value = data.quizz.fr[difficulté][indexTableau].propositions[y]; // a chaque tour de boucle j'affiche une réponse dans mes imputs
        }
    }
    
  }
  function finDuQuizz(){  // Fonction de fin de quizz
    stopDecompte();
    affichageDivReponseAnecdote.style.display = "none";
    affichageDivQuizz.style.display = "none";
    divScoreFinal.style.display = "flex";
    votreScore.innerHTML = bonneReponse + " / " + nombreDeQuestionMax;
  }
  affichageDifficulté();

  function FonctionBonneReponse(){ // Fonction Bonne réponse 
    stopDecompte();
    affichageDivQuizz.style.display = "none"; // Cache div Quizz
    affichageDivReponseAnecdote.style.display = "flex"; // Affiche div réponses
    questionReponse.innerHTML = data.quizz.fr[difficulté][indexTableau].question
    affichageReponse.innerHTML = "<span class='vert'>Bonne réponse !</span> La bonne réponse était bien "+data.quizz.fr[difficulté][indexTableau].réponse;
    affichageAnecdote.innerHTML = "Anecdote: " + data.quizz.fr[difficulté][indexTableau].anecdote;
    bonneReponse++;
    btnSuivant.innerHTML = "Continuer";
    if(nummeroQuestionActuel < nombreDeQuestionMax){ // Si la question actuelle est inférieur au nombre de question max 
        btnSuivant.addEventListener("click", affichageSuivant); // Question suivante
    }
    else{
        btnSuivant.addEventListener("click", finDuQuizz); // Sinon Fin de Quizz
    }
}

function FonctionMauvaiseReponse(){
    stopDecompte();
    affichageDivQuizz.style.display = "none"; // Cache div Quizz
    affichageDivReponseAnecdote.style.display = "flex"; // Affiche div réponses
    questionReponse.innerHTML = data.quizz.fr[difficulté][indexTableau].question
    affichageReponse.innerHTML = "<span class='rouge' id='rouge'>Mauvaise réponse !</span> La bonne réponse était "+data.quizz.fr[difficulté][indexTableau].réponse;
    affichageAnecdote.innerHTML = "Anecdote: " + data.quizz.fr[difficulté][indexTableau].anecdote;
    btnSuivant.innerHTML = "Continuer";
    if(nummeroQuestionActuel < nombreDeQuestionMax){
        btnSuivant.addEventListener("click", affichageSuivant); // Si la question actuelle est inférieur au nombre de question max 
    }
    else{
        btnSuivant.addEventListener("click", finDuQuizz); // Sinon Fin de Quizz
    }
}


// Réponse 1 
let input1 = document.getElementById('reponse0');
input1.addEventListener('click',button1)
function button1(){
    let reponse1 = document.getElementById('reponse0').value;
    if(reponse1 == data.quizz.fr[difficulté][indexTableau].réponse){  
        FonctionBonneReponse();      
    }
    else{
        FonctionMauvaiseReponse(); 
    }
}

// Réponse 2 
let input2 = document.getElementById('reponse1');
input2.addEventListener('click',button2)
function button2(){
    let reponse2 = document.getElementById('reponse1').value;
    if(reponse2 == data.quizz.fr[difficulté][indexTableau].réponse){  
        FonctionBonneReponse();      
    }
    else{
        FonctionMauvaiseReponse(); 
    }

}

// Réponse 3
let input3 = document.getElementById('reponse2');
input3.addEventListener('click',button3)
function button3(){
    let reponse3 = document.getElementById('reponse2').value;
    if(reponse3 == data.quizz.fr[difficulté][indexTableau].réponse){  
        FonctionBonneReponse();      
    }
    else{
        FonctionMauvaiseReponse(); 
    }   
}

// Réponse 4 
let input4 = document.getElementById('reponse3');
input4.addEventListener('click',button4)
function button4(){
    let reponse4 = document.getElementById('reponse3').value;
    if(reponse4 == data.quizz.fr[difficulté][indexTableau].réponse){  
        FonctionBonneReponse();      
    }
    else{
        FonctionMauvaiseReponse(); 
    }       
}

  })
  .catch((response_code) => {
      console.log("ca marche pas :" + response_code);
    // Do something for an error here
})




  