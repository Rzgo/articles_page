import { FC } from 'react';
import { Modal } from '../Modal';
import {
  addComment,
  setCurrentArticle,
  setModalCommentIsOpen,
} from '../../store/articles/articlesReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Form, Button } from 'antd';
import { formCommentArray } from './helpers';
import { FormGenerator } from '../FormGenerator';
import { IFormComment } from './types';
import { nanoid } from '@reduxjs/toolkit';

import './AddCommentModal.scss';

export const AddCommentModal: FC = (): JSX.Element => {
  const { currentArticle } = useAppSelector((state) => state.app.articles);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setModalCommentIsOpen(false));
    dispatch(setCurrentArticle(null));
  };

  const handleFinish = (value: IFormComment) => {
    const body = { ...value, id: nanoid(), articleId: currentArticle?.id };
    dispatch(addComment(body));
    handleClose();
  };

  return (
    <Modal onClose={handleClose}>
      <div className="addCommentModal">
        <h3 className="addCommentModal__title">Добавить комментарий</h3>
        <Form layout="vertical" onFinish={handleFinish}>
          {formCommentArray.map((item) => (
            <FormGenerator article={item} />
          ))}
          <div className="addArticleForm__buttonsWrapper">
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Добавить
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="button" onClick={handleClose}>
                Отмена
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
