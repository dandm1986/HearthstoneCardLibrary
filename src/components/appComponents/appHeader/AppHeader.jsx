import { Link } from 'react-router-dom';
import { useRef } from 'react';
import FilterButton from '../../minorComponents/filterButton/FilterButton';
import SearchField from '../../minorComponents/searchField/SearchField';
import NavBar from '../../minorComponents/navBar/NavBar';

import bgMiddle from '../../../assets/img/wood_middle_repeat.png';
import bgLeft from '../../../assets/img/wood_left.png';
import bgRight from '../../../assets/img/wood_right.png';
import logo from '../../../assets/img/main_logo.webp';

import './appHeader.scss';

const AppHeader = () => {
  const headerLogo = useRef(null);

  const toggleScale = (e, ref) => {
    switch (e._reactName) {
      case 'onMouseEnter':
        ref.current.classList.add('scaleUp');
        break;
      case 'onMouseLeave':
        ref.current.classList.remove('scaleUp');
        break;
      default:
        break;
    }
  };

  return (
    <header className="main_header flex">
      <div className="main_header__bg">
        <div className="overflow_x">
          <img
            src={bgMiddle}
            className="main_header__bg__middle"
            alt=" middle section of a wooden plank"
          />
        </div>

        <img
          src={bgLeft}
          className="main_header__bg__left"
          alt=" left section of a wooden plank"
        />
        <img
          src={bgRight}
          className="main_header__bg__right"
          alt=" right section of a wooden plank"
        />
      </div>
      <div className="main_header__container flex">
        <Link
          to={'/'}
          onMouseEnter={(e) => {
            toggleScale(e, headerLogo);
          }}
          onMouseLeave={(e) => {
            toggleScale(e, headerLogo);
          }}
          className="main_header__link"
        />
        <img
          ref={headerLogo}
          className="main_header__logo"
          src={logo}
          alt="Hearthstone logo"
        ></img>
        <div className="main_header__filter flex">
          <FilterButton />
          <SearchField />
        </div>
        <NavBar />
      </div>
    </header>
  );
};

export default AppHeader;
