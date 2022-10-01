import { FaPaw } from 'react-icons/fa';
import styled from 'styled-components';
import ButtonComponent from '../buttom/Button';

const WrapperCard = styled.div`
  position: relative;
  padding: 1rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.estado === 'Encontrado' ? 'var(--clr-blue-light)' : 'var(--clr-pink-light)')};
  backface-visibility: .9;
  margin: 1rem 1.5rem;
  border-radius: 1rem;
  width: min(20rem, 100%);
`;

const IconoHuella = styled.div`
  position: absolute;
  right: -5px;
  top: -20px;
  font-size: 3rem;
  rotate: 45deg;
  color: ${props => (props.estado === 'Encontrado' ? 'var(--clr-blue-dark)' : 'var(--clr-pink-medium)')};
`;

const NombreMascota = styled.h3`
  font-size: 2rem;
  margin: 0 0 1rem;
  font-family: 'Macondo', cursive;
`;

const WrapperImagen = styled.div`
  width: 80%;
  aspect-ratio: 1/1;
  border-radius: 100rem;
  overflow: hidden;
`;
const ImagenMascota = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const Fecha = styled.p`
  font-weight: bolder;
  margin: 1rem 0;
`;

const CardMascota = (
  {
    id, nombre, link, estado,
  },
) => {
  return (
    <WrapperCard estado={estado}>
      <IconoHuella estado={estado}><FaPaw/></IconoHuella>
      <NombreMascota>{nombre}</NombreMascota>
      <WrapperImagen>
        <ImagenMascota src={link} />
      </WrapperImagen>
      <Fecha>Fecha: 28/09/2022</Fecha>
      <ButtonComponent texto={'Ver más detalle'} estado={estado} path={id}/>
    </WrapperCard>
  );
};

export default CardMascota;
