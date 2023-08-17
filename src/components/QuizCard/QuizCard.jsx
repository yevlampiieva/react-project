import { Wrapper, Topic, Text } from './QuizCard.styled';

export const QuizCard = ({ item: { topic, level, time, questions } }) => {
  //   const { topic, level, time, questions } = item;
  return (
    <Wrapper>
      <Topic>{topic}</Topic>
      <Text>
        <b>Level:</b> {level}
      </Text>
      <Text>
        <b>Time:</b> {time} min
      </Text>
      <Text>
        <b>Questions:</b> {questions}
      </Text>
    </Wrapper>
  );
};
