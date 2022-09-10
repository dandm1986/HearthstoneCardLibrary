import { Link } from 'react-router-dom';
import btnBG from '../../../assets/img/icon_bg.png';
import icons from '../../../assets/img/icons.svg';

import './filterButton.scss';

const FilterButton = () => {
  return (
    <Link to={'/filters'} className="filter_btn__container">
      <img
        className="filter_btn__bg"
        src={btnBG}
        alt="circle inset in the wood"
      />
      <div className="filter_btn__fill absolute_centered"></div>
      <svg className="filter_btn__icon absolute_centered">
        <use href={`${icons}#filter`}></use>
      </svg>
    </Link>
  );
};

export default FilterButton;
