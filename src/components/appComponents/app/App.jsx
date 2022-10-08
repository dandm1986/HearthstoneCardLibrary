import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../appHeader/AppHeader';
import MainSection from '../mainSection/MainSection';
import StartPage from '../../pages/startPage/StartPage';
import CardsListPage from '../../pages/cardsListPage/CardsListPage';
import SingleCardPage from '../../pages/singleCardPage/SingleCardPage';
import HeroesListPage from '../../pages/heroesListPage/HeroesListPage';
import SingleHeroPage from '../../pages/singleHeroPage/SingleHeroPage';
import FiltersPage from '../../pages/filtersPage/FiltersPage';
import ErrorBoundary from '../../minorComponents/errorBoundary/ErrorBoundary';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

import './app.scss';

function App() {
  return (
    <Router>
      <div className="app_container flex">
        <Header />
        <MainSection>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="cards" element={<CardsListPage />} />
              <Route path="cards/:id" element={<SingleCardPage />} />
              <Route path="heroes" element={<HeroesListPage />} />
              <Route path="heroes/:id" element={<SingleHeroPage />} />
              <Route path="filters" element={<FiltersPage />} />
              <Route
                path="*"
                element={<ErrorMessage text={'Oh-oh-oh! No such page...'} />}
              />
            </Routes>
          </ErrorBoundary>
        </MainSection>
      </div>
    </Router>
  );
}

export default App;
