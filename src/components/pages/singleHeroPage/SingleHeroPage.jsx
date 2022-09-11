// Импорт из внешних библиотек
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

// Импорт компонентов
import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import TextComponent from '../../minorComponents/textComponent/TextComponent';
import TextFieldComponent from '../../minorComponents/textFieldComponent/TextFieldComponent';
import PaginationButton from '../../minorComponents/paginationButton/PaginationButton';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

// Импорт методов
import {
  fetchHeroes,
  setHeroes,
  displayHero,
  fetchHeroCards,
  resetCurrentHeroIdx,
  prevHero,
  nextHero,
} from '../heroesListPage/heroesSlice';
import { fetchMetadata } from '../startPage/startSlice';

// Импорт статических файлов
import './singleHeroPage.scss';

const SingleHeroPage = () => {
  const {
    heroes,
    currentHero,
    heroCards,
    currentHeroCardIdx,
    heroCardsLoadingStatus,
  } = useSelector((state) => state.heroes);

  const dispatch = useDispatch();
  const location = useLocation();

  const getHeroData = (heroes, currentIdx = currentHero) => {
    const hero = heroes.find((hero) => hero.id === currentIdx);
    const { heroCardsList } = hero;
    dispatch(fetchHeroCards(heroCardsList));
  };

  const getCardIds = (classes) => {
    return classes
      .filter((item) => item.slug !== 'neutral')
      .map((item) => item.cardId);
  };

  useEffect(() => {
    if (!heroes) {
      const currentIdx = +location.pathname.split('/').slice(-1).join('');
      dispatch(displayHero(currentIdx));
      dispatch(fetchMetadata())
        .then(unwrapResult)
        .then(async (metadata) => {
          const { classes } = metadata;
          const ids = getCardIds(classes);
          const heroes = await Promise.all(
            ids.map(async (id) => {
              return dispatch(fetchHeroes({ ids: id }))
                .then(unwrapResult)
                .then((hero) => {
                  const {
                    hero: {
                      name: heroName,
                      image: heroImage,
                      id,
                      cardTypeId: cardType,
                    },
                    heroPower: { image: heroPowerImg, name: heroPowerName },
                    class: { name: heroClass },
                    cards,
                  } = hero;
                  return {
                    id,
                    heroName,
                    heroImage,
                    heroClass,
                    type: metadata.types.find((type) => type.id === cardType)
                      ?.name,
                    heroPowerName,
                    heroPowerImg,
                    heroCardsList: cards[0].childIds,
                  };
                });
            })
          );
          getHeroData(heroes, currentIdx);
          dispatch(setHeroes(heroes));
        })
        .then(() => {
          dispatch(resetCurrentHeroIdx());
        });
    } else {
      getHeroData(heroes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHeroCardIdx]);

  const renderContent = (card) => {
    const hero = heroes?.find((hero) => hero.id === currentHero);
    const { heroClass, type, heroPowerImg, heroPowerName } = hero;
    const { name: heroName, image: heroImg, artistName: artist, health } = card;

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

  const spinner =
    heroCardsLoadingStatus === 'loading' || !heroes ? <Spinner /> : null;
  const error = heroCardsLoadingStatus === 'error' ? <ErrorMessage /> : null;
  const content =
    heroCardsLoadingStatus === `idle` && heroCards
      ? renderContent(heroCards[currentHeroCardIdx])
      : null;

  return (
    <>
      {spinner}
      {error}
      {content}
    </>
  );
};

export default SingleHeroPage;
