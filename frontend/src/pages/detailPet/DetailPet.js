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
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem 1rem;
  @media screen and (min-width: 500px) {
    justify-content: space-around;
  }
`;

const ColumnaUno = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
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

  const detalleMascota = useFetch(`https://pet-spaces-production.up.railway.app/api/${state}/${id}`);

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
          <BoxData>
            <Key>¿Castrado?</Key>
            <Value>
              {dataMostar?.pet?.isCastrated === 'false' ? 'Si' : 'No'}
            </Value>
          </BoxData>
          </ColumnaUno>
          <ColumnaUno>
          <BoxData>
            <Key>Tamaño</Key>
            <Value>{dataMostar?.pet?.size}</Value>
          </BoxData>
          <BoxData>
            <Key>Edad</Key>
            <Value>{dataMostar?.pet?.age}</Value>
          </BoxData>
          <BoxData>
            <Key>Color/es</Key>
            {dataMostar?.pet.color?.map((color, index) => <Value key={index}>{color}</Value>)}
          </BoxData>
          <BoxData>
            <Key>Contacto</Key>
            <Value>{dataMostar?.publicContact}</Value>
          </BoxData>
          </ColumnaUno>
        </WrapperMoreData>
      </WrapperDataPet>
    </WrapperDetailPet>
  );
};

export default DetailPet;
