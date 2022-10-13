import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';
import axios from 'axios';
import { useCookies } from 'react-cookie';
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
import ButtonComponent from '../../componentes/buttom/Button';
import { mascotaTamanio } from '../../helpers/Tamaño';
import { colores } from '../../helpers/Colores';

const WrapperMascotaPerdida = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
  align-items: center;
`;

const schemaAddLostPet = yup
  .object({
    type: yup.string(),
    gender: yup.string(),
    size: yup.string(),
    color: yup.array().ensure(),
    breed: yup.string(),
    age: yup.string(),
    isCastrated: yup.boolean(),
    name: yup.string().max(30, 'Ingresa como máximo 30 caractéres.'),
    description: yup.string().max(250, 'Ingresa como máximo 250 caractéres.'),
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

  const [cookies, setCookie] = useCookies(['token']);
  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }

  const handleAddMascota = async (data) => {
    console.log(data);
    await axios.post('http://localhost:8000/api/pets', data, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    reset();
  };

  const [pets, setPets] = useState('');

  useEffect(() => {
    const getMascotas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pets', {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });
        setPets(response);
      } catch (error) {
        console.log('messaje', error);
      }
    };
    getMascotas();
  }, []);

  console.log(pets);

  const useFormChange = useFormChangeContext();

  useEffect(() => {
    useFormChange((prevState) => ({
      ...prevState,
      type: watch('type'),
    }));
  }, [watch('type')]);

  const useFormData = useFormContext();
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
      onChange={onChange}
    >
      <h2>Los primeros 4 campos son obligatorios</h2>
      <WrapperComponentForm>
        <TituloForm>Se perdio mi...</TituloForm>
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
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TituloForm>Raza..</TituloForm>
        <DataListComponent
          Array={razasLista}
          tipo={type}
          validacion={{ ...register('breed') }}
        />
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
        <TituloForm>{castrdoEsterilizada}</TituloForm>
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
      </WrapperComponentForm>

      <WrapperComponentForm>
        <InputTextComponent
          label={'Responde al nombre de...'}
          idFor={'nameLostPet'}
          validacion={{ ...register('name') }}
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
        texto={'enviar'}
      />
    </WrapperMascotaPerdida>
  );
};

export default AddPet;
