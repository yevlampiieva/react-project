import { QuizList } from './QuizList/QuizList';
// import initialQuizItems from '../data.json';
import { SearchBar } from './Searchbar/SearchBar';
import { Layout } from './Layout';
import { Component } from 'react';
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

export class App extends Component {
  state = {
    quizItems: [],
    filters: initialFilters,
    loading: false,
  };

  async componentDidMount() {
    const savedFilters = localStorage.getItem(localStorageKey);
    if (savedFilters !== null) {
      this.setState({ filters: JSON.parse(savedFilters) });
    }
    try {
      this.setState({ loading: true });
      const quizItems = await fetchQuizzes();
      this.setState({ quizItems });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters: prevFilters } = prevState;
    const { filters: nextFilters } = this.state;
    if (prevFilters !== nextFilters) {
      localStorage.setItem(localStorageKey, JSON.stringify(nextFilters));
    }
  }

  changeTopicFilter = newTopic => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          topic: newTopic,
        },
      };
    });
  };

  changeLevelFilter = newLevel => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          level: newLevel,
        },
      };
    });
  };

  resetFilters = () => {
    this.setState({
      filters: initialFilters,
    });
  };

  handleDelete = async quizId => {
    try {
      const deletedQuiz = await deleteQuiz(quizId);
      this.setState(prevState => ({
        quizItems: prevState.quizItems.filter(
          quiz => quiz.id !== deletedQuiz.id
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  addQuiz = async newQuiz => {
    try {
      const createdQuiz = await createQuiz(newQuiz);
      this.setState(prevState => ({
        quizItems: [...prevState.quizItems, createdQuiz],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  getVisibleQuizItems = () => {
    const { quizItems, filters } = this.state;
    const lowerCaseTopic = filters.topic.toLowerCase();

    return quizItems.filter(quiz => {
      const hasTopic = quiz.topic.toLowerCase().includes(lowerCaseTopic);
      if (filters.level === 'all') {
        return hasTopic;
      }
      return hasTopic && quiz.level === filters.level;
    });
  };

  render() {
    const { filters, loading } = this.state;
    const visibleQuizItems = this.getVisibleQuizItems();

    return (
      <Layout>
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar onResetFilters={this.resetFilters}>
          <TopicFilter
            value={filters.topic}
            onChange={this.changeTopicFilter}
          />
          <LevelFilter
            value={filters.level}
            onChange={this.changeLevelFilter}
          />
        </SearchBar>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <QuizList items={visibleQuizItems} onDelete={this.handleDelete} />
        )}
        <GlobalStyle />
      </Layout>
    );
  }
}

// import { HiAcademicCap, HiAdjustments, HiArchive } from 'react-icons/hi';
// import { IconButton } from './IconButton/IconButton';

// export const App = () => {
//   return (
//     <Layout>
//       <SearchBar />
//       <QuizList items={quizItems} />
//       <IconButton variant="primary" size="sm">
//         <HiAcademicCap />
//       </IconButton>
//       <IconButton variant="secondary" size="md">
//         <HiArchive />
//       </IconButton>
//       <IconButton variant="secondary" size="lg">
//         <HiAdjustments />
//       </IconButton>
//       <GlobalStyle />
//     </Layout>
//   );
// };
