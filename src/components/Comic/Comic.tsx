import React from 'react';
import { Comic as ComicModel } from '../../typings/api';
import './Comic.scss';

interface Props {
  comic: ComicModel;
  addComic(comic: ComicModel);
  removeComic(id: number);
  openComic(comic: ComicModel);
  selected: boolean;
}

/**
 * This component is a small card that shows the basic info for the comic provided, allowing the user to click on it, triggering an event that can show more details
 * @param comic - The comic to be displayed
 * @param addComic - The function to be called when the comic gets checked
 * @param removeComic - The function to be called when the comic gets unchecked
 * @param openComic - The function to be called when the comic gets clicked
 * @param selected - Indicates if this comic is selected
 */
const Comic: React.FC<Props> = ({
  comic,
  addComic,
  removeComic,
  openComic,
  selected
}) => (
  <div className='Comic' onClick={() => openComic(comic)}>
    <input
      className='comic-checkbox'
      type='checkbox'
      checked={selected}
      onClick={(event) => event.stopPropagation()}
      onChange={() => {
        if (selected) {
          removeComic(comic.id);
        } else {
          addComic(comic);
        }
      }}
    />
    <img
      className='comic-thumb'
      src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
      alt={comic.title + ' image'}
    />
    <h3 className='comic-title'>{comic.title}</h3>
  </div>
);

export default Comic;
