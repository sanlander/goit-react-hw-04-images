import axios from 'axios';

const URL_API =
  'https://pixabay.com/api?key=29666264-04a56090f5dead81932f72058&image_type=photo&orientation=horizontal';

const PER_PAGE = 12;
export let MAX_PAGE = null;

export const getImages = (text, page) => {
  return axios
    .get(`${URL_API}&per_page=${PER_PAGE}&q=${text}&page=${page}`)
    .then(r => {
      MAX_PAGE = Math.ceil(r.data.totalHits / PER_PAGE);

      return r.data.hits;
    });
};
