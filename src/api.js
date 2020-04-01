import axios from 'axios';
import { mockEvents } from './mock_data/mock-events';

 
async function getSuggestions(query) {
  if (window.location.href.startsWith('http://localhost')) {
    return [
      {
        city: 'Munich',
        country: 'de',
        localized_country_name: 'Germany',
        name_string: 'Munich, Germany',
        zip: 'meetup3',
        lat: 48.14,
        lon: 11.58
      },
      {
        city: 'Munich',
        country: 'us',
        localized_country_name: 'USA',
        state: 'ND',
        name_string: 'Munich, North Dakota, USA',
        zip: '58352',
        lat: 48.66,
        lon: -98.85
      }
    ];
  }

  const token = await getAccessToken();
  if (token) {
    const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
      + query
      + '&access_token=' + token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}

async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith('http://localhost')) {
    if (page) {
      return mockEvents.events.slice(0,page);
    }
    else {
      return mockEvents.events;
    }
  }
  
  if (!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    return JSON.parse(events);
  }

  const token = await getAccessToken();
  if (token) {
    let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public'
      + '&access_token=' + token;
    // lat, lon is optional; if you have a lat and lon, you can add them
    if (lat && lon && page) {
      url += '&lat=' + lat + '&lon=' + lon;
      url += '&page=' + page;
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);
    }
    if (lat && lon && !page) {
      url += '&lat=' + lat + '&lon=' + lon;
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);
    }
    if (page && !lat) {
      if(!localStorage.getItem('lat')) {
        url += '&page=' + page;
      }
      else {
        url += '&lat=' + localStorage.getItem('lat') + '&lon=' + localStorage.getItem('lon');
        url += '&page=' + page;
      }
      
    }
    const result = await axios.get(url);
    const events = result.data.events;
    if (events.length) { // Check if the events exist
      localStorage.setItem('lastEvents', JSON.stringify(events));
    }

    return events;
  }
  
  return [];
}

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  
  if(!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if(!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=mtfrifukvgtkbuoe34mesrflrf&response_type=code&redirect_uri=https://hunter547.github.io/meetup-app/';
      return null;
    }
    return getOrRenewAccessToken('get', code);
  }

  const lastSavedTime = localStorage.getItem('last_saved_time');

  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }

  // If the access_token is expired, we try to renew it by using refresh_token
  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}

async function getOrRenewAccessToken(type, key) {
  let url;
  let tokenInfo;
  if (type === 'get') {
    // Lambda endpoint to get token by code
    url = 'https://af14dwzp5e.execute-api.us-east-1.amazonaws.com/dev/api/token/'
      + key;

    // Use Axios to make a GET request to the endpoint
    tokenInfo = await axios.get(url);  

  } else if (type === 'renew') {
    // Lambda endpoint to get token by refresh_token
    url = 'https://af14dwzp5e.execute-api.us-east-1.amazonaws.com/dev/api/refresh/'
      + key;
    // Use Axios to make a POST request to the endpoint
    tokenInfo = await axios.post(url);
  }

  // Save tokens to localStorage together with a timestamp
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());

  // Return the access_token
  return tokenInfo.data.access_token;
}

export { getSuggestions, getEvents };
