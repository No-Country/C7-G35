import styled from 'styled-components';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router-dom';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import useFetch from '../../customHooks/useFetch';
import { WrapperListadoCards } from '../userProfile/UserProfile';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';
import Filters from '../../componentes/filtesrs/Filters';
import { useQueryContext } from '../../providers/QueryProviders';

const MainWrapperVerTodo = styled.div`
  flex: 1;
`;

const VerTodos = () => {
  const query = useQueryContext();

  const searchParams = `?${new URLSearchParams(omitBy(query, isEmpty)).toString()}`;
  const { state } = useParams();
  const mascotas = (state === 'loss' ? useFetch(`http://localhost:8000/api/loss/by${searchParams}`) : useFetch(`http://localhost:8000/api/rescues/by${searchParams}`));
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
                  path={`/detail-pet/${state}/${mascota?.id}`}
                  nombre={mascota?.pet?.name}
                  link={mascota?.pet?.images ? mascota?.pet?.images[0] : SinFotoMascota}
                  fecha={mascota?.date}
                  estado={state}
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
