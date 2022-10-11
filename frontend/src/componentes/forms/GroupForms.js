import styled from 'styled-components';
import { RadioButtonIconComponent } from '../inputs/Inputs';

export const WrapperComponentForm = styled.div`
  background-color: rgba(0, 0, 0, .1);
  width: min(500px, 100%);
  `;

const GroupRadioButtons = styled.div`
    padding: ${props => (props.orientacion === 'vertical' ? '1rem' : '1rem 0')};
    display: flex;
    flex-direction: ${props => (props.orientacion === 'vertical' ? 'column' : 'row')};
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const TituloForm = styled.h3`
    font-size: 1.5rem;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    background-color: var(--clr-pink-medium);
`;

export const RadioButtonsIconsGroup = ({
  titulo, orientacion, data, validacion,
}) => {
  return (
      <WrapperComponentForm>
        <TituloForm>{titulo}</TituloForm>
        <GroupRadioButtons orientacion={orientacion}>{
         data?.map((dato, index) => (
           <RadioButtonIconComponent
           key={index}
           labelTexto={dato?.labelTexto}
           labelIcono={dato?.labelIcono}
           idFor={dato?.idFor}
           value={dato?.value}
           orientacion={dato?.orientacion}
           validacion={validacion}
           />
         ))}
        </GroupRadioButtons>
      </WrapperComponentForm>
  );
};
