let userScore = parseInt(localStorage.getItem("User Score")) || 0;
let computerScore = parseInt(localStorage.getItem("Computer Score")) || 0;
const computerPoints = document.querySelector(".computer-points");
const humanPoints = document.querySelector(".human-points");
const gameRulesPopUp = document.querySelector(".game-rules");
const ruleButton = document.querySelector(".rules button");
const nextButton = document.querySelector(".rules .next");
const closeButton = document.querySelector(".close-button");
const rockEle = document.querySelector(".rock-img img");
const paperEle = document.querySelector(".paper-img img");
const scissorsEle = document.querySelector(".scissors-img img");
const choices = document.querySelectorAll(".choice");
const images = document.querySelector(".images");
const playButton = document.createElement("button");
playButton.textContent = "Play Again";
playButton.classList.add("play-button");
playButton.addEventListener("click", resetGame);

const options = ["rock", "paper", "scissors"];
let mainImageHidden = false;

if (
  localStorage.getItem("Computer Score") === null &&
  localStorage.getItem("User Score") === null
) {
  computerPoints.textContent = 0;
  humanPoints.textContent = 0;
} else {
  computerPoints.textContent = localStorage.getItem("Computer Score");
  humanPoints.textContent = localStorage.getItem("User Score");
}

ruleButton.addEventListener("click", () => {
  gameRulesPopUp.classList.toggle("active");
});
closeButton.addEventListener("click", () => {
  gameRulesPopUp.classList.toggle("active");
});

choices.forEach((choice) => {
  choice.addEventListener("click", playRound);
});
function playRound() {
    const computerChoice = getComputerChoice();
    const humanChoice = this.dataset.choice;
    const roundResult = getRoundResult(humanChoice, computerChoice);
    updateScore(roundResult);
    if (userScore > computerScore) {
        nextButton.style.display = "block";
      } else {
        nextButton.style.display = "none";
      }
      if (roundResult === "Tie up") {
        playButton.textContent = "Reset";
      } else {
        playButton.textContent = "Play Again";
      }
    displayChoicesWithResults(humanChoice, computerChoice);
    toggleMainImageVisibility();
    images.insertAdjacentElement("afterend", playButton);
  
    displayResultText(roundResult);
  }
  
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return options[randomIndex];
}

function getRoundResult(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "Tie up";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    return "You Won against PC";
  } else {
    return "You Lost Against PC";
  }
}
function updateScore(roundResult) {
    if (roundResult === "You Won against PC") {
      userScore++;
      localStorage.setItem("User Score", userScore);
      humanPoints.textContent = localStorage.getItem("User Score");
      computerPoints.textContent = localStorage.getItem("Computer Score");
    } else if (roundResult === "You Lost Against PC") {
      computerScore++;
      localStorage.setItem("Computer Score", computerScore);
      humanPoints.textContent = localStorage.getItem("User Score");
      computerPoints.textContent = localStorage.getItem("Computer Score");
    }
  }
  
function displayTieImages(humanChoice, computerChoice) {
  const tieImagesContainer = document.querySelector(".tie-images-container");
  const tieImages = tieImagesContainer.querySelectorAll(".tie-image");
  tieImages.forEach((image) => image.remove());

  const humanImage = document.createElement("img");
  humanImage.src = `./images/${humanChoice}.png`;
  humanImage.classList.add("tie-image");

  const computerImage = document.createElement("img");
  computerImage.src = `./images/${computerChoice}.png`;
  computerImage.classList.add("tie-image");

  tieImagesContainer.appendChild(humanImage);
  tieImagesContainer.appendChild(computerImage);
}

function displayChoicesWithResults(humanChoice, computerChoice) {
  removeResults();

  const container = document.querySelector(".container");
  container.classList.add("result-container");

  const humanImage = document.createElement("img");
  humanImage.src = `./images/${humanChoice}.png`;
  humanImage.classList.add("result-image", "human-image", "left-image");

  const computerImage = document.createElement("img");
  computerImage.src = `./images/${computerChoice}.png`;
  computerImage.classList.add("result-image", "computer-image", "right-image");

  const humanChoiceText = document.createElement("p");
  humanChoiceText.textContent = `YOU PICKED`;
  humanChoiceText.classList.add(
    "choice-text",
    "human-choice-text",
    "left-text"
  );

  const computerChoiceText = document.createElement("p");
  computerChoiceText.textContent = `PC PICKED`;
  computerChoiceText.classList.add(
    "choice-text",
    "computer-choice-text",
    "right-text"
  );

  container.appendChild(humanImage);
  container.appendChild(humanChoiceText);
  container.appendChild(computerImage);
  container.appendChild(computerChoiceText);
}
function removeImages() {
  const container = document.querySelector(".container");
  const imagesToRemove = container.querySelectorAll("img");
  imagesToRemove.forEach((img) => img.remove());
  container.classList.remove("result-container");
}

function removeResults() {
  const container = document.querySelector(".container");
  const resultImages = container.querySelectorAll(".result-image");
  const resultText = container.querySelector(".result-text");
  if (resultImages.length > 0) {
    resultImages.forEach((img) => img.remove());
  }
  if (resultText) {
    resultText.remove();
  }
}
function resetGame() {
  toggleMainImageVisibility();
  const container = document.querySelector(".container");
  const resultImages = container.querySelectorAll(".result-image");
  const resultText = container.querySelector(".result-text");
  const humanChoiceText = container.querySelector(".human-choice-text");
  const computerChoiceText = container.querySelector(".computer-choice-text");

  if (resultImages.length > 0) {
    resultImages.forEach((img) => img.remove());
  }

  if (resultText) {
    resultText.remove();
  }
  if (humanChoiceText) {
    humanChoiceText.remove();
  }

  if (computerChoiceText) {
    computerChoiceText.remove();
  }

  if (images.contains(playButton)) {
    images.removeChild(playButton);
  }
}
function toggleMainImageVisibility() {
  mainImageHidden = !mainImageHidden;
  if (mainImageHidden) {
    images.style.display = "none";
    playButton.style.display = "flex";
  } else {
    images.style.display = "flex";
    playButton.style.display = "none";
  }
}
function displayResultText(result) {
    const container = document.querySelector(".container");
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
  
    const resultText = document.createElement("p");
    resultText.textContent = result;
    resultText.classList.add("result-text");
  
    resultContainer.appendChild(resultText);
    container.appendChild(resultContainer);
  }
  const styles = `
  .container {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .tie-image {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }
  
  .result-container {
    flex-direction: row;
    justify-content: center;
  }
  
  .right-image {
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    transform: translateX(200%);
    right: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: white;
    border-radius: 100%;
    height: 100px;
    cursor: pointer;
    width: 100px;
    border: 10px solid blue;
  }
  
  .right-text {
    transform: translate(340%, -500%);
    color: white;
  }
  
  .left-text {
    transform: translate(-300%, -500%);
    color: white;
  }
  
  .left-image {
    flex-direction: row;
    justify-content: flex-start;
    position: absolute;
    transform: translateX(-200%);
    left: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: white;
    border-radius: 100%;
    height: 100px;
    cursor: pointer;
    width: 100px;
    border: 10px solid blue;
  }
  
  .next-button {
    margin-left: 10px;
    background-color: #4caf50;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .next-button:hover {
    background-color: #45a049;
  }
  
  .play-button {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 20px 40px;
    background-color: white;
    color: black;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    justify-content: center;
  }
  .winning-choice {
    background-color: green;
  }
  .result-text {
    display:flex;
    text-align:center;
    justify-content:center;
    align-items:center;
    position:absolute;
    top: 30%;
left:30%;
    font-size:16px;
    transform: translateY(-30%);
    color:white;
  }
  
  .play-button:hover {
    background-color: #45a049;
  }
  
  @media screen and (max-width: 752px) {
    .container {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .right-image {
      position: absolute;
      transform: none;
      right: 10;
      margin-top: 10px;
      margin-bottom: 10px;
      width: 100px;
      height: 100px;
      border: 5px solid blue;
    }
    .left-image {
      position: absolute;
      transform: none;
      left: 10;
      margin-top: 10px;
      margin-bottom: 10px;
      width: 100px;
      height: 100px;
      border: 5px solid blue;
    }
    .right-text {
      transform: translate(100%, -500%);
      color: white;
    }
    .left-text {
      transform: translate(-100%, -500%);
      color: white;
    }
    .result-text {
      display:flex;
      text-align:center;
      justify-content:center;
      align-items:center;
      position:absolute;
      top: 30%;
  left:30%;
      font-size:12px;
      transform: translateY(-30%);
      color:white;
    }
    .play-button {
      margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      padding: 15px 30px;
      background-color: white;
      color: black;
      font-size: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      justify-content: center;
    }
  }
`
  

const styleElement = document.createElement("style");
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);
