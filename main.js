// *******************************************************************************************
// VARIABLES
// *******************************************************************************************

// Store client IP address
let ipAddress = '';

// Store current time
let currentTime = '';


// Main Content container
const mainContentContainer = document.getElementById('main-content-container');
// Main Background Container
const bgContainer = document.getElementById('main-bg-container');

// Quote Container
const quoteContainer = document.getElementById('quote-container');
// Quote Copy
const randomQuote = document.getElementById('quote-copy');
// Author Container
const quoteAuthor = document.getElementById('quote-author');
// Refresh Quote Button
const quoteRefresh = document.getElementById('refresh-btn');

// Time and Location Container
const timeLocationContainer = document.getElementById('time-location-container');
// Time Copy Container
const timeCopyContainer = document.getElementById('time-copy');
// Timezone Abbreviation
const timezoneAbbr = document.getElementById('timezone-abbr-copy');
// Greeting Icon
const greetingIcon = document.getElementById('greeting-icon');
// Greeting Copy
const greetingCopy = document.getElementById('greeting-copy');

// Location city
const locationCity = document.getElementById('city-location');
// Location Country
const locationCountry = document.getElementById('country-location');

// Info Button
const infoBtn = document.getElementById('info-btn');
// Info Button Copy
const infoBtnCopy = document.getElementById('info-btn-copy');
// Info Button Icon
const infoBtnIcon = document.getElementById('info-btn-icon');
// Button clicked state
let btnClicked = false;

// Stats section
const statsSection = document.getElementById('stats-section');
// Timezone Copy
const timezoneCopy = document.getElementById('timezone-copy');
// Day of Year Copy
const dayOfYear = document.getElementById('day-of-year-copy');
// Day of Week Copy
const dayOfWeek = document.getElementById('day-of-week-copy');
// Week Number copy
const weekNumber = document.getElementById('week-number-copy');

// Desktop Verticle Line
const desktopVerticalLine = document.getElementById('desktop-vertical-line');

// Stat Headlines 
const statHeadlines = document.querySelectorAll('.stat-headline');
// Stat Copy 
const statCopy = document.querySelectorAll('.stat-copy');


// *******************************************************************************************
// EVENT LISTENERS
// *******************************************************************************************

// Refresh Quote Button Event Listener
quoteRefresh.addEventListener('click', () => {
  getQuote();
});

// Show Hide Info section
infoBtn.addEventListener('click', () => {
  
  btnClicked ? console.log('active') : console.log('negative');
  if (!btnClicked) {
    statsSection.style.display = 'flex';
    quoteContainer.style.display = 'none';
    if (window.matchMedia('(min-width: 1024px)').matches) {
      bgContainer.style.height = '50%';
      statsSection.style.height = '50%';
      timeLocationContainer.style.marginBottom = '0px';
      bgContainer.style.justifyContent = 'center';
    } else {
      bgContainer.style.height = '62%';
      bgContainer.style.justifyContent = 'flex-end';
    }
    infoBtnCopy.textContent = 'LESS';
    infoBtnIcon.style.backgroundImage = "url('assets/desktop/icon-arrow-up.svg')";
    btnClicked = true;
  } else if (btnClicked) {
    statsSection.style.display = 'none';
    quoteContainer.style.display = 'block';
    bgContainer.style.height = '100%';
    bgContainer.style.justifyContent = 'space-between';
    infoBtnCopy.textContent = 'MORE';
    infoBtnIcon.style.backgroundImage = "url('assets/desktop/icon-arrow-down.svg')";
    if (window.matchMedia('(min-width: 1024px)').matches) {
      timeLocationContainer.style.marginBottom = '6.125rem';
    } else {
      timeLocationContainer.style.marginBottom = '2.5rem';
    }
    btnClicked = false;
  }
  
  
});

// *******************************************************************************************
// FUNCTIONS
// *******************************************************************************************


async function getIpClient() {
  try {
    const response = await fetch('https://api.ipify.org?format=json'
    ).then(res => res.json())
    .then(res => {
      console.log(res);
      ipAddress = res.ip;
    })
  } catch (error) {
    console.error(error);
  }
}


// Function to get data from worldtimeapi
async function getLocationData() {
  await fetch(
    `https://worldtimeapi.org/api/ip/${ipAddress}`
  ).then(res => res.json())
  .then(res => {
    currentTime = res['datetime'].split('').slice(11, 16).join('');
    console.log(res['datetime']);
    console.log(res['day_of_week']);
    timeCopyContainer.textContent = currentTime;
    dayOfYear.textContent = res['day_of_year'];
    dayOfWeek.textContent = res['day_of_week'] + 1;
    weekNumber.textContent = res['week_number'] + 1;
    updateGreeting(currentTime);
  });
}


// Function to get data from freegeoip
async function getCity() {
  await fetch(
    `https://api.ipbase.com/v2/info?ip=${ipAddress}&apikey=NMXA3YiDSaXKEhEgLUFu7T5LXCHkMAB3cc0nNQaM`
  ).then(res => res.json())
  .then(res => {
    timezoneAbbr.textContent = res['data'].timezone.code;
    locationCity.textContent = res['data'].location.city.name;
    locationCountry.textContent = res['data'].location.region.name;
    timezoneCopy.textContent = res['data'].timezone.id;
    console.log(res['data'].location.city);
  });
}


// Function to get random quotes
async function getQuote() {
  await fetch(
    'https://programming-quotes-api.herokuapp.com/Quotes/random'
  ).then(res => res.json())
  .then(res => {
    console.log(res['en']);
    console.log(res['author']);
    randomQuote.textContent = res['en'];
    quoteAuthor.textContent = res['author'];
  })
}


// Helper Function to upddate greeting in UI
function updateGreeting(currentTime) {
  // get hour from current time
  const hour = parseInt(currentTime.split('').slice(0, 2).join(''));
  console.log(hour);
  if (hour >= 6 && hour <= 11) {
    greetingCopy.innerText = 'GOOD MORNING';
    updateLightMode();
  } else if (hour >= 12 && hour <= 20) {
    greetingCopy.innerText = 'GOOD AFTERNOON';
    updateLightMode();
  } else {
    greetingCopy.innerText = 'GOOD EVENING';
    updateDarkMode();
  }
}


// Helper Function to update light mode
function updateLightMode() {
  mainContentContainer.classList.remove('main-content-dark-bg');
  greetingIcon.classList.remove('greeting-icon-dark');
  statsSection.classList.remove('stats-container-dark-bg');
  statHeadlines.forEach(e => e.classList.remove('stat-headline-dark'));
  statCopy.forEach(e => e.classList.remove('stat-copy-dark'));
  desktopVerticalLine.classList.remove('desktop-vertical-line-dark-bg');
}

// Helper Function to update dark mode
function updateDarkMode() {
  mainContentContainer.classList.add('main-content-dark-bg');
  greetingIcon.classList.add('greeting-icon-dark');
  statsSection.classList.add('stats-container-dark-bg');
  statHeadlines.forEach(e => e.classList.add('stat-headline-dark'));
  statCopy.forEach(e => e.classList.add('stat-copy-dark'));
  desktopVerticalLine.classList.add('desktop-vertical-line-dark-bg');
}


// *******************************************************************************************
// FUNCTION CALLS
// *******************************************************************************************

getIpClient();
getQuote();
getCity();
getLocationData();