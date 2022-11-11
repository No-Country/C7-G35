import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  DatosSolicitados,
  Descripcion,
  DescripcionSinRegistro,
  FormDatos,
  InputMarcarPedido,
  LabelMascotaPerdida,
  Modal,
  Saludo,
  Titulo,
  UserName,
  WapperInfoSection,
  WrapperBotones,
  WrapperButtons,
  WrapperListadoCards,
  WrapperMascotasRegistradas,
  WrapperModal,
  WrapperSaludo,
  WrapperTodasLasMascotas,
  WrapperUserProfile,
} from './UserProfile.styled';

const UserProfile = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const userMe = useFetch(
    'https://pet-spaces-production.up.railway.app/api/users/me',
    token,
  );

  const [mascotaRegistradaData, setMascotaRegistradaData] = useState([]);
  const MascotasRegistradas = useFetch(
    'https://pet-spaces-production.up.railway.app/api/pets',
    token,
  );

  useEffect(() => {
    setMascotaRegistradaData(MascotasRegistradas?.data?.pets);
  }, [MascotasRegistradas]);

  const [mascotasPerdidasData, setMascotasPerdidasData] = useState([]);
  const MascotasPerdidas = useFetch(
    'https://pet-spaces-production.up.railway.app/api/loss',
    token,
  );
  useEffect(() => {
    setMascotasPerdidasData(MascotasPerdidas?.data?.petLoss);
  }, [MascotasPerdidas]);
  const mascotasPerdidaNoDevueltas = mascotasPerdidasData?.filter(mascota => !mascota?.isRecovered);

  const [mascotasRescatadasData, setMascotasRescatadas] = useState([]);
  const mascotasRescatadas = useFetch(
    'https://pet-spaces-production.up.railway.app/api/rescues',
    token,
  );
  useEffect(() => {
    setMascotasRescatadas(mascotasRescatadas?.data?.petRescue);
  }, [mascotasRescatadas]);
  const mascotasEncontradaNoDevuelta = mascotasRescatadasData?.filter(mascota => {
    return !mascota?.isRecovered;
  });

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          ` https://pet-spaces-production.up.railway.app/api/pets/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }
      Swal.fire(
        'Borrado!',
        'Ya no veras esta mascota en tu lista.',
        'success',
      );
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

  const LocationMarker = ({ setPos, handleChange }) => {
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
  };

  const getCity = async (latitude, longitud) => {
    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=pk.90e4cbe0aae8a090aeae84bd1a0a9ee3&lat=${latitude}&lon=${longitud}&format=json`,
    );
    setCity(response?.data?.address);
  };

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

  const handleMascotaRcuperada = (id) => {
    Swal.fire({
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
          '',
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
      Swal.fire(
        'Que bueno!!',
        'Ya no veras esta mascota en tu lista de mascotas perdidas.',
        'success',
      );
    });
  };

  const handleMascotaReunida = async (id) => {
    await Swal.fire({
      title: 'Reuni a esta mascota con su dueño',
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
          '',
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
      Swal.fire(
        'Que bueno!!',
        'Ya no veras esta mascota en tu lista de mascotas encontradas.',
        'success',
      );
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
            {mascotaRegistradaData?.length !== 0 ? (
              mascotaRegistradaData?.map((mascota) => (
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
                  openModalSePerdio={() => OpenModalMarcarPedida(mascota?.pet?.id)}
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
            {mascotasPerdidaNoDevueltas?.length !== 0 ? (
              mascotasPerdidaNoDevueltas?.map((mascota) => (
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
            {mascotasEncontradaNoDevuelta?.length !== 0 ? (
              mascotasEncontradaNoDevuelta?.map((mascota) => (
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
                  openModalReunido={() => handleMascotaReunida(mascota?.id)}
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
