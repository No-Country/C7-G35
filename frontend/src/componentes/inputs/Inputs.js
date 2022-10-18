import styled from 'styled-components';
import {
  RiCheckboxCircleFill,
} from 'react-icons/ri';

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

const WrapperCheckeableInput = styled.div`
    display: flex;
  `;
const WrapperInput = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.orientacion === 'horizontal' ? 'row' : 'column')};
  align-items: ${(props) => (props.orientacion === 'horizontal' ? 'center' : 'initial')};
`;

const LabelInputText = styled.label`
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
export const InputTextComponent = ({
  orientacion, idFor, label, type, validacion, placeholder,
}) => {
  return (
    <WrapperInput orientacion={orientacion}>
      <LabelInputText htmlFor={idFor} orientacion={orientacion}>{label}</LabelInputText>
      <InputText id={idFor} type={type} {...validacion} placeholder={placeholder} />
    </WrapperInput>
  );
};

const CheckeableInput = styled.input`
  -webkit-appearance: none;
`;

const LabelRadioTexto = styled.p`
  font-size: 2rem;
  line-height: 1.5rem;
  text-align: center;
  width: min-content;
  width:${(props) => (props.orientacion === 'horizontal' ? 'initial' : 'min-content')};
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

const LabelCheckeable = styled.label`
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
export const RadioButtonIconComponent = ({
  labelIcono,
  labelTexto,
  idFor,
  orientacion,
  validacion,
  value,
}) => {
  return (
    <WrapperCheckeableInput>
      <CheckeableInput type='radio' id={idFor} {...validacion} value={value} />
      <LabelCheckeable htmlFor={idFor} orientacion={orientacion}>
        <LabelRadioIcono orientacion={orientacion}>
          {labelIcono}
        </LabelRadioIcono>
        <LabelRadioTexto orientacion={orientacion}>{labelTexto}</LabelRadioTexto>
      </LabelCheckeable>
    </WrapperCheckeableInput>
  );
};

const LabelCheckeicon = styled.div`
  position: absolute; 
  font-size: 8rem;
  inset: 0;
  color: var(--clr-green);
  opacity: 0;
  &:hover{
    opacity: .5;
  }
  & ${CheckeableInput}:checked {
    opacity: .5;
  }
 `;

const LabelImagenWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 200vh;
  overflow: hidden;
  position: relative; 
`;

const LabelImagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CheckboxComponent = ({
  labelImg,
  labelTexto,
  idFor,
  orientacion,
  validacion,
  value,
}) => {
  return (
    <WrapperCheckeableInput>
      <CheckeableInput type='checkbox' id={idFor} {...validacion} value={value} />
      <LabelCheckeable htmlFor={idFor} orientacion={orientacion}>
        <LabelImagenWrapper>
          <LabelImagen orientacion={orientacion} src={labelImg}/>
          <LabelCheckeicon><RiCheckboxCircleFill/></LabelCheckeicon>
        </LabelImagenWrapper>
        <LabelRadioTexto>{labelTexto}</LabelRadioTexto>
      </LabelCheckeable>
    </WrapperCheckeableInput>
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
  return (
    <WrapperDataList>
      <LabelTadaList>
        Seleccione de la lista
        <InputList list='breed' {...validacion} />
      </LabelTadaList>
      <DataList id='breed'>
        <DataListOption value={'No tiene raza'} defaultValue />
        {tipo && Array && Array[tipo]?.sort()?.map((dato, index) => (
          <DataListOption key={index} value={dato} />
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
  color: var(--clr-grey-dark);
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

const WrapperInputDate = styled.div`
  padding: 1rem;
`;

const InputImage = styled.input`
  font-size: 2rem;
  padding: .5rem;
`;

export const InputDate = ({ validacion }) => {
  const date = new Date();
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const today = `${year}-${month + 1}-${day}`;
  return (
    <WrapperInputDate>
      <InputImage type='date' max={today} {...validacion}/>
    </WrapperInputDate>
  );
};
