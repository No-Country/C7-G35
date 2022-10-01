import styled from 'styled-components';
import PosteosRecientes from '../../componentes/posteosRecientes/PosteosRecientes';
import Dogs from '../../assets/Dogs.png';
import ButtonComponent from '../../componentes/buttom/Button';

const HeaderWrapper = styled.div`
  background: rgb(247, 142, 150);
  background: radial-gradient(
    circle,
    rgba(247, 142, 150, 0.5) 0%,
    rgba(230, 57, 70, 0.7) 55%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
  padding-bottom: 3rem;
`;

const SVG = styled.svg`
  fill: rgba(230, 57, 70, 0.7);
  position: relative;
  top: ${(props) => props.top || '0px'};
  z-index: -1;
`;

const ColumnaUno = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

const ImgPerros = styled.img`
  width: 90%;
  margin: 0 auto;
`;

const ColumnaDos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const HeaderTitle = styled.div`
  color: #fff;
  text-align: center;
  width: 70%;
  font-size: 2rem;
  margin: 0 auto;
  line-height: 1.8rem;
  font-family: 'Macondo', cursive;
`;

const SobreNosotrosWrapper = styled.section`
  background-color: var(--clr-pink-medium);
  padding: 1rem;
`;

const WrapperImg = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
`;
const ImagenSobreNosotros = styled.img`
  width: 100%;
  -webkit-box-shadow: 7px 6px 3px -5px #000;
  -moz-box-shadow: 7px 6px 3px -5px #000;
  box-shadow: 7px 6px 3px -5px #000;
`;
const Descripcion = styled.div`
  color: #fff;
`;
const TituloDesc = styled.h3`
  margin-bottom: 0;
  font-family: 'Macondo', cursive;
  font-weight: normal;
  font-size: 2rem;
`;
const TextoDesc = styled.p``;

const Landing = () => {
  const mascotasEncontrados = [
    {
      nombre: 'Teo',
      link: 'https://www.zooplus.es/magazine/wp-content/uploads/2021/02/perro-perdido.jpeg',
      estado: 'Encontrado',
    },
    {
      nombre: 'Lupi',
      link: 'https://www.buscomiperroperdido.com/Catalogo/Item/456_Item/perro-Perdido-Barcelona-Arenys-de-Munt-0.jpg',
      estado: 'Encontrado',
    },
    {
      nombre: 'Pelu',
      link: 'https://ep01.epimg.net/verne/imagenes/2017/04/12/mexico/1491951345_926681_1491951517_noticia_normal.jpg',
      estado: 'Encontrado',
    },
  ];

  const mascotasPerdidos = [
    {
      nombre: 'Pumi',
      link: 'https://estaticos-cdn.elperiodico.com/clip/613740eb-f6ab-4abb-8c5e-60db9929e1b8_alta-libre-aspect-ratio_default_0.jpg',
      estado: 'Perdido',
    },
    {
      nombre: 'Tisha',
      link: 'https://elcomercio.pe/resizer/fZ9ejNDkM_Uct0MB127fzw08OpI=/1200x1200/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/QIAIFGRLBJDFBDSOJ7KDRW5E5M.jpg',
      estado: 'Perdido',
    },
    {
      nombre: 'Oky',
      link: 'https://st2.depositphotos.com/2166177/5479/i/450/depositphotos_54798677-stock-photo-dog-on-the-railway-platform.jpg',
      estado: 'Perdido',
    },
  ];

  return (
    <>
      <HeaderWrapper>
        <ColumnaUno>
          <ImgPerros src={Dogs} />
        </ColumnaUno>
        <ColumnaDos>
          <HeaderTitle>Reencontrate con tu compañero de aventuras!</HeaderTitle>
          <ButtonComponent texto={'Encontré una mascota'} estado={'Encontrado'}/>
          <ButtonComponent texto={'Perdí a mi mascota'}/>
        </ColumnaDos>
      </HeaderWrapper>
      <SVG
        top={'-0.2px'}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path d='M0,64L48,90.7C96,117,192,171,288,202.7C384,235,480,245,576,234.7C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path>
      </SVG>
      <PosteosRecientes
        titulo={'Mascotas recién encontradas'}
        datos={mascotasEncontrados}
      />
      <PosteosRecientes
        titulo={'Mascotas recién perdidas'}
        datos={mascotasPerdidos}
      />
      <SVG
        top={'4px'}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
      >
        <path d='M0,64L48,90.7C96,117,192,171,288,202.7C384,235,480,245,576,234.7C672,224,768,192,864,170.7C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
      </SVG>
      <SobreNosotrosWrapper>
        <WrapperImg>
          <ImagenSobreNosotros src='https://media.istockphoto.com/photos/young-woman-embracing-dog-picture-id1142921675?k=20&m=1142921675&s=612x612&w=0&h=1FYGyiAKfpczGy5ffU2uEZg_gzhP7cN4BpXjEIs2YeI=' />
        </WrapperImg>
        <Descripcion>
          <TituloDesc>Sobre Nosotros</TituloDesc>
          <TextoDesc>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos quia
            dolore modi harum animi! Sequi quam nemo suscipit, sed ut non cumque
            provident dolorum, pariatur soluta tempora aspernatur cupiditate
            alias.
          </TextoDesc>
        </Descripcion>
      </SobreNosotrosWrapper>
    </>
  );
};

export default Landing;
