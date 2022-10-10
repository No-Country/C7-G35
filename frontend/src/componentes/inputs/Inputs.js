import styled from 'styled-components';

const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelInputText = styled.label`
  font-size: 2rem;
  background-color: var(--clr-pink-medium);
  color: #fff;
  font-size: 1.5rem;
  font-weight: 900;
  padding: 0.5rem 1rem;
  border-radius: 7px;
`;

const InputText = styled.input`
  padding: 1rem 1rem;
  font-size: 1.5rem;
  border-radius: 7px;
  border: 1px solid black;
  margin: 1rem;
`;
export const InputTextComponent = ({ label, validacion, idFor }) => {
  return (
    <WrapperInput>
      <LabelInputText htmlFor={idFor}>{label}</LabelInputText>
      <InputText id={idFor} type='text' {...validacion} />
    </WrapperInput>
  );
};

const WrapperRadioButton = styled.div`
  display: flex;
`;

const RadioButton = styled.input`
  -webkit-appearance: none;
`;

const LabelRadioTexto = styled.p`
  font-size: 2rem;
`;

const LabelRadioIcono = styled.div`
  font-size: ${(props) => (props.orientacion === 'horizontal' ? '2rem' : '4rem')};
  background-color: var(--clr-pink-light);
  height: ${(props) => (props.orientacion === 'horizontal' ? 'initial' : '8rem')};
  width: ${(props) => (props.orientacion === 'horizontal' ? 'initial' : '8rem')};
  display: ${(props) => (props.orientacion === 'horizontal' ? 'block' : 'grid')};
  place-items: center;
  border-radius: 100vh;
  display: grid;
  place-items: center;
`;

const LabelRadio = styled.label`
  display: flex;
  flex-direction: ${(props) => (props.orientacion === 'horizontal' ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.orientacion === 'horizontal' ? 'initial' : '10rem')};
  width: ${(props) => (props.orientacion === 'horizontal' ? 'initial' : '10rem')};
  gap: ${(props) => (props.orientacion === 'horizontal' ? '1rem' : 'initial')};
  color: #878787;
  &:hover {
    font-weight: 700;
    color: #3c3c3c;
  }
  ${RadioButton}:checked + && {
    font-weight: 700;
    color: var(--clr-pink-medium);
  }
`;
export const RadioButtonIconComponent = ({
  labelIcono,
  labelTexto,
  idFor,
  orientacion,
  validacion,
  value,
}) => {
  return (
    <WrapperRadioButton>
      <RadioButton type='radio' id={idFor} {...validacion} value={value} />
      <LabelRadio htmlFor={idFor} orientacion={orientacion}>
        <LabelRadioIcono orientacion={orientacion}>
          {labelIcono}
        </LabelRadioIcono>
        <LabelRadioTexto>{labelTexto}</LabelRadioTexto>
      </LabelRadio>
    </WrapperRadioButton>
  );
};

const TextArea = styled.textarea`
  padding: 1rem 1rem;
  font-size: 1rem;
  border-radius: 7px;
  border: 1px solid black;
  margin: 1rem;
  height: 10rem;
`;
export const TextAreaComponent = ({
  label,
  placeholder,
  validacion,
  idFor,
}) => {
  return (
    <WrapperInput>
      <LabelInputText htmlFor={idFor}>{label}</LabelInputText>
      <TextArea placeholder={placeholder} {...validacion} id={idFor}></TextArea>
    </WrapperInput>
  );
};

const WrapperDataList = styled.div`
  padding: 1rem;
`;
const LabelTadaList = styled.label``;
const InputList = styled.input`
  padding: 1rem 1rem;
  font-size: 1.5rem;
  border-radius: 7px;
  border: 1px solid black;
  width: 100%;
`;
const DataList = styled.datalist``;
const DataListOption = styled.option``;

export const DataListComponent = ({ Array, tipo, validacion }) => {
  // console.log(Array);
  // console.log(tipo);
  // console.log(`${Array}.${tipo}`);
  // eslint-disable-line
  // console.log(Array.`${tipo}`);
  // console.log(Array.cat);
  return (
    <WrapperDataList>
      <LabelTadaList>
        Seleccione de la lista
        <InputList list='breed' {...validacion} />
      </LabelTadaList>
      <DataList id='breed'>
        <DataListOption value={'No tiene raza'} defaultValue />
        {Array.dog.map((raza, index) => (
          <DataListOption key={index} value={raza} />
        ))}
      </DataList>
    </WrapperDataList>
  );
};

const WrapperCheckbox = styled.div`
  padding: 1rem;
`;

const Checkbox = styled.input`
  display: none;
  /* -webkit-appearance: none; */
`;

const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #878787;
  ${Checkbox}:checked + && {
  color: var(--clr-pink-medium);
  font-weight: 700;
}
`;

const LabelIconCheckbox = styled.div`
  font-size: 2rem;
  display: grid;
  place-items: center;
`;
const LabelTextCheckbox = styled.div`
  font-size: 2rem;
  ${Checkbox}:checked + && {
    font-weight: 700;
  };
`;

export const CheckboxComponente = ({
  validacion, icon, idFor, label,
}) => {
  return (
    <WrapperCheckbox>
      <Checkbox type='checkbox' {...validacion} id={idFor} />
      <LabelCheckbox htmlFor={idFor}>
        <LabelIconCheckbox>{icon}</LabelIconCheckbox>
        <LabelTextCheckbox>
          {label}
        </LabelTextCheckbox>
      </LabelCheckbox>
    </WrapperCheckbox>
  );
};
