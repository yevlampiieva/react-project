import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './Searchbar/SearchBar';
import { Layout } from './Layout';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';
import { LevelFilter } from './LevelFilter';
import { TopicFilter } from './TopicFilter';
import { GlobalStyle } from './GlobalStyle';

const initialFilters = {
  topic: '',
  level: 'all',
};

const localStorageKey = 'quiz-filters';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: initialFilters,
  };

  componentDidMount() {
    const savedFilters = localStorage.getItem(localStorageKey);
    if (savedFilters !== null) {
      this.setState({ filters: JSON.parse(savedFilters) });
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

  handleDelete = quizId => {
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId),
      };
    });
  };

  addQuiz = newQuiz => {
    this.setState(prevState => {
      return {
        quizItems: [...prevState.quizItems, newQuiz],
      };
    });
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
    const { filters } = this.state;
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
        <QuizList items={visibleQuizItems} onDelete={this.handleDelete} />
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
