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
            username: '2186110eda924e8983900c2bd1eb40f9',
            password: 'nYlp1FE0LtyLxb0FD18fudHzH8PzREdZ',
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
