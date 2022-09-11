// Импорт из внешних библиотек
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Импорт методов
import {
  createURL,
  createFilterStr,
} from '../../../services/hearthstoneApiService';
import { fetchCards } from '../../pages/cardsListPage/cardsSlice';

// Импорт статических файлов
import searchFieldBg from '../../../assets/img/search_field__bg.png';
import './searchField.scss';

const SearchField = () => {
  const { queryData } = useSelector((state) => state.cards);
  const { apiBase, endpoint, filters } = queryData;

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
          page: 1,
          pageSize: 10,
        }}
        onSubmit={(values, { resetForm }) => {
          const url = createURL({
            apiBase,
            endpoint,
            filters: createFilterStr({ ...filters, ...values }),
          });
          dispatch(fetchCards(url));
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
