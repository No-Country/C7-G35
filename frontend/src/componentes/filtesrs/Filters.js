import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import {
  useQueryChangeContext,
  useQueryContext,
} from '../../providers/QueryProviders';
import { razasLista } from '../../helpers/ListaRazas';

const MainWrapperVerTodos = styled.div``;
const IconoFiltro = styled.button`
  display: flex;
  gap: 0.6rem;
  font-size: 1.5rem;
  background-color: var(--clr-blue-dark);
  width: max-content;
  padding: 1rem;
  color: #fff;
  border-radius: 0 7px 7px 0;
  border: none;
  cursor: pointer;
`;
const TextoFiltro = styled.p`
`;

const MainWrapperFilter = styled.form`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const WrapperInputFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding-bottom: 1rem;
  border-radius: 7px;
  overflow: hidden;
  &&:nth-child(even) {
    background-color: var(--clr-grey-medium);
  }
`;
const TitleInput = styled.p`
  padding: 0.8rem;
  color: #fff;
  background-color: var(--clr-blue-dark);
`;
const WrapperLabelInput = styled.div`
  margin-inline: 1rem;
`;
const InputCheckeable = styled.input`
  margin-right: 0.5rem;
`;

const InputList = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
`;
const LabelInput = styled.label``;

const InputDate = styled.input`
  font-size: 2rem;
  padding: 0.5rem;
`;

const WrapperGenerico = styled.div`
  border-radius: 7px;
  overflow: hidden;
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
    description: yup.string(),
    date: yup.string(),
  })
  .required();

const Filters = () => {
  const { register, getValues, reset } = useForm({
    resolver: yupResolver(schemaAddLostPet),
  });

  const query = useQueryContext();

  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const today = `${year}-${month + 1}-${day}`;

  function LocationMarker({ handleChange }) {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        handleChange(e.latlng);
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

  const [city, setCity] = useState('');
  const { country, state } = city;
  async function getCity(latitude, longitud) {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=pk.90e4cbe0aae8a090aeae84bd1a0a9ee3&lat=${latitude}&lon=${longitud}&format=json`,
    );
    setCity(response?.data?.address);
  }
  console.log(city);

  const handleChangePoint = (coord) => {
    getCity(coord.lat, coord.lng);
  };

  const [datos, setDatos] = useState('');
  const queryChange = useQueryChangeContext();

  useEffect(() => {
    queryChange({
      age: datos?.age,
      breed: datos?.breed,
      color: datos?.color,
      date: datos?.date ? new Date(datos?.date).toUTCString() : undefined,
      gender: datos?.gender,
      isCastrated: datos?.isCastrated,
      size: datos?.size,
      type: datos?.type,
      location: city ? `${country}, ${state}` : undefined,
    });
  }, [datos, city]);

  return (
    <MainWrapperVerTodos>
    <IconoFiltro>
    <FaFilter/>
    <TextoFiltro>Filtra tu busqueda</TextoFiltro>
    </IconoFiltro>
    <MainWrapperFilter
      onChange={() => {
        setDatos(getValues());
      }}
    >
      <WrapperInputFilter>
        <TitleInput>Tipo</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='dog'
            id='dogFilter'
            {...register('type')}
          />
          <LabelInput htmlFor='dogFilter'>Perro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='cat'
            id='catFilter'
            {...register('type')}
          />
          <LabelInput htmlFor='catFilter'>Gato</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='catEmptyFilter'
            {...register('type')}
          />
          <LabelInput htmlFor='catEmptyFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Genero</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='male'
            id='maleFilter'
            {...register('gender')}
          />
          <LabelInput htmlFor='maleFilter'>Macho</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='female'
            name='gender'
            id='femaleFilter'
            {...register('gender')}
          />
          <LabelInput htmlFor='femaleFilter'>Hembra</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            name='gender'
            id='femaleEmptyFilter'
            {...register('gender')}
          />
          <LabelInput htmlFor='femaleEmptyFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Tamaño</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='small'
            id='sizeFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='sizeFilter'>Pequeño</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='medium'
            id='mediumFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='mediumFilter'>Mediano</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='big'
            id='bigFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='bigFilter'>Grande</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='emptySizeFilter'
            {...register('size')}
          />
          <LabelInput htmlFor='emptySizeFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Edad</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='puppy'
            id='ageFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='ageFilter'>Cachorro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='adult'
            id='adultFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='adultFilter'>Adulto</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value='senior'
            id='seniorFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='seniorFilter'>Adulto Mayor</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='emptyAgeFilter'
            {...register('age')}
          />
          <LabelInput htmlFor='emptyAgeFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>Color</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='white'
            id='colorWhiteFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorWhiteFilter'>Blanco</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='darkBrown'
            id='colorBrownFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorBrownFilter'>Marron Oscuro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='black'
            id='colorBlackFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorBlackFilter'>Negro</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='blonde'
            id='colorBlondeFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorBlondeFilter'>Rubio</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='grey'
            id='colorGreyFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorGreyFilter'>Gris</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='checkbox'
            value='orange'
            id='colorOrangeFilter'
            {...register('color')}
          />
          <LabelInput htmlFor='colorOrangeFilter'>Naranja</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <TitleInput>¿Esta castrado?</TitleInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value={true}
            id='neuteredFilter'
            {...register('isCastrated')}
          />
          <LabelInput htmlFor='neuteredFilter'>Si lo esta</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value={false}
            id='notNeuteredFilter'
            {...register('isCastrated')}
          />
          <LabelInput htmlFor='notNeuteredFilter'>No lo esta</LabelInput>
        </WrapperLabelInput>
        <WrapperLabelInput>
          <InputCheckeable
            type='radio'
            value=''
            id='isCastratedEmptyFilter'
            {...register('isCastrated')}
          />
          <LabelInput htmlFor='isCastratedEmptyFilter'>Todos</LabelInput>
        </WrapperLabelInput>
      </WrapperInputFilter>
      <WrapperInputFilter>
        <LabelInput>
          <TitleInput>Elije una opción de la lista:</TitleInput>
          <InputList list='Razas' {...register('breed')} />
        </LabelInput>
        <datalist id='Razas'>
          <option value='No tiene raza' />
          {query.type ? (
            razasLista[query.type].map((mascota, index) => (
              <option key={index} value={mascota} />
            ))
          ) : (
            <option value={'Primero marca perro o gato'} />
          )}
        </datalist>
      </WrapperInputFilter>
      <WrapperGenerico>
        <LabelInput>
          <TitleInput> Fecha:</TitleInput>
          <InputDate type='date' max={today} {...register('date')} />
        </LabelInput>
      </WrapperGenerico>
      <WrapperInputFilter>
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
          <LocationMarker handleChange={handleChangePoint} />
        </MapContainer>
      </WrapperInputFilter>
    </MainWrapperFilter>
    </MainWrapperVerTodos>
  );
};

export default Filters;
