import { Wrapper } from './SearchBar.styled';

export const SearchBar = ({ onResetFilters, children }) => {
  return (
    <Wrapper>
      {children}
      <button onClick={onResetFilters}>Reset filters</button>
    </Wrapper>
  );
};
