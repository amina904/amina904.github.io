/*
cette partie cest pour les attributs et les const(variables qui peuvent pas changer)
*/
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 25;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

/*
cette permets de générer les boutons du clavier
*/
//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

/**
 * * j'ai ajouté mes propres mots et mes indices aux tableaux aux variables const qui ne peuvent pas changer 
  */ 
const question = [
  "La catégorie choisie est celle des animaux",
  "La catégorie choisie est celle des films",
  "La catégorie choisie est celle des fruits et légumes"
];

const categories = [
  [
    "lion",
    "serpent",
    "chien",
    "panda",
    "ours",
    "elephant",
    "zebre"
  ],
  ["candy-man", "harry-potter", "black-panthere", "spider-man", "Ca", "la-petite-sirene"],

  ["Banane", "fraise", "carotte", "pomme", "citron"]
];

const hints = [
  [
    "rugis",
    "psss",
    "Meilleur ami",
    "doux",
    "aime les poissons",
    "gros",
    "raillure"
  ],
  [
    "Film d’horreur de science-fiction",
    "film pour les sorciers",
    "tigre noir" ,
    "Toile d'araignee",
    "Clown",
    "jeunesse"
  ],
  [
    "singe",
    "charlotte-?",
    "orange et grand",
    "blanche neige",
    "jaune acide"
  ]
];
/*
cette partie permets de définir la question, la réponse et l’indice
*/

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}
/*
cette partie construit un nouvel affichage du mot en remplancant chaque lettre par un "-"
*/
function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

/*
cette partie affiche un indice 
*/
function showHint() {
  containerHint.innerHTML = `indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);

/**
 * Définition de la condition initiale qui veut dire que les éléments dans ce code sont configurés pour commencer une nouvelle partie
 */
function init() {
  answer = "";
  hint = "";
 life = 25;
 
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu as ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

/**
 * Réinitialiser (rejouer)
 */

buttonReset.addEventListener("click", init);

/**
 * cette partie met a jour l'affichage du mot en cours verifie les vies et dit si le joueur a gagné ou perdu
 */
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `TU AS GAGNÉ!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `Tu as ${life} vies!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `Tu as ${life} vie!`;
      } else {
        livesDisplay.innerHTML = `FIN DU JEU!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `TU AS GAGNÉ!`;
      return;
    }
  }
}

container.addEventListener("click", guess);

/* 
cette partie cest pour l'affichage du Bonhomme
 */ 
function animate() {
  console.log(life);
  drawArray[life]();
  //console.log(drawArray[life]);
}
/*
cette partie permet de dessiner des formes et appliquer les styles

*/
/*
cette partie est appelé pour les dessins
*/
function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

/*
cette partie permet dafficher la tete du bonhomme

*/
function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function head2() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}
function frame10(){
  draw(0, 300, 300, 300);
}
function frame11(){
  draw(50, 10, 20, 20);
}
function frame12(){
  draw(60, 5, 60, 15);
}
function frame13(){
  draw(50, 10, 20, 20);
}
function frame14(){
  draw(50, 10, 20, 20);
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}
/**
 * sur cette partie jai ajouté des fonctions pour que le jeu ai plus de dessin du pendu
 */
var drawArray = [
  frame10,
  frame11,
  frame12,
  frame13,
  frame14,
  head2,
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
  
  
];

/**
 * quand le joueur appuie sur le bouton facile il a droit a 20 vies et s'il les epuises avant la fin du jeu il perd
 */
function appuieBouttonD(){
  //alert('le bouton est cliqué');
  life = 20;
  wordDisplay = [];
  winningCheck = "";
   context.clearRect(0, 0, 400, 400);
   canvas();
   containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu as ${life} vies!`;
  setAnswer();
   container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu as ${life} vies!`;
}
let bouton1 = document.getElementsByClassName('bouton1');

bouton.addEventListener('click', appuieBouttonD );

/**
 * quand le joueur appuie sur le bouton moyen il a droit a 20 vies et s'il les epuises avant la fin du jeu il perd
 */
function appuieBouttonI(){
  //alert("ca marche");
  answer = "";
  hint = "";
 life = 15;
 
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu as ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  
  
  
  
}
let bouton2 = document.getElementsByClassName('bouton2');
bouton.addEventListener('click', appuieBouttonI );

/**
 * quand le joueur appuie sur le bouton difficile il a droit a 10 vies et s'il les epuises avant la fin du jeu il perd
 */
function appuieBouttonA(){
  /* alert("cooool"); */
  answer = "";
  hint = "";
 life = 10;
 
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu as ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  
  
  }



let bouton3 = document.getElementsByClassName('bouton3');
bouton.addEventListener('click', appuieBouttonA );

