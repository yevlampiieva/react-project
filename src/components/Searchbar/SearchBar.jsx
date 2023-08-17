import { LevelFilter } from 'components/LevelFilter/LevelFilter';
import { TopicFilter } from 'components/TopicFilter/TopicFilter';
import { Wrapper } from './SearchBar.styled';

export const SearchBar = () => {
  return (
    <Wrapper>
      <TopicFilter />
      <LevelFilter />
    </Wrapper>
  );
};
