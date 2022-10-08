import { NavLink } from 'react-router-dom';
import './navBar.scss';

const NavBar = () => {
  return (
    <nav className="nav">
      <ul className="nav_links">
        <li>
          <NavLink
            to={'/cards'}
            className="nav_links__link"
            style={({ isActive }) => ({
              color: isActive ? '#fcd144' : '#d4b13e',
            })}
          >
            Cards
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/heroes'}
            className="nav_links__link"
            style={({ isActive }) => ({
              color: isActive ? '#fcd144' : '#d4b13e',
            })}
          >
            Heroes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
