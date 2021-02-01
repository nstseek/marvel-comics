import React from 'react';
import { mount } from 'enzyme';
import { Dragao } from './Dragao';

describe('<Dragao />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(
      <Dragao
        refreshList={() => null}
        dragao={{
          createdAt: '2021-01-26T01:34:48.148Z',
          id: '97',
          name: 'Lesterz',
          type: 'magenta'
        }}
      />
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
