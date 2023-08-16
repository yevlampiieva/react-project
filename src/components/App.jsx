import { QuizList } from './QuizList/QuizList';
import quizItems from '../data.json';
import { SearchBar } from './Searchbar/SearchBar';

export const App = () => {
  return (
    <>
      <SearchBar />
      <QuizList items={quizItems} />
    </>
  );
};
