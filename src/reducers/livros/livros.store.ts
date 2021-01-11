import LivrosActionTypes from './livros.action-types';
import { LivrosPayload } from './livros.actions';

export interface LivroBase {
  id?: number;
  titulo: string;
  alugado: boolean;
  autor: string;
  anoLancamento: number;
}

export interface Livro extends LivroBase {
  id: number;
}

export interface LivrosState {
  livros: Livro[];
}

let id = 1;

export const initialState: LivrosState = {
  livros: [
    {
      id: id++,
      alugado: true,
      anoLancamento: 1612,
      autor: 'Miguel de Cervantes',
      titulo: 'Dom Quixote'
    },
    {
      id: id++,
      alugado: false,
      anoLancamento: 1859,
      autor: 'Charles Dickens',
      titulo: 'História em Duas Cidades'
    },
    {
      id: id++,
      alugado: true,
      anoLancamento: 1954,
      autor: 'J. R. R. Tolkien',
      titulo: 'O Senhor dos Anéis'
    },
    {
      id: id++,
      alugado: false,
      anoLancamento: 1943,
      autor: 'Antoine de Saint-Exupéry',
      titulo: 'O Pequeno Príncipe'
    },
    {
      id: id++,
      alugado: true,
      anoLancamento: 1997,
      autor: 'J. K. Rowling',
      titulo: 'Harry Potter e a Pedra Filosofal'
    },
    {
      id: id++,
      alugado: false,
      anoLancamento: 1937,
      autor: 'J. R. R. Tolkien',
      titulo: 'O Hobbit'
    },
    {
      id: id++,
      alugado: true,
      anoLancamento: 1950,
      autor: 'C. S. Lewis',
      titulo: 'O Leão, a Feiticeira e o Guarda-Roupa'
    },
    {
      id: id++,
      alugado: false,
      anoLancamento: 2003,
      autor: 'Dan Brown',
      titulo: 'O Código da Vinci'
    },
    {
      id: id++,
      alugado: false,
      anoLancamento: 2005,
      autor: 'J. K. Rowling',
      titulo: 'Harry Potter e o Enigma do Príncipe'
    }
  ]
};

function reducer(
  state: LivrosState,
  action: { type: LivrosActionTypes.CREATE_LIVRO; payload: { data: LivroBase } }
): LivrosState;
function reducer(
  state: LivrosState,
  action: {
    type: LivrosActionTypes.UPDATE_LIVRO;
    payload: { data: Livro };
  }
): LivrosState;
function reducer(
  state: LivrosState,
  action: {
    type: LivrosActionTypes.REMOVE_LIVRO;
    payload: { id: number };
  }
): LivrosState;
function reducer(
  state: LivrosState = { ...initialState },
  action: { type: LivrosActionTypes; payload: LivrosPayload }
): LivrosState {
  const livros = [...state.livros];
  const selectedLivroIndex =
    action?.payload?.id || action?.payload?.data?.id
      ? livros.findIndex(
          (livro) =>
            livro.id === (action?.payload?.id || action?.payload?.data?.id)
        )
      : null;
  switch (action?.type) {
    case LivrosActionTypes.CREATE_LIVRO:
      const livro = {
        ...action.payload.data,
        id: id++
      };
      livros.push(livro);
      break;
    case LivrosActionTypes.REMOVE_LIVRO:
      livros.splice(
        livros.findIndex((livro) => livro.id === action.payload.id),
        1
      );
      break;
    case LivrosActionTypes.UPDATE_LIVRO:
      /* 
        O TypeScript deveria concluir que se estou no caso LivrosActionTypes.UPDATE_LIVRO,
        a assinatura de função que está sendo utilizada é a segunda, portanto,
        o tipo da prop data dentro da action é Livro.
        Como o TypeScript não está concluindo isso, preciso utilizar a keyword as pra garantir o tipo
      */
      livros[selectedLivroIndex] = action.payload.data as Livro;
      break;
    case LivrosActionTypes.ALUGAR_LIVRO:
      livros[selectedLivroIndex].alugado = true;
      break;
    case LivrosActionTypes.DEVOLVER_LIVRO:
      livros[selectedLivroIndex].alugado = false;
      break;
    default:
      return state;
  }
  if (
    action.type === LivrosActionTypes.CREATE_LIVRO ||
    action.type === LivrosActionTypes.REMOVE_LIVRO
  ) {
    livros.sort((a, b) => a.id - b.id);
  }
  return {
    livros
  };
}

export default reducer;
