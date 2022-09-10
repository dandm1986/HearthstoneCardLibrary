import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createFilterStr } from '../../../services/hearthstoneApiService';

import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import PaginationButton from '../../minorComponents/paginationButton/PaginationButton';
import Spinner from '../../minorComponents/spinner/Spinner';

import {
  fetchCards,
  clearState,
  displayCard,
  prevPage,
  nextPage,
} from './cardsSlice';

import './cardsListPage.scss';

const CardsListPage = () => {
  const { cards, queryData, cardsLoadingStatus } = useSelector(
    (state) => state.cards
  );
  const { metadata } = useSelector((state) => state.metadata);
  const { metadataLoadingStatus } = useSelector((state) => state.metadata);

  const dispatch = useDispatch();

  const { apiBase, endpoint, filters } = queryData;

  const currentFilters = createFilterStr(filters);

  useEffect(() => {
    dispatch(clearState());
    dispatch(
      fetchCards({
        apiBase,
        endpoint: endpoint.cards,
        filters: currentFilters,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const renderContent = (cards, metadata) => {
    return (
      <SectionLayout>
        <SectionHeader
          headerText={`Найдено карт по запросу: ${cards.cardCount}`}
        />
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

  const content =
    metadataLoadingStatus === `idle` && cards.cards
      ? renderContent(cards, metadata)
      : null;

  return (
    <>
      {spinner}
      {content}
    </>
  );
};

export default CardsListPage;
