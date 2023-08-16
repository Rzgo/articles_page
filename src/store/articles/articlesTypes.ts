import { EntityState } from '@reduxjs/toolkit';

export interface IInitialState {
  allArticles: EntityState<IArticle>;
  allComments: EntityState<IComment>;
  currentArticle: IArticle | null;
  modalAddOrEditIsOpen: boolean;
  modalAddOrEditType: 'add' | 'edit';
  modalCommentIsOpen: boolean;
}

export interface IArticle {
  id: string;
  title: string;
  text: string;
  topic: string;
  author: string;
  date: string;
}

export interface IComment {
  id: string;
  name: string;
  comment: string;
  articleId?: string;
}
