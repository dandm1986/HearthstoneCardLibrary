import axios from 'axios';

export const getToken = async () => {
  try {
    if (!sessionStorage.getItem('Blizzard API token')) {
      const response = await axios.post(
        'https://us.battle.net/oauth/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        {
          auth: {
            username: '311d7bb58df945e093ece72c135c1dd8',
            password: 'e3x60Kxj7ldpXda6NwNPF58lP6PJ2rrl',
          },
        }
      );

      const token = response.data.access_token;

      sessionStorage.setItem('Blizzard API token', token);
    }
  } catch (error) {
    throw error;
  }
};

export const createFilterStr = (filterData) => {
  let filterArr = [];
  for (const [key, value] of Object.entries(filterData)) {
    if (value) filterArr.push(`${key}=${value}`);
  }
  const filterStr = filterArr.join(`&`);
  return filterStr;
};

export const createIdList = (arr) => {
  return arr.join('%2C');
};

export const createURL = ({ apiBase, endpoint, filters }) => {
  const url = `${apiBase}${endpoint}?${filters}&access_token=${sessionStorage.getItem(
    'Blizzard API token'
  )}`;
  return url;
};

// Рефакторинг методов

const apiData = {
  apiBase: 'https://us.api.blizzard.com/hearthstone',
  endpoint: {
    metadata: '/metadata',
    cards: '/cards',
    heroes: '/deck',
  },
  filters: {
    locale: 'ru_RU',
  },
};

export const fetchMetadataUrl = (filtersObj) => {
  const {
    apiBase,
    endpoint: { metadata: endpoint },
    filters,
  } = apiData;

  const url = createURL({
    apiBase,
    endpoint,
    filters: createFilterStr({
      ...filters,
      ...filtersObj,
    }),
  });

  return url;
};

export const fetchHeroesUrl = (filtersObj) => {
  const {
    apiBase,
    endpoint: { heroes: endpoint },
    filters,
  } = apiData;

  const url = createURL({
    apiBase,
    endpoint,
    filters: createFilterStr({
      ...filters,
      ...filtersObj,
    }),
  });

  return url;
};
