// Liste des langages de programmation
var programming_languages = [
  "python",
  "javascript",
  "mongodb",
  "json",
  "java",
  "html",
  "css",
  "c",
  "csharp",
  "golang",
  "kotlin",
  "php",
  "sql",
  "ruby",
  "swift",
  "typescript",
  "scala",
  "r",
  "rust",
  "perl",
  "haskell",
  "elixir",
  "clojure",
  "assembly",
  "bash",
  "fortran",
  "erlang",
  "dart",
  "lua",
  "matlab",
  "pascal",
  "prolog",
  "scheme",
  "visualbasic",
];

// Initialisation des variables du jeu
let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// Fonction pour choisir un mot aléatoire
function randomWord() {
  answer =
    programming_languages[
      Math.floor(Math.random() * programming_languages.length)
    ];
}

// Fonction pour générer les boutons du clavier
function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
      <button
        class="btn btn-matrix m-2"
        id='` +
        letter +
        `'
        onClick="handleGuess('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join("");

  document.getElementById("keyboard").innerHTML = buttonsHTML;
}

// Fonction pour gérer la lettre choisie par le joueur
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

// Fonction pour mettre à jour l'image du pendu
function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "./images/" + mistakes + ".jpg";
}

// Fonction pour vérifier si le joueur a gagné
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "Vous avez gagné !!!";
  }
}

// Fonction pour vérifier si le joueur a perdu
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById("wordSpotlight").innerHTML =
      "La réponse était : " + answer;
    document.getElementById("keyboard").innerHTML = "Vous avez perdu !!!";
  }
}

// Fonction pour afficher le mot avec les lettres devinées
function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

// Fonction pour mettre à jour le nombre d'erreurs
function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

// Fonction pour réinitialiser le jeu
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").src = "./images/0.jpg";

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
