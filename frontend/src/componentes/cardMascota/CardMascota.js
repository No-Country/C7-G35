import { BsCheckLg } from 'react-icons/bs';
import { FaPaw, FaSearch, FaHandsHelping } from 'react-icons/fa';
import { RiDeleteBin6Fill, RiFileEditFill } from 'react-icons/ri';
import styled from 'styled-components';
import { ButtonComponent } from '../buttom/Button';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';

const WrapperCard = styled.div`
  position: relative;
  padding: 1rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.estado === 'rescues' ? 'var(--clr-blue-light)' : 'var(--clr-pink-light)')};
  backface-visibility: .9;
  border-radius: 1rem;
  width: min(20rem, 100%);
`;

const IconoHuella = styled.div`
  position: absolute;
  right: -5px;
  top: -20px;
  font-size: 3rem;
  rotate: 45deg;
  color: ${props => (props.estado === 'rescues' ? 'var(--clr-blue-dark)' : 'var(--clr-pink-medium)')};
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
  margin-bottom: .5rem;
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

const WrapperButtons = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  `;

const ActionButton = styled.button`
  border: none;
  border-radius: 100vh;
  color: #fff;
  background-color: red;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 0;
  height: 2.5rem;
  aspect-ratio: 1/1;
`;

const CardMascota = (
  {
    path,
    nombre,
    link,
    estado,
    fecha,
    token,
    deleteFunction,
    editFunction,
    openModal,
    openModalRecuperado,
    openModalReunido,
    isRecovered,
  },
) => {
  const normalicedDate = new Date(fecha).toLocaleDateString(undefined, {
    timeZone: 'UTC',
  });
  return (
    <WrapperCard estado={estado}>
      <IconoHuella estado={estado}><FaPaw/></IconoHuella>
      <NombreMascota>{nombre}</NombreMascota>
      <WrapperImagen>
        <ImagenMascota src={link || SinFotoMascota} />
      </WrapperImagen>
      {fecha && <Fecha>Fecha: {normalicedDate}</Fecha>}
      {
      token
      && <WrapperButtons>
        {(isRecovered || !isRecovered)
        && <ActionButton onClick={ deleteFunction }><RiDeleteBin6Fill/></ActionButton>}
        <ActionButton onClick={ editFunction }><RiFileEditFill/></ActionButton>
        {estado === 'pets' && <ActionButton onClick={ openModal }><FaSearch/></ActionButton>}
        {(estado === 'loss' && isRecovered) && <ActionButton onClick={ openModalRecuperado }><BsCheckLg/></ActionButton>}
        {estado === 'rescues' && <ActionButton onClick={ openModalReunido }><FaHandsHelping/></ActionButton>}
      </WrapperButtons>
      }
      <ButtonComponent texto={'Ver más detalle'} estado={estado} path={path}/>
    </WrapperCard>
  );
};

export default CardMascota;
