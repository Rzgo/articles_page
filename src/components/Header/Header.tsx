import { FC, useEffect } from 'react';
import {
  articlesSelectors,
  setModalAddOrEditIsOpen,
  setModalAddOrEditType,
} from '../../store/articles/articlesReducer';
import { Button, Input, Form, Select, DatePicker } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IArticle } from '../../store/articles/articlesTypes';
import { filterByDate, getOptions } from './helpers';
import { IFormValue } from './types';

import './Header.scss';

const { Option } = Select;

interface IProps {
  setCurrentArticlesArr: (value: IArticle[]) => void;
}

export const Header: FC<IProps> = ({ setCurrentArticlesArr }): JSX.Element => {
  const articles = useAppSelector(articlesSelectors.selectAll);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [articles, form]);

  const openAddModal = () => {
    dispatch(setModalAddOrEditIsOpen(true));
    dispatch(setModalAddOrEditType('add'));
  };

  const handleValueChange = (
    _: { [key: string]: string },
    allValues: IFormValue
  ) => {
    const filtredArr = articles.filter((item) => {
      const articleDataForSearch = (item.title + item.topic).toLowerCase();
      const author = item.author?.toLowerCase();
      const topic = item.topic?.toLowerCase();

      const authorSelect = allValues?.authorSelect?.toLowerCase();
      const topicSelect = allValues?.topicSelect?.toLowerCase();
      const searchValue = allValues?.search?.toLowerCase();

      const matchedByAuthor = !authorSelect || author.includes(authorSelect);
      const matchedByTopic = !topicSelect || topic.includes(topicSelect);
      const matchedBySearch =
        !searchValue || articleDataForSearch.includes(searchValue);

      return matchedByAuthor && matchedByTopic && matchedBySearch;
    });

    let result;
    let start;
    let end;

    if (allValues.range) {
      start = allValues.range[0].toDate();
      end = allValues.range[1].toDate();

      result = filterByDate(filtredArr, {
        start: start,
        end: end,
      });
    } else {
      result = filtredArr;
    }

    setCurrentArticlesArr(result);
  };

  return (
    <div className="header">
      <div>
        <Form onValuesChange={handleValueChange} layout="vertical" form={form}>
          <Form.Item name="search" label="Поиск" className="header__formItem">
            <Input placeholder="Поиск" className="header__input" />
          </Form.Item>
          <Form.Item name="topicSelect" label="Фильтрация по теме">
            <Select showSearch allowClear placeholder="Выберите тему">
              {getOptions(articles, 'topic').map((item) => (
                <Option key={item.id} value={item.topic}>
                  {item.topic}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="authorSelect" label="Фильтрация по авторам">
            <Select showSearch allowClear placeholder="Выберите автора">
              {getOptions(articles, 'author').map((item) => (
                <Option key={item.id} value={item.author}>
                  {item.author}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="range" label="Фильтрация по дате">
            <DatePicker.RangePicker />
          </Form.Item>
        </Form>
      </div>
      <Button onClick={openAddModal}>Добавить статью</Button>
    </div>
  );
};
