// Define the async function getRandomQuote
async function getRandomQuote() {
    try {
        // Use the fetch API to send a request to the quotable API
        const response = await fetch('https://api.quotable.io/random');
        // Parse the JSON response body
        const data = await response.json();
        // Access and return the quote content
        return data.content;
    } catch (error) {
        // Log any errors to the console
        console.error('Error fetching quote:', error);
        return 'Failed to fetch quote.';
    }
}

// Define the constant quoteDisplayElement by selecting the DOM element
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const wpmElement = document.getElementById('wpm');
let interval; // To hold the reference to setInterval, allowing us to clear it when needed
let startTime; // Declare startTime globally to be accessible in getWPM function




function startTimer() {
    clearInterval(interval); // Stop any running timer
    let timer = 0; // Reset timer to 0
    document.getElementById('timer').innerHTML = timer; // Display the reset timer value
    interval = setInterval(() => {
        timer++; // Increment timer
        document.getElementById('timer').innerHTML = timer; // Update the displayed timer value
    }, 1000); // Update every second (1000 milliseconds)
}

// Select the button by its ID
const startButton = document.getElementById('startButton');

// Add click event listener to the button
startButton.addEventListener('click', startTimer);


// Timer Start if click on the start button
startButton.addEventListener('click', () => {
    startTime = new Date(); // Start the timer
});

// Don,t start timer if anyone not click on the start button
quoteInputElement.addEventListener('focus', () => {
    clearInterval(interval); // Stop the timer
});

// Function to calculate and display WPM
function getWPM() {
    let words = quoteInputElement.value.trim().split(/\s+/).length; // Improved to count words more accurately
    let time = (new Date() - startTime) / 60000; // Calculate elapsed time in minutes
    let wpm = words / time; // Calculate words per minute
    wpm = wpm.toFixed(2); // Format to two decimal places
    return wpm;
}



// Modify the renderNewQuote function to reset and start the timer with each new quote
async function renderNewQuote() {
    const quote = await getRandomQuote();

    quoteDisplayElement.innerHTML = ''; // Clear the quote displayed to the user

    quote.split('').forEach((character) => { // Split the quote into individual characters and append them to the quote display
        const charSpan = document.createElement('span');
        charSpan.innerHTML = character;
        quoteDisplayElement.appendChild(charSpan);
    });

    quoteInputElement.value = ''; // Clear the text area for a clean start
    wpmElement.innerHTML = '0 WPM'; // Initialize the WPM display to "0 WPM"
    startTimer();
}

// Enhance the input event listener on quoteInputElement to update WPM in real-time
quoteInputElement.addEventListener('input', () => {
    wpmElement.innerHTML = getWPM() + ' WPM'; // Update WPM in real-time

    // [Insert the rest of your existing code here to check the text input]
    // For example, code to compare the input text with the quote and mark as correct/incorrect
});

// Call renderNewQuote to display a new quote on the screen
renderNewQuote();

