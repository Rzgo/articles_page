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
    if (!acc.find((article) => article[type] === item[type])) {
      acc.push(item);
    }
    return acc;
  }, [] as IArticle[]);
};
