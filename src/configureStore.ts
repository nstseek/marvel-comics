import { LivrosState } from 'reducers/livros';
import logger from 'redux-logger';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  CombinedState
} from 'redux';
import LivrosReducer from 'reducers/livros/livros.store';

export type AppState = CombinedState<{
  biblioteca: LivrosState;
}>;
export default function configureStore() {
  const rootReducer = combineReducers<AppState>({
    biblioteca: LivrosReducer
  });
  const middlewares = process.env.NODE_ENV === 'development' ? [logger] : [];
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
}

export const store = configureStore();
