import styled from 'styled-components';

export const MainWrapperVerTodos = styled.div`
  padding-top: 2rem;
  align-self: flex-start;
`;
export const IconoFiltro = styled.button`
  display: flex;
  gap: 0.6rem;
  font-size: 1.5rem;
  background-color: var(--clr-blue-dark);
  width: max-content;
  padding: 1rem;
  color: #fff;
  border-radius: 0 7px 7px 0;
  border: none;
  cursor: pointer;
`;

export const TextoFiltro = styled.p``;

export const ButtonReset = styled.button`
  background-color: var(--clr-blue-dark);
  color: #fff;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  padding: 1rem;
  width: max-content;
  height: min-content;
`;

export const MainWrapperFilter = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;

export const WrapperListFilters = styled.div`
  display: ${(props) => (props.showFilter ? 'flex' : 'none')};
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  @media (min-width: 776px) {
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
  }
`;

export const Filtros = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 776px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  `;

export const WrapperInputFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding-bottom: 1rem;
  border-radius: 7px;
  overflow: hidden;
  &&:nth-child(even) {
    background-color: var(--clr-grey-medium);
  }
`;
export const TitleInput = styled.p`
  padding: 0.8rem;
  color: #fff;
  background-color: var(--clr-blue-dark);
`;
export const WrapperLabelInput = styled.div`
  margin-inline: 1rem;
`;
export const InputCheckeable = styled.input`
  margin-right: 0.5rem;
`;

export const InputList = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
`;
export const LabelInput = styled.label``;

export const InputDate = styled.input`
  font-size: 2rem;
  padding: 0.5rem;
`;

export const WrapperGenerico = styled.div`
  border-radius: 7px;
  overflow: hidden;
`;

export const WrapperMapa = styled.div`
  width: min(700px, 100%);
  height: 500px;
  flex: 1;
`;
