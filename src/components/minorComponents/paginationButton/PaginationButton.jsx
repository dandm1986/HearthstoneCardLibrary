import './paginationButton.scss';
import icons from '../../../assets/img/icons.svg';

const PaginationButton = ({ currentPage, totalPages, prev, next }) => {
  return (
    <div className="pagination_btn">
      <p className="pagination_btn__text absolute_centered">{`${currentPage} / ${totalPages}`}</p>
      <div className="pagination_btn__btns">
        <button id="prev" onClick={prev}>
          <svg className="pagination_btn__btns__icon">
            <use href={`${icons}#prev`}></use>
          </svg>
        </button>
        <button id="next" onClick={next}>
          <svg className="pagination_btn__btns__icon">
            <use href={`${icons}#next`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginationButton;
