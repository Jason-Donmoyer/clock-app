// *******************************************************************************************
// IMPORTS
// *******************************************************************************************

// Import ipify
// import("https://api.ipify.org?format=jsonp&callback=getIP");


// *******************************************************************************************
// VARIABLES
// *******************************************************************************************

// Store client IP address
let ipAddress = '';

// Store current time
let currentTime = '';

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

// IPBase Key
// NMXA3YiDSaXKEhEgLUFu7T5LXCHkMAB3cc0nNQaM
//"https://api.ipbase.com/v2/info?ip=1.1.1.1&apikey=YOUR-APIKEY"

// Function to get IP adress from client
// function getIP(json) { 
//   ipAddress = json.ip;
//   console.log(`Your IP Address is ${json.ip}`); 
// }

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
    // updateTime();
  });
}


//{
//   "abbreviation": "EDT",
//   "client_ip": "100.35.21.208",
//   "datetime": "2022-05-11T16:49:09.960370-04:00",
//   "day_of_week": 3,
//   "day_of_year": 131,
//   "dst": true,
//   "dst_from": "2022-03-13T07:00:00+00:00",
//   "dst_offset": 3600,
//   "dst_until": "2022-11-06T06:00:00+00:00",
//   "raw_offset": -18000,
//   "timezone": "America/New_York",
//   "unixtime": 1652302149,
//   "utc_datetime": "2022-05-11T20:49:09.960370+00:00",
//   "utc_offset": "-04:00",
//   "week_number": 19
// }


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
// 20220511171729
// https://api.ipbase.com/v2/info?ip=100.35.21.208&apikey=NMXA3YiDSaXKEhEgLUFu7T5LXCHkMAB3cc0nNQaM

// {
//   "data": {
//     "timezone": {
//       "id": "America/New_York",
//       "current_time": "2022-05-11T17:17:28-04:00",
//       "code": "EDT",
//       "is_daylight_saving": true,
//       "gmt_offset": -14400
//     },
//     "ip": "100.35.21.208",
//     "type": "v4",
//     "connection": {
//       "asn": 701,
//       "organization": "UUNET",
//       "isp": "Mci Communications Services Inc. D/B/a Verizon Business"
//     },
//     "location": {
//       "geonames_id": 5101170,
//       "latitude": 40.42716979980469,
//       "longitude": -74.20256042480469,
//       "zip": "07735",
//       "continent": {
//         "code": "NA",
//         "name": "North America",
//         "name_translated": "North America"
//       },
//       "country": {
//         "alpha2": "US",
//         "alpha3": "USA",
//         "calling_codes": [
//           "+1"
//         ],
//         "currencies": [
//           {
//             "symbol": "$",
//             "name": "US Dollar",
//             "symbol_native": "$",
//             "decimal_digits": 2,
//             "rounding": 0,
//             "code": "USD",
//             "name_plural": "US dollars"
//           }
//         ],
//         "emoji": "🇺🇸",
//         "ioc": "USA",
//         "languages": [
//           {
//             "name": "English",
//             "name_native": "English"
//           }
//         ],
//         "name": "United States",
//         "name_translated": "United States",
//         "timezones": [
//           "America/New_York",
//           "America/Detroit",
//           "America/Kentucky/Louisville",
//           "America/Kentucky/Monticello",
//           "America/Indiana/Indianapolis",
//           "America/Indiana/Vincennes",
//           "America/Indiana/Winamac",
//           "America/Indiana/Marengo",
//           "America/Indiana/Petersburg",
//           "America/Indiana/Vevay",
//           "America/Chicago",
//           "America/Indiana/Tell_City",
//           "America/Indiana/Knox",
//           "America/Menominee",
//           "America/North_Dakota/Center",
//           "America/North_Dakota/New_Salem",
//           "America/North_Dakota/Beulah",
//           "America/Denver",
//           "America/Boise",
//           "America/Phoenix",
//           "America/Los_Angeles",
//           "America/Anchorage",
//           "America/Juneau",
//           "America/Sitka",
//           "America/Metlakatla",
//           "America/Yakutat",
//           "America/Nome",
//           "America/Adak",
//           "Pacific/Honolulu"
//         ],
//         "is_in_european_union": false
//       },
//       "city": {
//         "name": "Middletown",
//         "name_translated": "Middletown"
//       },
//       "region": {
//         "fips": "",
//         "alpha2": "",
//         "name": "New Jersey",
//         "name_translated": "New Jersey"
//       }
//     }
//   }
// }


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


// Function to update time in UI
// function updateTime() {
//   timeCopyContainer.textContent = currentTime;
// }


// *******************************************************************************************
// FUNCTION CALLS
// *******************************************************************************************

getIpClient();
getQuote();
getCity();
getLocationData();