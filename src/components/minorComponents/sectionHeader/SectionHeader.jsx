import './sectionHeader.scss';

const SectionHeader = ({ headerText }) => {
  return (
    <header className="section_header">
      <h2 className="section_header__text">{headerText}</h2>
    </header>
  );
};

export default SectionHeader;
