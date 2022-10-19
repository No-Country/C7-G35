import React from 'react';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import useFetch from '../../customHooks/useFetch';
import { WrapperListadoCards } from '../userProfile/UserProfile';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';

const VerTodos = () => {
  const mascotas = useFetch('http://localhost:8000/api/loss/by?gender=male');
  const mascotasPerdidas = mascotas?.data?.petsLoss;
  console.log(mascotasPerdidas);

  return (
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
  );
};

export default VerTodos;
