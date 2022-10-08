import { useNavigate } from 'react-router-dom';
import TextComponent from '../textComponent/TextComponent';
import img from '../../../assets/img/error.png';

import './errorMessage.scss';

const ErrorMessage = ({
  text: message = 'A-A-A-A!!! Something went wrong...',
}) => {
  const reloadApp = () => {
    window.location.reload();
  };

  const navigate = useNavigate();

  return (
    <div className="error_message__container">
      <img src={img} alt="error" />
      <div className="error_message__container__content">
        <TextComponent text={message} />
        <button
          onClick={() => {
            navigate('/');
            reloadApp();
          }}
          className="btn"
        >
          Home page
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
