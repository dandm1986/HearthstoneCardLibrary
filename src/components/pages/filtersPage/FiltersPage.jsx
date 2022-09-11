// Импорт из внешних библиотек
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';

// Импорт компонентов
import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

// Импорт методов
import { setQuery, fetchCards } from '../cardsListPage/cardsSlice';
import { fetchMetadata } from '../startPage/startSlice';

// Импорт статических файлов
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
                Набор
              </label>
              <Field
                className="filters_page__form__field"
                id="set"
                name="set"
                as="select"
              >
                <option value="">Выберите набор...</option>
                {createFilterableOptions(metadata.sets)}
              </Field>
            </div>
            <div className="filters_page__form__grid_2_cols">
              <label className="filters_page__form__label" htmlFor="gameMode">
                Режим игры
              </label>
              <Field
                className="filters_page__form__field"
                id="gameMode"
                name="gameMode"
                as="select"
              >
                <option value="">Выберите режим игры...</option>
                {createFilterableOptions(metadata.gameModes)}
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="class">
                Класс
              </label>
              <Field
                className="filters_page__form__field"
                id="class"
                name="class"
                as="select"
              >
                <option value="">Выберите класс...</option>
                {createFilterableOptions(metadata.classes)}
              </Field>
              <label className="filters_page__form__label" htmlFor="manaCost">
                Стоимость маны
              </label>
              <Field
                className="filters_page__form__field"
                id="manaCost"
                name="manaCost"
                as="select"
              >
                <option value="">Выберите стоимость...</option>
                {createNumericOptions(0)}
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="rarity">
                Редкость
              </label>
              <Field
                className="filters_page__form__field"
                id="rarity"
                name="rarity"
                as="select"
              >
                <option value="">Выберите редкость...</option>
                {createFilterableOptions(metadata.rarities)}
              </Field>
              <label
                className="filters_page__form__label"
                htmlFor="collectible"
              >
                Коллекционные
              </label>
              <Field
                className="filters_page__form__field"
                id="collectible"
                name="collectible"
                as="select"
              >
                <option value="">Выберите...</option>
                <option value="0,1">Все</option>
                <option value="0">Неколлекционные</option>
                <option value="1">Коллекционные</option>
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="attack">
                Атака
              </label>
              <Field
                className="filters_page__form__field"
                id="attack"
                name="attack"
                as="select"
              >
                <option value="">Выберите атаку...</option>
                {createNumericOptions(0)}
              </Field>
              <label className="filters_page__form__label" htmlFor="health">
                Здоровье
              </label>
              <Field
                className="filters_page__form__field"
                id="health"
                name="health"
                as="select"
              >
                <option value="">Выберите здоровье...</option>
                {createNumericOptions(1)}
              </Field>
            </div>
            <div className="filters_page__form__grid_4_cols">
              <label className="filters_page__form__label" htmlFor="type">
                Тип
              </label>
              <Field
                className="filters_page__form__field"
                id="type"
                name="type"
                as="select"
              >
                <option value="">Выберите тип...</option>
                {createFilterableOptions(metadata.types)}
              </Field>
              <label className="filters_page__form__label" htmlFor="minionType">
                Тип существа
              </label>
              <Field
                className="filters_page__form__field"
                id="minionType"
                name="minionType"
                as="select"
              >
                <option value="">Выберите подтип...</option>
                {createFilterableOptions(metadata.minionTypes)}
              </Field>
            </div>
          </Form>
        </Formik>
        <footer className="filters_page__footer section_footer">
          <button className="btn" type="submit" form="filter_form">
            Поиск
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
