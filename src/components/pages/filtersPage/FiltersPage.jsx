import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

import { setQuery, fetchCards } from '../cardsListPage/cardsSlice';
import { fetchMetadata } from '../startPage/startSlice';

import './filtersPage.scss';

const FiltersPage = () => {
  const { metadata, metadataLoadingStatus } = useSelector(
    (state) => state.metadata
  );
  const { query } = useSelector((state) => state.cards);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createFilterableOptions = (data) => {
    return data.map((item) => (
      <option key={item.id} value={item.slug}>
        {item.name}
      </option>
    ));
  };

  const createNumericOptions = (startValue) => {
    const arr = [];
    for (let i = startValue; i <= 10; i++) {
      arr.push(i);
    }
    return arr.map((item, i) => (
      <option key={i} value={`${item}`}>
        {item === 10 ? `${item}+` : item}
      </option>
    ));
  };

  useEffect(() => {
    if (!metadata) {
      dispatch(fetchMetadata());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = (metadata) => {
    return (
      <SectionLayout>
        <SectionHeader headerText={'Выберите параметры поиска карты'} />

        <Formik
          initialValues={{
            textFilter: ``,
            set: ``,
            class: ``,
            manaCost: ``,
            attack: ``,
            health: ``,
            collectible: ``,
            rarity: ``,
            type: ``,
            minionType: ``,
            gameMode: ``,
            page: 1,
          }}
          onSubmit={(values) => {
            dispatch(setQuery(values));
            dispatch(fetchCards({ ...query, ...values }));
            navigate('/cards');
          }}
        >
          <Form id="filter_form" className="filters_page__form overflow">
            <div className="filters_page__form__grid_2_cols">
              <label className="filters_page__form__label" htmlFor="set">
                Set
              </label>
              <Field
                className="filters_page__form__field"
                id="set"
                name="set"
                as="select"
              >
                <option value="">Select a set...</option>
                {createFilterableOptions(metadata.sets)}
              </Field>
            </div>
            <div className="filters_page__form__grid_2_cols">
              <label className="filters_page__form__label" htmlFor="gameMode">
                Game Mode
              </label>
              <Field
                className="filters_page__form__field"
                id="gameMode"
                name="gameMode"
                as="select"
              >
                <option value="">Select a game mode...</option>
                {createFilterableOptions(metadata.gameModes)}
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="class">
                Class
              </label>
              <Field
                className="filters_page__form__field"
                id="class"
                name="class"
                as="select"
              >
                <option value="">Select a class...</option>
                {createFilterableOptions(metadata.classes)}
              </Field>
              <label className="filters_page__form__label" htmlFor="manaCost">
                Mana Cost
              </label>
              <Field
                className="filters_page__form__field"
                id="manaCost"
                name="manaCost"
                as="select"
              >
                <option value="">Select mana cost...</option>
                {createNumericOptions(0)}
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="rarity">
                Rarity
              </label>
              <Field
                className="filters_page__form__field"
                id="rarity"
                name="rarity"
                as="select"
              >
                <option value="">Select rarity...</option>
                {createFilterableOptions(metadata.rarities)}
              </Field>
              <label
                className="filters_page__form__label"
                htmlFor="collectible"
              >
                Collectible
              </label>
              <Field
                className="filters_page__form__field"
                id="collectible"
                name="collectible"
                as="select"
              >
                <option value="">Select...</option>
                <option value="0,1">All</option>
                <option value="0">Non-collectible</option>
                <option value="1">Collectible</option>
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="attack">
                Attack
              </label>
              <Field
                className="filters_page__form__field"
                id="attack"
                name="attack"
                as="select"
              >
                <option value="">Select attack...</option>
                {createNumericOptions(0)}
              </Field>
              <label className="filters_page__form__label" htmlFor="health">
                Health
              </label>
              <Field
                className="filters_page__form__field"
                id="health"
                name="health"
                as="select"
              >
                <option value="">Select health...</option>
                {createNumericOptions(1)}
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="type">
                Type
              </label>
              <Field
                className="filters_page__form__field"
                id="type"
                name="type"
                as="select"
              >
                <option value="">Select a type...</option>
                {createFilterableOptions(metadata.types)}
              </Field>
              <label className="filters_page__form__label" htmlFor="minionType">
                Minion Type
              </label>
              <Field
                className="filters_page__form__field"
                id="minionType"
                name="minionType"
                as="select"
              >
                <option value="">Select a minion type...</option>
                {createFilterableOptions(metadata.minionTypes)}
              </Field>
            </div>
          </Form>
        </Formik>
        <footer className="filters_page__footer section_footer">
          <button className="btn" type="submit" form="filter_form">
            Search
          </button>
        </footer>
      </SectionLayout>
    );
  };

  const spinner = metadataLoadingStatus === 'loading' ? <Spinner /> : null;
  const error = metadataLoadingStatus === 'error' ? <ErrorMessage /> : null;
  const content =
    metadataLoadingStatus === `idle` && metadata
      ? renderContent(metadata)
      : null;

  return (
    <>
      {spinner}
      {error}
      {content}
    </>
  );
};

export default FiltersPage;
