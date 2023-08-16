import { FC } from 'react';
import { Input, DatePicker, Form } from 'antd';
import { IFormItem } from '../AddArticleForm/types';
import dayjs from 'dayjs';

import './FormGenerator.scss';

const { TextArea } = Input;

interface IProps {
  article: IFormItem;
}

export const FormGenerator: FC<IProps> = ({ article }): JSX.Element => {
  switch (article.type) {
    case 'input': {
      return (
        <Form.Item
          label={article.label}
          name={article.name}
          className="formGenerator__formItem"
          initialValue={article?.value && article?.value}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, заполните поле!',
            },
          ]}
        >
          <Input className="formGenerator__input" />
        </Form.Item>
      );
    }
    case 'textArea': {
      return (
        <Form.Item
          label={article.label}
          name={article.name}
          className="formGenerator__formItem"
          initialValue={article?.value && article?.value}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, заполните поле!',
            },
          ]}
        >
          <TextArea className="formGenerator__textArea" />
        </Form.Item>
      );
    }
    case 'date': {
      return (
        <Form.Item
          label={article.label}
          name={article.name}
          className="formGenerator__formItem"
          initialValue={article?.value && dayjs(article?.value)}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, заполните поле!',
            },
          ]}
        >
          <DatePicker picker={'date'} />
        </Form.Item>
      );
    }
    default:
      return (
        <Form.Item
          label={article.label}
          name={article.name}
          className="formGenerator__formItem"
          initialValue={article?.value && article?.value}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, заполните поле!',
            },
          ]}
        >
          <Input className="formGenerator__input" />
        </Form.Item>
      );
  }
};
