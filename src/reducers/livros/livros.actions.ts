import LivrosActionTypes from './livros.action-types';
import { Livro, LivroBase } from './livros.store';

export interface ActionData<T, U = any> {
  payload?: U;
  type: T;
}

export interface LivrosPayload {
  data?: LivroBase | Livro;
  id?: number;
}

export const createLivro = (
  data: LivroBase
): ActionData<LivrosActionTypes.CREATE_LIVRO, LivrosPayload> => ({
  type: LivrosActionTypes.CREATE_LIVRO,
  payload: {
    data
  }
});

export const updateLivro = (
  data: Livro
): ActionData<LivrosActionTypes.UPDATE_LIVRO, LivrosPayload> => ({
  type: LivrosActionTypes.UPDATE_LIVRO,
  payload: {
    data
  }
});

export const removeLivro = (
  id: number
): ActionData<LivrosActionTypes.REMOVE_LIVRO, LivrosPayload> => ({
  type: LivrosActionTypes.REMOVE_LIVRO,
  payload: {
    id
  }
});

export const alugarLivro = (
  id: number
): ActionData<LivrosActionTypes.ALUGAR_LIVRO, LivrosPayload> => ({
  type: LivrosActionTypes.ALUGAR_LIVRO,
  payload: {
    id
  }
});

export const devolverLivro = (
  id: number
): ActionData<LivrosActionTypes.DEVOLVER_LIVRO, LivrosPayload> => ({
  type: LivrosActionTypes.DEVOLVER_LIVRO,
  payload: {
    id
  }
});
