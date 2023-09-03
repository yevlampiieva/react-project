import { useEffect, useState } from 'react';
import { QuizList } from './QuizList/QuizList';
// import initialQuizItems from '../data.json';
import { SearchBar } from './Searchbar/SearchBar';
import { Layout } from './Layout';
import { QuizForm } from './QuizForm/QuizForm';
import { LevelFilter } from './LevelFilter';
import { TopicFilter } from './TopicFilter';
import { GlobalStyle } from './GlobalStyle';
import { createQuiz, deleteQuiz, fetchQuizzes } from 'api';

const initialFilters = {
  topic: '',
  level: 'all',
};

const localStorageKey = 'quiz-filters';

const getInitialFilters = () => {
  const savedFilters = localStorage.getItem(localStorageKey);
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return initialFilters;
};

export const App = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [filters, setFilters] = useState(getInitialFilters);
  const [loading, setLoading] = useState(false);

  // Фетч даних з бекенда
  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);
        const quizItems = await fetchQuizzes();
        setQuizItems(quizItems);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getQuizzes();
  }, []);

  // Запис фільтрів в localStorage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(filters));
  }, [filters]);

  const changeTopicFilter = newTopic => {
    setFilters(prevState => ({
      ...prevState,
      topic: newTopic,
    }));
  };

  const changeLevelFilter = newLevel => {
    setFilters(prevState => ({
      ...prevState,
      level: newLevel,
    }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const addQuiz = async newQuiz => {
    try {
      const createdQuiz = await createQuiz(newQuiz);
      setQuizItems(prevState => [...prevState, createdQuiz]);
    } catch (error) {
      console.log(error);
    }
  };

   const deleteQuizzes = async quizId => {
     try {
       const deletedQuiz = await deleteQuiz(quizId);
       setQuizItems(prevState =>
         prevState.filter(quiz => quiz.id !== deletedQuiz.id)
       );
     } catch (error) {
       console.log(error);
     }
   };

  const getVisibleQuizItems = () => {
    const lowerCaseTopic = filters.topic.toLowerCase();

    return quizItems.filter(quiz => {
      const hasTopic = quiz.topic.toLowerCase().includes(lowerCaseTopic);
      if (filters.level === 'all') {
        return hasTopic;
      }
      return hasTopic && quiz.level === filters.level;
    });
  };

    // const getVisibleQuizItems = () => {
    //   const lowerCaseTopic = filters.topic.toLowerCase();

    //   return quizItems.filter(quiz => {
    //     const hasTopic = quiz.topic.toLowerCase().includes(lowerCaseTopic);
    //     const hasMatchingLevel = quiz.level === filters.level;
    //     return filters.level === 'all'
    //       ? hasTopic
    //       : hasTopic && hasMatchingLevel;
    //   });
    // };

  const visibleQuizItems = getVisibleQuizItems();

  return (
    <Layout>
      <QuizForm onAdd={addQuiz} />
      <SearchBar onResetFilters={resetFilters}>
        <TopicFilter value={filters.topic} onChange={changeTopicFilter} />
        <LevelFilter value={filters.level} onChange={changeLevelFilter} />
      </SearchBar>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <QuizList items={visibleQuizItems} onDelete={deleteQuizzes} />
      )}
      <GlobalStyle />
    </Layout>
  );
};