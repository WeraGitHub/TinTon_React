const SCORE_KEY = "top5Scores";

// Function to save the player's name and score to local storage
export const saveScoreToLocalStorage = (name, score) => {
    // Retrieve existing scores from local storage
    const existingScores = JSON.parse(localStorage.getItem('scores')) || [];
  
    // Add the new score to the list of scores
    const newScore = { name, score };
    console.log(name, score);
    existingScores.push(newScore);
  
    // Sort the scores in descending order based on the score
    existingScores.sort((a, b) => b.score - a.score);
  
    // Keep only the top 5 scores
    const top5Scores = existingScores.slice(0, 5);
  
    // Save the updated scores back to local storage
    localStorage.setItem(SCORE_KEY, JSON.stringify(top5Scores));
  };
  
  // Function to retrieve the top 5 scores from local storage
  export const getTop5ScoresFromLocalStorage = () => {
    // Retrieve the scores from local storage
    const scoresString = localStorage.getItem(SCORE_KEY);
    let scores = [];
    
    if (scoresString) {
      try {
        scores = JSON.parse(scoresString);
      } catch (error) {
        console.error("Error parsing scores from local storage:", error);
      }
    }
  
    return scores;
  };
  