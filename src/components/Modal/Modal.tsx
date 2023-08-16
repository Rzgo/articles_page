import { FC } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: FC<IProps> = ({ children, onClose }): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal__body" onClick={handleClick}>
        {children}
      </div>
    </div>,
    document.body
  );
};
