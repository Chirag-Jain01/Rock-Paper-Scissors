const gameRulesPopUp = document.querySelector(".game-rules");
const ruleButton = document.querySelector(".rules button");
const nextButton = document.querySelector(".rules .next");
const closeButton = document.querySelector(".close-button");

ruleButton.addEventListener("click", () => {
    gameRulesPopUp.classList.toggle("active");
  });
  closeButton.addEventListener("click", () => {
    gameRulesPopUp.classList.toggle("active");
  });