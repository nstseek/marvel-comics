import moment from 'moment';

export const getCreators = (comic) =>
  comic.creators.items.map((creator) => creator.name).join(', ');

export const getCharacters = (comic) =>
  comic.characters.items.length
    ? comic.characters.items.map((character) => character.name).join(', ')
    : '';

export const getThumbnail = (comic) =>
  comic.thumbnail.path + '.' + comic.thumbnail.extension;

export const getDetails = (comic) => {
  const detailsInd = comic.urls.findIndex((url) => url.type === 'detail');
  if (detailsInd >= 0) {
    return comic.urls[detailsInd].url;
  }
};

export const getPublishDate = (comic) => {
  const pubInd = comic.dates.findIndex((date) => date.type === 'onsaleDate');
  if (pubInd >= 0) {
    return moment(comic.dates[pubInd].date).format('LL');
  }
};
