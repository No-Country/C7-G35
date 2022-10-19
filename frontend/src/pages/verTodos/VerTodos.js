import React from 'react';
import CardMascota from '../../componentes/cardMascota/CardMascota';
import useFetch from '../../customHooks/useFetch';
import { WrapperListadoCards } from '../userProfile/UserProfile';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';

const VerTodos = () => {
  const MascotasPerdidas = useFetch('http://localhost:8000/api/pets');
  const MascotasPerdidasData = MascotasPerdidas?.data?.petLoss;

  return (
    <WrapperListadoCards>
            {MascotasPerdidas?.length !== 0 ? (
              MascotasPerdidasData?.map((mascota) => (
                <CardMascota
                  key={mascota?.id}
                  id={'/detail-pet'}
                  nombre={mascota?.name}
                  link={mascota?.images ? mascota?.images[0] : SinFotoMascota}
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
