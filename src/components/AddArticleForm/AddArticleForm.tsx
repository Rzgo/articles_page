import { useEffect, useState, FC } from 'react';
import { Modal } from '../Modal';
import { Form, Button, Spin } from 'antd';
import { formArray, getCurrentTitle } from './helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addArticle,
  editArticle,
  setCurrentArticle,
  setModalAddOrEditIsOpen,
} from '../../store/articles/articlesReducer';
import { FormGenerator } from '../FormGenerator';
import { IForm, IFormItem } from './types';
import { nanoid } from 'nanoid';
import { IArticle } from '../../store/articles/articlesTypes';

import './AddArticleForm.scss';

export const AddArticleForm: FC = (): JSX.Element => {
  const { modalAddOrEditType, currentArticle } = useAppSelector(
    (state) => state.app.articles
  );
  const [currentFormArr, setCurrentFormArr] = useState<IFormItem[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const addedItitialState = formArray.map((item) => {
      if (currentArticle) {
        return {
          ...item,
          value: currentArticle[item.name as keyof IArticle],
        };
      }
      return item;
    });

    setCurrentFormArr(addedItitialState);
  }, [currentArticle]);

  const handleClose = () => {
    dispatch(setModalAddOrEditIsOpen(false));
    dispatch(setCurrentArticle(null));
  };

  const handleFinish = (value: IForm) => {
    const date = value.date.toDate().toISOString();

    if (modalAddOrEditType === 'add') {
      dispatch(addArticle({ ...value, id: nanoid(), date: date }));
    } else {
      dispatch(editArticle({ ...value, id: currentArticle?.id, date: date }));
    }
    handleClose();
  };

  return (
    <Modal onClose={handleClose}>
      <div className="addArticleForm">
        <h3 className="addArticleForm__title">{`${getCurrentTitle(
          modalAddOrEditType
        )} статью`}</h3>
        {currentFormArr.length ? (
          <Form layout="vertical" onFinish={handleFinish}>
            {currentFormArr.map((item) => (
              <FormGenerator article={item} key={nanoid()} />
            ))}
            <div className="addArticleForm__buttonsWrapper">
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  {getCurrentTitle(modalAddOrEditType)}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType="button" onClick={handleClose}>
                  Отмена
                </Button>
              </Form.Item>
            </div>
          </Form>
        ) : (
          <Spin size={'large'} />
        )}
      </div>
    </Modal>
  );
};
