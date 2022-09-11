// Импорт из внешних библиотек
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Импорт компонентов
import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import TextFieldComponent from '../../minorComponents/textFieldComponent/TextFieldComponent';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

// Импорт методов
import { createFilterStr } from '../../../services/hearthstoneApiService';
import { fetchHeroes, resetCurrentHeroIdx, displayHero } from './heroesSlice';

// Импорт статических файлов
import './heroesListPage.scss';

const HeroesListPage = () => {
  const { heroes, heroesLength, queryData, heroesLoadingStatus } = useSelector(
    (state) => state.heroes
  );
  const { metadata } = useSelector((state) => state.metadata);

  const getCardIds = () => {
    return metadata.classes
      .filter((item) => item.slug !== 'neutral')
      .map((item) => item.cardId);
  };

  const { apiBase, endpoint, filters } = queryData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (heroesLength !== 10) {
      getCardIds().forEach((id) => {
        dispatch(
          fetchHeroes({
            apiBase,
            endpoint,
            filters: createFilterStr({ ...filters, ids: id }),
          })
        );
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (heroes, metadata) => {
    return (
      <SectionLayout>
        <SectionHeader headerText={`Найдено героев: ${heroes.length}`} />
        <article className="heroes_list_page__content overflow">
          <ul className="heroes_list_page__content__heroes">
            {heroes.map((hero) => {
              const card = hero.cards[0];
              return (
                <li key={card.id}>
                  <Link
                    to={`/heroes/${card.id}`}
                    onClick={() => {
                      dispatch(displayHero(card.id));
                      dispatch(resetCurrentHeroIdx());
                    }}
                  >
                    <img src={card.image} alt={card.name} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
        <footer className="heroes_list_page__footer section_footer">
          <TextFieldComponent
            text={`Выберите героя, чтобы получить более подробную информацию о нём`}
          />
        </footer>
      </SectionLayout>
    );
  };

  const spinner = heroesLength < 10 ? <Spinner /> : null;
  const error = heroesLoadingStatus === 'error' ? <ErrorMessage /> : null;
  const content = heroesLength === 10 ? renderContent(heroes) : null;

  return (
    <>
      {spinner}
      {error}
      {content}
    </>
  );
};

export default HeroesListPage;
