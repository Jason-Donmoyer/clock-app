// IMPORTS
// Import ipify
import("https://api.ipify.org?format=jsonp&callback=getIP");


// VARIABLES
// Store client IP address
let ipAddress = '';

// IPBase Key
// NMXA3YiDSaXKEhEgLUFu7T5LXCHkMAB3cc0nNQaM
//"https://api.ipbase.com/v2/info?ip=1.1.1.1&apikey=YOUR-APIKEY"


// Function to get IP adress from client
function getIP(json) { 
  ipAddress = json.ip;
  console.log(`Your IP Address is ${json.ip}`); 
}


// Function to get data from worldtimeapi
async function getLocationData() {
  await fetch(
    `http://worldtimeapi.org/api/ip/${ipAddress}`
  ).then(res => res.json())
  .then(res => {
    console.log(res['datetime']);
    console.log(res['day_of_week']);
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
  })
}

getQuote();
getCity();
getLocationData();