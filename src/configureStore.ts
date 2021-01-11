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
export default function configureStore(defaultStore = LivrosReducer) {
  const rootReducer = combineReducers<AppState>({
    biblioteca: defaultStore
  });
  const middlewares = process.env.NODE_ENV === 'development' ? [logger] : [];
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
}

export const store = configureStore();
