import styled from 'styled-components';
import PosteosRecientes from '../../componentes/posteosRecientes/PosteosRecientes';

const HeaderWrapper = styled.div`
  background-color: salmon;
`;

const ColumnaUno = styled.div`
  background-color: pink;
`;

const ColumnaDos = styled.div`
  background-color: orange;
`;

const HeaderTitle = styled.div`
  background-color: bisque;
`;

const Button = styled.button`
  background-color: blue;
`;

const SobreNosotrosWrapper = styled.section``;
const ImagenSobreNosotros = styled.img``;
const Descripcion = styled.div``;
const TituloDesc = styled.h3``;
const TextoDesc = styled.p``;

const Landing = () => {
  return (
    <>
      <HeaderWrapper>
        <ColumnaUno>
          <HeaderTitle>Reencontrate con tu compañero de aventuras!</HeaderTitle>
          <Button>Encontré una mascota</Button>
          <Button>Perdí a mi mascota</Button>
        </ColumnaUno>
        <ColumnaDos>Perros</ColumnaDos>
      </HeaderWrapper>
      <PosteosRecientes titulo={'Mascotas recién encontradas'} />
      <PosteosRecientes titulo={'Mascotas recién perdidas'} />
      <SobreNosotrosWrapper>
        <ImagenSobreNosotros/>
        <Descripcion>
          <TituloDesc></TituloDesc>
          <TextoDesc></TextoDesc>
        </Descripcion>
      </SobreNosotrosWrapper>
    </>
  );
};

export default Landing;
