// javascript_game.js

// Levels for the game, each with a description, correct code, and hint
const levels = [
  {
    description: "Declare a variable named `sword` and set it to `true`.",
    correctCode: `let sword = true;`,
    hint: "In JavaScript, use `let` to declare variables and `true` for a boolean value."
  },
  {
    description: "Declare a variable `shield` and set it to `true`.",
    correctCode: `let shield = true;`,
    hint: "Declare the `shield` variable similar to `sword`, but with a different name."
  },
  {
    description: "Check if the character has both a sword and a shield using an `if` statement.",
    correctCode: `
if (sword && shield) {
  console.log("You are ready for battle!");
} else {
  console.log("You need both a sword and a shield.");
}
`,
    hint: "In JavaScript, use `&&` to check if both conditions are `true`."
  }
  // You can add more levels as needed
];

// Game state variables
let currentLevel = 0;
let incorrectAttempts = 0;

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Ace editor for JavaScript
  const editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.session.setMode('ace/mode/javascript'); // JavaScript mode for the editor

  // Get references to the elements
  const checkButton = document.getElementById('check-code-button');
  const feedback = document.getElementById('feedback');
  const challengeDescription = document.getElementById('challenge-description');

  // Load the current level
  function loadLevel(level) {
    // Set the challenge description for the current level
    challengeDescription.innerHTML = `<p>${levels[level].description}</p>`;
    editor.setValue("");  // Clear the editor for the next code input
    feedback.textContent = '';  // Clear any previous feedback
    incorrectAttempts = 0; // Reset incorrect attempts
  }

  // Load the first level
  loadLevel(currentLevel);

  // Event listener for the "Check Code" button
  checkButton.addEventListener('click', function () {
    const playerCode = editor.getValue().trim();

    // Check if the player's code matches the correct code for the current level
    if (playerCode === levels[currentLevel].correctCode.trim()) {
      feedback.textContent = "Correct! You've completed this level!";
      feedback.style.color = "green";

      // Move to the next level after a brief delay
      setTimeout(function () {
        currentLevel++;  // Move to the next level

        // If we've reached the last level, loop back to the first level (infinite loop)
        if (currentLevel >= levels.length) {
          currentLevel = 0;
        }

        // Load the new level
        loadLevel(currentLevel);
      }, 1500); // Wait for 1.5 seconds before loading the next level
    } else {
      // Increment the incorrect attempts counter
      incorrectAttempts++;

      if (incorrectAttempts === 1) {
        // After 1 incorrect attempt, provide a hint
        feedback.textContent = `Oops! Your code is incorrect. Hint: ${levels[currentLevel].hint}`;
        feedback.style.color = "orange";
      } else if (incorrectAttempts === 3) {
        // After 3 incorrect attempts, show the correct code
        feedback.textContent = `The correct answer is:\n\n${levels[currentLevel].correctCode}`;
        feedback.style.color = "red";

        // Move to the next level after a short delay
        setTimeout(function () {
          currentLevel++; // Increment the level

          // If there are no more levels, loop back to the first level
          if (currentLevel >= levels.length) {
            currentLevel = 0;
          }

          loadLevel(currentLevel); // Load the next level
        }, 2000); // Wait for 2 seconds before moving to the next level
      } else {
        // Provide feedback for an incorrect attempt
        feedback.textContent = "Oops! Your code is incorrect. Try again.";
        feedback.style.color = "red";
      }
    }
  });
});
