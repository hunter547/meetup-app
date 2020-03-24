import { mockEvents } from './mock_data/mock-events';
 
async function getSuggestions(query) {
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

async function getEvents(lat, lon) {
  return mockEvents.events;
}

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  
  if(!accessToken) {
    const searchParams = new URLSearchParams(window.location.href);
    const code = searchParams.get('code');

    if(!code) {
      window.location.href('https://secure.meetup.com/oauth2/authorize?client_id=mtfrifukvgtkbuoe34mesrflrf&response_type=code&redirect_uri=https://hunter547.github.io/meetup-app/')
    }
  }
}

export { getSuggestions, getEvents };
