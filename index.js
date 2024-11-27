// Add this at the beginning of the script
//function sendKeepAliveRequest() {
  //const keepAliveUrl = `https://opentdb.com/api.php?amount=1&token=0949e33fcc375e5983f57a9e845a3385ddee452a75f0722372291bb34c27a88a`;
  
  //fetch(keepAliveUrl)
   // .then(response => response.json())
    //.then(data => {
     // console.log('Keep-alive request sent:', data);
    //})
    //.catch(error => {
      //console.error('Error in keep-alive request:', error);
   // });
//}

//const FIVE_HOURS_IN_MS = 5 * 60 * 60 * 1000; // 5 hours
//setInterval(sendKeepAliveRequest, FIVE_HOURS_IN_MS);
//sendKeepAliveRequest(); // Send an initial keep-alive request





const categoryTable = {
  "Technology" : 18,
  "Entertainment: Books" : 10,
  "General Knowledge" : 9,
  "Entertainment: Film" : 11,
  "Entertainment: Music" : 12,
  "Entertainment: Television" : 14,
  "Entertainment: Video Games" : 15,
  "Science & Nature" : 17,
  "Mythology" : 20,
  "Sports": 21,
  "Geography": 22,
  "History": 23,
  "Celebrities": 26,
  "Animals": 27,
  "Entertainment: Japanese Anime & Manga": 31,
};

// Retrieve the last category index and last date from localStorage
let lastCategoryIndex = parseInt(localStorage.getItem('lastCategoryIndex')) || 0;
const lastDate = localStorage.getItem('lastDate');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
const todaysDateElement = document.getElementById('todaysDate');
todaysDateElement.innerText = today;

setTimeout(() => {
  location.reload();  // Refresh after 5 seconds
}, 15000);

// Check if the day has changed
if (lastDate !== today) {
  // Clear all localStorage except 'lastCategoryIndex'
  const lastIndexBackup = localStorage.getItem('lastCategoryIndex'); // Backup lastCategoryIndex
  localStorage.clear(); // Clear localStorage
  localStorage.setItem('lastCategoryIndex', lastIndexBackup); // Restore lastCategoryIndex
  
  // Update the date in localStorage
  localStorage.setItem('lastDate', today);

  // Increment category index and save
  lastCategoryIndex = (lastCategoryIndex + 1) % Object.keys(categoryTable).length; // Cycle through categories
  localStorage.setItem('lastCategoryIndex', lastCategoryIndex);
  location.reload()
}

// Get the category from the updated index
const categories = Object.keys(categoryTable);
const selectedCategory = categories[lastCategoryIndex];
const categoryNumber = categoryTable[selectedCategory];

// Create the URL for the quiz
const url = `https://opentdb.com/api.php?amount=10&category=${categoryNumber}&type=multiple`;

// Save the URL to localStorage
localStorage.setItem('quizURL', url);

// Log the details
console.log(`Category: ${selectedCategory}, Number: ${categoryNumber}, URL: ${url}`);

// Update the category name on the page
const categoryNameElement = document.getElementById('categoryName');
categoryNameElement.innerText = selectedCategory;

// Function to update time
function updateTime() {
  const currentTimeElement = document.getElementById('currentTime');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  currentTimeElement.innerText = `${hours}:${minutes}:${seconds}`;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial time display
updateTime();
