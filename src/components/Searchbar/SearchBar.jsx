import { LevelFilter } from 'components/LevelFilter/LevelFilter';
import { TopicFilter } from 'components/TopicFilter/TopicFilter';

export const SearchBar = () => {
  return (
    <>
      <TopicFilter />
      <LevelFilter />
    </>
  );
};
