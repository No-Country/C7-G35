import { GiSittingDog, GiEgyptianBird } from 'react-icons/gi';
import { FaCat } from 'react-icons/fa';

export const mascotaTipoOpciones = [
  {
    labelTexto: 'Perro',
    labelIcono: <GiSittingDog />,
    idFor: 'typePerro',
    name: 'type',
  },
  {
    labelTexto: 'Gato',
    labelIcono: <FaCat />,
    idFor: 'typeGato',
    name: 'type',
  },
  {
    labelTexto: 'Ave',
    labelIcono: <GiEgyptianBird />,
    idFor: 'typeAve',
    name: 'type',
  },
];
