import styled from 'styled-components';
import { DataListComponent, RadioButtonIconComponent } from '../inputs/Inputs';

const WrapperRadioButtonIcons = styled.div`
  background-color: rgba(0, 0, 0, .1);
  `;

const GroupRadioButtons = styled.div`
    padding: ${props => (props.orientacion === 'vertical' ? '1rem' : '1rem 0')};
    display: flex;
    flex-direction: ${props => (props.orientacion === 'vertical' ? 'column' : 'row')};
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const TituloRadioButtonForm = styled.h3`
    font-size: 1.5rem;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    background-color: var(--clr-pink-medium);
`;

export const RadioButtonsIconsGroup = ({
  titulo, orientacion, data, dataListArray,
}) => {
  return (
      <WrapperRadioButtonIcons>
        { titulo && <TituloRadioButtonForm>{titulo}</TituloRadioButtonForm>}
        <GroupRadioButtons orientacion={orientacion}>{
         data?.map((dato, index) => (
           <RadioButtonIconComponent
           key={index}
           labelTexto={dato?.labelTexto}
           labelIcono={dato?.labelIcono}
           orientacion={dato?.orientacion}
           idFor={dato?.idFor}
           name={dato?.name}/>))}
        {dataListArray && <DataListComponent Array={dataListArray}/>}
        </GroupRadioButtons>
      </WrapperRadioButtonIcons>
  );
};
