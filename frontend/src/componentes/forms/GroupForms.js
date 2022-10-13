import styled from 'styled-components';

export const WrapperComponentForm = styled.div`
  background-color: rgba(0, 0, 0, .1);
  width: min(600px, 100%);
  `;

export const OptionGroups = styled.div`
    padding: ${props => (props.orientacion === 'vertical' ? '1rem' : '1.5rem 1rem')};
    display: flex;
    flex-direction: ${props => (props.orientacion === 'vertical' ? 'column' : 'row')};
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
    row-gap: ${props => (props.orientacion === 'vertical' ? '.5rem' : '2rem')};
    column-gap: ${props => (props.orientacion === 'vertical' ? '.5rem' : '2rem')};
    /* row-gap: 2rem; */
`;

export const TituloForm = styled.h3`
    font-size: 1.5rem;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    background-color: var(--clr-pink-medium);
`;
