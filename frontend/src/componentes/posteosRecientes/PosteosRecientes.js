import { ButtonComponent } from '../buttom/Button';
import CardMascota from '../cardMascota/CardMascota';
import {
  GroupCards,
  Line,
  Title,
  WrapperPosteosRecientes,
  WrapperTitle,
} from './posteosRecientes.styled';

const PosteosRecientes = ({
  titulo, datos, estado, pathVerTodos,
}) => {
  return (
    <WrapperPosteosRecientes>
      <WrapperTitle>
        <Line />
        <Title>{titulo}</Title>
        <Line />
      </WrapperTitle>
      <GroupCards>
        {datos?.pet !== null
          ? datos?.map((mascota, index) => (
            <CardMascota
            key={index}
            path={`/detail-pet/${estado}/${mascota?.id}`}
            nombre={mascota?.pet?.name}
            link={mascota?.pet?.images}
            fecha={mascota?.date}
            estado={estado}
          />
          )) : 'No hay mascotas'}
      </GroupCards>
      <ButtonComponent texto={'Ver todos'} estado={estado} path={pathVerTodos} />

    </WrapperPosteosRecientes>
  );
};

export default PosteosRecientes;
