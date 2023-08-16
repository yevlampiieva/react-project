import { QuizCard } from 'components/QuizCard/QuizCard';

export const QuizList = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <QuizCard item={item} />
        </li>
      ))}
    </ul>
  );
};
