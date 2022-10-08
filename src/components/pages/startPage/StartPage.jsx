import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import TextComponent from '../../minorComponents/textComponent/TextComponent';
import TextFieldComponent from '../../minorComponents/textFieldComponent/TextFieldComponent';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

import { fetchToken, fetchMetadata } from './startSlice';

import img from '../../../assets/img/start_page_hero.png';
import './startPage.scss';

const StartPage = () => {
  const { metadataLoadingStatus, tokenLoadingStatus } = useSelector(
    (state) => state.metadata
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToken()).then(() => {
      dispatch(fetchMetadata());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    return (
      <SectionLayout>
        <SectionHeader headerText={'Welcome to Hearthstone Card Library!'} />
        <article className="start_page__content overflow">
          <img className="start_page__content__image" src={img} alt="thrall" />
          <div className="start_page__content__description">
            <TextComponent text={'"Cards" section'} />
            <TextFieldComponent
              text={
                'Displays a list of all cards. Click on a card to get more information about it.'
              }
            />
            <TextComponent text={'"Heroes" section'} />
            <TextFieldComponent
              text={
                'Displays a list of all available heroes (classes) in the game. Click on a hero to find out details.'
              }
            />
            <TextComponent text={'"Filters" section'} />
            <TextFieldComponent
              text={
                'Get a list of cards that match specific query parameters, or simply enter a card name into the search field.'
              }
            />
            <TextComponent
              text={
                "Hearthstone is Blizzard's most colourful game. This service is designed primarily for enjoing the outstanding game art ;)"
              }
            />
          </div>
        </article>
        <footer className="start_page__footer section_footer">
          <Link to={'/cards'} className="btn">
            Go!
          </Link>
        </footer>
      </SectionLayout>
    );
  };

  const spinner =
    tokenLoadingStatus === 'loading' || metadataLoadingStatus === 'loading' ? (
      <Spinner />
    ) : null;
  const error =
    tokenLoadingStatus === 'error' || metadataLoadingStatus === 'error' ? (
      <ErrorMessage />
    ) : null;
  const content =
    tokenLoadingStatus === 'idle' && metadataLoadingStatus === `idle`
      ? renderContent()
      : null;

  return (
    <>
      {spinner}
      {error}
      {content}
    </>
  );
};

export default StartPage;
