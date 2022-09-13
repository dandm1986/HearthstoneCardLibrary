import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SectionLayout from '../../minorComponents/sectionLayout/SectionLayout';
import SectionHeader from '../../minorComponents/sectionHeader/SectionHeader';
import TextComponent from '../../minorComponents/textComponent/TextComponent';
import TextFieldComponent from '../../minorComponents/textFieldComponent/TextFieldComponent';

import './singleCardPage.scss';

const SingleCardPage = () => {
  const { cards, currentCard } = useSelector((state) => state.cards);
  const { metadata } = useSelector((state) => state.metadata);

  const card = cards.cards
    ? cards.cards.find((card) => card.id === currentCard)
    : null;

  const cardName = card.name;
  const flavorText = card.flavorText.replace(new RegExp('<[^>]*>', 'ig'), '');
  const type = metadata.types.find((type) => type.id === card.cardTypeId)?.name;
  const minionType = metadata.minionTypes.find(
    (type) => type.id === card.minionTypeId
  )?.name;
  const rarity = metadata.rarities.find(
    (rarity) => rarity.id === card.rarityId
  )?.name;
  const set = metadata.sets.find((set) => set.id === card.cardSetId)?.name;
  const heroClass = metadata.classes.find(
    (heroClass) => heroClass.id === card.classId
  )?.name;
  const artist = card.artistName;

  return (
    <SectionLayout>
      <SectionHeader headerText={cardName} />
      <article className="single_card_page__card overflow">
        <img src={card.image} alt={cardName} />
        <div className="single_card_page__card__description">
          {flavorText ? <TextFieldComponent text={flavorText} /> : null}
          <div className="single_card_page__card__description__field_grid">
            <TextComponent text={'Тип'} />
            <TextFieldComponent
              text={type ? type : `Информация отсутствует...`}
            />
          </div>
          <div className="single_card_page__card__description__field_grid">
            <TextComponent text={'Тип существа'} />
            <TextFieldComponent
              text={minionType ? minionType : `Информация отсутствует...`}
            />
          </div>
          <div className="single_card_page__card__description__field_grid">
            <TextComponent text={'Редкость'} />
            <TextFieldComponent
              text={rarity ? rarity : `Информация отсутствует...`}
            />
          </div>
          <div className="single_card_page__card__description__field_grid">
            <TextComponent text={'Набор'} />
            <TextFieldComponent
              text={set ? set : `Информация отсутствует...`}
            />
          </div>
          <div className="single_card_page__card__description__field_grid">
            <TextComponent text={'Класс'} />
            <TextFieldComponent
              text={heroClass ? heroClass : `Информация отсутствует...`}
            />
          </div>
          <div className="single_card_page__card__description__field_grid">
            <TextComponent text={'Художник'} />
            <TextFieldComponent
              text={artist ? artist : `Информация отсутствует...`}
            />
          </div>
        </div>
      </article>
      <footer className="single_card_page__footer section_footer">
        <Link to={'/cards'} className="btn">
          Назад
        </Link>
      </footer>
    </SectionLayout>
  );
};

export default SingleCardPage;
