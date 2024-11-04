const cards = [
    "🥝", "🥝", "🍕", "🍕", "🍟", "🍟",
    "🌭", "🌭", "🥐", "🥐", "🍊", "🍊",
    "🥟", "🥟", "🍇", "🍇"
  ];
  
  let firstCard = null;
  let secondCard = null;
  let lockboard = false;
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function createBoard() {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = ""; 
    shuffle(cards);
    cards.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.classList.add("card");
      cardEl.dataset.icon = card;
      cardEl.addEventListener("click", flipCard);
      gameBoard.appendChild(cardEl);
    });
  }
  
  function flipCard() {
    if (lockboard) return;
    if (this === firstCard) return;
  
    this.classList.add("flipped");
    this.textContent = this.dataset.icon;
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
    secondCard = this;
    checkForMatch();
  }
  
  function checkForMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
      disableCards();
    } else {
      unflipCards();
    }
  }
  
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }
  
  function unflipCards() {
    lockboard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";
      resetBoard();
    }, 1000);
  }
  
  function resetBoard() {
    [firstCard, secondCard, lockboard] = [null, null, false];
  }
  
  document.getElementById("reset-btn").addEventListener("click", createBoard);
  
  createBoard();
  