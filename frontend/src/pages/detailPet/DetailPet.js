import { useParams } from 'react-router-dom';
import useFetch from '../../customHooks/useFetch';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';
import {
  BoxData,
  ColumnaUno,
  ImgPet,
  Key,
  NamePet,
  NameWrapper,
  UnderLine,
  Value,
  WrapperDataPet,
  WrapperDetailPet,
  WrapperImgPet,
  WrapperMoreData,
} from './detailPet.styled';

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
