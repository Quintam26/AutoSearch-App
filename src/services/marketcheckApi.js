import { get } from './request';
const API_KEY = 'g7GnS2UP7zs6zwJHhNySXGOyjqbngim2';
const API_QUERY = `api_key=${API_KEY}`;
const BASE_URL = 'https://marketcheck-prod.apigee.net/v1/';
const EVERYTHING_URL = `${BASE_URL}search?${API_QUERY}&seller_type=dealer`;

const getUrl = url => {
  const json = window.localStorage.getItem(url);
  if(json) {
    const response = JSON.parse(json);
    return Promise.resolve(response);
  }

  return get(url)
    .then(response => {
      window.localStorage.setItem(url, JSON.stringify(response));
      return response;
    });
};

export function search({ search }, { page }) {
  const searchTerm = `&make=${search}`;
  const paging = `&page=${page}`;

  return get(`${EVERYTHING_URL}${searchTerm}${paging}`);
}

export function getCar(id){
  if(id) {
    return getUrl(`${BASE_URL}/listing/${id}?${API_QUERY}`);
  }
  else {
    return getUrl(EVERYTHING_URL);
  }
}