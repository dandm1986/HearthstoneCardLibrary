import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import PaginationButton from '../../minorComponents/paginationButton/PaginationButton';
import Spinner from '../../minorComponents/spinner/Spinner';
import ErrorMessage from '../../minorComponents/errorMessage/ErrorMessage';

import { fetchCards, displayCard, prevPage, nextPage } from './cardsSlice';

import './cardsListPage.scss';

const CardsListPage = () => {
  const { cards, query, cardsLoadingStatus, currentPage } = useSelector(
    (state) => state.cards
  );
  const { page } = query;

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPage !== page) {
      dispatch(fetchCards(query));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderContent = (cards) => {
    return (
      <SectionLayout>
        <SectionHeader headerText={`Cards on request: ${cards.cardCount}`} />
        <article className="cards_list_page__content overflow">
          <ul className="cards_list_page__content__cards">
            {cards.cards.map((card) => (
              <li key={card.id}>
                <Link
                  to={`/cards/${card.id}`}
                  onClick={() => dispatch(displayCard(card.id))}
                >
                  <img src={card.image} alt={card.name} />
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <footer className="cards_list_page__footer section_footer">
          <PaginationButton
            currentPage={cards.page}
            totalPages={cards.pageCount}
            prev={() =>
              dispatch(prevPage(cards.page !== 1 ? cards.page - 1 : cards.page))
            }
            next={() =>
              dispatch(
                nextPage(
                  cards.page !== cards.pageCount ? cards.page + 1 : cards.page
                )
              )
            }
          />
        </footer>
      </SectionLayout>
    );
  };

  const spinner = cardsLoadingStatus === 'loading' ? <Spinner /> : null;
  const error = cardsLoadingStatus === 'error' ? <ErrorMessage /> : null;
  const content =
    cardsLoadingStatus === `idle` && cards ? renderContent(cards) : null;

  return (
    <>
      {spinner}
      {error}
      {content}
    </>
  );
};

export default CardsListPage;
