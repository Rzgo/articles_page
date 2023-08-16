import { FC, useEffect, useState } from 'react';
import { articlesSelectors } from '../../store/articles/articlesReducer';
import { Article } from '../Article';
import { Empty } from 'antd';
import { Header } from '../Header';
import { useAppSelector } from '../../hooks';

import './ArticleList.scss';

export const ArticleList: FC = (): JSX.Element => {
  const articles = useAppSelector(articlesSelectors.selectAll);

  const [currentArticlesArr, setCurrentArticlesArr] = useState(articles);

  useEffect(() => {
    setCurrentArticlesArr(articles);
  }, [articles]);

  return (
    <div className="articleList">
      <Header setCurrentArticlesArr={setCurrentArticlesArr} />
      <div className="articleList__wrapper">
        {currentArticlesArr.length ? (
          currentArticlesArr.map((item) => (
            <Article key={item.id} article={item} />
          ))
        ) : (
          <Empty description="Список пуст" />
        )}
      </div>
    </div>
  );
};
