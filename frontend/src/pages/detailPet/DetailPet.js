import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../customHooks/useFetch';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';

const WrapperDetailPet = styled.section`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 7px;
  overflow: hidden;
  width: min(800px, 90%);
  margin: 3rem auto;
  background-color: var(--clr-pink-light);
`;
const WrapperImgPet = styled.div`
  width: 100%;
  height: 400px;
`;
const ImgPet = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const WrapperDataPet = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
`;
const NameWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  flex-direction: column;
`;
const NamePet = styled.h2`
  color: var(--clr-pink-medium);
`;

const UnderLine = styled.span`
  background-color: var(--clr-pink-medium);
  height: 1rem;
  width: 70%;
  border-radius: 1rem;
`;
const WrapperMoreData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 4rem;
  padding: 2rem 1rem;
`;
const BoxData = styled.div`
  font-size: 1.5rem;
`;
const Key = styled.p`
  color: var(--clr-pink);
`;
const Value = styled.p`
  font-weight: 600;
`;

const DetailPet = () => {
  const { id, state } = useParams();

  const detalleMascota = useFetch(`http://localhost:8000/api/${state}/${id}`);

  const datosMostrar = state === 'loss'
    ? detalleMascota?.data?.loss
    : detalleMascota?.data?.rescue;

  return (
    <WrapperDetailPet>
      <WrapperImgPet>
        <ImgPet
          src={datosMostrar?.pet?.images !== null
            ? datosMostrar?.pet?.images[0] : SinFotoMascota}
          alt='Mascota perdida'
        />
      </WrapperImgPet>
      <WrapperDataPet>
        <NameWrapper>
          <NamePet>Teo</NamePet>
          <UnderLine></UnderLine>
        </NameWrapper>
        <WrapperMoreData>
          <BoxData>
            <Key>Ubicación</Key>
            <Value>{datosMostrar?.location}</Value>
          </BoxData>
          <BoxData>
            <Key>Es un</Key>
            <Value>
              {datosMostrar?.pet?.type}
            </Value>
          </BoxData>
          <BoxData>
            <Key>Raza</Key>
            <Value>{datosMostrar?.pet?.breed}</Value>
          </BoxData>
          <BoxData>
            <Key>Genero</Key>
            <Value>
              {datosMostrar?.pet?.gender}
            </Value>
          </BoxData>
          <BoxData>
            <Key>¿Castrado?</Key>
            <Value>
              {datosMostrar?.pet?.isCastrated === 'false' ? 'Si' : 'No'}
            </Value>
          </BoxData>
          <BoxData>
            <Key>Nombre</Key>
            <Value>{datosMostrar?.pet?.name}</Value>
          </BoxData>
          <BoxData>
            <Key>Tamaño</Key>
            <Value>{datosMostrar?.pet?.size}</Value>
          </BoxData>
          <BoxData>
            <Key>Edad</Key>
            <Value>{datosMostrar?.pet?.age}</Value>
          </BoxData>
          <BoxData>
            <Key>Descripción</Key>
            <Value>{datosMostrar?.pet?.description}</Value>
          </BoxData>
        </WrapperMoreData>
      </WrapperDataPet>
    </WrapperDetailPet>
  );
};

export default DetailPet;
