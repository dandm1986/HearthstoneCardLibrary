import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQueryFilters } from '../../pages/cardsListPage/cardsSlice';

import searchFieldBg from '../../../assets/img/search_field__bg.png';

import './searchField.scss';

const SearchField = () => {
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
          dispatch(setQueryFilters(values));
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
