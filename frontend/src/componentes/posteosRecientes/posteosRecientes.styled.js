import styled from 'styled-components';

export const WrapperPosteosRecientes = styled.section`
  margin-bottom: 4rem;
  display: grid;
  place-items: center;
`;

export const WrapperTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

export const Line = styled.div`
  height: 1px;
  width: 30%;
  background-color: #000;
`;

export const Title = styled.h2`
  width: max-content;
  margin: 0 0.5rem;
  line-height: 1.5rem;
  font-family: 'Macondo', cursive;
  font-size: 1.8rem;
  text-align: center;
`;

export const GroupCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
`;
