import styled from 'styled-components';

const WrapperRadioButtonIcons = styled.div`
`;

const GroupRadioButtons = styled.div`
    display: flex;
    flex-direction: ${props => (props.orientacion === 'vertical' ? 'column' : 'row')};
    align-items: flex-start;
`;

const TituloRadioButtonForm = styled.h3`
    font-size: 1.5rem;
`;

export const RadioButtonsIconsGroup = ({ titulo, orientacion, children }) => {
  return (
      <WrapperRadioButtonIcons>
         { titulo && <TituloRadioButtonForm>{titulo}</TituloRadioButtonForm>}
        <GroupRadioButtons orientacion={orientacion}>{children}</GroupRadioButtons>
      </WrapperRadioButtonIcons>
  );
};
