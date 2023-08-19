import { Component } from 'react';
import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './Searchbar/SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { QuizForm } from './QuizForm/QuizForm';

// import { HiAcademicCap, HiAdjustments, HiArchive } from 'react-icons/hi';
// import { IconButton } from './IconButton/IconButton';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
  };

  handleDelete = quizId => {
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(quiz => quiz.id !== quizId),
      };
    });
  };

  render() {
    return (
      <Layout>
        <QuizForm />
        <SearchBar />
        <QuizList items={this.state.quizItems} onDelete={this.handleDelete} />
        <GlobalStyle />
      </Layout>
    );
  }
}

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
