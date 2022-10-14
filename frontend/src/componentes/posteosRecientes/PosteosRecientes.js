import styled from 'styled-components';
import ButtonComponent from '../buttom/Button';
import CardMascota from '../cardMascota/CardMascota';

const WrapperPosteosRecientes = styled.section`
  margin-bottom: 4rem;
  display: grid;
  place-items: center;
`;

const WrapperTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const Line = styled.div`
  height: 1px;
  width: 30%;
  background-color: #000;
`;

const Title = styled.h2`
  width: max-content;
  margin: 0 0.5rem;
  line-height: 1.5rem;
  font-family: 'Macondo', cursive;
  font-size: 1.8rem;
  text-align: center;
`;

const GroupCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

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
        {datos?.map((mascota, index) => (
          <CardMascota
            key={index}
            id={'/detail-pet'}
            nombre={mascota?.nombre}
            link={mascota?.link}
            estado={mascota?.estado}
          />
        ))}
      </GroupCards>
      <ButtonComponent texto={'Ver todos'} estado={estado} path={pathVerTodos} />

    </WrapperPosteosRecientes>
  );
};

export default PosteosRecientes;
