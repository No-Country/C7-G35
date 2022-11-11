import { FaPaw } from 'react-icons/fa';
import PosteosRecientes from '../../componentes/posteosRecientes/PosteosRecientes';
import DogsHeader from '../../assets/GrupoDos.png';
import { ButtonComponent } from '../../componentes/buttom/Button';
import useFetch from '../../customHooks/useFetch';
import {
  SVGWavesInferior,
  SVGWavesSuperior,
} from '../../componentes/SVGWaves/SVGWaves';
import {
  ColumnaDos,
  ColumnaUno,
  Descripcion,
  HeaderTitle,
  HeaderWrapper,
  IconoHuella,
  ImagenSobreNosotros,
  ImgPerros,
  SobreNosotrosWrapper,
  TextoDesc,
  TituloDesc,
  WrapperImg,
} from './landing.styled';

const Landing = () => {
  const datosLosts = useFetch(
    'https://pet-spaces-production.up.railway.app/api/loss/last',
  );
  const datosFound = useFetch(
    'https://pet-spaces-production.up.railway.app/api/rescues/last',
  );

  const tokenFromParams = Object.fromEntries(
    new URL(window.location).searchParams,
  ).token;

  if (tokenFromParams) {
    localStorage.setItem('token', JSON.stringify(tokenFromParams));
  }

  return (
    <>
      <HeaderWrapper>
        <ColumnaUno>
          <ImgPerros src={DogsHeader} alt='Imagen portada de perros' />
        </ColumnaUno>
        <ColumnaDos>
          <HeaderTitle>
            Reencuentrate con tu compañero de aventuras!
          </HeaderTitle>
          <ButtonComponent
            texto={'Encontré una mascota'}
            estado={'rescues'}
            path={'/form-add-found-pet'}
          />
          <ButtonComponent
            texto={'Busco mi mascota'}
            path={'/form-add-lost-pet'}
          />
        </ColumnaDos>
      </HeaderWrapper>
      <SVGWavesSuperior top={'-0.2px'} />
      <PosteosRecientes
        titulo={'Mascotas recién encontradas'}
        datos={datosFound?.data?.rescue}
        estado={'rescues'}
        pathVerTodos={'/see-all-lost/rescues'}
      />
      <PosteosRecientes
        titulo={'Mascotas recién perdidas'}
        datos={datosLosts?.data?.loss}
        estado={'loss'}
        pathVerTodos={'/see-all-lost/loss'}
      />
      <SVGWavesInferior color={'pinkMedium'} top={'4px'} />
      <SobreNosotrosWrapper>
        <IconoHuella>
          <FaPaw />
        </IconoHuella>
        <WrapperImg>
          <ImagenSobreNosotros src='https://media.istockphoto.com/photos/young-woman-embracing-dog-picture-id1142921675?k=20&m=1142921675&s=612x612&w=0&h=1FYGyiAKfpczGy5ffU2uEZg_gzhP7cN4BpXjEIs2YeI=' />
        </WrapperImg>
        <Descripcion>
          <TituloDesc>Sobre Nosotros</TituloDesc>
          <TextoDesc>
            Todos los días mascotas se desaparecen, posiblemente para siempre,
            quien sabe cuál será el destino de nuestra amada mascota?. Nosotros
            queremos ayudarte, que tu mascota que vuelva, que si encuentras una,
            puedas reunirla con su verdadera familia. Ellos sufren, nosotros
            también.
          </TextoDesc>
        </Descripcion>
      </SobreNosotrosWrapper>
    </>
  );
};

export default Landing;
