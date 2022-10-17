import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import { SVGWavesSuperior } from '../../componentes/SVGWaves/SVGWaves';
import useFetch from '../../customHooks/useFetch';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';

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

const WrapperTodasLasMascotas = styled.div`
    padding: 1rem;
    `;

const WrapperMascotasRegistradas = styled.div`
    margin-bottom: 1.5rem;
`;

const Titulo = styled.h3`
    padding-left: 0.5rem;
    margin-bottom: .5rem;
    border-left: 1rem solid var(--clr-blue-dark);
    border-radius: 5px;
`;

const Descripcion = styled.p`
    margin-left: .5rem;
    color: var(--clr-grey-dark);
`;

const DescripcionSinRegistro = styled.p`
    padding: 1rem;
    color: var(--clr-grey-dark);
    background-color:var(--clr-grey-medium) ;
`;

const WrapperListadoCards = styled.div`
    padding: 1rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const UserProfile = () => {
  const { userName, token } = JSON.parse(localStorage.getItem('token'));

  const MascotasRegistradas = useFetch('http://localhost:8000/api/pets', token);
  const MascotasRegistradasData = MascotasRegistradas?.data?.pets;

  const MascotasPerdidas = useFetch('http://localhost:8000/api/loss', token);
  const MascotasPerdidasData = MascotasPerdidas?.data?.petLoss;
  console.log(MascotasPerdidas);

  const handleDelete = async (id) => {
    axios.delete(
      `http://localhost:8000/api/pets/${id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
  };
  return (
    <WrapperUserProfile>
        <WrapperSaludo>
            <Saludo>Hola </Saludo>
            <UserName>{userName}!</UserName>
        </WrapperSaludo>
        <SVGWavesSuperior/>
        <WrapperTodasLasMascotas>
            <WrapperMascotasRegistradas>
                <Titulo>Tus mascotas registradas</Titulo>
                <Descripcion>Aquí podrás ver las mascotas que subiste al sitio</Descripcion>
                <WrapperListadoCards>
                   {MascotasRegistradas
                     ? MascotasRegistradasData?.map((mascota) => (
                        <CardMascota
                          key={mascota?.id}
                          id={'/detail-pet'}
                          nombre={mascota?.name}
                          link={mascota?.images ? mascota?.images[0] : SinFotoMascota}
                          fecha={mascota?.date}
                          estado={mascota?.estado}
                          token={token}
                          deleteFunction={() => handleDelete(mascota?.id) }
                        />
                     ))
                     : <DescripcionSinRegistro>
                    Veo que no registraste ninguna mascota,
                    tal vez podrías considerar hacerlo, por
                    precaución. Si tu mascota se pierde, rápidamente
                    puedes marcarla como &quot;perdida&quot; para agilizar la búsqueda.
                     No todos los datos son obligatorios, pero mientras mas completo este
                     el formulario, mas posibilidades tienes de encontrarlo si se pierda.
                     <Link to='/'>Registra tu mascota aquí</Link>
                    </DescripcionSinRegistro> }
                </WrapperListadoCards>
            </WrapperMascotasRegistradas>
            <WrapperMascotasRegistradas>
                <Titulo>Tu mascota perdida</Titulo>
                <Descripcion>Aquí verás la mascota marcada &quot;perdida&quot;</Descripcion>
                <WrapperListadoCards>
                {MascotasPerdidas
                  ? MascotasPerdidasData?.map((mascota) => (
                        <CardMascota
                          key={mascota?.id}
                          id={'/detail-pet'}
                          nombre={mascota?.name}
                          link={mascota?.images ? mascota?.images[0] : SinFotoMascota}
                          fecha={mascota?.date}
                          estado={mascota?.estado}
                          token={token}
                          deleteFunction={() => handleDelete(mascota?.id) }
                        />
                  ))
                  : <DescripcionSinRegistro>
                    No tienes ninguna mascota marcada como perdida, que bueno!
                    </DescripcionSinRegistro> }
                </WrapperListadoCards>
            </WrapperMascotasRegistradas>
        </WrapperTodasLasMascotas>
    </WrapperUserProfile>
  );
};

export default UserProfile;
