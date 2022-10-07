import styled from 'styled-components';

export const InputTextComponent = ({ label }) => {
  const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
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
    ${RadioButton}:checked + && {
      color: red;
    }
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
  return (
    <WrapperRadioButton>
      <RadioButton type='radio' id={idFor} name={name} />
      <LabelRadio htmlFor={idFor} orientacion={orientacion}>
        <LabelRadioIcono orientacion={orientacion}>
          {labelIcono}
        </LabelRadioIcono>
        <LabelRadioTexto>{labelTexto}</LabelRadioTexto>
      </LabelRadio>
    </WrapperRadioButton>
  );
};

export const TextAreaComponent = ({ label, placeholder }) => {
  const WrapperTextArea = styled.div``;

  const LabelTextArea = styled.label``;

  const TextArea = styled.textarea``;
  return (
    <WrapperTextArea>
      <LabelTextArea>{label}</LabelTextArea>
      <TextArea
        name=''
        id=''
        cols='30'
        rows='10'
        placeholder={placeholder}
      ></TextArea>
    </WrapperTextArea>
  );
};

export const DataListComponent = ({ Array }) => {
  const WrapperDataList = styled.div``;
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
  return (
    <WrapperDataList>
      <LabelTadaList>
        Seleccione de la lista
        <InputList list='browsers' name='myBrowser' />
      </LabelTadaList>
      <DataList id='browsers'>
        {Array?.map((raza, index) => (
          <DataListOption key={index} value={raza} />
        ))}
      </DataList>
    </WrapperDataList>
  );
};
