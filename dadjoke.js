// dadjoke.js
const dadJokeEl = document.getElementById('dadJoke');

// Delay to ensure index.js has updated localStorage
setTimeout(() => {
  const appDate = localStorage.getItem('todaysDate');
  const storedJokeData = JSON.parse(localStorage.getItem('dadJokeData'));

  if (storedJokeData && storedJokeData.date === appDate) {
    dadJokeEl.textContent = `💬 Dad joke of the day: "${storedJokeData.joke}"`;
  } else {
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('dadJokeData', JSON.stringify({
          date: appDate,
          joke: data.joke
        }));
        dadJokeEl.textContent = `💬 Dad joke of the day: "${data.joke}"`;
      })
      .catch(err => {
        console.error('❌ Failed to fetch dad joke:', err);
        dadJokeEl.textContent = "😅 Couldn't load the dad joke today.";
      });
  }
}, 50); // slight delay so index.js finishes setting the date
