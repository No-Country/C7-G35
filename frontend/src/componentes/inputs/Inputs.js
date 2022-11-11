import {
  Checkbox,
  CheckeableInput,
  DataList,
  DataListOption,
  InputImage,
  InputList,
  InputText,
  LabelCheckbox,
  LabelCheckeable,
  LabelIconCheckbox,
  LabelImagen,
  LabelImagenWrapper,
  LabelInputText,
  LabelRadioIcono,
  LabelRadioTexto,
  LabelTadaList,
  LabelTextCheckbox,
  TextArea,
  WrapperCheckbox,
  WrapperCheckeableInput,
  WrapperDataList,
  WrapperInput,
  WrapperInputDate,
} from './inputs.styled';

export const InputTextComponent = ({
  orientacion, idFor, label, type, validacion, placeholder, defaultValue,
}) => {
  return (
    <WrapperInput orientacion={orientacion}>
      <LabelInputText htmlFor={idFor} orientacion={orientacion}>{label}</LabelInputText>
      <InputText id={idFor} type={type} {...validacion} placeholder={placeholder}
      defaultValue={defaultValue}/>
    </WrapperInput>
  );
};

export const RadioButtonIconComponent = ({
  labelIcono,
  labelTexto,
  idFor,
  orientacion,
  validacion,
  value,
  defaultChecked,
}) => {
  return (
    <WrapperCheckeableInput>
      <CheckeableInput type='radio' id={idFor} {...validacion} value={value} defaultChecked={defaultChecked}/>
      <LabelCheckeable htmlFor={idFor} orientacion={orientacion}>
        <LabelRadioIcono orientacion={orientacion}>
          {labelIcono}
        </LabelRadioIcono>
        <LabelRadioTexto orientacion={orientacion}>{labelTexto}</LabelRadioTexto>
      </LabelCheckeable>
    </WrapperCheckeableInput>
  );
};

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
        </LabelImagenWrapper>
        <LabelRadioTexto>{labelTexto}</LabelRadioTexto>
      </LabelCheckeable>
    </WrapperCheckeableInput>
  );
};

export const TextAreaComponent = ({
  label,
  placeholder,
  validacion,
  idFor,
  value,
}) => {
  return (
    <WrapperInput>
      <LabelInputText htmlFor={idFor}>{label}</LabelInputText>
      <TextArea
      placeholder={placeholder} {...validacion} id={idFor} defaultValue={value} ></TextArea>
    </WrapperInput>
  );
};

export const DataListComponent = ({
  Array, tipo, validacion, defaultValue,
}) => {
  return (
    <WrapperDataList>
      <LabelTadaList>
        Seleccione de la lista
        <InputList list='breed' {...validacion} defaultValue={defaultValue} />
      </LabelTadaList>
      <DataList id='breed'>
        <DataListOption value={'No tiene raza'} />
        {tipo && Array && Array[tipo]?.sort()?.map((dato, index) => (
          <DataListOption key={index} value={dato}/>
        ))}
      </DataList>
    </WrapperDataList>
  );
};

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
