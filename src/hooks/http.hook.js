import axios from 'axios';

export const useHttp = () => {
  const getData = async (url) => {
    try {
      const response = await axios.get(url);

      if (!response.statusText === 'OK') {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { getData };
};
