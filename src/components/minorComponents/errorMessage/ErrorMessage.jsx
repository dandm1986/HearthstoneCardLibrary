import { useNavigate } from 'react-router-dom';
import TextComponent from '../textComponent/TextComponent';
import img from '../../../assets/img/error.png';

import './errorMessage.scss';

const ErrorMessage = ({ message }) => {
  const reloadApp = () => {
    window.location.reload();
  };

  const navigate = useNavigate();

  return (
    <div className="error_message__container">
      <img src={img} alt="error" />
      <div className="error_message__container__content">
        <TextComponent text={`A-A-A-A!!! Что-то пошло не так...`} />
        <button
          onClick={() => {
            navigate('/');
            reloadApp();
          }}
          className="btn"
        >
          На главную страницу
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
