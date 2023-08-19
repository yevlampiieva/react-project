import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyledForm, StyledField, Label } from './QuizForm.styled';

export const QuizForm = () => {
  return (
    <Formik
      initialValues={{
        topic: '',
        level: 'beginner',
        time: 0,
        questions: 0,
      }}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <StyledForm>
        <Label>
          Topic
          <StyledField name="topic" placeholder="Quiz topic..." />
        </Label>

        <Label>
          Level
          <StyledField as="select" name="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </StyledField>
        </Label>

        <Label>
          Time
          <StyledField name="time" type="number" />
        </Label>

        <Label>
          Questions
          <StyledField name="questions" type="number" />
        </Label>

        <button type="submit">Submit</button>
      </StyledForm>
    </Formik>
  );
};
