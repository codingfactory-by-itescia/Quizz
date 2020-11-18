fetch("Assets/quizz1.json")
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data);


    let question = document.getElementById("question"); // Je récupère l'emplacement de ma balise <p>
    question.innerHTML = data.quizz.fr.débutant[0].question; // Je mets dans cette balise p la question qui est dans mon tableau
    // Boucle For qui va boucler le nombre de fois que j'ai de truc dans mon tableau des réponses donc 4
    for(let i = 0; i < data.quizz.fr.débutant[0].propositions.length; i++){ 
        document.querySelector("#reponse"+ i).value = data.quizz.fr.débutant[0].propositions[i]; // a chaque tour de boucle j'affiche une réponse dans mes imputs
    }

  })
  .catch((response_code) => {
      console.log("ca marche pas :" + response_code);
    // Do something for an error here
  })
