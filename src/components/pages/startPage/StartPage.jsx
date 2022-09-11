// Импорт из внешних библиотек
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Импорт компонентов
import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import TextComponent from '../../minorComponents/textComponent/TextComponent';
import TextFieldComponent from '../../minorComponents/textFieldComponent/TextFieldComponent';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

// Импорт методов
import { fetchMetadata } from './startSlice';
import {
  createFilterStr,
  createURL,
} from '../../../services/hearthstoneApiService';

// Импорт статических файлов
import img from '../../../assets/img/start_page_hero.png';
import './startPage.scss';

const StartPage = () => {
  const { queryData, metadataLoadingStatus } = useSelector(
    (state) => state.metadata
  );
  const { apiBase, endpoint, filters } = queryData;

  const dispatch = useDispatch();

  useEffect(() => {
    const url = createURL({
      apiBase,
      endpoint,
      filters: createFilterStr(filters),
    });
    dispatch(fetchMetadata(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    return (
      <SectionLayout>
        <SectionHeader
          headerText={
            'Добро пожаловать в библиотеку игральных карт Hearthstone!'
          }
        />
        <article className="start_page__content overflow">
          <img className="start_page__content__image" src={img} alt="thrall" />
          <div className="start_page__content__description">
            <TextComponent text={'Раздел "Карты"'} />
            <TextFieldComponent
              text={
                'Отображает список всех карт. Нажмите на карту, чтобы получить более подробную информацию о ней.'
              }
            />
            <TextComponent text={'Раздел "Герои"'} />
            <TextFieldComponent
              text={
                'Отображает список всех доступных в игре героев (классов). Нажмите на героя, чтобы получить более подробную информацию о нем.'
              }
            />
            <TextComponent text={'Раздел "Фильтры"'} />
            <TextFieldComponent
              text={
                'Сформируйте список карт, соответсвующих определенным параметрам, или просто введите название карты в поле поиска.'
              }
            />
            <TextComponent
              text={
                'Hearthstone - самая красочная игра Blizzard. Этот сервис создан, в первую очередь, для того, чтобы разглядывать карты ;)'
              }
            />
          </div>
        </article>
        <footer className="start_page__footer section_footer">
          <Link to={'/cards'} className="btn">
            Вперёд!
          </Link>
        </footer>
      </SectionLayout>
    );
  };

  const spinner = metadataLoadingStatus === 'loading' ? <Spinner /> : null;
  const error = metadataLoadingStatus === 'error' ? <ErrorMessage /> : null;
  const content = metadataLoadingStatus === `idle` ? renderContent() : null;

  return (
    <>
      {spinner}
      {error}
      {content}
    </>
  );
};

export default StartPage;
