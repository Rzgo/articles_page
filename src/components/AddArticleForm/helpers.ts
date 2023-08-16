export const formArray = [
  { name: 'title', label: 'Заголовок', type: 'input' },
  { name: 'text', label: 'Содержание', type: 'textArea' },
  { name: 'topic', label: 'Тема', type: 'input' },
  { name: 'author', label: 'Автор', type: 'input' },
  { name: 'date', label: 'Дата', type: 'date' },
];

export const getCurrentTitle = (type: string) => {
  if (type === 'add') {
    return 'Добавить';
  } else {
    return 'Редактировать';
  }
};
