import LivrosActionTypes from './livros.action-types';
import {
  alugarLivro,
  createLivro,
  devolverLivro,
  removeLivro,
  updateLivro
} from './livros.actions';
import reducer, { initialState, LivroBase } from './livros.store';

describe('Livros reducer', () => {
  test('It should return the initial state', () => {
    expect(reducer(initialState, null)).toEqual(initialState);
  });

  test('It should add a Livro', () => {
    const newLivro: LivroBase = {
      alugado: true,
      anoLancamento: 2,
      autor: 'a',
      titulo: 'b'
    };
    const action = createLivro(newLivro) as {
      type: LivrosActionTypes.CREATE_LIVRO;
      payload: { data: LivroBase };
    };
    expect(
      reducer(initialState, action).livros.find(
        (livro) => livro.autor === newLivro.autor
      )
    ).toBeTruthy();
  });

  test('It should remove a Livro', () => {
    const oldLivro = reducer(initialState, null).livros[0];
    const action = removeLivro(oldLivro.id) as {
      type: LivrosActionTypes.REMOVE_LIVRO;
      payload: any;
    };
    expect(
      reducer(initialState, action).livros.find(
        (livro) => livro.id === oldLivro.id
      )
    ).toBeFalsy();
  });

  test('It should update a Livro', () => {
    const oldLivro = reducer(initialState, null).livros[0];
    oldLivro.autor = 'testee';
    const action = updateLivro(oldLivro) as {
      type: LivrosActionTypes.UPDATE_LIVRO;
      payload: any;
    };
    expect(
      reducer(initialState, action).livros.find(
        (livro) => livro.id === oldLivro.id
      ).autor === 'testee'
    ).toBeTruthy();
  });

  test('It should rent a Livro', () => {
    const oldLivro = reducer(initialState, null).livros[0];
    const action = alugarLivro(oldLivro.id) as any;
    expect(
      reducer(initialState, action).livros.find(
        (livro) => livro.id === oldLivro.id
      ).alugado === true
    ).toBeTruthy();
  });

  test('It should give back a Livro', () => {
    const oldLivro = reducer(initialState, null).livros[0];
    const action = devolverLivro(oldLivro.id) as any;
    expect(
      reducer(initialState, action).livros.find(
        (livro) => livro.id === oldLivro.id
      ).alugado === false
    ).toBeTruthy();
  });
});
