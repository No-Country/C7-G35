import styled from 'styled-components';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import useFetch from '../../customHooks/useFetch';
import { WrapperListadoCards } from '../userProfile/UserProfile';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';
import Filters from '../../componentes/filtesrs/Filters';
import { useQueryContext } from '../../providers/QueryProviders';

const MainWrapperVerTodo = styled.div``;

const VerTodos = () => {
  const query = useQueryContext();

  const params = `?${new URLSearchParams(query).toString()}`;
  console.log(params);

  const mascotas = useFetch(`http://localhost:8000/api/loss/by${params}`);
  const mascotasPerdidas = mascotas?.data?.petsLoss;
  console.log(mascotasPerdidas);

  return (
    <MainWrapperVerTodo>
      <Filters/>
    <WrapperListadoCards>
            {mascotasPerdidas ? (
              mascotasPerdidas?.map((mascota) => (
                <CardMascota
                  key={mascota?.pet?.id}
                  id={'/detail-pet'}
                  nombre={mascota?.pet?.name}
                  link={mascota?.pet?.images ? mascota?.pet?.images[0] : SinFotoMascota}
                  fecha={mascota?.date}
                  estado={'perdido'}
                />
              ))
            ) : (
              'nada'
            )}
    </WrapperListadoCards>
    </MainWrapperVerTodo>
  );
};

export default VerTodos;
