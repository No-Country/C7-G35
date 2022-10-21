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

const ColumnaUno = styled.div``;
const ColumnaDos = styled.div``;
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

  const detalleMascota = useFetch(`https://pet-spaces-production.up.railway.app/api/${state}/${id}`);
  console.log(detalleMascota);

  let dataMostar = state === 'rescues' && detalleMascota?.data?.rescue;
  dataMostar = state === 'loss' && detalleMascota?.data?.loss;
  dataMostar = state === 'pets' && detalleMascota?.data;

  if (state === 'rescues') {
    dataMostar = detalleMascota?.data?.rescue;
  } else if (state === 'loss') {
    dataMostar = detalleMascota?.data?.loss;
  } else if (state === 'pets') {
    dataMostar = detalleMascota?.data;
  }

  return (
    <WrapperDetailPet>
      <WrapperImgPet>
        <ImgPet
          src={dataMostar?.pet?.images !== null
            ? dataMostar?.pet?.images[0] : SinFotoMascota}
          alt='Mascota perdida'
        />
      </WrapperImgPet>
      <WrapperDataPet>
        <NameWrapper>
          <NamePet>{dataMostar?.pet?.name}</NamePet>
          <UnderLine></UnderLine>
        </NameWrapper>
        <WrapperMoreData>
          <ColumnaUno>
          {dataMostar?.location && <BoxData>
            <Key>Ubicación</Key>
            <Value>{dataMostar?.location}</Value>
          </BoxData>}
          <BoxData>
            <Key>Es un</Key>
            <Value>
              {dataMostar?.pet?.type}
            </Value>
          </BoxData>
          <BoxData>
            <Key>Raza</Key>
            <Value>{dataMostar?.pet?.breed}</Value>
          </BoxData>
          <BoxData>
            <Key>Genero</Key>
            <Value>
              {dataMostar?.pet?.gender}
            </Value>
          </BoxData>
          </ColumnaUno>
          <ColumnaDos>
          <BoxData>
            <Key>¿Castrado?</Key>
            <Value>
              {dataMostar?.pet?.isCastrated === 'false' ? 'Si' : 'No'}
            </Value>
          </BoxData>
          <BoxData>
            <Key>Tamaño</Key>
            <Value>{dataMostar?.pet?.size}</Value>
          </BoxData>
          <BoxData>
            <Key>Edad</Key>
            <Value>{dataMostar?.pet?.age}</Value>
          </BoxData>
          <BoxData>
            <Key>Descripción</Key>
            <Value>{dataMostar?.pet?.description}</Value>
          </BoxData>
          </ColumnaDos>
        </WrapperMoreData>
      </WrapperDataPet>
    </WrapperDetailPet>
  );
};

export default DetailPet;
