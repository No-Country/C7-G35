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
  CheckboxComponente,
  DataListComponent,
  InputTextComponent,
  TextAreaComponent,
} from '../../componentes/inputs/Inputs';
import {
  RadioButtonsIconsGroup,
  TituloForm,
  WrapperComponentForm,
} from '../../componentes/forms/GroupForms';
import { razasLista } from '../../helpers/ListaRazas';
import { mascotaTipoOpciones } from '../../helpers/Tipo';
import { Genero } from '../../helpers/Genero';
import { edad } from '../../helpers/Edad';
import {
  useFormChangeContext,
  useFormContext,
} from '../../providers/FormProviders';

const WrapperMascotaPerdida = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
  align-items: center;
`;

const schemaAddLostPet = yup
  .object({
    type: yup.string().required(),
    gender: yup.string().required(),
    breed: yup.string().required(),
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

  const [isCastrated, setIsCastrated] = useState('');
  useEffect(() => {
    if (watch('isCastrated')) {
      setIsCastrated('Si, lo está.');
    } else {
      setIsCastrated('No, no lo está.');
    }
  }, [watch('isCastrated')]);

  const [castrdoEsterilizada, setCastrdoEsterilizada] = useState('');
  useEffect(() => {
    if (watch('gender') === 'male') {
      setCastrdoEsterilizada('¿Esta castrado?');
    } else {
      setCastrdoEsterilizada('¿Esta esterilizada?');
    }
  }, [watch('gender')]);

  return (
    <WrapperMascotaPerdida
      onSubmit={handleSubmit(handleAddMascota)}
      onChange={onChange}
    >
      <h2>Los primeros 4 campos son obligatorios</h2>
      <RadioButtonsIconsGroup
        titulo={'Se perdio mi...'}
        data={mascotaTipoOpciones}
        validacion={{ ...register('type') }}
      />

      <RadioButtonsIconsGroup
        titulo={'Es...'}
        data={Genero}
        validacion={{ ...register('gender') }}
      />

      <WrapperComponentForm>
        <TituloForm>Raza..</TituloForm>
        <DataListComponent
          Array={razasLista}
          tipo={type}
          validacion={{ ...register('breed') }}
        />
      </WrapperComponentForm>

      <RadioButtonsIconsGroup
        titulo={'De edad es...'}
        orientacion={'vertical'}
        data={edad}
        validacion={{ ...register('age') }}
      />

      <WrapperComponentForm>
        <TituloForm>{castrdoEsterilizada}</TituloForm>
        <CheckboxComponente
          validacion={{ ...register('isCastrated') }}
          icon={
            watch('isCastrated') ? (
              <RiCheckboxCircleFill />
            ) : (
              <RiCheckboxBlankCircleLine />
            )
          }
          idFor={'isCastratedLost'}
          label={isCastrated}
        />
      </WrapperComponentForm>

      <WrapperComponentForm>
        <InputTextComponent
          label={'Responde al nombre de...'}
          validacion={{ ...register('name') }}
          idFor={'nameLostPet'}
        />
      </WrapperComponentForm>

      <WrapperComponentForm>
        <TextAreaComponent
          label={'Tiene algo que lo diferencia'}
          placeholder={
            'Alguna marca, sicatriz, o cualquier cosa que lo diferencie'
          }
          validacion={{ ...register('description') }}
          idFor={'descriptionLostPet'}
        />
      </WrapperComponentForm>
      <button type='submit'>Enviar</button>
    </WrapperMascotaPerdida>
  );
};

export default AddPet;
