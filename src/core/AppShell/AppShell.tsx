import { FC } from 'react';
import { AddArticleForm, ArticleList } from '../../components';
import { useAppSelector } from '../../hooks';
import { AddCommentModal } from '../../components/AddCommentModal';

import './AppShell.scss';

export const AppShell: FC = (): JSX.Element => {
  const { modalAddOrEditIsOpen, modalCommentIsOpen } = useAppSelector(
    (state) => state.app.articles
  );

  return (
    <div className="appShell">
      <ArticleList />
      {modalAddOrEditIsOpen && <AddArticleForm />}
      {modalCommentIsOpen && <AddCommentModal />}
    </div>
  );
};
