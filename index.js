// Function to calculate today's date in PST
function getPSTDate() {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const pstOffset = -8; // Adjust to PST (UTC-8)
  const pstTime = utcTime + pstOffset * 3600000;
  return new Date(pstTime);
}

// Define category table for quiz categories
const categoryTable = {
  "Entertainment: Books": 10,
  "Technology": 18,
  "General Knowledge": 9,
  "Entertainment: Film": 11,
  "Entertainment: Music": 12,
  "Entertainment: Television": 14,
  "Entertainment: Video Games": 15,
  "Science & Nature": 17,
  "Mythology": 20,
  "Sports": 21,
  "Geography": 22,
  "History": 23,
  "Celebrities": 26,
  "Animals": 27,
  "Entertainment: Japanese Anime & Manga": 31,
};

// Get today's date in PST
const today = getPSTDate().toISOString().split('T')[0];
const todaysDateElement = document.getElementById('todaysDate');
todaysDateElement.innerText = today;

// Retrieve the last category index and last date from localStorage
let lastCategoryIndex = parseInt(localStorage.getItem('lastCategoryIndex')) || 0;
const lastDate = localStorage.getItem('lastDate');

// Check if the day has changed based on PST
if (lastDate !== today) {
  const lastIndexBackup = localStorage.getItem('lastCategoryIndex'); // Backup lastCategoryIndex
  localStorage.clear(); // Clear localStorage
  localStorage.setItem('lastCategoryIndex', lastIndexBackup); // Restore lastCategoryIndex

  // Update the date in localStorage
  localStorage.setItem('lastDate', today);

  // Increment category index and save
  lastCategoryIndex = (lastCategoryIndex + 1) % Object.keys(categoryTable).length;
  localStorage.setItem('lastCategoryIndex', lastCategoryIndex);

  // Reload the page to apply changes
  location.reload();
}

// Get the category from the updated index
const categories = Object.keys(categoryTable);
const selectedCategory = categories[lastCategoryIndex];
const categoryNumber = categoryTable[selectedCategory];

// Ensure API token is valid
function getQuizToken() {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('quizToken');
    if (!token) {
      // Request a new token if not found
      fetch('https://opentdb.com/api_token.php?command=request')
        .then(response => response.json())
        .then(data => {
          if (data.response_code === 0) {
            token = data.token;
            localStorage.setItem('quizToken', token); // Save token to localStorage
            resolve(token);
          } else {
            reject('Failed to fetch token.');
          }
        })
        .catch(reject);
    } else {
      resolve(token);
    }
  });
}

// Create and validate the quiz URL
function fetchQuizQuestions() {
  getQuizToken()
    .then((token) => {
      const url = `https://opentdb.com/api.php?amount=10&category=${categoryNumber}&type=multiple&token=${token}`;
      localStorage.setItem('quizURL', url); // Save URL to localStorage

      // Fetch questions
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.response_code === 0) {
            console.log('Questions retrieved:', data.results);
            // Use data.results to display questions on the page
          } else if (data.response_code === 3) {
            // Token expired, fetch a new one
            localStorage.removeItem('quizToken');
            fetch
