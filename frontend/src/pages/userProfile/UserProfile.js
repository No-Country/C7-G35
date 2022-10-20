import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import { SVGWavesSuperior } from '../../componentes/SVGWaves/SVGWaves';
import useFetch from '../../customHooks/useFetch';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';
import { ButtonComponent, ButtonComponentShort } from '../../componentes/buttom/Button';

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
  margin-bottom: .5rem;
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

const UserProfile = () => {
  const { token } = JSON.parse(localStorage.getItem('token'));

  const userMe = useFetch('http://localhost:8000/api/users/me', token);

  const MascotasRegistradas = useFetch('http://localhost:8000/api/pets', token);
  const MascotasRegistradasData = MascotasRegistradas?.data?.pets;

  const MascotasPerdidas = useFetch('http://localhost:8000/api/loss', token);

  const MascotasPerdidasData = MascotasPerdidas?.data?.petLoss;
  console.log(MascotasPerdidasData);

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
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire(
          'Borrado!',
          'Ya no veras esta mascota en tu lista.',
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
            estado={'Encontrado'}
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
                <ButtonComponentShort as={'a'} texto={'Agregar una mascota'} path={'/form-add-pet'}/>
            </WapperInfoSection>
          <WrapperListadoCards>
            {MascotasRegistradasData?.length !== 0 ? (
              MascotasRegistradasData?.map((mascota) => (
                <CardMascota
                  key={mascota?.id}
                  id={'/detail-pet'}
                  nombre={mascota?.name}
                  link={mascota?.images ? mascota?.images[0] : SinFotoMascota}
                  fecha={mascota?.date}
                  estado={'perdido'}
                  token={token}
                  deleteFunction={() => handleDelete(mascota?.id)}
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
            {MascotasPerdidasData?.pet !== null ? (
              MascotasPerdidasData?.map((mascota) => (
                mascota?.pet
                && <CardMascota
                  key={mascota?.id}
                  id={'/detail-pet'}
                  nombre={mascota?.pet?.name}
                  link={mascota?.pet?.images ? mascota?.pet?.images[0] : SinFotoMascota}
                  fecha={mascota?.date}
                  estado={'perdido'}
                  token={token}
                  deleteFunction={() => handleDelete(mascota?.id)}
                />
              ))
            ) : (
              <DescripcionSinRegistro>
                No tienes ninguna mascota marcada como perdida, que bueno!
              </DescripcionSinRegistro>
            )}
          </WrapperListadoCards>
        </WrapperMascotasRegistradas>
      </WrapperTodasLasMascotas>
    </WrapperUserProfile>
  );
};

export default UserProfile;
