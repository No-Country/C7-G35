import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import Swal from 'sweetalert2';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import { SVGWavesSuperior } from '../../componentes/SVGWaves/SVGWaves';
import useFetch from '../../customHooks/useFetch';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';
import {
  ButtonComponent,
  ButtonComponentShort,
} from '../../componentes/buttom/Button';
import { useFormChangeContext } from '../../providers/FormProviders';

const WrapperUserProfile = styled.div`
  color: var(--clr-blue-dark);
`;

const WrapperSaludo = styled.div`
  background-color: var(--clr-pink);
  padding: 2rem;
`;

const Saludo = styled.p`
  font-size: 2rem;
`;

const UserName = styled.h2`
  font-size: 3.5rem;
`;

const WrapperButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WrapperTodasLasMascotas = styled.div`
  padding: 1rem;
`;

const WapperInfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperMascotasRegistradas = styled.div`
  margin-bottom: 1.5rem;
`;

const Titulo = styled.h3`
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  border-left: 1rem solid var(--clr-blue-dark);
  border-radius: 5px;
`;

const Descripcion = styled.p`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--clr-grey-dark);
`;

const DescripcionSinRegistro = styled.p`
  padding: 1rem;
  color: var(--clr-grey-dark);
  background-color: var(--clr-grey-medium);
`;

export const WrapperListadoCards = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.dialog`
    width: max-content;
    height: auto;
    border: none;
    margin: 2rem auto;
    box-shadow: rgba(0, 0, 0, .8) 0px 20px 30px -10px;
    border-radius: 7px;
    &&::backdrop{
      background-color: rgba(0, 0, 0, .8);
    }
`;

const WrapperModal = styled.div`
  z-index: 4456;
  border: none;
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const DatosSolicitados = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const LabelMascotaPerdida = styled.label`
  font-weight: bolder;
`;

const InputMarcarPedido = styled.input`
    padding: 0.5rem;
`;

const FormDatos = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const WrapperBotones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const UserProfile = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const userMe = useFetch(
    'https://pet-spaces-production.up.railway.app/api/users/me',
    token,
  );

  const MascotasRegistradas = useFetch(
    'https://pet-spaces-production.up.railway.app/api/pets',
    token,
  );
  const MascotasRegistradasData = MascotasRegistradas?.data?.pets;
  const MascotasPerdidas = useFetch(
    'https://pet-spaces-production.up.railway.app/api/loss',
    token,
  );
  const MascotasPerdidasData = MascotasPerdidas?.data?.petLoss;
  const MascotasRescatadas = useFetch(
    'https://pet-spaces-production.up.railway.app/api/rescues',
    token,
  );
  const MascotasRescatadasData = MascotasRescatadas?.data?.petRescue;
  console.log(MascotasRescatadas);
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then((result) => {
      axios.delete(
        ` https://pet-spaces-production.up.railway.app/api/pets/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'Ya no veras esta mascota en tu lista.',
          'success',
        );
      }
    });
  };

  const useChengeForm = useFormChangeContext();
  const navigate = useNavigate();
  const handleEdit = async (mascota) => {
    useChengeForm(mascota);
    navigate(`/edit-registered-pet/${mascota?.id}`);
  };
  const schemaSendToLosts = yup
    .object({
      date: yup.string().required('Este campo es requerido'),
      publicContact: yup.string().phone('', '', 'Ingrese un numero valido').required('Este campo es requerido'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaSendToLosts),
  });
  const [idMascota, setIdMascota] = useState('');
  const [city, setCity] = useState('');
  const modal = useRef();
  const handleAddLikeLost = async (data) => {
    await axios.post(
      `https://pet-spaces-production.up.railway.app/api/loss/${idMascota}`,
      {
        ...data,
        location: city,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    modal.current.close();
    reset();
  };

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

  async function getCity(latitude, longitud) {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=pk.90e4cbe0aae8a090aeae84bd1a0a9ee3&lat=${latitude}&lon=${longitud}&format=json`,
    );
    setCity(response?.data?.address);
  }

  const handleChangePoint = (coord) => {
    getCity(coord.lat, coord.lng);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const OpenModalMarcarPedida = (id) => {
    setIsOpenModal(true);
    modal.current.showModal();
    setIdMascota(id);
  };

  const cerrarModal = () => {
    setIsOpenModal(false);
    modal.current.close();
    reset();
  };

  const handleMascotaRcuperada = async (id) => {
    console.log(id);
    await Swal.fire({
      title: 'He recuperado esta mascota',
      text: 'Ya no necesito buscar mas',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Dejar de buscar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(
          ` https://pet-spaces-production.up.railway.app/api/loss/${id}/recovered`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        Swal.fire(
          'Que bueno!!',
          'Ya no veras esta mascota en tu lista de mascotas perdidas.',
          'success',
        );
      }
    });
  };

  return (
    <WrapperUserProfile>
      <WrapperSaludo>
        <Saludo>Hola </Saludo>
        <UserName>{userMe?.data?.user?.name}!</UserName>
        <WrapperButtons>
          <ButtonComponent
            texto={'Encontré una mascota'}
            estado={'rescues'}
            path={'/form-add-found-pet'}
          />
          <ButtonComponent
            texto={'Busco mi mascota'}
            path={'/form-add-lost-pet'}
          />
        </WrapperButtons>
      </WrapperSaludo>
      <SVGWavesSuperior />
      <WrapperTodasLasMascotas>
        <WrapperMascotasRegistradas>
          <WapperInfoSection>
            <Titulo>Tus mascotas registradas</Titulo>
            <Descripcion>
              Aquí podrás ver las mascotas que subiste al sitio
            </Descripcion>
            <ButtonComponentShort
              as={'a'}
              texto={'Agregar una mascota'}
              path={'/form-add-pet'}
            />
          </WapperInfoSection>
          <WrapperListadoCards>
            {MascotasRegistradasData?.length !== 0 ? (
              MascotasRegistradasData?.map((mascota) => (
                <CardMascota
                  key={mascota?.id}
                  path={`/detail-pet/pets/${mascota?.id}`}
                  nombre={mascota?.name}
                  link={mascota?.images ? mascota?.images[0] : SinFotoMascota}
                  fecha={mascota?.date}
                  estado={'pets'}
                  token={token}
                  deleteFunction={() => handleDelete(mascota?.id)}
                  editFunction={() => handleEdit(mascota)}
                  openModal={() => OpenModalMarcarPedida(mascota?.id)}
                />
              ))
            ) : (
              <DescripcionSinRegistro>
                Veo que no registraste ninguna mascota, tal vez podrías
                considerar hacerlo, por precaución. Si tu mascota se pierde,
                rápidamente puedes marcarla como &quot;perdida&quot; para
                agilizar la búsqueda. No todos los datos son obligatorios, pero
                mientras mas completo este el formulario, mas posibilidades
                tienes de encontrarlo si se pierda.
                <Link to='/'>Registra tu mascota aquí</Link>
              </DescripcionSinRegistro>
            )}
          </WrapperListadoCards>
        </WrapperMascotasRegistradas>
        <WrapperMascotasRegistradas>
          <Titulo>Tu mascota perdida</Titulo>
          <Descripcion>
            Aquí verás la mascota marcada &quot;perdida&quot;
          </Descripcion>
          <WrapperListadoCards>
            {MascotasPerdidasData?.length !== 0 ? (
              MascotasPerdidasData?.map((mascota) => (
                !mascota?.isRecovered
                && <CardMascota
                  key={mascota?.id}
                  path={`/detail-pet/loss/${mascota?.id}`}
                  nombre={mascota?.pet?.name}
                  link={
                    mascota?.pet?.images
                      ? mascota?.pet?.images[0]
                      : SinFotoMascota
                  }
                  fecha={mascota?.date}
                  estado={'loss'}
                  token={token}
                  deleteFunction={() => handleDelete(mascota?.id)}
                  openModalRecuperado={() => handleMascotaRcuperada(mascota?.id)}
                  isRecovered={mascota?.isRecovered}
                />
              ))
            ) : (
              <DescripcionSinRegistro>
                No tienes ninguna mascota marcada como perdida, que bueno!
              </DescripcionSinRegistro>
            )}
          </WrapperListadoCards>
        </WrapperMascotasRegistradas>
        <WrapperMascotasRegistradas>
          <Titulo>Mascotas que encontraste</Titulo>
          <Descripcion>Aquí verás la mascota que encontraste;</Descripcion>
          <WrapperListadoCards>
            {MascotasRescatadasData?.length !== 0 ? (
              MascotasRescatadasData?.map((mascota) => (
                !mascota?.isRecovered
                && <CardMascota
                  key={mascota?.id}
                  path={`/detail-pet/rescues/${mascota?.id}`}
                  nombre={mascota?.pet?.name}
                  link={
                    mascota?.pet?.images
                      ? mascota?.pet?.images[0]
                      : SinFotoMascota
                  }
                  fecha={mascota?.date}
                  estado={'rescues'}
                  token={token}
                  deleteFunction={() => handleDelete(mascota?.id)}
                />
              ))
            ) : (
              <DescripcionSinRegistro>
                No tienes ninguna mascota marcada como encontrada.
              </DescripcionSinRegistro>
            )}
          </WrapperListadoCards>
        </WrapperMascotasRegistradas>
      </WrapperTodasLasMascotas>
      <Modal method="dialog" ref={modal}>
        <WrapperModal>
        <h3>Se perdio tu mascota?</h3>
        <p>Necesitamos un par de datos para poder publicarla</p>
        <FormDatos onSubmit={handleSubmit(handleAddLikeLost)}>
          <DatosSolicitados>
            <LabelMascotaPerdida>
              <p>Teléfono</p>
              <InputMarcarPedido type='tel' {...register('publicContact')} />
              {errors.publicContact && <p>{errors.publicContact.message}</p>}
            </LabelMascotaPerdida>
            <LabelMascotaPerdida>
              <p>Fecha</p>
              <InputMarcarPedido type='date' {...register('date')} />
              {errors.date && <p>{errors.date.message}</p>}
            </LabelMascotaPerdida>
            <div>
              <p>Fue en...</p>
              {isOpenModal && <MapContainer
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
              </MapContainer>}
            </div>
          </DatosSolicitados>
            {city && <p>{city.country}, {city.state}</p>}
          <WrapperBotones>
            <ButtonComponentShort
              as={'button'}
              texto={'Enviar'}
              />
          <ButtonComponentShort as={'button'} type={'button'} texto={'Cancelar'} onClick={cerrarModal} />
          </WrapperBotones>
          </FormDatos>
              </WrapperModal>
      </Modal>
    </WrapperUserProfile>
  );
};

export default UserProfile;
