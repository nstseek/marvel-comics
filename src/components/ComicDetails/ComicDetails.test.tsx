import React from 'react';
import { shallow } from 'enzyme';
import ComicDetails from './ComicDetails';

describe('<ComicDetails />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ComicDetails
        comic={
          {
            thumbnail: { path: '' },
            creators: { items: [] },
            characters: { items: [] },
            series: { name: '' },
            dates: [],
            urls: []
          } as any
        }
        close={() => null}
      />
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
