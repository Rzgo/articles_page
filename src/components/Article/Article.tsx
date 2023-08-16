import { FC } from 'react';
import { IArticle } from '../../store/articles/articlesTypes';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  commentSelectors,
  removeArticle,
  setCurrentArticle,
  setModalAddOrEditIsOpen,
  setModalAddOrEditType,
  setModalCommentIsOpen,
} from '../../store/articles/articlesReducer';
import { CommentOutlined } from '@ant-design/icons';

import './Article.scss';

interface IProps {
  article: IArticle;
}

export const Article: FC<IProps> = ({ article }): JSX.Element => {
  const comments = useAppSelector(commentSelectors.selectAll);

  const dispatch = useAppDispatch();

  const editArticle = () => {
    dispatch(setCurrentArticle(article));
    dispatch(setModalAddOrEditIsOpen(true));
    dispatch(setModalAddOrEditType('edit'));
  };

  const deleteArticle = () => {
    dispatch(removeArticle(article.id));
  };

  const openCommentModal = () => {
    dispatch(setCurrentArticle(article));
    dispatch(setModalCommentIsOpen(true));
  };

  const date = new Date(article.date).toLocaleDateString();
  const commetsLength = comments?.filter(
    (item) => item.articleId === article.id
  ).length;

  return (
    <div className="article">
      <div className="article__leftSide">
        <div className="article__wrapper">
          <h3 className="article__title">{article.title}</h3>
          <div className="article__box">
            <span className="article__topic">{article.topic}</span>
            <span className="article__author">{article.author}</span>
          </div>
          <p className="article__text">{article.text}</p>
          <span className="article__date">{date}</span>
        </div>
        <div className="article__footer">
          <span>{`Комментарии (${commetsLength})`}</span>
          <div className="article__buttonWrapper">
            <Button onClick={editArticle}>Редактировать</Button>
            <Button onClick={deleteArticle}>Удалить</Button>
          </div>
        </div>
      </div>
      <div className="article__commentWrapper" onClick={openCommentModal}>
        <CommentOutlined />
      </div>
    </div>
  );
};
