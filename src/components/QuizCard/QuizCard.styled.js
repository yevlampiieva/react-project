import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 8px;
  border: 1px solid ${p => p.theme.colors.black};
  border-radius: 4px;
`;

export const Topic = styled.h2`
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const Text = styled.p`
  margin-top: 0;
  margin-bottom: 8px;
`;