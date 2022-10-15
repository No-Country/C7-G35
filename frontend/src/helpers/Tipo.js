import { GiSittingDog } from 'react-icons/gi';
import { FaCat } from 'react-icons/fa';

export const mascotaTipoOpciones = [
  {
    labelTexto: 'Perro',
    labelIcono: <GiSittingDog />,
    idFor: 'typePerro',
    value: 'dog',
  },
  {
    labelTexto: 'Gato',
    labelIcono: <FaCat />,
    idFor: 'typeGato',
    value: 'cat',
  },
];
