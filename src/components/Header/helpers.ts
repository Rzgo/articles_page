import { IArticle } from '../../store/articles/articlesTypes';

export const filterByDate = (
  arr: IArticle[],
  { start, end }: { start?: Date; end?: Date }
) => {
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  return arr.filter(({ date }) => {
    const newDate = new Date(date);

    return startDate && startDate < newDate && endDate && endDate > newDate;
  });
};

export const getOptions = (arr: IArticle[], type: 'topic' | 'author') => {
  return arr.reduce((acc, item) => {
    switch (type) {
      case 'topic': {
        if (!acc.find((article) => article.topic === item.topic)) {
          acc.push(item);
        }
        break;
      }
      case 'author': {
        if (!acc.find((article) => article.author === item.author)) {
          acc.push(item);
        }
        break;
      }
    }
    return acc;
  }, [] as IArticle[]);
};
