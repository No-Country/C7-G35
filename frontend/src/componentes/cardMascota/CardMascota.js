import { BsCheckLg } from 'react-icons/bs';
import { FaPaw, FaSearch, FaHandsHelping } from 'react-icons/fa';
import { RiDeleteBin6Fill, RiFileEditFill } from 'react-icons/ri';
import { ButtonComponent } from '../buttom/Button';
import SinFotoMascota from '../../assets/sinFotoMascota.jpg';
import {
  ActionButton,
  Fecha,
  IconoHuella,
  ImagenMascota,
  NombreMascota,
  WrapperButtons,
  WrapperCard,
  WrapperImagen,
} from './cardMascota.styled';

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
    openModalSePerdio,
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
        {estado === 'pets' && <ActionButton onClick={ deleteFunction }><RiDeleteBin6Fill/></ActionButton>}
        <ActionButton onClick={ editFunction }><RiFileEditFill/></ActionButton>
        {(estado === 'pets' && !isRecovered) && <ActionButton onClick={ openModalSePerdio }><FaSearch/></ActionButton>}
        {estado === 'loss' && <ActionButton onClick={ openModalRecuperado }><BsCheckLg/></ActionButton>}
        {estado === 'rescues' && <ActionButton onClick={ openModalReunido }><FaHandsHelping/></ActionButton>}
      </WrapperButtons>
      }
      <ButtonComponent texto={'Ver más detalle'} estado={estado} path={path}/>
    </WrapperCard>
  );
};

export default CardMascota;
