import styled from 'styled-components';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router-dom';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import useFetch from '../../customHooks/useFetch';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';
import Filters from '../../componentes/filtesrs/Filters';
import { useQueryContext } from '../../providers/QueryProviders';
import { WrapperListadoCards } from '../userProfile/UserProfile.styled';

const MainWrapperVerTodo = styled.div`
  flex: 1;
`;

const VerTodos = () => {
  const query = useQueryContext();

  const searchParams = `?${new URLSearchParams(omitBy(query, isEmpty)).toString()}`;
  const { state } = useParams();

  const url = (state === 'loss' ? `https://pet-spaces-production.up.railway.app/api/loss/by${searchParams}`
    : `https://pet-spaces-production.up.railway.app/api/rescues/by${searchParams}`);

  const mascotas = useFetch(url);

  const mascotasPerdidas = (state === 'loss' ? mascotas?.data?.petsLoss : mascotas?.data?.petsRescues);
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
              'Cargando mascotas...'
            )}
    </WrapperListadoCards>
    </MainWrapperVerTodo>
  );
};

export default VerTodos;
