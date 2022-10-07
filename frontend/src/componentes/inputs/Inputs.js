import styled from 'styled-components';

const WrapperInput = styled.div`
  display: flex;
  flex-direction: column ;
`;

const LabelInputText = styled.label`
  font-size: 2rem;
`;

const InputText = styled.input`
  padding: 1rem 1rem;
  font-size: 1.5rem;
  border-radius: 7px;
  border: 1px solid black;
`;

const WrapperRadioButton = styled.div``;

const RadioButton = styled.input`
  -webkit-appearance: none;
`;

const LabelRadioTexto = styled.p`
  font-size: 2rem;
  color: var(--clr-pink-medium);
`;
const LabelRadioIcono = styled.div`
  font-size: ${props => (props.orientacion === 'horizontal' ? '2rem' : '4rem')};
  background-color: var(--clr-pink-light);
  color: var(--clr-pink);
  height: ${props => (props.orientacion === 'horizontal' ? 'initial' : '8rem')};
  width:  ${props => (props.orientacion === 'horizontal' ? 'initial' : '8rem')};
  display: ${props => (props.orientacion === 'horizontal' ? 'block' : 'grid')};
  place-items: center;
  border-radius: 100vh;
  display: grid;
  place-items: center;
  ${RadioButton}:checked + && {
    color: red;
  }
`;

const LabelRadio = styled.label`
  display: flex;
  flex-direction: ${props => (props.orientacion === 'horizontal' ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  height: ${props => (props.orientacion === 'horizontal' ? 'initial' : '10rem')};
  width: ${props => (props.orientacion === 'horizontal' ? 'initial' : '10rem')};
  gap: ${props => (props.orientacion === 'horizontal' ? '1rem' : 'initial')};
  &:hover {
    font-weight: 700;
  }
  ${RadioButton}:checked + && {
    font-weight: 700;
  }
`;

const WrapperTextArea = styled.div`
  
`;

const LabelTextArea = styled.label`
  
`;

const TextArea = styled.textarea`
  
`;

export const InputTextComponent = ({ label }) => {
  return (
    <WrapperInput>
      <LabelInputText>{label}</LabelInputText>
      <InputText type='text' />
    </WrapperInput>
  );
};

export const RadioButtonIconComponent = ({
  labelIcono,
  labelTexto,
  idFor,
  name,
  orientacion,
}) => {
  return (
    <WrapperRadioButton>
      <RadioButton type='radio' id={idFor} name={name} />
      <LabelRadio htmlFor={idFor} orientacion={orientacion}>
        <LabelRadioIcono orientacion={orientacion}>{labelIcono}</LabelRadioIcono>
        <LabelRadioTexto>{labelTexto}</LabelRadioTexto>
      </LabelRadio>
    </WrapperRadioButton>
  );
};

export const TextAreaComponent = ({ label, placeholder }) => {
  return (
    <WrapperTextArea>
      <LabelTextArea>{label}</LabelTextArea>
      <TextArea name="" id="" cols="30" rows="10"
      placeholder={placeholder}></TextArea>
    </WrapperTextArea>
  );
};

export const DataListComponent = () => {
  return <div>Inputs</div>;
};
