import styled from 'styled-components';

const Mensaje = styled.p`
  color: rgb(38 38 38);
  margin: .5rem 0 .1rem 1rem;
`;

export const MensajeAclaracion = ({ text }) => {
  return (
    <Mensaje>
      {text}
    </Mensaje>
  );
};
const MensajeError = styled.p`
  color: red;
  margin: 1rem;
`;

export const Error = ({ text }) => {
  return (
    <MensajeError>
      {text}
    </MensajeError>
  );
};

export const WrapperCheckeableInput = styled.div`
    display: flex;
  `;
export const WrapperInput = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.orientacion === 'horizontal' ? 'row' : 'column')};
  align-items: ${(props) => (props.orientacion === 'horizontal' ? 'center' : 'initial')};
`;

export const LabelInputText = styled.label`
  font-size: 2rem;
  background-color: ${(props) => (props.orientacion === 'horizontal' ? 'none' : 'var(--clr-pink-medium)')};
  color: ${(props) => (props.orientacion === 'horizontal' ? '#000' : '#fff')};
  font-size: 1.5rem;
  font-weight: 900;
  padding: 0.5rem 1rem;
  border-radius: 7px;
  `;

export const InputText = styled.input`
  padding: 1rem 1rem;
  font-size: 1.5rem;
  border-radius: 7px;
  border: 1px solid black;
  margin: 1rem;
  flex: 1;
`;

export const CheckeableInput = styled.input`
  -webkit-appearance: none;
`;

export const LabelRadioTexto = styled.p`
  font-size: 2rem;
  line-height: 1.5rem;
  text-align: center;
  width: min-content;
  width:${(props) => (props.orientacion === 'horizontal' ? 'initial' : 'min-content')};
`;

export const LabelRadioIcono = styled.div`
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

export const LabelCheckeable = styled.label`
  display: flex;
  flex-direction: ${(props) => (props.orientacion === 'horizontal' ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--clr-grey-dark);
  &:hover {
    font-weight: 700;
    color: var(--clr-pink-medium);
  }
  ${CheckeableInput}:checked + && {
    font-weight: 700;
    color: var(--clr-pink-medium);
  }
`;

export const LabelImagenWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 200vh;
  overflow: hidden;
  position: relative; 
`;

export const LabelImagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextArea = styled.textarea`
  padding: 1rem 1rem;
  font-size: 1rem;
  border-radius: 7px;
  border: 1px solid black;
  margin: 1rem;
  height: 10rem;
`;

export const WrapperDataList = styled.div`
  padding: 1rem;
`;
export const LabelTadaList = styled.label``;
export const InputList = styled.input`
  padding: 1rem 1rem;
  font-size: 1.5rem;
  border-radius: 7px;
  border: 1px solid black;
  width: 100%;
`;
export const DataList = styled.datalist``;
export const DataListOption = styled.option``;

export const WrapperCheckbox = styled.div`
  padding: 1rem;
`;

export const Checkbox = styled.input`
  display: none;
  /* -webkit-appearance: none; */
`;

export const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--clr-grey-dark);
  ${Checkbox}:checked + && {
  color: var(--clr-pink-medium);
  font-weight: 700;
}
`;

export const LabelIconCheckbox = styled.div`
  font-size: 2rem;
  display: grid;
  place-items: center;
`;
export const LabelTextCheckbox = styled.div`
  font-size: 2rem;
  ${Checkbox}:checked + && {
    font-weight: 700;
  };
`;

export const WrapperInputDate = styled.div`
  padding: 1rem;
`;

export const InputImage = styled.input`
  font-size: 2rem;
  padding: .5rem;
`;
