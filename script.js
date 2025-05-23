// Game variables
const boardSize = 48; // Double the board size
const cellsPerRow = 8; // Increased cells per row
let player1Position = 0;
let player2Position = 0;
let currentPlayer = 1;
let playerWinnerId = '';
const diceResultElement = document.getElementById('diceResult');
const turnElement = document.getElementById('turn');
const boardElement = document.getElementById('board');
const achievementsElement = document.getElementById('achievements');

// Audio elements
const backgroundMusic = document.getElementById('backgroundMusic')
const diceRollSound = new Audio('sound1.wav');
const winSound = document.getElementById('winSound');

// Trophy system
const achievements = [];
function unlockAchievement(message) {
  if (!achievements.includes(message)) {
    achievements.push(message);
    const achievement = document.createElement('div');
    achievement.classList.add('achievement');
    achievement.textContent = ` ${achievements.length}. ${message}`;
    achievementsElement.appendChild(achievement);
    setTimeout(() => achievement.remove(), 5000);
  }
}

// Rename Modal Elements
const renameModal = document.getElementById("renameModal");
const player1NameInput = document.getElementById("player1Name");
const player2NameInput = document.getElementById("player2Name");
const saveNamesButton = document.getElementById("saveNames");

let player1Name = "Player 1";
let player2Name = "Player 2";

const downloadCertificateBtn = document.getElementById("downloadCertificateBtn");
const image = document.getElementById('templateImage');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Event listener for opening the "download certificate" modal
downloadCertificateBtn.addEventListener("click", () => {	
  generatePDF();	
});

function generatePDF() {
  const name = document.getElementById(playerWinnerId).value;

  // Make sure image is loaded before drawing
  if (!image.complete) {
	image.onload = () => drawAndExport(name);
  } else {
	drawAndExport(name);
  }
}

function drawAndExport(name) {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  // Draw the name text centered (adjust positioning as needed)
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(name, canvas.width / 2, 400);

  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
	orientation: 'landscape',
	unit: 'px',
	format: [canvas.width, canvas.height]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('custom-image.pdf');
}

// How to Play Modal Elements
const howToPlayBtn = document.getElementById("howToPlayBtn");
const howToPlayModal = document.getElementById("howToPlayModal");

// Event listener for opening the "How to Play" modal
howToPlayBtn.addEventListener("click", () => {
    howToPlayModal.style.display = "block";
});

// Event listener for closing the "How to Play" modal
const howToPlayCloseBtn = howToPlayModal.querySelector(".close");
howToPlayCloseBtn.addEventListener("click", () => {
    howToPlayModal.style.display = "none";
});

// Event listener for closing the modal
const renameCloseBtn = renameModal.querySelector(".close");
renameCloseBtn.addEventListener("click", () => {
    renameModal.style.display = "none";
});



// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target == renameModal) {
        renameModal.style.display = "none";
    }
    if (event.target == howToPlayModal) {
        howToPlayModal.style.display = "none";
    }
});

// Character Selection Modals
const characterModal1 = document.getElementById("characterModal1");
const characterModal2 = document.getElementById("characterModal2");
let player1Character = null;
let player2Character = null;

// Trivia Modal Elements
const triviaModal = document.getElementById("triviaModal");
const triviaQuestion = document.getElementById("triviaQuestion");
const answerButtons = document.querySelectorAll(".answer-button");
const triviaResult = document.getElementById("triviaResult");
let correctAnswer = null; // To store the correct answer

// Score Variables
let player1Score = 0;
let player2Score = 0;

// Function to display scores
function updateScoreDisplay() {
    document.getElementById('player1Score').textContent = `Score: ${player1Score}`;
    document.getElementById('player2Score').textContent = `Score: ${player2Score}`;
}

// Function to update player name displays in scores
function updatePlayerNameDisplay() {
    document.getElementById('player1NameDisplay').textContent = player1Name;
    document.getElementById('player2NameDisplay').textContent = player2Name;
}

// Trivia Questions (Array of Objects)
const triviaQuestions = [
        {
            question: "Can your body remember some taste experiences?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Do we always forget what food tastes like?",
            answers: ["Yes", "No"],
            correctAnswer: "No"
        },
        {
            question: "Which of these is true?",
            answers: ["Our body remembers some tastes", "Our body forgets all tastes"],
            correctAnswer: "Our body remembers some tastes"
        },
        {
            question: "Do frozen foods hold more or less nutrients than fresh foods?",
            answers: ["More", "Less", "Both hold the same"],
            correctAnswer: "Both hold the same"
        },
        {
            question: "Are Fresh Foods more nutritious than frozen foods?",
            answers: ["Yes", "No"],
            correctAnswer: "No"
        },
        {
            question: "Is cottage cheese a good source of protein?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What nutrients are in cottage cheese?",
            answers: ["Protein", "Calcium", "Amino Acids", "All of the above"],
            correctAnswer: "All of the above"
        },
        {
            question: "Which food has protein and calcium?",
            answers: ["Candy", "Cottage Cheese", "Soda"],
            correctAnswer: "Cottage Cheese"
        },
        {
            question: "Are strawberries and raspberries good for your body?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Which of the following can help fight cancer?",
            answers: ["Strawberries and Raspberries", "Chocolate Chips", "Marshmallows"],
            correctAnswer: "Strawberries and Raspberries"
        },
        {
            question: "What makes strawberries and raspberries healthy?",
            answers: ["Antioxidants", "Sugar", "Food coloring"],
            correctAnswer: "Antioxidants"
        },
        {
            question: "Are baked potatoes high or low in calories?",
            answers: ["High", "Low"],
            correctAnswer: "Low"
        },
        {
            question: "Which food is good at absorbing simple sugars?",
            answers: ["Baked Potatoes", "Ice Cream", "Soda"],
            correctAnswer: "Baked Potatoes"
        },
        {
            question: "Are baked potatoes healthy?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },        
        {
            question: "How many chambers do tomatoes have?",
            answers: ["2", "4", "6"],
            correctAnswer: "4"
        },
        {
            question: "Which fruit has a similar number of chambers (4) like a heart inside?",
            answers: ["Apple", "Tomato", "Banana"],
            correctAnswer: "Tomato"
        },
        {
            question: "Do tomatoes have the same number of chambers as the heart?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What is important for cancer patients to eat?",
            answers: ["Candy", "Protein", "Soda"],
            correctAnswer: "Protein"
        },
        {
            question: "Is protein good for people with cancer?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Which apple has the most antioxidants?",
            answers: ["Green Apple", "Gala Apple", "Red Delicious"],
            correctAnswer: "Red Delicious"
        },
        {
            question: "Are apples healthy?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Which is the healthiest apple?",
            answers: ["Red Delicious", "Candy Apple", "Caramel Apple"],
            correctAnswer: "Red Delicious"
        },
        {
            question: "What keeps guacamole from turning brown?",
            answers: ["Water", "Oil", "Sugar"],
            correctAnswer: "Water"
        },
        {
            question: "What should you put on guacamole to keep it green?",
            answers: ["Water", "Sugar"],
            correctAnswer: "Water"
        },
        {
            question: "Is plant-based milk healthy for adults?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Which is better for adults?",
            answers: ["Plant-based milk", "Soda", "Apple juice"],
            correctAnswer: "Plant-based milk"
        },
        {
            question: "What does 'from concentrate' mean?",
            answers: ["No sugar", "Added sugar"],
            correctAnswer: "Added sugar"
        },
        {
            question: "Is a drink that is 'from concentrate' better or worse than 'No concentrate'?",
            answers: ["Better", "Worse"],
            correctAnswer: "Worse"
        },
        {
            question: "What does chicken have that fights inflammation?",
            answers: ["Glucosamine", "Salt", "Butter"],
            correctAnswer: "Glucosamine"
        },
        {
            question: "Is glucosamine found in chicken?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What is the most eaten fish in America?",
            answers: ["Tuna", "Salmon", "Cod"],
            correctAnswer: "Salmon"
        },
        {
            question: "Do people eat a lot of salmon in America?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What happens if you cook food too fast?",
            answers: ["It dries out", "It tastes better"],
            correctAnswer: "It dries out"
        },
        {
            question: "Should you slowly cook food or heat it fast?",
            answers: ["Slowly", "Fast"],
            correctAnswer: "Slowly"
        },
        {
            question: "What juice helps you sleep?",
            answers: ["Apple Juice", "Dark Cherry Juice", "Orange Juice"],
            correctAnswer: "Dark Cherry Juice"
        },
        {
            question: "Is dark cherry juice good for sleep?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Which vegetable is one of the world’s healthiest foods?",
            answers: ["Sweet Potatoes", "French Fries", "Donuts"],
            correctAnswer: "Sweet Potatoes"
        },
        {
            question: "What vitamins are in sweet potatoes?",
            answers: ["A", "C", "Potassium", "All of them"],
            correctAnswer: "All of them"
        },
        {
            question: "What spice helps your tummy feel better?",
            answers: ["Cinnamon", "Pepper", "Salt"],
            correctAnswer: "Cinnamon"
        },
        {
            question: "Is cinnamon good for digestion?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What food helps your immune system?",
            answers: ["Candy", "Squash", "Cake"],
            correctAnswer: "Squash"
        },
        {
            question: "Does squash help keep you healthy?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What food helps with heart health?",
            answers: ["Black Olives", "Chips", "Ice Cream"],
            correctAnswer: "Black Olives"
        },
        {
            question: "Are black olives good for your heart?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What gives mustard its yellow color?",
            answers: ["Turmeric", "Cheese", "Lemon"],
            correctAnswer: "Turmeric"
        },
        {
            question: "What part of mustard helps fight disease?",
            answers: ["Mustard Seeds", "Sugar", "Butter"],
            correctAnswer: "Mustard Seeds"
        },
        {
            question: "Is mustard a super food?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "How should lamb be cooked?",
            answers: ["Medium", "Well Done", "Raw"],
            correctAnswer: "Medium"
        },
        {
            question: "Is lamb a lean protein?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Which fruit hangs like your heart?",
            answers: ["Red Grapes", "Apples", "Peaches"],
            correctAnswer: "Red Grapes"
        },
        {
            question: "Are red grapes good for your heart?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "What vitamin do mushrooms have?",
            answers: ["Vitamin A", "Vitamin D", "Vitamin C"],
            correctAnswer: "Vitamin D"
        },
        {
            question: "Are mushrooms good for your body?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "How should pork be cooked?",
            answers: ["Medium", "Burnt", "Rare"],
            correctAnswer: "Medium"
        },
        {
            question: "What should you avoid when fighting cancer?",
            answers: ["Nitrates", "Apples", "Water"],
            correctAnswer: "Nitrates"
        },
        {
            question: "Which fruit is low in calories and gives you energy?",
            answers: ["Watermelon", "Cake", "Cookies"],
            correctAnswer: "Watermelon"
        },
        {
            question: "Which fruit has vitamin C?",
            answers: ["Cantaloupe", "Ice Cream", "Chips"],
            correctAnswer: "Cantaloupe"
        },
        {
            question: "What helps with digestion?",
            answers: ["Wild Rice", "Candy", "Soda"],
            correctAnswer: "Wild Rice"
        },
        {
            question: "What fruit helps your eyes and skin?",
            answers: ["Plums", "Donuts", "Cheese"],
            correctAnswer: "Plums"
        },
        {
            question: "How should you cook grass-fed meat?",
            answers: ["Fast and hot", "Slow and low"],
            correctAnswer: "Slow and low"
        },
        {
            question: "What spice helps with nausea?",
            answers: ["Ginger", "Cinnamon", "Salt"],
            correctAnswer: "Ginger"
        },
        {
            question: "What helps your body digest food better?",
            answers: ["Heat", "Cold"],
            correctAnswer: "Heat"
        },
        {
            question: "What spice helps your blood flow?",
            answers: ["Lemon Pepper", "Sugar", "Cinnamon"],
            correctAnswer: "Lemon Pepper"
        },
        {
            question: "What herb protects your cells?",
            answers: ["Dried Basil", "Lettuce", "Parsley"],
            correctAnswer: "Dried Basil"
        },
        {
            question: "What food helps your heart stay healthy?",
            answers: ["Garlic", "Chocolate", "Soda"],
            correctAnswer: "Garlic"
        },
        {
            question: "What fruit helps your bones grow strong?",
            answers: ["Bananas", "Chips", "Soda"],
            correctAnswer: "Bananas"
        },
        {
            question: "What’s a good breakfast food?",
            answers: ["Eggs", "Candy", "Cookies"],
            correctAnswer: "Eggs"
        },
        {
            question: "What fish has Omega-3?",
            answers: ["Cod", "Tuna", "Salmon"],
            correctAnswer: "Cod"
        },
        {
            question: "What vegetable looks like our cells?",
            answers: ["Onion", "Tomato", "Carrot"],
            correctAnswer: "Onion"
        },
        {
            question: "How many servings of fish should you eat a week?",
            answers: ["1", "2", "5"],
            correctAnswer: "2"
        },
        {
            question: "What vegetable helps your bones?",
            answers: ["Celery", "Broccoli", "Pickles"],
            correctAnswer: "Celery"
        },
        {
            question: "What medicine came from mushrooms?",
            answers: ["Penicillin", "Tylenol", "Aspirin"],
            correctAnswer: "Penicillin"
        },
        {
            question: "What food helps keep you hydrated?",
            answers: ["Cucumbers", "Bread", "Chips"],
            correctAnswer: "Cucumbers"
        },
        {
            question: "Do tomatoes get healthier when heated?",
            answers: ["Yes", "No"],
            correctAnswer: "Yes"
        },
        {
            question: "Why should you eat different colors?",
            answers: ["To get different vitamins", "To make your plate pretty"],
            correctAnswer: "To get different vitamins"
        }    
    
];

// Function to populate trivia modal with a random question
function loadTriviaQuestion() {
    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const questionData = triviaQuestions[randomIndex];

    triviaQuestion.textContent = questionData.question;
    correctAnswer = questionData.correctAnswer;

    answerButtons.forEach((button, index) => {
        const answer = questionData.answers[index];
        if (answer) {
            button.textContent = answer;
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
        button.classList.remove('correct', 'incorrect');
    });
}

// Function to handle answer selection
answerButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedAnswer = this.textContent;
        const isCorrect = selectedAnswer === correctAnswer;

        // Provide immediate feedback
        if (isCorrect) {
            this.classList.add('correct');
            triviaResult.textContent = "Correct!";
        } else {
            this.classList.add('incorrect');
            triviaResult.textContent = "Incorrect. Try again next turn!";
        }

        // Disable all buttons after an answer is selected
        answerButtons.forEach(btn => btn.disabled = true);

        // Proceed after a delay (e.g., 2 seconds)
        setTimeout(() => {
            answerButtons.forEach(btn => btn.disabled = false); // Re-enable buttons
            triviaModal.style.display = "none";
            triviaResult.textContent = ""; // Clear the result message
            if (isCorrect) {
              if (currentPlayer === 1) {
                  player1Score += 50;
              } else {
                  player2Score += 50;
              }
              updateScoreDisplay();
              movePlayer(diceRoll); // if correct move the player
            }
            answerButtons.forEach(btn => btn.classList.remove('correct', 'incorrect'));
        }, 2000);
    });
});

// Function to show trivia modal
function showTriviaModal() {
    loadTriviaQuestion();
    triviaModal.style.display = "block";
}

// Close the Trivia modal
const triviaCloseBtn = triviaModal.querySelector(".close");
triviaCloseBtn.addEventListener("click", () => {
    triviaModal.style.display = "none";
});

// Open character selection modals
function openCharacterModals() {
    characterModal1.style.display = "block";
}

// Event listeners for character selection
const characterImages1 = document.querySelectorAll("#characterModal1 .character-selection img");
const characterImages2 = document.querySelectorAll("#characterModal2 .character-selection img");

characterImages1.forEach(img => {
    img.addEventListener("click", () => {
        // Remove 'selected' class from all images
        characterImages1.forEach(i => i.classList.remove("selected"));
        // Add 'selected' class to the clicked image
        img.classList.add("selected");
        player1Character = img.src;
    });
});

characterImages2.forEach(img => {
    img.addEventListener("click", () => {
        // Remove 'selected' class from all images
        characterImages2.forEach(i => i.classList.remove("selected"));
        // Add 'selected' class to the clicked image
        img.classList.add("selected");
        player2Character = img.src;
    });
});

// Event listeners for select character buttons
document.getElementById("selectCharacter1").addEventListener("click", () => {
    if (player1Character) {
        characterModal1.style.display = "none";
        characterModal2.style.display = "block";
    } else {
        alert("Please select a character for Player 1.");
    }
});

document.getElementById("selectCharacter2").addEventListener("click", () => {
    if (player2Character) {
        characterModal2.style.display = "none";
        startGame(); // Start the game after both players have chosen
    } else {
        alert("Please select a character for Player 2.");
    }
});

// Function to generate random shortcuts and traps
function generateRandomPositions(boardSize, maxShortcutLength = 5) {
    const numberOfShortcuts = 4;
    const numberOfTraps = 4;
    const shortcuts = {};
    const traps = {};
    const usedPositions = new Set();
    let orangeTrap = Math.floor(Math.random() * (boardSize - 1)); // Generate orange trap position
    // Ensure orange trap is in the last three rows by adjusting the range
    const minOrangeTrapPosition = boardSize - (3 * cellsPerRow); // Minimum position for last 3 rows
    orangeTrap = minOrangeTrapPosition + Math.floor(Math.random() * (3 * cellsPerRow));
    // orange trap should not appear in the last tile which is 48
    orangeTrap = Math.min(orangeTrap, boardSize - 2);
    window.orangeTrapPosition = orangeTrap; // Store orange trap position

    while (Object.keys(shortcuts).length < numberOfShortcuts) {
        let start = Math.floor(Math.random() * (boardSize / 2)); // Shortcuts start in first half
        let end = Math.min(start + Math.floor(Math.random() * maxShortcutLength) + 5, boardSize - 1);
        if (start !== end && !usedPositions.has(start) && !usedPositions.has(end) && start !== orangeTrap && end !== orangeTrap) {
            shortcuts[start] = end;
            usedPositions.add(start).add(end);
        }
    }
    while (Object.keys(traps).length < numberOfTraps) {
        let trap = Math.floor(Math.random() * (boardSize - 1));
       let destination = Math.max(trap - 2, 0); // Push back 2 tiles or to start
if (trap !== destination && !usedPositions.has(trap) && trap !== orangeTrap && destination !== orangeTrap) {
    traps[trap] = destination;
            usedPositions.add(trap).add(destination);
        }
    }
    return { shortcuts, traps };
}

// Create the board
function createBoard() {
  boardElement.innerHTML = ""; // Prevent board duplication
  let rowCount = 0;
  for (let i = 0; i < boardSize; i++) {
    if (i % cellsPerRow === 0) {
      const row = document.createElement('div');
      row.classList.add('row');
      if (rowCount % 2 === 1) {
        row.classList.add('reverse');
      }
      boardElement.appendChild(row);
      rowCount++;
    }

    const cell = document.createElement('div');
    cell.classList.add('cell');

    const isShortcut = window.shortcuts && window.shortcuts[i] !== undefined;
    const isTrap = window.traps && window.traps[i] !== undefined;
    const isOrangeTrap = i === window.orangeTrapPosition;

// Only assign a random color if it's not a special tile
    if (!isShortcut && !isTrap && !isOrangeTrap) {
    const colorIndex = Math.floor(Math.random() * 5) + 1;
    cell.classList.add(`color${colorIndex}`);
    }
    
    cell.id = `cell-${i}`;
    cell.textContent = i + 1;

 
    if (window.shortcuts && window.shortcuts[i] !== undefined) {
        cell.classList.add('shortcut');
        // Create a span to show where the shortcut leads to
        const shortcutIndicator = document.createElement('span');
        shortcutIndicator.classList.add('shortcut-indicator');
        shortcutIndicator.textContent = `\u2192 ${window.shortcuts[i] + 1}`; // Arrow and destination cell number
        cell.appendChild(shortcutIndicator);
    }
    //yellow tile
    if (window.traps && window.traps[i] !== undefined) {
        cell.classList.add('trap');
    
        const bananaIcon = document.createElement('span');
        bananaIcon.textContent = "🍌";
        bananaIcon.style.fontSize = "1.8em";
        bananaIcon.style.position = "absolute";
        bananaIcon.style.top = "5px";
        bananaIcon.style.left = "5px";
        cell.appendChild(bananaIcon);
    }
    //orange
    if (i === window.orangeTrapPosition) {
        cell.classList.add('orange-trap');
        
        const orangeIcon = document.createElement('span');
        orangeIcon.textContent = "🍊";
        orangeIcon.style.fontSize = "1.8em";
        orangeIcon.style.position = "absolute";
        orangeIcon.style.top = "5px";
        orangeIcon.style.right = "5px";
        cell.appendChild(orangeIcon);
    }
    

    boardElement.lastChild.appendChild(cell);
  }
  updatePlayers(); // Ensure players are displayed after board creation
}

// Update player positions
function updatePlayers() {
  document.querySelectorAll(".player").forEach((player) => player.remove());

  const player1Cell = document.getElementById(`cell-${player1Position}`);
  if (player1Cell) {
      const player1 = document.createElement("div");
      player1.classList.add("player");
      // Use character image if selected, otherwise use default text
      player1.innerHTML = player1Character ? `<img src="${player1Character}" alt="Player 1">` : "1";
      player1Cell.appendChild(player1);
  }

  const player2Cell = document.getElementById(`cell-${player2Position}`);
  if (player2Cell) {
      const player2 = document.createElement("div");
      player2.classList.add("player", "player2");
      // Use character image if selected, otherwise use default text
      player2.innerHTML = player2Character ? `<img src="${player2Character}" alt="Player 2">` : "2";
      player2Cell.appendChild(player2);
  }
}

// Roll the dice with animation
let diceRoll = 0;

document.getElementById("rollDice").addEventListener("click", () => {
  diceResultElement.textContent = `Rolling...`;
  diceResultElement.style.animation = "shakeDice 0.5s ease-in-out"; // Apply dice shake animation
  diceRollSound.play();

  setTimeout(() => {
    diceRoll = weightedDiceRoll();
    diceResultElement.textContent = `You rolled a ${diceRoll}`;
    diceResultElement.style.animation = ""; // Reset animation after it ends
    //movePlayer(dice);  // call move player function only on correct answer on trivia
    showTriviaModal(); // show the trivia question
  }, 1000);
});

function weightedDiceRoll() {
    const randomNumber = Math.random();

    // Define weights (these should add up to 1)
    const weights = {
        1: 0.12,
        2: 0.15,
        3: 0.19,
        4: 0.19,
        5: 0.15,
        6: 0.20
    };

    let cumulativeWeight = 0;
    for (let i = 1; i <= 6; i++) {
        cumulativeWeight += weights[i];
        if (randomNumber < cumulativeWeight) {
            return i;
        }
    }

    // In case of any floating-point precision issues, return a default value
    return 1;
}

function movePlayer(dice) {
  let newPosition;
  if (currentPlayer === 1) {
	  //unlockAchievement(`${player1Name} Wins! `);
      //const winSound = new Audio('win-sound.wav');
      //winSound.play();
	  //document.getElementById("congratzBannerModal").style.display = "block";
	 // playerWinnerId = "player1Name";
     // endGame();
     newPosition = player1Position + dice;
     player1Position = Math.min(newPosition, boardSize - 1);
     if (window.shortcuts && window.shortcuts[player1Position] !== undefined) {
       player1Position = window.shortcuts[player1Position];
       unlockAchievement(`${player1Name} found a shortcut!`);
     } else if (window.traps && window.traps[player1Position] !== undefined) {
       player1Position = window.traps[player1Position];
       unlockAchievement(`${player1Name} stepped on a trap!`);
     } else if (player1Position === window.orangeTrapPosition) {
         player1Position = 0; // Send back to start
         unlockAchievement(`${player1Name} landed on an orange trap and goes back to start!`);
     }
     if (player1Position === boardSize - 1) {
       unlockAchievement(`${player1Name} Wins! `);
       const winSound = new Audio('win-sound.wav');
       winSound.play();
	   document.getElementById("congratzBannerModal").style.display = "block";
	   playerWinnerId = "player1Name";
       endGame();
     } else {
       currentPlayer = 2;
       turnElement.textContent = `${player2Name}'s Turn`;
     }
  } else {
    newPosition = player2Position + dice;
    player2Position = Math.min(newPosition, boardSize - 1);
    if (window.shortcuts && window.shortcuts[player2Position] !== undefined) {
      player2Position = window.shortcuts[player2Position];
      unlockAchievement(`${player2Name} found a shortcut!`);
    } else if (window.traps && window.traps[player2Position] !== undefined) {
      player2Position = window.traps[player2Position];
      unlockAchievement(`${player2Name} stepped on a trap!`);
    } else if (player2Position === window.orangeTrapPosition) {
        player2Position = 0; // Send back to start
        unlockAchievement(`${player2Name} landed on an orange trap and goes back to start!`);
    }
    if (player2Position === boardSize - 1) {
      unlockAchievement(`${player2Name} Wins! `);
      const winSound = new Audio('win-sound.wav');
      winSound.play();
	  document.getElementById("congratzBannerModal").style.display = "block";
	  playerWinnerId = "player2Name";
      endGame();
    } else {
      currentPlayer = 1;
      turnElement.textContent = `${player1Name}'s Turn`;
    }
  }
  updatePlayers();
}

// End game state (disable dice roll)
function endGame() {
    document.getElementById('rollDice').disabled = true;
    document.getElementById('rollDice').style.opacity = 0.5;
}

// Reset game
document.getElementById('resetGame').addEventListener('click', resetGame);
function resetGame() {
  player1Position = 0;
  player2Position = 0;
  currentPlayer = 1;
  achievements.length = 0;
  achievementsElement.innerHTML = "";
  updatePlayers();
  turnElement.textContent = `${player1Name}'s Turn`;
  diceResultElement.textContent = '';
  document.getElementById('rollDice').disabled = false; // Enable dice roll
  document.getElementById('rollDice').style.opacity = 1;
  player1Score = 0;
  player2Score = 0;
  updateScoreDisplay();
}


// Initialize game - Modified to show rename first
document.getElementById('startGame').addEventListener('click', () => {
  renameModal.style.display = "block"; // Show rename modal first
});

saveNamesButton.addEventListener("click", () => {
    player1Name = player1NameInput.value || "Player 1";
    player2Name = player2NameInput.value || "Player 2";
    turnElement.textContent = `${player1Name}'s Turn`;
    renameModal.style.display = "none";
    updatePlayerNameDisplay();
    openCharacterModals(); // Move to character selection after names
});



function startGame() {
  createBoard();
  resetGame();
  const { shortcuts: newShortcuts, traps: newTraps } = generateRandomPositions(boardSize);
  window.shortcuts = newShortcuts;
  window.traps = newTraps;
  createBoard();
  backgroundMusic.play();
  updatePlayerNameDisplay(); // Initial update of player names
  document.querySelectorAll('.player-score-side').forEach(el => el.style.display = 'block');
}

// Close the modal if the user clicks outside of it
window.addEventListener("click", (event) => {
    if (event.target == renameModal) {
        renameModal.style.display = "none";
    }
    if (event.target == howToPlayModal) {
        howToPlayModal.style.display = "none";
    }
    if (event.target == characterModal1) {
        characterModal1.style.display = "none";
    }
    if (event.target == characterModal2) {
        characterModal2.style.display = "none";
    }
    if (event.target == triviaModal) {
        triviaModal.style.display = "none";
    }
});

// CSS for dice shake animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes shakeDice {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(30deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-30deg); }
    100% { transform: rotate(0deg); }
}
`;
document.head.appendChild(style);
