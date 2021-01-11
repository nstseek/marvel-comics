import LivrosActionTypes from './livros.action-types';
import {
  alugarLivro,
  createLivro,
  devolverLivro,
  removeLivro,
  updateLivro
} from './livros.actions';
import { initialState } from './livros.store';

const livro = initialState.livros[0];

describe('Test actions', () => {
  test('createLivro should emit a data payload', () => {
    expect(createLivro(livro)).toEqual({
      type: LivrosActionTypes.CREATE_LIVRO,
      payload: {
        data: livro
      }
    });
  });

  test('updateLivro should emit a data payload', () => {
    expect(updateLivro(livro)).toEqual({
      type: LivrosActionTypes.UPDATE_LIVRO,
      payload: {
        data: livro
      }
    });
  });

  test('removeLivro should emit a id payload', () => {
    expect(removeLivro(livro.id)).toEqual({
      type: LivrosActionTypes.REMOVE_LIVRO,
      payload: {
        id: livro.id
      }
    });
  });

  test('alugarLivro should emit a id payload', () => {
    expect(alugarLivro(livro.id)).toEqual({
      type: LivrosActionTypes.ALUGAR_LIVRO,
      payload: {
        id: livro.id
      }
    });
  });

  test('devolverLivro should emit a id payload', () => {
    expect(devolverLivro(livro.id)).toEqual({
      type: LivrosActionTypes.DEVOLVER_LIVRO,
      payload: {
        id: livro.id
      }
    });
  });
});
