import { combineReducers } from 'redux';
import articles from './articles/articlesReducer';

export const rootReducer = combineReducers({
  articles,
});
