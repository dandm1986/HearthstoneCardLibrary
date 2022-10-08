import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import TextFieldComponent from '../../minorComponents/textFieldComponent/TextFieldComponent';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

import {
  fetchHeroes,
  setHeroes,
  resetCurrentHeroIdx,
  displayHero,
} from './heroesSlice';
import { fetchMetadata } from '../startPage/startSlice';

import './heroesListPage.scss';

const HeroesListPage = () => {
  const { heroes, heroesLength, heroesLoadingStatus } = useSelector(
    (state) => state.heroes
  );
  const { metadata, metadataLoadingStatus } = useSelector(
    (state) => state.metadata
  );

  const getCardIds = (classes) => {
    return classes
      .filter((item) => item.slug !== 'neutral')
      .map((item) => item.cardId);
  };

  const dispatch = useDispatch();

  const getHeroesList = async (metadata) => {
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
              type: metadata.types.find((type) => type.id === cardType)?.name,
              heroPowerName,
              heroPowerImg,
              heroCardsList: cards[0].childIds,
            };
          });
      })
    );
    dispatch(setHeroes(heroes));
  };

  useEffect(() => {
    if (!metadata) {
      dispatch(fetchMetadata())
        .then(unwrapResult)
        .then((metadata) => getHeroesList(metadata));
    } else {
      if (!heroesLength) getHeroesList(metadata);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (heroes) => {
    return (
      <SectionLayout>
        <SectionHeader headerText={`Heroes found: ${heroes.length}`} />
        <article className="heroes_list_page__content overflow">
          <ul className="heroes_list_page__content__heroes">
            {heroes.map((hero, i) => {
              const { id, heroName, heroImage } = hero;
              return (
                <li key={i}>
                  <Link
                    to={`/heroes/${id}`}
                    onClick={() => {
                      dispatch(displayHero(id));
                      dispatch(resetCurrentHeroIdx());
                    }}
                  >
                    <img src={heroImage} alt={heroName} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
        <footer className="heroes_list_page__footer section_footer">
          <TextFieldComponent text={`Select a hero to find out the details`} />
        </footer>
      </SectionLayout>
    );
  };

  const spinner = heroesLength !== 10 ? <Spinner /> : null;
  const error =
    metadataLoadingStatus === 'error' || heroesLoadingStatus === 'error' ? (
      <ErrorMessage />
    ) : null;
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
