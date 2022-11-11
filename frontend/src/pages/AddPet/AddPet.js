import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import { useNavigate } from 'react-router-dom';
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';
import axios from 'axios';
import {
  CheckboxComponent,
  CheckboxComponente,
  DataListComponent,
  InputTextComponent,
  RadioButtonIconComponent,
  TextAreaComponent,
} from '../../componentes/inputs/Inputs';
import {
  OptionGroups,
  TituloForm,
  WrapperComponentForm,
} from '../../componentes/forms/GroupForms';
import { razasLista } from '../../helpers/ListaRazas';
import { mascotaTipoOpciones } from '../../helpers/Tipo';
import { genero } from '../../helpers/Genero';
import { edad } from '../../helpers/Edad';
import {
  useFormChangeContext,
  useFormContext,
} from '../../providers/FormProviders';
import { ButtonComponent } from '../../componentes/buttom/Button';
import { mascotaTamanio } from '../../helpers/Tamaño';
import { colores } from '../../helpers/Colores';
import { Error, MensajeAclaracion } from '../../componentes/inputs/inputs.styled';

const WrapperMascotaPerdida = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
  align-items: center;
`;

const schemaAddLostPet = yup
  .object({
    type: yup.string('Este campo es requerido').nullable().required('Este campo es requerido'),
    gender: yup.string().nullable().required('Este campo es requerido'),
    size: yup.string().nullable().required('Este campo es requerido'),
    color: yup.array().ensure().max('4', 'Elija 4 colores como máximo'),
    breed: yup.string().required('Este campo es requerido').nullable(),
    location: yup.string(),
    age: yup.string(),
    isCastrated: yup.boolean(),
    name: yup.string().max(30, 'Ingresa como máximo 30 caractéres.'),
    description: yup.string().max(250, 'Ingresa como máximo 250 caractéres.'),
    date: yup.string(),
  })
  .required();

const AddPet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schemaAddLostPet),
  });

  const token = JSON.parse(localStorage.getItem('token'));

  const navigate = useNavigate();
  const useFormChange = useFormChangeContext();
  const useFormData = useFormContext();
  const handleAddMascota = async (data) => {
    const response = await axios.post('https://pet-spaces-production.up.railway.app/api/pets', data, { headers: { Authorization: `Bearer ${token}` } });
    useFormChange((prevState) => ({
      ...prevState,
      id: response?.data?.pet?.id,
    }));

    reset();
    navigate('/add-photo');
  };

  useEffect(() => {
    useFormChange((prevState) => ({
      ...prevState,
      type: watch('type'),
    }));
  }, [watch('type')]);

  const { type } = useFormData;

  const [castrdoEsterilizada, setCastrdoEsterilizada] = useState('');
  useEffect(() => {
    if (watch('gender') === 'male') {
      setCastrdoEsterilizada('¿Esta castrado?');
    } else {
      setCastrdoEsterilizada('¿Esta esterilizada?');
    }
  }, [watch('gender')]);

  const [isCastrated, setIsCastrated] = useState('');
  useEffect(() => {
    if (watch('isCastrated')) {
      setIsCastrated('Si, lo está.');
    } else {
      setIsCastrated('No, no lo está.');
    }
  }, [watch('isCastrated')]);

  return (
    <WrapperMascotaPerdida
      onSubmit={handleSubmit(handleAddMascota)}
    >
      <h2>Registra tu mascota, los primeros 4 puntos son obligatorios</h2>
      <WrapperComponentForm>
        <TituloForm>Mi mascota es un...</TituloForm>
        <OptionGroups>
          {mascotaTipoOpciones?.map((dato, index) => (
            <RadioButtonIconComponent
              key={index}
              labelTexto={dato?.labelTexto}
              labelIcono={dato?.labelIcono}
              idFor={dato?.idFor}
              value={dato?.value}
              orientacion={dato?.orientacion}
              validacion={{ ...register('type') }}
            />
          ))}
        </OptionGroups>
        {errors.type && <Error text={errors.type.message}/>}
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TituloForm>Es...</TituloForm>
        <OptionGroups>
          {genero?.map((dato, index) => (
            <RadioButtonIconComponent
              key={index}
              labelTexto={dato?.labelTexto}
              labelIcono={dato?.labelIcono}
              idFor={dato?.idFor}
              value={dato?.value}
              orientacion={dato?.orientacion}
              validacion={{ ...register('gender') }}
            />
          ))}
        </OptionGroups>
        {errors.gender && <Error text={errors.gender.message}/>}
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TituloForm>Raza..</TituloForm>
        <DataListComponent
          Array={razasLista}
          tipo={type}
          validacion={{ ...register('breed') }}
        />
        {errors.breed && <Error text={errors.breed.message}/>}
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TituloForm>{castrdoEsterilizada}</TituloForm>
        <MensajeAclaracion text={'*Si la respuesta es negativa, deje el campo como está.'}/>
        <CheckboxComponente
          icon={
            watch('isCastrated') ? (
              <RiCheckboxCircleFill />
            ) : (
              <RiCheckboxBlankCircleLine />
            )
          }
          idFor={'isCastratedLost'}
          label={isCastrated}
          validacion={{ ...register('isCastrated') }}
        />
        {errors.isCastrated && <Error text={errors.isCastrated.message}/>}
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TituloForm>De tamaño...</TituloForm>
        <OptionGroups orientacion={'vertical'}>
          {mascotaTamanio?.map((dato, index) => (
            <RadioButtonIconComponent
              key={index}
              labelTexto={dato?.labelTexto}
              labelIcono={dato?.labelIcono}
              idFor={dato?.idFor}
              value={dato?.value}
              orientacion={dato?.orientacion}
              validacion={{ ...register('size') }}
            />
          ))}
        </OptionGroups>
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TituloForm>Color..</TituloForm>
        <MensajeAclaracion text={'*Máximo 4 colores'} />
        <MensajeAclaracion text={'*Elija los mas parecidos'} />
        <MensajeAclaracion text={'*No se fije en el tipo de pelaje'} />
        <OptionGroups>
          {colores?.map((dato, index) => (
            <CheckboxComponent
              key={index}
              labelTexto={dato?.labelTexto}
              labelImg={dato?.labelImg}
              idFor={dato?.idFor}
              value={dato?.value}
              orientacion={dato?.orientacion}
              validacion={{ ...register('color') }}
            />
          ))}
        </OptionGroups>
        {errors.color && <Error text={errors.color.message}/>}

      </WrapperComponentForm>

      <WrapperComponentForm>
        <TituloForm>De edad..</TituloForm>
        <OptionGroups orientacion={'vertical'}>
          {edad?.map((dato, index) => (
            <RadioButtonIconComponent
              key={index}
              labelTexto={dato?.labelTexto}
              labelIcono={dato?.labelIcono}
              idFor={dato?.idFor}
              value={dato?.value}
              orientacion={dato?.orientacion}
              validacion={{ ...register('age') }}
            />
          ))}
        </OptionGroups>
      </WrapperComponentForm>

      <WrapperComponentForm>
        <InputTextComponent
          label={'Responde al nombre de...'}
          idFor={'nameLostPet'}
          validacion={{ ...register('name') }}
          type={'text'}
        />
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TextAreaComponent
          label={'Tiene algo que lo diferencia'}
          placeholder={
            'Alguna marca, sicatriz, o cualquier cosa que lo diferencie'
          }
          idFor={'descriptionLostPet'}
          validacion={{ ...register('description') }}
        />
      </WrapperComponentForm>
      <ButtonComponent
        as='button'
        type={'submit'}
        estado={'perdido'}
        texto={'Siguiente'}
      />
    </WrapperMascotaPerdida>
  );
};

export default AddPet;
