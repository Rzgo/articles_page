import { Dayjs } from 'dayjs';

export interface IFormItem {
  name: string;
  label: string;
  type: string;
  value?: string;
}

export interface IForm {
  author: string;
  date: Dayjs;
  text: string;
  title: string;
  topic: string;
}
