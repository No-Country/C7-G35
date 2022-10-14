import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

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

function LocationMarker({ setPos, handleChange }) {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      handleChange(e.latlng);
      setPos(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker
      icon={L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconSize: [25, 35],
      })}
      position={position}
    >
      <Popup>Fue por aquí!</Popup>
    </Marker>
  );
}

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

  const [cookies] = useCookies(['token']);
  // function onChange(newName) {
  //   setCookie('name', newName, { path: '/' });
  // }

  const [city, setCity] = useState('');
  async function getCity(latitude, longitud) {
    const response = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.90e4cbe0aae8a090aeae84bd1a0a9ee3&lat=${latitude}&lon=${longitud}&format=json`);
    setCity(response?.data?.address);
  }

  const handleChangePoint = (coord) => {
    getCity(coord.lat, coord.lng);
  };

  const navigate = useNavigate();
  const useFormChange = useFormChangeContext();
  const useFormData = useFormContext();
  const handleAddMascota = async (data) => {
    const response = await axios.post('http://localhost:8000/api/loss', {
      location: `${city.country}, ${city.state}, ${city.state_district}`,
      date: data?.date,
      pet: data,
    }, { headers: { Authorization: `Bearer ${cookies.token}` } });
    console.log(response);
    useFormChange((prevState) => ({
      ...prevState,
      id: response?.data?.petLoss?.pet?.id,
    }));

    reset();
    navigate('/add-photo');
  };

  const [pets, setPets] = useState('');

  const getMascotas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/loss', {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      setPets(response);
    } catch (error) {
      console.log('messaje', error);
    }
  };
  useEffect(() => {
    getMascotas();
  }, []);
  console.log(pets);

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
    <WrapperMascotaPerdida onSubmit={handleSubmit(handleAddMascota)}
    // onChange={onChange}
    >
      <h2>Registra tu mascota perdida</h2>
      <MapContainer
        style={{ height: '600px', width: '600px' }}
        center={[-38.169114135560854, -65.75208708742923]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap"</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker handleChange={handleChangePoint}/>
      </MapContainer>

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
      <WrapperComponentForm>
        <TituloForm>En la dia...</TituloForm>
        <input type='date'{ ...register('date') }/>
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