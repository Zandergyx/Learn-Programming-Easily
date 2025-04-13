// csharp_game.js

// Levels for C# game, with descriptions, correct code, and hints
const levels = [
    {
      description: "Your character needs a sword to defeat the monster ahead. Declare a boolean variable `hasSword` and set it to `true`.",
      correctCode: `bool hasSword = true;`,
      hint: "In C#, use `bool` to declare a boolean variable, and `true` instead of `True`."
    },
    {
      description: "Your character needs a shield to protect themselves. Declare a boolean variable `hasShield` and set it to `true`.",
      correctCode: `bool hasShield = true;`,
      hint: "Like the `hasSword` variable, but with a name `hasShield`."
    },
    {
      description: "You need to check if your character has both a sword and a shield. Use an `if` statement to check.",
      correctCode: `
  if (hasSword && hasShield) {
      Console.WriteLine("You are ready for battle!");
  } else {
      Console.WriteLine("You need both a sword and a shield.");
  }
  `,
      hint: "In C#, use `&&` to check if both conditions are `true`."
    },
    // Add more levels here as you want!
  ];
  
  // Initialize the game state
  let currentLevel = 0;
  let incorrectAttempts = 0;
  
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize Ace editor for C# mode
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/csharp'); // Use C# mode
  
    // Get the button and feedback section
    const checkButton = document.getElementById('check-code-button');
    const feedback = document.getElementById('feedback');
    const challengeDescription = document.getElementById('challenge-description');
  
    // Function to load the current level
    function loadLevel(level) {
      // Set the challenge description and the correct code for the current level
      challengeDescription.innerHTML = `<p>${levels[level].description}</p>`;
      editor.setValue("");  // Clear the editor for the next code input
      feedback.textContent = '';  // Clear feedback
      incorrectAttempts = 0; // Reset the incorrect attempts counter
    }
  
    // Load the first level
    loadLevel(currentLevel);
  
    // Check code when the button is clicked
    checkButton.addEventListener('click', function () {
      const playerCode = editor.getValue().trim();
  
      // Check if the player's code matches the correct code for the current level
      if (playerCode === levels[currentLevel].correctCode.trim()) {
        feedback.textContent = "Correct! You've completed this level!";
        feedback.style.color = "green";
  
        // Move to the next level after a brief delay
        setTimeout(function () {
          // Increment the level
          currentLevel++;
  
          // If there are no more levels, go back to the first level (infinite loop)
          if (currentLevel >= levels.length) {
            currentLevel = 0;
          }
  
          // Load the new level
          loadLevel(currentLevel);
        }, 1500); // Wait for 1.5 seconds before loading the next level
      } else {
        // If the player's code is incorrect, increment the incorrect attempts counter
        incorrectAttempts++;
  
        if (incorrectAttempts === 1) {
          // After 1 wrong attempt, provide a hint
          feedback.textContent = `Oops! Your code is incorrect. Hint: ${levels[currentLevel].hint}`;
          feedback.style.color = "orange";
        } else if (incorrectAttempts === 3) {
          // After 3 wrong attempts, reveal the correct code and move on
          feedback.textContent = `The correct answer is:\n\n${levels[currentLevel].correctCode}`;
          feedback.style.color = "red";
  
          // Move to the next level after a brief delay
          setTimeout(function () {
            // Increment the level
            currentLevel++;
  
            // If there are no more levels, go back to the first level (infinite loop)
            if (currentLevel >= levels.length) {
              currentLevel = 0;
            }
  
            // Load the new level
            loadLevel(currentLevel);
          }, 2000); // Wait for 2 seconds before moving to the next level
        } else {
          feedback.textContent = "Oops! Your code is incorrect. Try again.";
          feedback.style.color = "red";
        }
      }
    });
  });
  