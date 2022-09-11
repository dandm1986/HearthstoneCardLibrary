// Импорт из внешних библиотек
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Импорт методов
import { setQuery, fetchCards } from '../../pages/cardsListPage/cardsSlice';

// Импорт статических файлов
import searchFieldBg from '../../../assets/img/search_field__bg.png';
import './searchField.scss';

const SearchField = () => {
  const { query } = useSelector((state) => state.cards);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="search_field__container">
      <div className="search_field__bg">
        <img src={searchFieldBg} alt="Inset in a wooden plank" />
      </div>
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
          pageSize: 10,
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(setQuery(values));
          dispatch(fetchCards({ ...query, ...values }));
          navigate('/cards');
          resetForm({ values: '' });
        }}
      >
        <Form>
          <Field
            className="search_field__input"
            type="text"
            name="textFilter"
            placeholder="Найти карту..."
          />
        </Form>
      </Formik>
    </div>
  );
};

export default SearchField;
