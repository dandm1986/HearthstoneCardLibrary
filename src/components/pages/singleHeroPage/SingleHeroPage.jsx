import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import TextComponent from '../../minorComponents/textComponent/TextComponent';
import TextFieldComponent from '../../minorComponents/textFieldComponent/TextFieldComponent';
import PaginationButton from '../../minorComponents/paginationButton/PaginationButton';
import Spinner from '../../minorComponents/spinner/Spinner';

import {
  createIdList,
  createFilterStr,
} from '../../../services/hearthstoneApiService';
import {
  fetchHeroCards,
  prevHero,
  nextHero,
} from '../heroesListPage/heroesSlice';

import './singleHeroPage.scss';

const SingleHeroPage = () => {
  const {
    heroes,
    currentHero,
    queryData,
    heroCards,
    currentHeroCardIdx,
    heroCardsLoadingStatus,
  } = useSelector((state) => state.heroes);

  const { metadata } = useSelector((state) => state.metadata);

  const { apiBase, endpoint, filters } = queryData;

  const dispatch = useDispatch();

  const hero = heroes.find((hero) => hero.hero.id === currentHero);
  const {
    hero: thisHero,
    heroPower: { image: heroPowerImg, name: heroPowerName },
  } = hero;

  const childIds = createIdList(thisHero.childIds);

  useEffect(() => {
    dispatch(
      fetchHeroCards({
        apiBase,
        endpoint,
        filters: createFilterStr({ ...filters, ids: childIds }),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHeroCardIdx]);

  const renderContent = (card) => {
    const { name: heroName, image: heroImg, artistName: artist, health } = card;

    const type = metadata.types.find(
      (type) => type.id === card.cardTypeId
    )?.name;
    const heroClass = metadata.classes.find(
      (heroClass) => heroClass.id === card.classId
    )?.name;

    return (
      <SectionLayout>
        <SectionHeader headerText={heroName} />
        <article className="single_hero_page__card overflow">
          <img src={heroImg} alt={heroName} />
          <div className="single_hero_page__card__description">
            <div className="single_hero_page__card__description__field_grid">
              <TextComponent text={'Класс'} />
              <TextFieldComponent text={heroClass} />
            </div>
            <div className="single_hero_page__card__description__field_grid">
              <TextComponent text={'Тип'} />
              <TextFieldComponent text={type} />
            </div>
            <div className="single_hero_page__card__description__field_grid">
              <TextComponent text={'Здоровье'} />
              <TextFieldComponent text={health} />
            </div>
            <div className="single_hero_page__card__description__field_grid">
              <TextComponent text={'Художник'} />
              <TextFieldComponent text={artist} />
            </div>
            <div className="single_hero_page__card__description__field_grid">
              <TextComponent text={'Сила героя'} />
              <img src={heroPowerImg} alt={heroPowerName} />
            </div>
          </div>
        </article>
        <footer className="single_hero_page__footer section_footer">
          <PaginationButton
            currentPage={currentHeroCardIdx + 1}
            totalPages={heroCards.length}
            prev={() =>
              dispatch(
                prevHero(
                  currentHeroCardIdx !== 0
                    ? currentHeroCardIdx - 1
                    : heroCards.length - 1
                )
              )
            }
            next={() =>
              dispatch(
                nextHero(
                  currentHeroCardIdx !== heroCards.length - 1
                    ? currentHeroCardIdx + 1
                    : 0
                )
              )
            }
          />
          <Link to={'/heroes'} className="btn">
            Назад
          </Link>
        </footer>
      </SectionLayout>
    );
  };

  const spinner = heroCardsLoadingStatus === 'loading' ? <Spinner /> : null;

  const content =
    heroCardsLoadingStatus === `idle` && heroCards
      ? renderContent(heroCards[currentHeroCardIdx])
      : null;

  return (
    <>
      {spinner}
      {content}
    </>
  );
};

export default SingleHeroPage;
