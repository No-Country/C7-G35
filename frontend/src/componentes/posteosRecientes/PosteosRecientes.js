import styled from 'styled-components';
import CardMascota from '../cardMascota/CardMascota';

const WrapperPosteosRecientes = styled.section`
  margin-bottom: 4rem;
`;

const WrapperTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Line = styled.div`
  height: 1px;
  width: auto;
  flex: 1;
  background-color: #000;
`;

const Title = styled.h2`
  width: max-content;
  margin: 0 0.5rem;
  line-height: 0;
  font-family: 'Macondo', cursive;
  font-size: 1.8rem;
`;

const GroupCards = styled.div``;

const PosteosRecientes = ({ titulo, datos }) => {
  console.log(datos);
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
            nombre={mascota?.nombre}
            link={mascota?.link}
            estado={mascota?.estado}
          />
        ))}
      </GroupCards>
    </WrapperPosteosRecientes>
  );
};

export default PosteosRecientes;
