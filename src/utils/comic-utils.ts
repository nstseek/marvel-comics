import moment from 'moment';

/**
 * This function returns the creators of the comic separated by a comma
 * @param comic - The comic to be analyzed
 */
export const getCreators = (comic) =>
  comic.creators.items.map((creator) => creator.name).join(', ');

/**
 * This function returns the characters of the comic separated by a comma
 * @param comic - The comic to be analyzed
 */
export const getCharacters = (comic) =>
  comic.characters.items.length
    ? comic.characters.items.map((character) => character.name).join(', ')
    : '';

/**
 * This function returns the URL for the thumbnail of the comic
 * @param comic - The comic to be analyzed
 */
export const getThumbnail = (comic) =>
  comic.thumbnail.path + '.' + comic.thumbnail.extension;

/**
 * This function returns the details of the comic
 * @param comic - The comic to be analyzed
 */
export const getDetails = (comic) => {
  const detailsInd = comic.urls.findIndex((url) => url.type === 'detail');
  if (detailsInd >= 0) {
    return comic.urls[detailsInd].url;
  }
};

/**
 * This function returns the publish date of the comic
 * @param comic - The comic to be analyzed
 */
export const getPublishDate = (comic) => {
  const pubInd = comic.dates.findIndex((date) => date.type === 'onsaleDate');
  if (pubInd >= 0) {
    return moment(comic.dates[pubInd].date).format('LL');
  }
};
