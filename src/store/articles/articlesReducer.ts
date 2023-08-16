import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IArticle, IComment, IInitialState } from './articlesTypes';

const articlesAdapter = createEntityAdapter<IArticle>();
export const articlesSelectors = articlesAdapter.getSelectors(
  (state: RootState) => state.app.articles.allArticles
);

const commentAdapter = createEntityAdapter<IComment>();
export const commentSelectors = commentAdapter.getSelectors(
  (state: RootState) => state.app.articles.allComments
);

const initialState: IInitialState = {
  allArticles: articlesAdapter.getInitialState(),
  allComments: commentAdapter.getInitialState(),
  currentArticle: null,
  modalAddOrEditIsOpen: false,
  modalAddOrEditType: 'add',
  modalCommentIsOpen: false,
};

const articles = createSlice({
  name: 'articles',
  initialState: initialState,
  reducers: {
    editArticle(state, action) {
      articlesAdapter.setOne(state.allArticles, action.payload);
    },
    addArticle(state, action) {
      articlesAdapter.addOne(state.allArticles, action.payload);
    },
    removeArticle(state, action) {
      articlesAdapter.removeOne(state.allArticles, action.payload);
    },
    setModalAddOrEditIsOpen(state, action) {
      state.modalAddOrEditIsOpen = action.payload;
    },
    setCurrentArticle(state, action) {
      state.currentArticle = action.payload;
    },
    setModalAddOrEditType(state, action) {
      state.modalAddOrEditType = action.payload;
    },
    setModalCommentIsOpen(state, action) {
      state.modalCommentIsOpen = action.payload;
    },
    addComment(state, action) {
      commentAdapter.addOne(state.allComments, action.payload);
    },
  },
});

export const {
  editArticle,
  addArticle,
  removeArticle,
  setModalAddOrEditIsOpen,
  setCurrentArticle,
  setModalAddOrEditType,
  setModalCommentIsOpen,
  addComment,
} = articles.actions;

export default articles.reducer;
