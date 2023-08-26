import axios from 'axios';

axios.defaults.baseURL = 'https://64ea3b35bf99bdcc8e676d3f.mockapi.io/api/';

export const fetchQuizzes = async () => {
  const response = await axios.get('/quizes');
  return response.data;
};

export const deleteQuiz = async quizId => {
  const response = await axios.delete(`/quizes/${quizId}`);
  return response.data;
};

export const createQuiz = async quiz => {
  const response = await axios.post('/quizes', quiz);
  return response.data;
};
